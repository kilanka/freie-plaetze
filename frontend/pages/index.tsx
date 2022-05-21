import {Container, Heading, List, Stack, Text} from "@chakra-ui/react";
import {NextPage} from "next";
import React from "react";

import {InstitutionTypeType} from "../lib/api/generated";
import {InstitutionSearchForm} from "../lib/components/content/InstitutionSearchForm";
import {InstitutionSearchResults} from "../lib/components/content/InstitutionSearchResults";
import {InstitutionTypeListItem} from "../lib/components/content/InstitutionTypeListItem";
import {HeaderSection} from "../lib/components/HeaderSection";
import {Title} from "../lib/components/Title";
import {institutionTypeNames} from "../lib/constants";
import {institutionTypeToParagraphNumber} from "../lib/util";

const HomePage: NextPage = () => {
	return (
		<>
			<Title />
			<HeaderSection>
				<Heading fontSize="4xl">
					Angebote der stationären Kinder- und Jugendhilfe in Ihrer Nähe
				</Heading>

				<Stack gap={4}>
					<Text>Hier finden Sie freie Plätze in Einrichtungen für folgende Hilfeformen:</Text>
					<List spacing={4}>
						{Object.entries(institutionTypeNames).map(([type, typeName]) => (
							<InstitutionTypeListItem
								key={type}
								paragraph={institutionTypeToParagraphNumber(type as InstitutionTypeType)}
							>
								{typeName}
							</InstitutionTypeListItem>
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
