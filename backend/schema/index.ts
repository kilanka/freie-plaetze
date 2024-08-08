import {InstitutionList, institutionListExtendGraphqlSchema} from "./lists/institution";
import {InstitutionTypeList} from "./lists/institution-type";
import {ProviderList} from "./lists/provider";
import {UserList, userListExtendGraphqlSchema} from "./lists/user";

export const lists = {
	User: UserList,
	InstitutionType: InstitutionTypeList,
	Institution: InstitutionList,
	Provider: ProviderList,
};

export const extendGraphqlSchema = (schema: any) =>
	institutionListExtendGraphqlSchema(userListExtendGraphqlSchema(schema));
