import {Box, Container, Text} from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

import {Link} from "./next/Link";
import {LinkButton} from "./next/LinkButton";

export type LayoutProps = {
	title?: string;
	children?: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({title, children}) => {
	const headerHeight = 16;
	return (
		<>
			<Head>
				<title>{title ? title + " – Freie Plätze" : "Freie Plätze"}</title>
			</Head>
			<Box bgColor="white">
				<Box
					bgColor="white"
					position="absolute"
					top={0}
					left={0}
					right={0}
					height={headerHeight}
					shadow="md"
				>
					<Container
						display="flex"
						height="100%"
						marginX="auto"
						alignItems="center"
						justifyContent="space-between"
						maxWidth="container.xl"
					>
						<Link href="/">
							<Text color="gray.900" fontSize="2xl" fontWeight="bold">
								Freie Plätze
							</Text>
						</Link>
						<Box>
							<LinkButton href="" variant="outline" colorScheme="gray">
								Anmelden
							</LinkButton>
						</Box>
					</Container>
				</Box>

				<Box as="main" minHeight="100vh" paddingTop={headerHeight}>
					{children}
				</Box>
			</Box>
		</>
	);
};
