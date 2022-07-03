import {Container} from "@chakra-ui/react";
import {GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType, NextPage} from "next";
import React from "react";

import {getApolloClient} from "../../lib/api/apollo-client";
import {getSdk} from "../../lib/api/generated/ssr";
import {InstitutionPageContent} from "../../lib/components/content/institution/InstitutionPageContent";
import {Title} from "../../lib/components/Title";

export const getStaticProps = async ({params}: GetStaticPropsContext) => {
	const slug = params!.slug as string;

	const {
		data: {institution},
	} = await getSdk(getApolloClient()).institutionBySlugQuery({variables: {slug}});

	return {
		notFound: !institution,
		props: {institution: institution!},
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

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({institution}) => {
	return (
		<>
			<Title>{institution?.name}</Title>
			<Container maxWidth="container.xl" mt={8}>
				<InstitutionPageContent institution={institution} />
			</Container>
		</>
	);
};

export default Page;
