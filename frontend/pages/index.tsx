import {Box, Container, Flex, HStack, Heading, Stack, Text} from "@chakra-ui/react";
import {Form, Formik} from "formik";
import {InputControl, NumberInputControl} from "formik-chakra-ui";
import type {NextPage} from "next";
import React from "react";

import {InstitutionList} from "../lib/components/content/InstitutionList";
import {Title} from "../lib/components/Title";

const HomePage: NextPage = () => {
	return (
		<>
			<Title />
			<Box
				as="section"
				id="focus"
				pt={32}
				pb={32}
				mb={16}
				position="relative"
				clipPath="url(#heroClipPath)"
			>
				<Box
					as="svg"
					preserveAspectRatio="none"
					viewBox="0 0 1440 560"
					position="absolute"
					width="100%"
					height="100%"
					top={0}
					bottom={0}
					bgGradient="linear(to-br, blue.200, green.100)"
					color="whiteAlpha.300"
				>
					<path
						d="M 0 605.348 C 112.453 589.768 159.086 453.153 240.135 373.658 C 302.363 312.623 377.181 267.6 421.106 192.313 C 468.387 111.274 510.419 21.351 500.003 -1.209 l -500.049 0 L 0 605.348"
						fill="currentColor"
					/>
					<path
						d="M 1440 961.8 C 1515.4 969 1583.5 923.2 1648.7 884.8 C 1716.3 845 1801.6 810.6 1824.5 735.6 C 1847.4 660.6 1770.9 591.6 1761.7 513.7 C 1752.1 432.7 1807.2 346.7 1769.9 274.1 C 1731.3 198.8 1649.6 143.9 1565.8 131.7 C 1484.4 119.8 1413.2 178.9 1337.5 210.9 C 1271.2 239.1 1202.8 259.8 1149.3 308 C 1090.6 361 1033 421.8 1017.8 499.3 C 1002.3 578.2 1020.8 664.3 1066.3 730.7 C 1108 793.1 1191.1 807.5 1255.4 847.2 C 1318.3 886.1 1366.4 954.8 1440 961"
						fill="currentColor"
					/>
					<clipPath id="heroClipPath" clipPathUnits="objectBoundingBox">
						<path d="M 0 0.9 Q 0.5 1 1 0.9 L 1 0 L 0 0 L 0 0.9" />
					</clipPath>
				</Box>

				<Container maxWidth="container.xl" as={Stack} gap={24} position="relative" zIndex={1}>
					<Stack gap={4}>
						<Heading fontSize="4xl">Sie brauchen Hilfe zur Erziehung?</Heading>
						<Text fontSize="xl" mb={10}>
							Einrichtungen, die Sie bei der Erziehung unterstützen können, finden Sie auf dieser
							Seite.
						</Text>
					</Stack>

					<Stack gap={4}>
						<Heading fontSize="4xl">Wer hat Anspruch?</Heading>
						<Text fontSize="xl">
							Jeder Sorgeberechtigter der die Erziehung seines Kindes nicht mehr selbstständig
							bewältigen kann. Zudem haben Sie das <b>Wunsch- &amp; Wahlrecht</b> und können somit
							bei der Wahl des Angebotes mitentscheiden!
						</Text>
					</Stack>
				</Container>
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
		</>
	);
};

export default HomePage;
