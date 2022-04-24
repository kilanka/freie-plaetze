import {Box, Container, Flex, HStack, Heading, Text} from "@chakra-ui/layout";
import {Form, Formik} from "formik";
import {InputControl, NumberInputControl} from "formik-chakra-ui";
import type {NextPage} from "next";
import React from "react";

import {InstitutionList} from "../lib/components/content/InstitutionList";
import {Layout} from "../lib/components/Layout";

const HomePage: NextPage = () => {
	return (
		<Layout>
			<Box as="section" id="focus" p={16} pb={32} textAlign="center">
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

			<Container as="section" maxWidth="container.xl">
				{/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
				<Formik initialValues={{location: "", radius: "40"}} onSubmit={() => {}}>
					{({values}) => (
						<>
							<Flex as={Form} justifyContent="center" mb={16}>
								<HStack maxWidth="2xl">
									<InputControl name="location" label="Stadt / PLZ" />
									<NumberInputControl
										name="radius"
										label="Umkreis"
										numberInputProps={{min: 10, step: 10}}
										maxWidth={24}
									/>
								</HStack>
							</Flex>
							<InstitutionList
								cityOrZip={values.location}
								radius={Number.parseInt(values.radius, 10)}
							/>
						</>
					)}
				</Formik>
			</Container>
		</Layout>
	);
};

export default HomePage;
