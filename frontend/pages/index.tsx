import {Container, Heading, List, Stack, Text} from "@chakra-ui/react";
import {NextPage} from "next";
import React from "react";

import {InstitutionTypeType} from "../lib/api/generated";
import {InstitutionSearchForm} from "../lib/components/content/front/InstitutionSearchForm";
import {InstitutionSearchResults} from "../lib/components/content/front/InstitutionSearchResults";
import {InstitutionTypeListItem} from "../lib/components/content/front/InstitutionTypeListItem";
import {HeaderSection} from "../lib/components/HeaderSection";
import {Title} from "../lib/components/Title";

const HomePage: NextPage = () => {
	return (
		<>
			<Title />
			<HeaderSection>
				<Heading size="xl">Angebote der stationären Kinder- und Jugendhilfe in Ihrer Nähe</Heading>

				<Stack gap={4}>
					<Text>Hier finden Sie freie Plätze in Einrichtungen für folgende Hilfeformen:</Text>
					<List spacing={4}>
						{Object.values(InstitutionTypeType).map((type) => (
							<InstitutionTypeListItem key={type} type={type as InstitutionTypeType} />
						))}
					</List>
				</Stack>
			</HeaderSection>

			<Container as="section" maxWidth="container.xl">
				<Stack gap={16}>
					<InstitutionSearchForm />
					<InstitutionSearchResults />
				</Stack>
			</Container>
		</>
	);
};

export default HomePage;
