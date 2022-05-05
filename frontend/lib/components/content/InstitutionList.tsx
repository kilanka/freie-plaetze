import {Text} from "@chakra-ui/react";
import {Spinner} from "@chakra-ui/spinner";
import {produce} from "immer";
import React from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import {useDebounce} from "use-debounce";

import {useSearchInstitutionsQuery} from "../../api/generated";
import {InstitutionListItem} from "./institution/InstitutionListItem";
import {InstitutionStack} from "./InstitutionStack";

export type InstitutionListProps = {cityOrZip: string; radius: number};

export const InstitutionList: React.FC<InstitutionListProps> = (props) => {
	const batchSize = 7;
	const debounceDelay = 700; // Ms

	const [cityOrZip] = useDebounce(props.cityOrZip, debounceDelay);
	const [radius] = useDebounce(props.radius, debounceDelay);

	const filterByLocation = cityOrZip !== "" && !Number.isNaN(radius) && radius !== 0;

	const {loading, error, data, fetchMore} = useSearchInstitutionsQuery({
		variables: {cityOrZip, radius, take: batchSize},
	});

	const institutions = data?.nearbyInstitutions;
	const isResultEmpty =
		Boolean(error) || typeof institutions === "undefined" || institutions?.length === 0;

	const [hasNextPage, setHasNextPage] = React.useState(false);

	React.useEffect(() => {
		setHasNextPage(true);
	}, [setHasNextPage, cityOrZip, radius]);

	const [sentryRef] = useInfiniteScroll({
		loading,
		hasNextPage,
		disabled: isResultEmpty,
		rootMargin: "0px 0px 400px 0px", // Start loading when the sentry is 400px away from the viewport
		onLoadMore: () => {
			if (fetchMore) {
				void fetchMore({
					variables: {
						skip: institutions?.length ?? 0,
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
								}
							}
						}),
				});
			}
		},
	});

	return (
		<InstitutionStack>
			{(() => {
				if (filterByLocation && isResultEmpty) {
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
						{institutions?.map((institution) => (
							<InstitutionListItem
								key={institution.id}
								institution={institution}
								href={`/institution/${institution.slug}`}
							/>
						))}
						{(loading || hasNextPage) && <Spinner ref={sentryRef} justifySelf="center" />}
					</>
				);
			})()}
		</InstitutionStack>
	);
};
