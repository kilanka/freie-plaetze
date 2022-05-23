import {Container} from "@chakra-ui/react";
import {NextPage} from "next";
import React from "react";

import {AddInstitutionForm} from "../../lib/components/forms/institution/AddInstitutionForm";
import {Title} from "../../lib/components/Title";
import {membersOnlyGetInitialProps} from "../../lib/util/access";

const Page: NextPage = () => {
	return (
		<Container maxWidth="container.lg" mt={8}>
			<Title>Einrichtung hinzufügen</Title>
			<AddInstitutionForm />
		</Container>
	);
};

Page.getInitialProps = membersOnlyGetInitialProps;

export default Page;
