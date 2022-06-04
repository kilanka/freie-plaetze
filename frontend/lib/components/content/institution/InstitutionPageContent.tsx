import {
	Box,
	Grid,
	GridItem,
	Heading,
	Icon,
	Image,
	Stack,
	StackDivider,
	Text,
} from "@chakra-ui/react";
import React from "react";
import {IoCall, IoHome, IoLocationSharp, IoMail, IoPhonePortrait} from "react-icons/io5";

import {InstitutionPageContentFragment} from "../../../api/generated";
import {institutionTypeNames} from "../../../constants";
import {getAbsoluteImageUrl} from "../../../util";
import {Link} from "../../next/Link";
import {InstitutionTypeParagraphLink} from "../InstitutionTypeParagraphLink";
import {Gist} from "./Gist";
import {PlacesStat} from "./PlacesStat";

export interface InstitutionPageContentProps {
	institution: InstitutionPageContentFragment;
}

export const InstitutionPageContent: React.FC<InstitutionPageContentProps> = ({institution}) => (
	<Grid templateColumns={{base: "1fr", md: "3fr 2fr"}} gap={{base: 8, md: 10}}>
		<GridItem>
			<Heading as="h1" fontWeight={500} mb={4}>
				{institution?.name}
			</Heading>

			<Text fontSize="lg" fontWeight="bold" mb={4}>
				<Gist institution={institution} />
			</Text>
			<Text fontSize="lg" mb={8}>
				Hilfeform: {institutionTypeNames[institution.type]} (
				<InstitutionTypeParagraphLink type={institution.type} />)
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
								<Link href={`mailto:${institution.email}`} wordBreak="break-word">
									{institution.email}
								</Link>
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
				<Image src={getAbsoluteImageUrl(institution.photo.url)} rounded="md" w="100%" />
			)}
		</GridItem>
	</Grid>
);
