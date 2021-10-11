import { Box, SimpleGrid } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import React from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";

import { useInstitutionsQuery } from "../../api/generated";
import { InstitutionListItem } from "./InstitutionListItem";

export const InstitutionList: React.FC = ({}) => {
  const batchSize = 5;

  const { loading, data, error, fetchMore } = useInstitutionsQuery({
    variables: { skip: 0, take: batchSize },
  });

  const institutions = data?.institutions;
  const hasNextPage = Boolean(data) && data!.institutions!.length < data!.institutionsCount!;

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: () => {
      fetchMore({
        variables: {
          skip: institutions!.length,
          take: batchSize,
        },
        updateQuery: (prev, { fetchMoreResult }) => ({
          ...prev,
          institutions: [...(prev.institutions ?? []), ...(fetchMoreResult?.institutions ?? [])],
        }),
      });
    },
    disabled: Boolean(error) || !Boolean(institutions),
    // rootMargin: "0px 0px 400px 0px", // start loading when the sentry is 400px away from the viewport
  });

  if (!institutions) {
    return null;
  }

  return (
    <SimpleGrid columns={1} gap={8}>
      {institutions.map((institution) => (
        <InstitutionListItem key={institution.id} institution={institution} />
      ))}
      {(loading || hasNextPage) && (
        <Box ref={sentryRef}>
          <Spinner />
        </Box>
      )}
    </SimpleGrid>
  );
};
