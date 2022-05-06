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
				clipPath={{base: "url(#heroClipPathMobile)", md: "url(#heroClipPath)"}}
			>
				<Box
					as="svg"
					preserveAspectRatio="none"
					viewBox="0 0 800 310"
					position="absolute"
					top={0}
					width="100%"
					height="100%"
					bgGradient="linear(to-br, blue.200, green.100)"
					color="whiteAlpha.300"
				>
					<path
						d="M 0 336 C 63 328 88 252 133 208 C 168 174 210 149 234 107 C 260 62 284 12 296 0 L 0 0"
						fill="currentColor"
					/>
					<path
						d="M 800 310 L 800 80 C 800 80 785 99 740 115 C 706 133 668 144 639 171 C 606 201 574 234 560 310"
						fill="currentColor"
					/>
					<clipPath id="heroClipPath" clipPathUnits="objectBoundingBox">
						<path d="M 0 0.9 Q 0.5 1 1 0.9 L 1 0 L 0 0 L 0 0.9" />
					</clipPath>
					<clipPath id="heroClipPathMobile" clipPathUnits="objectBoundingBox">
						<path d="M 0 0.96 Q 0.5 1 1 0.96 L 1 0 L 0 0 L 0 0.96" />
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
