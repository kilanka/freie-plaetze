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
import {PlacesStat} from "../../lib/components/content/institution/PlacesStat";
import {Link} from "../../lib/components/next/Link";
import {Title} from "../../lib/components/Title";

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
				<Grid templateColumns={{base: "1fr", md: "3fr 2fr"}} gap={{base: 8, md: 10}}>
					<GridItem>
						<Heading as="h1" fontWeight={500} mb={4}>
							{institution?.name}
						</Heading>
						<Text fontSize="lg" fontWeight="bold" mb={4}>
							<Gist institution={institution} />
						</Text>
						<Stack spacing={{base: 4, md: 6}} divider={<StackDivider borderColor="gray.200" />}>
							<Box>
								{institution.descriptionPlain?.split("\n").map((paragraph) => (
									<Text key={paragraph} mb={2}>
										{paragraph}
									</Text>
								))}
							</Box>
							<PlacesStat institution={institution} />

							<Box>
								<Heading size="md" fontWeight={500} textTransform="uppercase" mb={4}>
									Kontakt
								</Heading>
								<Stack direction="column" spacing={5}>
									{institution.homepage && (
										<Stack direction="row" spacing={4}>
											<Icon w={6} h={6} as={IoHome} />
											<Box>
												<Link href={institution.homepage} target="_blank">
													{institution.homepage}
												</Link>
											</Box>
										</Stack>
									)}
									<Stack direction="row" spacing={4}>
										<Icon w={6} h={6} as={IoLocationSharp} />
										<Text>
											{institution.name}
											<br />
											{institution.street} {institution.streetNumber}
											<br />
											{institution.zip} {institution.city}
										</Text>
									</Stack>
									{institution.email && (
										<Stack direction="row" spacing={4}>
											<Icon w={6} h={6} as={IoMail} />
											<Box>
												<Link href={`mailto:${institution.email ?? ""}`}>{institution.email}</Link>
											</Box>
										</Stack>
									)}
									{institution.phone && (
										<Stack direction="row" spacing={4}>
											<Icon w={6} h={6} as={IoCall} />
											<Box>{institution.phone}</Box>
										</Stack>
									)}
									{institution.mobilePhone && (
										<Stack direction="row" spacing={4}>
											<Icon w={6} h={6} as={IoPhonePortrait} />
											<Box>{institution.mobilePhone}</Box>
										</Stack>
									)}
								</Stack>
							</Box>
						</Stack>
					</GridItem>
					<GridItem>
						{institution.photo?.url && (
							<Image
								src={process.env.NEXT_PUBLIC_BACKEND_URL! + institution.photo.url}
								rounded="md"
								w="100%"
							/>
						)}
					</GridItem>
				</Grid>
			</Container>
		</>
	);
};

export default Page;
