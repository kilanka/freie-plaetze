import {Container} from "@chakra-ui/react";
import {NextPage} from "next";
import React from "react";

import {AddInstitutionForm} from "../../lib/components/forms/institution/AddInstitutionForm";
import {emptyGetServerSideProps} from "../../lib/util";

export const getServerSideProps = emptyGetServerSideProps;

const Page: NextPage = () => {
	return (
		<Container maxWidth="container.lg" mt={8}>
			<AddInstitutionForm />
		</Container>
	);
};

export default Page;
