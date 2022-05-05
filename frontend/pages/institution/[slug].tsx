import {
	Box,
	Container,
	Grid,
	GridItem,
	Heading,
	Icon,
	Image,
	Stack,
	StackDivider,
	Text,
} from "@chakra-ui/react";
import type {GetServerSidePropsContext, InferGetServerSidePropsType, NextPage} from "next";
import React from "react";
import {IoCall, IoHome, IoLocationSharp, IoMail, IoPhonePortrait} from "react-icons/io5";

import {getApolloClient} from "../../lib/api/apollo-client";
import {useInstitutionBySlugQuery} from "../../lib/api/generated";
import {getSdk} from "../../lib/api/generated/ssr";
import {Gist} from "../../lib/components/content/institution/Gist";
import {InstitutionPageContent} from "../../lib/components/content/institution/InstitutionPageContent";
import {PlacesStat} from "../../lib/components/content/institution/PlacesStat";
import {Link} from "../../lib/components/next/Link";
import {Title} from "../../lib/components/Title";
import {getAbsoluteImageUrl} from "../../lib/util";

export const getServerSideProps = async ({params}: GetServerSidePropsContext) => {
	const slug = params!.slug as string;

	const {
		data: {institution},
	} = await getSdk(getApolloClient()).institutionBySlugQuery({variables: {slug}});

	return {
		notFound: !institution,
		props: {slug},
	};
};

const Page: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({slug}) => {
	const {data} = useInstitutionBySlugQuery({variables: {slug}});

	const institution = data?.institution;
	if (!institution) {
		return null;
	}

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
