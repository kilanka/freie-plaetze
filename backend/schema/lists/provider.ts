import {list} from "@keystone-6/core";
import {allOperations} from "@keystone-6/core/access";
import {relationship, text} from "@keystone-6/core/fields";
import {filterItemsOwnedByUser, isUserLoggedIn} from "../auth";
import {requiredFieldConfig} from "../utils";

export const ProviderList = list({
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

		owner: relationship({ref: "User.providers", many: false}),
		institutions: relationship({ref: "Institution.provider", many: true}),

		homepage: text(),

		street: text(),
		streetNumber: text(),
		zip: text(),
		city: text(),
	},
});
