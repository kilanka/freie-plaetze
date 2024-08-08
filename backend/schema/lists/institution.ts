/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/ban-types */
import {Context} from ".keystone/types";
import {graphql, list} from "@keystone-6/core";
import {allOperations} from "@keystone-6/core/access";
import {
	checkbox,
	float,
	image,
	integer,
	relationship,
	select,
	text,
	timestamp,
} from "@keystone-6/core/fields";
import {document} from "@keystone-6/fields-document";
import {getPositionByAddress, getPositionFilters} from "../../interactions/geo";
import {hashStrings, slugify} from "../../util";
import {makeImageFormatField} from "../../util/image-formats";
import {filterItemsOwnedByUser, isUserAdmin, isUserLoggedIn} from "../auth";
import {requiredFieldConfig} from "../utils";

/**
 * Updates the position fields if at least one address field was updated
 **/
const resolveAddressInput = async ({
	resolvedData,
	item,
}: {
	resolvedData: Record<string, any>;
	item?: Record<string, any>;
}) => {
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
};

export const InstitutionList = list({
	access: {
		operation: {
			...allOperations(isUserLoggedIn),
			query: () => true,
		},
		filter: {
			delete: filterItemsOwnedByUser,
			update: filterItemsOwnedByUser,
		},
	},

	fields: {
		name: text(requiredFieldConfig),
		slug: text({
			isIndexed: "unique",
			isFilterable: true,
			graphql: {isNonNull: {read: true}},
			access: {
				create: isUserAdmin,
				update: isUserAdmin,
			},
		}),

		owner: relationship({ref: "User.institutions", many: false}),
		provider: relationship({ref: "Provider.institutions", many: false}),
		types: relationship({ref: "InstitutionType", many: true, ui: {hideCreate: true}}),
		createdAt: timestamp({
			db: {isNullable: false},
			ui: {itemView: {fieldMode: "read"}},
			defaultValue: {kind: "now"},
			graphql: {isNonNull: {read: true}},
		}),
		lastUpdated: timestamp({
			db: {updatedAt: true, isNullable: false},
			ui: {itemView: {fieldMode: "read"}},
			graphql: {isNonNull: {read: true}},
		}),

		gender: select({
			type: "enum",
			options: [
				{value: "mixed", label: "geschlechtsgemischt"},
				{value: "f", label: "nur Mädchen"},
				{value: "m", label: "nur Jungen"},
			],
			validation: {isRequired: true},
			graphql: {isNonNull: {read: true}},
		}),
		ageFrom: integer({validation: {min: 1}}),
		ageTo: integer({validation: {min: 1}}),

		arePlacesAvailable: checkbox({graphql: {isNonNull: {read: true}}}),

		street: text(requiredFieldConfig),
		streetNumber: text(requiredFieldConfig),
		zip: text(requiredFieldConfig),
		city: text(requiredFieldConfig),
		positionLat: float(),
		positionLng: float(),

		homepage: text(),
		email: text(),
		phone: text(),
		mobilePhone: text(),

		description: document(),
		descriptionPlain: text(),

		logo: image({storage: "images"}),
		logoUrl: makeImageFormatField("Institution", "logo", {
			institutionPage(builder) {
				builder.resize("fit", 600, 300, true).setOption("extend", "1");
			},
		}),

		photo: image({storage: "images"}),
		photoUrl: makeImageFormatField("Institution", "photo", {
			institutionListItem(builder) {
				builder.resize("fill", 600, 400);
			},
			institutionPage(builder) {
				builder.width(800);
			},
		}),
	},
	hooks: {
		async resolveInput({resolvedData, item, context}) {
			await resolveAddressInput({resolvedData, item});

			// Update slug if name was updated
			if (resolvedData.name) {
				resolvedData.slug = `${slugify(resolvedData.name)}-${hashStrings(
					resolvedData.name,
					new Date().toISOString()
				)}`;
			}

			return resolvedData;
		},
	},
});

async function getInstitutionSearchFilters(args: {
	cityOrZip: string;
	radius: number;
	age?: number | null;
	paragraphs?: string[] | null;
}) {
	const filters = await getPositionFilters(args.cityOrZip, args.radius);
	if (args.age) {
		filters.ageFrom = {lte: args.age};
		filters.ageTo = {gte: args.age};
	}

	if (args.paragraphs && args.paragraphs.length > 0) {
		filters.types = {some: {paragraph: {in: args.paragraphs}}};
	}

	return filters;
}

export const institutionListExtendGraphqlSchema = graphql.extend((base) => {
	const commonInstitutionSearchArgs = {
		radius: graphql.arg({type: graphql.nonNull(graphql.Int)}),
		cityOrZip: graphql.arg({
			type: graphql.nonNull(graphql.String),
			defaultValue: "",
		}),
		age: graphql.arg({type: graphql.Int}),
		paragraphs: graphql.arg({
			type: graphql.list(graphql.nonNull(graphql.String)),
			defaultValue: [],
		}),
		where: graphql.arg({
			type: graphql.nonNull(base.inputObject("InstitutionWhereInput")),
			defaultValue: {},
		}),
	};

	return {
		query: {
			institutionSearchResults: graphql.field({
				description:
					"If `cityOrZip` is not empty, return institutions within `radius` km distance from `cityOrZip`. Otherwise, do not filter by location. If `age` is not null, only those institutions are returned whose age range includes `age`.",
				type: graphql.nonNull(graphql.list(graphql.nonNull(base.object("Institution")))),
				args: {
					...commonInstitutionSearchArgs,
					orderBy: graphql.arg({
						type: graphql.nonNull(
							graphql.list(graphql.nonNull(base.inputObject("InstitutionOrderByInput")))
						),
						defaultValue: [],
					}),
					limit: graphql.arg({type: graphql.Int}),
					offset: graphql.arg({type: graphql.nonNull(graphql.Int), defaultValue: 0}),
				},
				async resolve(source, {where, orderBy, limit, offset, ...args}, context: Context) {
					try {
						const filters = await getInstitutionSearchFilters(args);

						return await context.db.Institution.findMany({
							where: {...filters, ...where},
							orderBy,
							skip: offset,
							take: limit === null ? undefined : limit,
						});
					} catch {
						return [];
					}
				},
			}),

			institutionSearchResultsCount: graphql.field({
				type: graphql.nonNull(graphql.Int),
				args: commonInstitutionSearchArgs,
				async resolve(source, {where, ...args}, context: Context) {
					try {
						const filters = await getInstitutionSearchFilters(args);

						return await context.db.Institution.count({
							where: {...filters, ...where},
						});
					} catch {
						return 0;
					}
				},
			}),
		},
	};
});
