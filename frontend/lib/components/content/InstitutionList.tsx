import {Alert, AlertDescription, AlertIcon, Box, HStack, Stack} from "@chakra-ui/react";
import {Spinner} from "@chakra-ui/spinner";
import React from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import {useDebounce} from "use-debounce";

import {useSearchInstitutionsQuery} from "../../api/generated";
import {LinkButton} from "../next/LinkButton";
import {InstitutionListItem} from "./institution/InstitutionListItem";
import {InstitutionStack} from "./InstitutionStack";

export type InstitutionListProps = {cityOrZip: string; radius: number};

const batchSize = 7;
const debounceDelay = 700; // Ms

export const InstitutionList: React.FC<InstitutionListProps> = (props) => {
	const [cityOrZip] = useDebounce(props.cityOrZip, debounceDelay);
	const [radius] = useDebounce(props.radius, debounceDelay);

	const {loading, error, data, fetchMore} = useSearchInstitutionsQuery({
		variables: {cityOrZip, radius, limit: batchSize},
	});

	const institutions = data?.nearbyInstitutions;
	const institutionsCount = data?.nearbyInstitutionsCount;

	const isResultEmpty = Boolean(error) || !institutionsCount || !institutions;
	const hasNextPage = !isResultEmpty && institutions.length < institutionsCount;

	const [sentryRef] = useInfiniteScroll({
		loading,
		hasNextPage,
		disabled: isResultEmpty,
		rootMargin: "0px 0px 400px 0px", // Start loading when the sentry is 400px away from the viewport
		onLoadMore: async () => fetchMore({variables: {offset: institutions?.length ?? 0}}),
	});

	return (
		<InstitutionStack>
			{isResultEmpty && cityOrZip !== "" && (
				<Alert
					status="info"
					alignSelf="center"
					flexDirection="column"
					justifyContent="center"
					textAlign="center"
					py={8}
					maxWidth="container.sm"
					rounded="md"
				>
					<AlertIcon boxSize={10} mr={0} mb={4} />
					<AlertDescription maxWidth="md">
						<Stack gap={2}>
							<Box>
								Im Umkreis von {radius} km um <b>{cityOrZip}</b> sind leider keine Einrichtungen
								eingetragen. Betreiben Sie eine Einrichtung?
							</Box>
							<HStack alignSelf="center">
								<LinkButton variant="solid" colorScheme="blue" href="/members/register">
									Registrieren
								</LinkButton>
								<LinkButton variant="solid" colorScheme="blue" href="/members/login">
									Anmelden
								</LinkButton>
							</HStack>
						</Stack>
					</AlertDescription>
				</Alert>
			)}

			{institutions?.map((institution) => (
				<InstitutionListItem
					key={institution.id}
					institution={institution}
					href={`/institution/${institution.slug}`}
				/>
			))}

			{(loading || hasNextPage) && <Spinner ref={sentryRef} alignSelf="center" />}
		</InstitutionStack>
	);
};
