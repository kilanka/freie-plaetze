import { Box, Flex, HStack, Heading, Text } from "@chakra-ui/layout";
import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/stat";
import React from "react";

import { Institution } from "../../api/generated";

export type InstitutionListItemProps = {
  institution: Pick<
    Institution,
    | "id"
    | "name"
    | "city"
    | "gender"
    | "ageFrom"
    | "ageTo"
    | "placesAvailable"
    | "placesTotal"
    | "lastUpdated"
  >;
};

export const InstitutionListItem: React.FC<InstitutionListItemProps> = ({ institution }) => {
  return (
    <Flex
      width="100%"
      bgColor="orange.100"
      borderRadius="lg"
      shadow="sm"
      textAlign="left"
      justifyContent="space-between"
      overflow="hidden"
    >
      <Box padding={8}>
        <Heading as="h3" size="lg" fontWeight="medium" mb={4}>
          {institution.name}
        </Heading>
        <Text fontSize="lg" fontWeight="bold">
          <HStack divider={<Box>&bull;</Box>} spacing={2}>
            <span>{institution.city}</span>
            <span>
              {
                { mixed: "geschlechtsgemischt", f: "nur Mädchen", m: "nur Jungen" }[
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
        <Box minWidth="64" bgColor="orange.200"></Box>
      </Flex>
    </Flex>
  );
};
