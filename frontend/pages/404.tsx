import {Container, Divider, Heading, Stack, Text} from "@chakra-ui/react";
import {NextPage} from "next";
import React from "react";

import {Title} from "../lib/components/Title";

const Page: NextPage = () => {
	return (
		<>
			<Title>Seite nicht gefunden</Title>

			<Container
				maxWidth="container.xl"
				as="section"
				display="flex"
				flexBasis="auto"
				flexGrow={1}
				justifyContent="center"
				alignItems="center"
			>
				<Stack direction="row" h={24} spacing={4} alignItems="center">
					<Heading fontWeight="normal">404</Heading>
					<Divider orientation="vertical" />
					<Text>Die angefragte Seite konnte leider nicht gefunden werden.</Text>
				</Stack>
			</Container>
		</>
	);
};

export default Page;
