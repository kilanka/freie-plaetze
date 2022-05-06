import {Container, Stack} from "@chakra-ui/react";
import {NextPage} from "next";
import React from "react";

import {EditUserForm} from "../../lib/components/forms/user/EditUserForm";
import {Title} from "../../lib/components/Title";
import {membersOnlyGetServerSideProps} from "../../lib/util";

export const getServerSideProps = membersOnlyGetServerSideProps;

const Page: NextPage = () => {
	return (
		<Container pt={8} maxWidth="container.lg">
			<Title>Benutzerdaten</Title>
			<Stack gap={12}>
				<EditUserForm />
			</Stack>
		</Container>
	);
};

export default Page;
