import {Context} from ".keystone/types";
import {graphql, list} from "@keystone-6/core";
import {allowAll} from "@keystone-6/core/access";
import {checkbox, password, relationship, text, timestamp} from "@keystone-6/core/fields";
import {BaseItem} from "@keystone-6/core/types";
import {sendAuthTokenEmail, sendWelcomeEmail} from "../../../interactions/mail";
import {FilterArgs, isUserAdmin, isUserAdminOrCurrentUserItem, isUserLoggedIn} from "../../auth";
import {
	AuthTokenRedemptionError,
	AuthTokenRedemptionErrorCode,
	issueAuthToken,
	PasswordFieldExtensions,
	redeemAuthToken,
} from "./auth";

const authFieldConfig = {
	access: () => false,
	ui: {
		createView: {fieldMode: "hidden"},
		itemView: {fieldMode: "hidden"},
		listView: {fieldMode: "hidden"},
	},
} as const;

export const UserList = list({
	ui: {
		listView: {
			initialColumns: ["name"],
		},
	},
	access: {
		operation: allowAll,
		filter: {
			query(args: FilterArgs) {
				if (!isUserLoggedIn(args)) return false;
				if (isUserAdmin(args)) return true;
				return {id: {equals: args.session?.data.id}};
			},
		},
		item: {
			update: isUserAdminOrCurrentUserItem,
			delete: isUserAdminOrCurrentUserItem,
		},
	},
	fields: {
		name: text({validation: {isRequired: true}}),
		email: text({
			isIndexed: "unique",
			isFilterable: true,
			validation: {isRequired: true},
		}),
		isAdmin: checkbox({
			access: {
				create: isUserAdmin,
				update: isUserAdmin,
			},
		}),

		authToken: password(authFieldConfig),
		authTokenIssuedAt: timestamp(authFieldConfig),
		authTokenRedeemed: checkbox(authFieldConfig),

		institutions: relationship({ref: "Institution.owner", many: true}),
		providers: relationship({ref: "Provider.owner", many: true}),
	},
	hooks: {
		async beforeOperation({operation, context, item}) {
			if (operation === "delete") {
				// Delete the user's institutions
				const institutions = await context.db.Institution.findMany({
					where: {owner: {id: {equals: item.id.toString()}}},
				});
				await context.db.Institution.deleteMany({
					where: institutions.map((institution) => ({id: institution.id.toString()})),
				});
			}
		},
		async afterOperation({operation, context, item, listKey}) {
			if (operation === "create" && item) {
				const email = item.email as string;
				const {token, userName} = await issueAuthToken(context.sudo().db[listKey] as any, email);
				await sendWelcomeEmail(email, userName, token);
			}
		},
	},
});

export const userListExtendGraphqlSchema = graphql.extend((base) => {
	const AuthTokenRedemptionFailure = graphql.object<{
		code: AuthTokenRedemptionErrorCode;
	}>()({
		name: "AuthTokenRedemptionFailure",
		fields: {
			code: graphql.field({
				type: graphql.nonNull(
					graphql.enum({
						name: "AuthTokenRedemptionErrorCode",
						values: graphql.enumValues([
							AuthTokenRedemptionErrorCode.Failure,
							AuthTokenRedemptionErrorCode.TokenExpired,
							AuthTokenRedemptionErrorCode.TokenRedeemed,
						]),
					})
				),
			}),
		},
	});

	const AuthTokenRedemptionSuccess = graphql.object<{sessionToken: string; user: BaseItem}>()({
		name: "AuthTokenRedemptionSuccess",
		fields: {
			sessionToken: graphql.field({type: graphql.nonNull(graphql.String)}),
			user: graphql.field({type: graphql.nonNull(base.object("User"))}),
		},
	});

	const AuthTokenRedemptionResult = graphql.union({
		name: "AuthTokenRedemptionResult",
		types: [AuthTokenRedemptionSuccess, AuthTokenRedemptionFailure],
		resolveType(value) {
			return "sessionToken" in value
				? AuthTokenRedemptionSuccess.graphQLType.name
				: AuthTokenRedemptionFailure.graphQLType.name;
		},
	});

	const passwordFieldExtensions = base.object("User").graphQLType.getFields()?.authToken.extensions
		?.keystoneSecretField as PasswordFieldExtensions;

	return {
		mutation: {
			requestAuthToken: graphql.field({
				type: graphql.nonNull(graphql.Boolean),
				args: {email: graphql.arg({type: graphql.nonNull(graphql.String)})},
				async resolve(_value, {email}, context: Context) {
					try {
						const {token, userName} = await issueAuthToken(context.sudo().db.User, email);
						await sendAuthTokenEmail(email, userName, token);
					} catch {}

					return true;
				},
			}),

			redeemAuthToken: graphql.field({
				type: graphql.nonNull(AuthTokenRedemptionResult),
				args: {
					email: graphql.arg({type: graphql.nonNull(graphql.String)}),
					token: graphql.arg({type: graphql.nonNull(graphql.String)}),
				},
				async resolve(_value, {email, token}, context: Context) {
					if (!context.sessionStrategy) {
						throw new Error("Authentication requires a session strategy, but none was found.");
					}

					try {
						const user = await redeemAuthToken(passwordFieldExtensions, email, token, context);

						const sessionToken = await context.sessionStrategy.start({
							data: {
								listKey: "User",
								itemId: user.id,
								data: {id: user.id, isAdmin: user.isAdmin},
							},
							context,
						});

						if (typeof sessionToken !== "string" || sessionToken.length === 0) {
							throw new AuthTokenRedemptionError();
						}

						return {sessionToken, user};
					} catch (error) {
						return {
							code:
								error instanceof AuthTokenRedemptionError
									? error.code
									: AuthTokenRedemptionErrorCode.Failure,
						};
					}
				},
			}),
		},
	};
});
