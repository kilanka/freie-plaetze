import {Box, Flex, HStack, Heading, LinkBox, LinkOverlay, Text} from "@chakra-ui/layout";
import {Stat, StatHelpText, StatLabel, StatNumber} from "@chakra-ui/stat";
import NextLink from "next/link";
import React from "react";

import {BasicInstitutionInfoFragment} from "../../api/generated";
import {Image} from "../next/Image";

export type InstitutionListItemProps = {
	institution: BasicInstitutionInfoFragment;
};

export const InstitutionListItem: React.FC<InstitutionListItemProps> = ({institution}) => {
	return (
		<LinkBox>
			<Flex
				width="100%"
				// BgColor="yellow.100"
				borderRadius="lg"
				borderWidth="1px"
				borderColor="gray.200"
				shadow="md"
				textAlign="left"
				justifyContent="space-between"
				overflow="hidden"
			>
				<Box padding={8}>
					<NextLink passHref href={`/institution/${institution.slug}`}>
						<LinkOverlay>
							<Heading as="h3" size="lg" fontWeight="medium" mb={4}>
								{institution.name}
							</Heading>
						</LinkOverlay>
					</NextLink>
					<Text fontSize="lg" fontWeight="bold">
						<HStack divider={<Box>&bull;</Box>} spacing={2}>
							<span>{institution.city}</span>
							<span>
								{
									{mixed: "geschlechtsgemischt", f: "nur Mädchen", m: "nur Jungen"}[
										institution.gender
									]
								}
							</span>
							<span>
								{institution.ageFrom} - {institution.ageTo} Jahre
							</span>
						</HStack>
					</Text>
				</Box>
				<Flex>
					<Flex alignItems="center" mr={16}>
						<Stat>
							<StatLabel>Freie Plätze</StatLabel>
							<StatNumber>
								{institution.placesAvailable} / {institution.placesTotal}
							</StatNumber>
							<StatHelpText>
								Stand {new Date(institution.lastUpdated).toLocaleDateString("de-DE")}
							</StatHelpText>
						</Stat>
					</Flex>
					<Box minWidth="64" height="100%">
						{institution.photo?.url && (
							<Image
								src={process.env.NEXT_PUBLIC_BACKEND_URL! + institution.photo.url}
								layout="fill"
								h="100%"
							/>
						)}
					</Box>
				</Flex>
			</Flex>
		</LinkBox>
	);
};
