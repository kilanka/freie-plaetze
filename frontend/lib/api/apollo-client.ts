import {ApolloClient, InMemoryCache, NormalizedCacheObject} from "@apollo/client";
import {offsetLimitPagination} from "@apollo/client/utilities";
import {createUploadLink} from "apollo-upload-client";

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
			}),
			cache: new InMemoryCache({
				typePolicies: {
					Query: {
						fields: {
							institutionSearchResults: offsetLimitPagination([
								"cityOrZip",
								"radius",
								"age",
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
