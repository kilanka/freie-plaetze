import {InstitutionList, institutionListExtendGraphqlSchema} from "./lists/InstitutionList";
import {InstitutionTypeList} from "./lists/InstitutionTypeList";
import {ProviderList} from "./lists/ProviderList";
import {UserList, userListExtendGraphqlSchema} from "./lists/user";

export const lists = {
	User: UserList,
	InstitutionType: InstitutionTypeList,
	Institution: InstitutionList,
	Provider: ProviderList,
};

export const extendGraphqlSchema = (schema: any) =>
	institutionListExtendGraphqlSchema(userListExtendGraphqlSchema(schema));
