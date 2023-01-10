import {Box, Flex, Grid, GridItem, Heading, Img, Stack, Text} from "@chakra-ui/react";
import {Link} from "next-chakra-ui";
import React from "react";
import {IoCall, IoHome, IoLocationSharp, IoMail, IoPhonePortrait} from "react-icons/io5";

import {BasicInstitutionInfoFragment, InstitutionPageContentFragment} from "../../../api/generated";
import {stripProtocolFromUrl} from "../../../util";
import {ContactDetailRow} from "./ContactDetailRow";
import {Gist} from "./Gist";
import {InstitutionListItem} from "./InstitutionListItem";
import {PlacesStat} from "./PlacesStat";

export interface InstitutionPageContentProps {
	institution: InstitutionPageContentFragment;
	institutionsWithSameProvider?: BasicInstitutionInfoFragment[];
}

export const InstitutionPageContent: React.FC<InstitutionPageContentProps> = ({
	institution,
	institutionsWithSameProvider = [],
}) => {
	const provider = institution.provider;

	return (
		<>
			<Grid templateColumns={{base: "1fr", md: "3fr 2fr"}} gap={{base: 8, md: 10}} mb={20}>
				<GridItem as="main">
					<Stack spacing={4} mb={6}>
						<Heading as="h1" fontWeight={500}>
							{institution?.name}
						</Heading>

						<Text fontSize="lg" fontWeight="bold">
							<Gist institution={institution} />
						</Text>
						<Text fontSize="lg">
							{institution.types?.length === 1 ? "Hilfeform" : "Hilfeformen"}:{" "}
							{institution.types?.map((type) => `${type.name} (§ ${type.paragraph})`).join(", ")}
						</Text>
						{provider && (
							<Text>
								Träger: {provider.name}
								{provider.homepage ? (
									<>
										{" – "}
										<Link href={provider.homepage} target="_blank" wordBreak="break-word">
											{stripProtocolFromUrl(provider.homepage)}
										</Link>
									</>
								) : (
									<>
										, {provider.street} {provider.streetNumber}, {provider.zip} {provider.city}
									</>
								)}
							</Text>
						)}
					</Stack>

					<Stack spacing={{base: 6, md: 8}}>
						<Box>
							{institution.descriptionPlain?.split("\n").map((paragraph) => (
								<Text key={paragraph} mb={2}>
									{paragraph}
								</Text>
							))}
						</Box>
						<PlacesStat institution={institution} />

						<Stack direction="column" spacing={5}>
							<Heading size="md" fontWeight={500} textTransform="uppercase">
								Kontakt
							</Heading>
							{institution.homepage && (
								<ContactDetailRow icon={IoHome} href={institution.homepage}>
									{institution.homepage}
								</ContactDetailRow>
							)}
							<ContactDetailRow icon={IoLocationSharp}>
								{institution.name}
								<br />
								{institution.street} {institution.streetNumber}
								<br />
								{institution.zip} {institution.city}
							</ContactDetailRow>
							{institution.email && (
								<ContactDetailRow icon={IoMail} href={`mailto:${institution.email}`}>
									{institution.email}
								</ContactDetailRow>
							)}
							{institution.phone && (
								<ContactDetailRow icon={IoCall}>{institution.phone}</ContactDetailRow>
							)}
							{institution.mobilePhone && (
								<ContactDetailRow icon={IoPhonePortrait}>
									{institution.mobilePhone}
								</ContactDetailRow>
							)}
						</Stack>
					</Stack>
				</GridItem>
				{/*  */}
				<GridItem as="aside">
					<Stack spacing={8}>
						{institution.logoUrl && (
							<Flex justify="center">
								<Img src={institution.logoUrl} rounded="md" w="70%" />
							</Flex>
						)}
						{institution.photoInstitutionPageUrl && (
							<Img src={institution.photoInstitutionPageUrl} rounded="md" w="100%" />
						)}
					</Stack>
				</GridItem>
			</Grid>

			{institutionsWithSameProvider.length > 0 && (
				<>
					<Heading size="md" fontWeight={500} mb={8}>
						Weitere Einrichtungen des Trägers
					</Heading>
					<Stack gap={12}>
						{institutionsWithSameProvider.map((institution) => (
							<InstitutionListItem
								key={institution.id}
								institution={institution}
								href={`/institution/${institution.slug}`}
							/>
						))}
					</Stack>
				</>
			)}
		</>
	);
};
