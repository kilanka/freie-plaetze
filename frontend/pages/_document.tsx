// Based on https://github.com/shshaw/next-apollo-ssr/blob/909ae5922377fe0c759c0c1f37a6b32aa773f301/pages/_document.js

import {getDataFromTree} from "@apollo/client/react/ssr";
import Document, {DocumentContext, DocumentProps} from "next/document";
import React from "react";

import {getApolloClient} from "../lib/api/apollo-client";

class DocumentWithApollo extends Document {
	// Reference: https://gist.github.com/Tylerian/16d48e5850b407ba9e3654e17d334c1e
	constructor(props: DocumentProps) {
		super(props);

		/**
		 * Attach apolloState to the "global" __NEXT_DATA__ so we can populate the ApolloClient cache
		 */
		const {__NEXT_DATA__, apolloState} = props as any;
		__NEXT_DATA__.apolloState = apolloState;
	}

	static async getInitialProps(ctx: DocumentContext) {
		const startTime = Date.now();

		/**
		 * Initialize and get a reference to ApolloClient, which is saved in a "global" variable. The
		 * same client instance is returned to any other call to `getApolloClient`, so _app.js gets the
		 * same authenticated client to give to ApolloProvider.
		 */
		const apolloClient = getApolloClient(true);

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

		console.info(`Render Time: ${Date.now() - startTime} milliseconds.`);

		return {...initialProps, apolloState};
	}
}

export default DocumentWithApollo;
