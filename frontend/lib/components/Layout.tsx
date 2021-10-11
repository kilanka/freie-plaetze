import { Box, Container, Flex, Text } from "@chakra-ui/layout";
import Head from "next/head";
import React from "react";

export type LayoutProps = {
  title: string;
};

export const Layout: React.FC<LayoutProps> = ({ title }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <Box>
      <Box bgColor="teal.700" position="absolute" top={0} left={0} right={0} height="16">
        <Flex
          maxWidth="6xl"
          height="100%"
          marginX="auto"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text color="white" fontSize="2xl" fontWeight="bold">
            Freie Plätze
          </Text>
        </Flex>
      </Box>
      <Container minHeight="100vh" pt="16" maxWidth="6xl"></Container>
    </Box>
  </>
);
