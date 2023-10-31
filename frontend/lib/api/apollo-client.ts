import {ApolloClient, InMemoryCache, NormalizedCacheObject} from "@apollo/client";
import {offsetLimitPagination} from "@apollo/client/utilities";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const isServer = typeof window === "undefined";

type Client = ApolloClient<NormalizedCacheObject>;

let clientSideApolloClient: Client | undefined;

export function getApolloClient() {
	if (isServer || !clientSideApolloClient) {
		const newClient = new ApolloClient({
			ssrMode: isServer,
			link: createUploadLink({
				uri: `${process.env.NEXT_PUBLIC_BACKEND_URL!}/api/graphql`,
				credentials: "include",
				headers: {
					// https://www.apollographql.com/docs/apollo-server/security/cors/#preventing-cross-site-request-forgery-csrf
					"Apollo-Require-Preflight": "true",
				},
			}),
			cache: new InMemoryCache({
				typePolicies: {
					Query: {
						fields: {
							institutionSearchResults: offsetLimitPagination([
								"cityOrZip",
								"radius",
								"age",
								"paragraphs",
								"where",
							]),
						},
					},
				},
			}),
		});

		if (!isServer) {
			clientSideApolloClient = newClient;
		}

		return newClient;
	}

	return clientSideApolloClient;
}
