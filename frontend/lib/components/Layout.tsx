import { Box, Container, Flex, Text } from "@chakra-ui/layout";
import Head from "next/head";
import React from "react";

import { LinkButton } from "./next/LinkButton";

export type LayoutProps = {
  title: string;
};

export const Layout: React.FC<LayoutProps> = ({ title, children }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <Box>
      <Box bgColor="teal.600" position="absolute" top={0} left={0} right={0} height="16">
        <Flex
          maxWidth="6xl"
          height="100%"
          marginX="auto"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text color="whiteAlpha.900" fontSize="2xl" fontWeight="bold">
            Freie Plätze
          </Text>
          <Box>
            <LinkButton
              href=""
              variant="outline"
              color="whiteAlpha.900"
              colorScheme="teal"
              _hover={{ bgColor: "whiteAlpha.300" }}
              _active={{ bgColor: "whiteAlpha.500" }}
            >
              Anmelden
            </LinkButton>
          </Box>
        </Flex>
      </Box>

      <Container as="main" minHeight="100vh" pt="32" maxWidth="6xl" textAlign="center">
        {children}
      </Container>
    </Box>
  </>
);
