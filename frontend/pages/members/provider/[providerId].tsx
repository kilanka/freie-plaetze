import {Container, Heading, Stack} from "@chakra-ui/react";
import {NextPage} from "next";
import {useRouter} from "next/router";
import React from "react";

import {useProviderByIdQuery} from "../../../lib/api/generated";
import {DeleteProviderForm} from "../../../lib/components/forms/provider/DeleteProviderForm";
import {EditProviderForm} from "../../../lib/components/forms/provider/EditProviderForm";
import {Title} from "../../../lib/components/Title";

const Page: NextPage = () => {
	const router = useRouter();
	const providerId = router.query.providerId as string;

	const {data} = useProviderByIdQuery({variables: {id: providerId}});

	if (!data?.provider) {
		return null;
	}

	const provider = data.provider;

	return (
		<Container maxWidth="container.lg" mt={8} as={Stack} gap={12}>
			<Title />
			<Heading as="h1" fontWeight={500}>
				{provider.name}
			</Heading>

			<EditProviderForm providerId={provider.id} />
			<DeleteProviderForm providerId={provider.id} />
		</Container>
	);
};

export default Page;
