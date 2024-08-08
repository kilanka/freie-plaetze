import {list} from "@keystone-6/core";
import {allOperations} from "@keystone-6/core/access";
import {text} from "@keystone-6/core/fields";
import {requiredFieldConfig} from "../utils";

export const InstitutionTypeList = list({
	access: {
		operation: {
			...allOperations(() => false),
			query: () => true,
		},
	},
	fields: {
		paragraph: text({
			isIndexed: "unique",
			isFilterable: true,
			validation: {isRequired: true},
			graphql: {isNonNull: {read: true}},
		}),
		name: text(requiredFieldConfig),
		shortName: text(requiredFieldConfig),
	},
	ui: {
		labelField: "shortName",
	},
});
