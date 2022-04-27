// Based on https://github.com/shshaw/next-apollo-ssr/blob/909ae5922377fe0c759c0c1f37a6b32aa773f301/data/apollo.js

import {ApolloClient, InMemoryCache, NormalizedCacheObject} from "@apollo/client";

const isServer = typeof window === "undefined";
const windowApolloState = !isServer && (window.__NEXT_DATA__ as any).apolloState;

let client: ApolloClient<NormalizedCacheObject> | undefined;

export function getApolloClient(forceNew = false) {
	if (!client || forceNew) {
		client = new ApolloClient({
			ssrMode: isServer,
			uri: `${process.env.NEXT_PUBLIC_BACKEND_URL!}/api/graphql`,
			cache: new InMemoryCache().restore(windowApolloState || {}),

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
	}

	return client;
}
