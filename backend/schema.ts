import {createHash} from "crypto";

import {graphQLSchemaExtension, list} from "@keystone-6/core";
import {
	checkbox,
	float,
	image,
	integer,
	password,
	relationship,
	select,
	text,
	timestamp,
} from "@keystone-6/core/fields";
import {document} from "@keystone-6/fields-document";
import {lengthToDegrees} from "@turf/helpers";

import {isProduction} from "./environment";
import {getPositionByAddress, getPositionByZipOrCity} from "./interactions/geo";
import {sendWelcomeEmail} from "./interactions/mail";
import {slugify} from "./util";

type FilterArgs = {
	session?: {
		data: {id: string; isAdmin: boolean};
	};
} & Record<string, any>;

const isUserLoggedIn = (args: FilterArgs) => Boolean(args.session?.data.id);
const isUserAdmin = (args: FilterArgs) => Boolean(args.session?.data.isAdmin);

const isUserCurrentUserItem = (args: FilterArgs & {item: any}) =>
	args.session?.data.id === args.item.id;
const isUserAdminOrCurrentUserItem = (args: FilterArgs & {item: any}) =>
	isUserAdmin(args) || isUserCurrentUserItem(args);

const filterInstitutionsOwnedByUser = (args: FilterArgs) => {
	if (isUserAdmin(args)) return true;
	return {owner: {id: {equals: args.session?.data.id}}};
};

export const lists = {
	User: list({
		ui: {
			listView: {
				initialColumns: ["name"],
			},
		},
		access: {
			filter: {
				query: (args: FilterArgs) => {
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
			password: password({
				validation: {isRequired: true, rejectCommon: isProduction},
				access: {
					read: isUserAdminOrCurrentUserItem,
					update: isUserCurrentUserItem,
				},
			}),
			isAdmin: checkbox({
				access: {
					create: isUserAdmin,
					read: isUserAdminOrCurrentUserItem,
					update: isUserAdmin,
				},
			}),
			institutions: relationship({
				ref: "Institution.owner",
				many: true,
				access: {
					read: isUserAdminOrCurrentUserItem,
					update: isUserAdmin,
				},
			}),
		},
		hooks: {
			beforeOperation: async ({operation, context, item}) => {
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
			afterOperation: async ({operation, item}) => {
				if (operation === "create") {
					await sendWelcomeEmail((item as any).email, (item as any).name);
				}
			},
		},
	}),

	Institution: list({
		access: {
			operation: {
				create: isUserLoggedIn,
				update: isUserLoggedIn,
				delete: isUserLoggedIn,
			},
			filter: {
				delete: filterInstitutionsOwnedByUser,
				update: filterInstitutionsOwnedByUser,
			},
		},

		fields: {
			name: text({validation: {isRequired: true}, graphql: {read: {isNonNull: true}}}),
			slug: text({
				isIndexed: "unique",
				isFilterable: true,
				graphql: {read: {isNonNull: true}},
				access: {
					create: isUserAdmin,
					update: isUserAdmin,
				},
			}),

			owner: relationship({ref: "User.institutions", many: false}),
			lastUpdated: timestamp({
				db: {updatedAt: true, isNullable: false},
				ui: {itemView: {fieldMode: "read"}},
				graphql: {read: {isNonNull: true}},
			}),

			gender: select({
				type: "enum",
				options: [
					{value: "mixed", label: "geschlechtsgemischt"},
					{value: "f", label: "nur Mädchen"},
					{value: "m", label: "nur Jungen"},
				],
				validation: {isRequired: true},
				graphql: {read: {isNonNull: true}},
			}),
			ageFrom: integer({
				validation: {isRequired: true, min: 0},
				graphql: {read: {isNonNull: true}},
			}),
			ageTo: integer({
				validation: {isRequired: true, min: 0},
				graphql: {read: {isNonNull: true}},
			}),

			placesAvailable: integer({
				validation: {isRequired: true, min: 0},
				graphql: {read: {isNonNull: true}},
			}),
			placesTotal: integer({
				validation: {isRequired: true, min: 0},
				graphql: {read: {isNonNull: true}},
			}),

			street: text({validation: {isRequired: true}, graphql: {read: {isNonNull: true}}}),
			streetNumber: text({
				validation: {isRequired: true},
				graphql: {read: {isNonNull: true}},
			}),
			zip: text({validation: {isRequired: true}, graphql: {read: {isNonNull: true}}}),
			city: text({validation: {isRequired: true}, graphql: {read: {isNonNull: true}}}),
			positionLat: float(),
			positionLng: float(),

			homepage: text(),
			email: text(),
			phone: text(),
			mobilePhone: text(),

			description: document(),
			descriptionPlain: text(),

			logo: image(),
			photo: image(),
		},
		hooks: {
			resolveInput: async ({resolvedData, item, context}) => {
				// Update position if at least one address field was updated
				if (resolvedData.street || resolvedData.streetNumber || resolvedData.zip) {
					Object.assign(
						resolvedData,
						await getPositionByAddress({
							street: resolvedData.street ?? item?.street,
							streetNumber: resolvedData.streetNumber ?? item?.streetNumber,
							zip: resolvedData.zip ?? item?.zip,
						})
					);
				}

				// Update slug if name was updated
				if (resolvedData.name) {
					resolvedData.slug = `${slugify(resolvedData.name)}-${createHash("md5")
						.update(
							"".concat(
								resolvedData.street ?? item!.street,
								resolvedData.streetNumber ?? item!.streetNumber,
								resolvedData.zip ?? item!.zip
							)
						)
						.digest("hex")
						.slice(0, 8)}`;
				}

				return resolvedData;
			},
		},
	}),
};

export const extendGraphqlSchema = graphQLSchemaExtension({
	typeDefs: `
    type Query {
      """
			If \`cityOrZip\` is not empty, return institutions within \`radius\` km distance from
			\`cityOrZip\`. Otherwise, return all institutions.
			"""
      nearbyInstitutions(
				radius: Int!
        cityOrZip: String
        where: InstitutionWhereInput! = {}
        orderBy: [InstitutionOrderByInput!]! = []
        take: Int
        skip: Int! = 0
      ): [Institution!]!
    }`,
	resolvers: {
		Query: {
			nearbyInstitutions: async (root, {cityOrZip, radius, where, ...parameters}, context) => {
				try {
					const positionFilters: any = {};

					if (cityOrZip !== "") {
						const pos = await getPositionByZipOrCity(cityOrZip);
						const radiusDeg = lengthToDegrees(radius, "kilometers");

						positionFilters.positionLat = {
							gt: pos.positionLat - radiusDeg,
							lt: pos.positionLat + radiusDeg,
						};
						positionFilters.positionLng = {
							gt: pos.positionLng - radiusDeg,
							lt: pos.positionLng + radiusDeg,
						};
					}

					const result = await context.db.Institution.findMany({
						where: {...positionFilters, ...where},
						...parameters,
					});
					return result;
				} catch {
					return [];
				}
			},
		},
	},
});
