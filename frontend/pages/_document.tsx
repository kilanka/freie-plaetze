// Based on https://github.com/shshaw/next-apollo-ssr/blob/909ae5922377fe0c759c0c1f37a6b32aa773f301/pages/_document.js

import {getDataFromTree} from "@apollo/client/react/ssr";
import Document, {DocumentContext, DocumentProps} from "next/document";
import React from "react";

import {getApolloClient} from "../lib/api/apollo-client";

class DocumentWithApollo extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const apolloClient = getApolloClient();

		/**
		 * Render the page through Apollo's `getDataFromTree` so the cache is populated. Unfortunately
		 * this renders the page twice per request... There may be a way around doing this, but I
		 * haven't quite ironed that out yet.
		 */
		await getDataFromTree(<ctx.AppTree {...(ctx as any).appProps} />);

		/**
		 * Render the page as normal, but now that ApolloClient is initialized and the cache is full,
		 * each query will work.
		 */
		const initialProps = await Document.getInitialProps(ctx);

		/**
		 * Extract the cache to pass along to the client so the queries are "hydrated" and don't need to
		 * request the data again!
		 */
		const apolloState = apolloClient.extract();

		return {...initialProps, apolloState};
	}

	constructor(props: DocumentProps) {
		super(props);

		/**
		 * Attach apolloState to the "global" __NEXT_DATA__ so we can populate the ApolloClient cache
		 */
		// @ts-expect-error: `apolloState` is unknown
		const {__NEXT_DATA__, apolloState} = props;
		// @ts-expect-error: `apolloState` is unknown
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		__NEXT_DATA__.apolloState = apolloState;
	}
}

export default DocumentWithApollo;
