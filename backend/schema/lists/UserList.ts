import {Context} from ".keystone/types";
import {graphql, list} from "@keystone-6/core";
import {allowAll} from "@keystone-6/core/access";
import {checkbox, password, relationship, text} from "@keystone-6/core/fields";
import {isProduction} from "../../environment";
import {sendWelcomeEmail} from "../../interactions/mail";
import {FilterArgs, isUserAdmin, isUserAdminOrCurrentUserItem, isUserLoggedIn} from "../auth";

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
		password: password({validation: {isRequired: true, rejectCommon: isProduction}}),
		isAdmin: checkbox({
			access: {
				create: isUserAdmin,
				update: isUserAdmin,
			},
		}),

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
		async afterOperation({operation, item}) {
			if (operation === "create") {
				await sendWelcomeEmail((item as any).email, (item as any).name);
			}
		},
	},
});

export const userListExtendGraphqlSchema = graphql.extend((base) => {
	return {
		query: {
			isEmailRegistered: graphql.field({
				type: graphql.nonNull(graphql.Boolean),
				args: {
					email: graphql.arg({type: graphql.nonNull(graphql.String)}),
				},
				async resolve(source, {email}, context: Context) {
					try {
						return (
							(await context.sudo().db.User.count({
								where: {email: {equals: email}},
							})) > 0
						);
					} catch {
						return false;
					}
				},
			}),
		},
	};
});
