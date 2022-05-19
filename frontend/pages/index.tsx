import {Container, Flex, HStack, Heading, List, Stack, Text} from "@chakra-ui/react";
import {Form, Formik} from "formik";
import {InputControl, NumberInputControl} from "formik-chakra-ui";
import {NextPage} from "next";
import React from "react";

import {InstitutionList} from "../lib/components/content/InstitutionList";
import {InstitutionTypeListItem} from "../lib/components/content/InstitutionTypeListItem";
import {HeaderSection} from "../lib/components/HeaderSection";
import {Title} from "../lib/components/Title";

const HomePage: NextPage = () => {
	return (
		<>
			<Title />
			<HeaderSection>
				<Heading fontSize="4xl">
					Angebote der stationären Kinder- und Jugendhilfe in Ihrer Nähe
				</Heading>

				<Stack gap={4}>
					<Text>Hier finden Sie freie Plätze in Einrichtungen für folgende Hilfeformen:</Text>
					<List spacing={4}>
						<InstitutionTypeListItem paragraph="34">
							Heimerziehung, sonstige betreute Wohnform
						</InstitutionTypeListItem>
						<InstitutionTypeListItem paragraph="35">
							Intensive sozialpädagogische Einzelbetreuung
						</InstitutionTypeListItem>
						<InstitutionTypeListItem paragraph="35a">
							Eingliederungshilfe für Kinder und Jugendliche mit seelischer Behinderung oder
							drohender seelischer Behinderung
						</InstitutionTypeListItem>
						<InstitutionTypeListItem paragraph="41">
							Hilfe für junge Volljährige
						</InstitutionTypeListItem>
						<InstitutionTypeListItem paragraph="42">
							Inobhutnahme von Kindern und Jugendlichen
						</InstitutionTypeListItem>
					</List>
				</Stack>
			</HeaderSection>

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
