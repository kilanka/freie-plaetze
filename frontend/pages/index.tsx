import { Box, Flex, HStack, Heading, SimpleGrid, Text } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import { InputControl, NumberInputControl } from "formik-chakra-ui";
import type { NextPage } from "next";
import React from "react";

import { InstitutionList } from "../lib/components/content/InstitutionList";
import { Layout } from "../lib/components/Layout";

const HomePage: NextPage = () => {
  return (
    <Layout title="Freie Plätze">
      <Box
        as="section"
        id="focus"
        mb={16}
        bgColor="orange.50"
        borderRadius="lg"
        shadow="sm"
        padding={16}
      >
        <Heading mb={4}>Sie brauchen Hilfe zur Erziehung?</Heading>
        <Text fontSize="xl" mb={10}>
          Einrichtungen, die Sie bei der Erziehung unterstützen können, finden Sie auf dieser Seite.
        </Text>

        <Heading mb={4}>Wer hat Anspruch?</Heading>
        <Text fontSize="xl">
          Jeder Sorgeberechtigter der die Erziehung seines Kindes nicht mehr selbstständig
          bewältigen kann.
        </Text>
        <Text fontSize="xl">
          Zudem haben Sie das <b>Wunsch- &amp; Wahlrecht</b> und können somit bei der Wahl des
          Angebotes mitentscheiden!
        </Text>
      </Box>

      <Box as="section" id="list">
        <Formik initialValues={{ location: "", radius: "40" }} onSubmit={() => {}}>
          {({ values }) => (
            <>
              <Form>
                <Flex justifyContent="center" mb={16}>
                  <HStack maxWidth="2xl">
                    <InputControl name="location" label="Stadt / PLZ"></InputControl>
                    <NumberInputControl
                      name="radius"
                      label="Umkreis"
                      numberInputProps={{ min: 5, step: 5 }}
                      maxWidth={24}
                    />
                  </HStack>
                </Flex>
              </Form>
              <InstitutionList cityOrZip={values.location} radius={parseInt(values.radius)} />
            </>
          )}
        </Formik>
      </Box>
    </Layout>
  );
};

export default HomePage;
