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
			<Box bgColor="white" position="relative" height="100%" minHeight="100vh" zIndex={0}>
				<Box
					bgColor="white"
					position="absolute"
					zIndex={10}
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
							<LinkButton href="/members/login" variant="outline" colorScheme="gray">
								Anmelden
							</LinkButton>
						</Box>
					</Container>
				</Box>

				<Box as="main" paddingTop={headerHeight} position="absolute" height="100%" width="100%">
					{children}
				</Box>
			</Box>
		</>
	);
};
