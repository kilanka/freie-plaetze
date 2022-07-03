import {useApolloClient} from "@apollo/client";
import {Container, Heading, List, Stack, Text} from "@chakra-ui/react";
import {InferGetStaticPropsType, NextPage} from "next";
import React from "react";

import {getApolloClient} from "../lib/api/apollo-client";
import {InstitutionTypeType} from "../lib/api/generated";
import {getSdk} from "../lib/api/generated/ssr";
import {InstitutionSearchForm} from "../lib/components/content/front/InstitutionSearchForm";
import {
	InstitutionSearchResults,
	institutionSearchBatchSize,
} from "../lib/components/content/front/InstitutionSearchResults";
import {InstitutionTypeListItem} from "../lib/components/content/front/InstitutionTypeListItem";
import {HeaderSection} from "../lib/components/HeaderSection";
import {Title} from "../lib/components/Title";
import {wrapper} from "../lib/store";
import {selectSearchArgs} from "../lib/store/search";
import {isServer} from "../lib/util";

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
	const apolloClient = getApolloClient();
	await getSdk(apolloClient).searchInstitutionsQuery({
		variables: {
			...selectSearchArgs(store.getState()),
			limit: institutionSearchBatchSize,
		},
	});
	const apolloCache = apolloClient.extract();

	return {
		props: {apolloCache},
		revalidate: 60,
	};
});

const HomePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({apolloCache}) => {
	const apolloClient = useApolloClient();

	if (isServer || typeof (window as any).isApolloHydrated === "undefined") {
		apolloClient.restore(apolloCache);
		if (!isServer) {
			(window as any).isApolloHydrated = true;
		}
	}

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
