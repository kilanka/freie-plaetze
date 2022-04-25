import {ApolloProvider} from "@apollo/client";
import {ChakraProvider} from "@chakra-ui/react";
import type {AppProps} from "next/app";
import React from "react";

import {client} from "../lib/api/apollo-client";
import {Layout} from "../lib/components/layout";
import theme from "../lib/theme";

const MyApp = ({Component, pageProps}: AppProps) => {
	return (
		<ChakraProvider theme={theme}>
			<ApolloProvider client={client}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ApolloProvider>
		</ChakraProvider>
	);
};

export default MyApp;
