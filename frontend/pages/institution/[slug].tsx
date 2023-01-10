import {Container} from "@chakra-ui/react";
import {GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType, NextPage} from "next";
import React from "react";

import {getApolloClient} from "../../lib/api/apollo-client";
import {BasicInstitutionInfoFragment, getSdk} from "../../lib/api/generated/ssr";
import {InstitutionPageContent} from "../../lib/components/content/institution/InstitutionPageContent";
import {Title} from "../../lib/components/Title";

export const getStaticProps = async ({params}: GetStaticPropsContext) => {
	const slug = params!.slug as string;

	const {
		data: {institution},
	} = await getSdk(getApolloClient()).institutionBySlugQuery({variables: {slug}});

	const institutionsWithSameProvider: BasicInstitutionInfoFragment[] = [];
	if (institution?.provider?.id) {
		const {
			data: {institutions},
		} = await getSdk(getApolloClient()).institutionsByProviderQuery({
			variables: {providerId: institution.provider.id},
		});

		if (institutions && institutions.length > 0) {
			institutionsWithSameProvider.push(
				...institutions.filter((item) => item.id !== institution.id)
			);
		}
	}

	return {
		notFound: !institution,
		props: {institution: institution!, institutionsWithSameProvider},
		revalidate: 60,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const {
		data: {institutions},
	} = await getSdk(getApolloClient()).institutionSlugsQuery({});

	return {
		paths:
			institutions?.map((institution) => ({
				params: {slug: institution.slug},
			})) ?? [],
		fallback: "blocking",
	};
};

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
	institution,
	institutionsWithSameProvider,
}) => {
	return (
		<>
			<Title>{institution?.name}</Title>
			<Container maxWidth="container.xl" mt={8}>
				<InstitutionPageContent
					institution={institution}
					institutionsWithSameProvider={institutionsWithSameProvider}
				/>
			</Container>
		</>
	);
};

export default Page;
