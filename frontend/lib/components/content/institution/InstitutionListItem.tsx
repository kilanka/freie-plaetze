import {QuestionOutlineIcon} from "@chakra-ui/icons";
import {chakra, Flex, Grid, Heading, LinkBox, LinkOverlay, Stack, Text} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

import {BasicInstitutionInfoFragment} from "../../../api/generated";
import {Gist} from "./Gist";
import {PlacesStat} from "./PlacesStat";

export type InstitutionListItemProps = {
	institution: BasicInstitutionInfoFragment;
	href: string;
};

export const InstitutionListItem: React.FC<InstitutionListItemProps> = ({institution, href}) => {
	return (
		<LinkBox>
			<Grid
				templateColumns={{md: "1fr auto auto"}}
				gap={{base: 6, md: 8}}
				bgColor="white"
				borderRadius="lg"
				borderWidth="1px"
				borderColor="gray.200"
				shadow="md"
				overflow="hidden"
				textAlign={{base: "center", md: "left"}}
			>
				<Stack
					direction="column"
					order={0}
					m={{base: 6, md: 8}}
					mb={{base: 0, md: 8}}
					spacing={{base: 2, md: 4}}
				>
					<NextLink passHref legacyBehavior href={href}>
						<LinkOverlay>
							<Heading as="h3" size="lg" fontWeight="medium">
								{institution.name}
							</Heading>
						</LinkOverlay>
					</NextLink>
					<Text fontSize="lg" fontWeight="bold" display={{base: "none", md: "block"}}>
						<Gist hasInstitutionType hasProviderName institution={institution} />
					</Text>
				</Stack>

				<PlacesStat
					order={{base: 4, md: 1}}
					institution={institution}
					alignSelf="center"
					textAlign="center"
					zIndex={0}
				/>

				<Text
					order={3}
					display={{base: "block", md: "none"}}
					fontSize="lg"
					fontWeight="bold"
					mx={2}
				>
					<Gist hasInstitutionType hasProviderName institution={institution} />
				</Text>

				<Flex
					order={2}
					width={{base: "100%", md: 64}}
					height={{base: institution.photoListItemUrl ? 56 : 0, md: "100%"}}
					bgColor={institution.photoListItemUrl ? "transparent" : "gray.100"}
					backgroundImage={
						institution.photoListItemUrl ? `url("${institution.photoListItemUrl}")` : undefined
					}
					backgroundSize="cover"
					backgroundPosition="center"
					justify="center"
					align="center"
				>
					{!institution.photoListItemUrl && (
						<QuestionOutlineIcon
							display={{base: "none", md: "block"}}
							boxSize={10}
							color="gray.300"
						/>
					)}
				</Flex>
			</Grid>
		</LinkBox>
	);
};
