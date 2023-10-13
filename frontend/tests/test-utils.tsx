// https://testing-library.com/docs/react-testing-library/setup

import {ApolloProvider} from "@apollo/client";
import {ChakraProvider} from "@chakra-ui/react";
import {Provider as ModalProvider} from "@ebay/nice-modal-react";
import {RenderOptions, render} from "@testing-library/react";
import React, {ReactElement} from "react";
import {Provider as ReduxProvider} from "react-redux";

import {getApolloClient} from "../lib/api/apollo-client";
import {makeStore} from "../lib/store";
import theme from "../lib/theme";

const ProviderWrapper: React.FC<{children: React.ReactNode}> = ({children}) => {
	const reduxStore = makeStore({});
	const client = getApolloClient();

	return (
		<ReduxProvider store={reduxStore}>
			<ApolloProvider client={client}>
				<ChakraProvider theme={theme}>
					<ModalProvider>{children}</ModalProvider>
				</ChakraProvider>
			</ApolloProvider>
		</ReduxProvider>
	);
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
	render(ui, {wrapper: ProviderWrapper, ...options});

export * from "@testing-library/react";
export {customRender as render};
