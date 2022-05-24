// Based on https://github.com/shshaw/next-apollo-ssr/blob/909ae5922377fe0c759c0c1f37a6b32aa773f301/data/apollo.js

import {ApolloClient, InMemoryCache, NormalizedCacheObject} from "@apollo/client";
import {offsetLimitPagination} from "@apollo/client/utilities";
import {createUploadLink} from "apollo-upload-client";

const isServer = typeof window === "undefined";
// @ts-expect-error `apolloState` does not exist on `__NEXT_DATA__`
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const windowApolloState = !isServer && window.__NEXT_DATA__.apolloState;

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
			}).restore(windowApolloState || {}),

			/**
        // Default options to disable SSR for all queries.
        defaultOptions: {
          // Skip queries when server side rendering
          // https://www.apollographql.com/docs/react/data/queries/#ssr
          watchQuery: {
            ssr: false
          },
          query: {
            ssr: false
          }
          // Selectively enable specific queries like so:
          // `useQuery(QUERY, { ssr: true });`
        }
      */
		});

		if (!isServer) {
			clientSideApolloClient = newClient;
		}

		return newClient;
	}

	return clientSideApolloClient;
}
