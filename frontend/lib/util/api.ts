import {getApolloClient} from "../api/apollo-client";
import {
	IsEmailRegisteredDocument,
	IsEmailRegisteredQuery,
	IsEmailRegisteredQueryVariables,
} from "../api/generated";

export async function isEmailRegistered(email: string) {
	const result = await getApolloClient().query<
		IsEmailRegisteredQuery,
		IsEmailRegisteredQueryVariables
	>({
		query: IsEmailRegisteredDocument,
		variables: {email},
	});

	return result.data.isEmailRegistered;
}
