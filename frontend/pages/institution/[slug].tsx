import type {GetServerSidePropsContext, InferGetServerSidePropsType, NextPage} from "next";
import React from "react";

import {client} from "../../lib/api/apollo-client";
import {getSdk} from "../../lib/api/generated/ssr";

export const getServerSideProps = async ({params}: GetServerSidePropsContext) => {
	const slug = params!.slug as string;

	const {
		data: {institution},
	} = await getSdk(client).institutionBySlugQuery({variables: {slug}});

	return {
		props: {institution},
	};
};

const TestPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
	institution,
}) => {
	return <div>{JSON.stringify(institution)}</div>;
};

export default TestPage;
