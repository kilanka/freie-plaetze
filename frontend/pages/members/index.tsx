import {Box} from "@chakra-ui/react";
import {NextPage} from "next";
import React from "react";

import {emptyGetServerSideProps} from "../../lib/util";

export const getServerSideProps = emptyGetServerSideProps;

const Page: NextPage = () => {
	return <Box />;
};

export default Page;
