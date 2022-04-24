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
import {IoCall, IoLocationSharp, IoMail, IoPhonePortrait} from "react-icons/io5";

import {client} from "../../lib/api/apollo-client";
import {getSdk} from "../../lib/api/generated/ssr";
import {Description} from "../../lib/components/content/institution/Description";
import {Gist} from "../../lib/components/content/institution/Gist";
import {PlacesStat} from "../../lib/components/content/institution/PlacesStat";
import {Layout} from "../../lib/components/Layout";
import {Link} from "../../lib/components/next/Link";

export const getServerSideProps = async ({params}: GetServerSidePropsContext) => {
	const slug = params!.slug as string;

	const {
		data: {institution},
	} = await getSdk(client).institutionBySlugQuery({variables: {slug}});

	return {
		notFound: !institution,
		props: {institution: institution!},
	};
};

const Page: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({institution}) => {
	return (
		<Layout title={institution?.name}>
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
								<Description documentJson={institution.description?.document} />
							</Box>
							<PlacesStat institution={institution} />

							<Box>
								<Heading size="md" fontWeight={500} textTransform="uppercase" mb={4}>
									Kontakt
								</Heading>
								<Stack direction="column" spacing={5}>
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
		</Layout>
	);
};

export default Page;
