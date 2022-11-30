import {ApolloProvider} from "@apollo/client";
import {ChakraProvider} from "@chakra-ui/react";
import {Provider as ModalProvider} from "@ebay/nice-modal-react";
import {AppProps} from "next/app";
import React from "react";
import {Provider as ReduxProvider} from "react-redux";

import {getApolloClient} from "../lib/api/apollo-client";
import {Layout} from "../lib/components/layout";
import {wrapper} from "../lib/store";
import theme from "../lib/theme";

const MyApp: React.FC<AppProps> = ({Component, ...props}) => {
	const wrappedStore = wrapper.useWrappedStore(props);
	const client = getApolloClient();

	return (
		<ReduxProvider store={wrappedStore.store}>
			<ApolloProvider client={client}>
				<ChakraProvider theme={theme}>
					<ModalProvider>
						<Layout>
							<Component {...wrappedStore.props.pageProps} />
						</Layout>
					</ModalProvider>
				</ChakraProvider>
			</ApolloProvider>
		</ReduxProvider>
	);
};

export default MyApp;
