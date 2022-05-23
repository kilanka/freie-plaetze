import {Grid, Heading, Img, LinkBox, LinkOverlay, Stack, Text} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

import {BasicInstitutionInfoFragment} from "../../../api/generated";
import {getAbsoluteImageUrl} from "../../../util";
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
					<NextLink passHref href={href}>
						<LinkOverlay>
							<Heading as="h3" size="lg" fontWeight="medium">
								{institution.name}
							</Heading>
						</LinkOverlay>
					</NextLink>
					<Text fontSize="lg" fontWeight="bold" display={{base: "none", md: "block"}}>
						<Gist hasInstitutionType institution={institution} />
					</Text>
				</Stack>

				<PlacesStat
					order={{base: 4, md: 1}}
					institution={institution}
					alignSelf="center"
					textAlign="center"
				/>

				<Text
					order={3}
					display={{base: "block", md: "none"}}
					fontSize="lg"
					fontWeight="bold"
					mx={2}
				>
					<Gist hasInstitutionType institution={institution} />
				</Text>

				{institution.photo?.url && (
					<Img
						order={2}
						src={getAbsoluteImageUrl(institution.photo.url)}
						h={{md: 36}}
						w={{base: "100%", md: 64}}
						objectFit="cover"
					/>
				)}
			</Grid>
		</LinkBox>
	);
};
