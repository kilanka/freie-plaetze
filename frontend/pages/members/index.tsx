import {Container, Heading, Stack} from "@chakra-ui/react";
import {NextPage} from "next";
import React from "react";
import {useSelector} from "react-redux";

import {useMyInstitutionsQuery} from "../../lib/api/generated";
import {InstitutionListItem} from "../../lib/components/content/institution/InstitutionListItem";
import {InstitutionStack} from "../../lib/components/content/InstitutionStack";
import {Title} from "../../lib/components/Title";
import {selectUserId} from "../../lib/store/auth";

const Page: NextPage = () => {
	const userId = useSelector(selectUserId);
	const {data} = useMyInstitutionsQuery({variables: {userId}});

	return (
		<Container pt={8} maxWidth="container.lg">
			<Title>Meine Einrichtungen</Title>
			<Stack gap={12}>
				<Heading as="h1" fontWeight={500}>
					Meine Einrichtungen
				</Heading>
				<InstitutionStack>
					{data?.institutions?.map((institution) => (
						<InstitutionListItem
							key={institution.id}
							institution={institution}
							href={`/members/institution/${institution.id}`}
						/>
					))}
				</InstitutionStack>
			</Stack>
		</Container>
	);
};

export default Page;
