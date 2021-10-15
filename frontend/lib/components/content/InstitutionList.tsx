import {Box, SimpleGrid, Text} from "@chakra-ui/layout";
import {Spinner} from "@chakra-ui/spinner";
import {produce} from "immer";
import React, {useEffect} from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import {useDebounce} from "use-debounce";

import {useNearbyInstitutionsLazyQuery} from "../../api/generated";
import {InstitutionListItem} from "./InstitutionListItem";

export type InstitutionListProps = {cityOrZip: string; radius: number};

export const InstitutionList: React.FC<InstitutionListProps> = ({
	cityOrZip: cityOrZipProp,
	radius: radiusProp,
}) => {
	const batchSize = 7;
	const debounceDelay = 700; // Ms

	const [cityOrZip] = useDebounce(cityOrZipProp, debounceDelay);
	const [radius] = useDebounce(radiusProp, debounceDelay);

	const isInputInvalid = cityOrZip === "" || [0, Number.NaN].includes(radius);

	const [fetchInstitutions, {loading, error, data, fetchMore}] = useNearbyInstitutionsLazyQuery({
		variables: {skip: 0, take: batchSize, cityOrZip: "", radius: 0}, // Fake cityOrZip and radius to make TS happy
	});

	const institutions = data?.nearbyInstitutions;
	const isResultEmpty =
		Boolean(error) || typeof institutions === "undefined" || institutions.length === 0;

	const [hasNextPage, setHasNextPage] = React.useState(false);
	useEffect(() => {
		setHasNextPage(true);
		if (!isInputInvalid) {
			fetchInstitutions({variables: {cityOrZip, radius}});
		}
	}, [setHasNextPage, isInputInvalid, fetchInstitutions, cityOrZip, radius]);

	const [sentryRef] = useInfiniteScroll({
		loading,
		hasNextPage,
		onLoadMore: () => {
			if (fetchMore) {
				void fetchMore({
					variables: {
						skip: institutions!.length,
						take: batchSize,
					},
					updateQuery: (previous, {fetchMoreResult}) =>
						produce(previous, (previous) => {
							if (previous.nearbyInstitutions) {
								if (fetchMoreResult?.nearbyInstitutions) {
									previous.nearbyInstitutions.push(...fetchMoreResult.nearbyInstitutions);
								}

								if (
									!fetchMoreResult?.nearbyInstitutions ||
									fetchMoreResult?.nearbyInstitutions.length < batchSize
								) {
									setHasNextPage(false);
									console.log("setHasNextPage(false)");
								}
							}
						}),
				});
			}
		},
		disabled: isResultEmpty,
		rootMargin: "0px 0px 400px 0px", // Start loading when the sentry is 400px away from the viewport
	});

	const [isListTouched, setIsListTouched] = React.useState(false);
	if (!isListTouched && !isResultEmpty) {
		setIsListTouched(true);
	}

	return (
		<SimpleGrid
			columns={1}
			autoRows="min-content"
			gap={8}
			minH={isListTouched ? "90vh" : undefined}
			textAlign="center"
		>
			{(() => {
				if (isInputInvalid) {
					return null;
				}

				if (loading) {
					return (
						<Box>
							<Spinner />
						</Box>
					);
				}

				if (isResultEmpty) {
					return (
						<Text fontSize="lg">
							Im Umkreis von {radius} km um {cityOrZip} sind leider keine Einrichtungen eingetragen.
							<br />
							Betreiben Sie eine Einrichtung? -&gt; Anmelden
						</Text>
					);
				}

				return (
					<>
						{institutions.map((institution) => (
							<InstitutionListItem key={institution.id} institution={institution} />
						))}
						{(loading || hasNextPage) && (
							<Box ref={sentryRef}>
								<Spinner />
							</Box>
						)}
					</>
				);
			})()}
		</SimpleGrid>
	);
};
