import {ApolloProvider} from "@apollo/client";
import {ChakraProvider} from "@chakra-ui/react";
import type {AppProps} from "next/app";
import React from "react";

import {getApolloClient} from "../lib/api/apollo-client";
import {Layout} from "../lib/components/layout";
import {wrapper} from "../lib/store";
import theme from "../lib/theme";

const MyApp = ({Component, pageProps}: AppProps) => {
	const client = getApolloClient();

	return (
		<ApolloProvider client={client}>
			<ChakraProvider theme={theme}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ChakraProvider>
		</ApolloProvider>
	);
};

export default wrapper.withRedux(MyApp);
