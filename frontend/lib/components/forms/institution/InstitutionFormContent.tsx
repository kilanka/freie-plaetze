import {SimpleGrid, Stack} from "@chakra-ui/react";
import {
	InputControl,
	NumberInputControl,
	SelectControl,
	SubmitButton,
	TextareaControl,
} from "formik-chakra-ui";
import React from "react";
import * as yup from "yup";

import {InstitutionGenderType} from "../../../api/generated";
import {ImageInputControl} from "../fields/ImageInputControl";

const makeRequiredMessage = (inputName: string) => `Bitte geben Sie ${inputName} ein.`;

export const institutionFormSchema = yup.object({
	name: yup.string().required(makeRequiredMessage("den Namen der Einrichtung")),

	ageFrom: yup.number().required(makeRequiredMessage("das Mindestalter in Ihrer Einrichtung")),
	ageTo: yup.number().required(makeRequiredMessage("das Höchstalter in Ihrer Einrichtung")),
	placesAvailable: yup
		.number()
		.required(makeRequiredMessage("die Anzahl momentan freier Plätze in Ihrer Einrichtung")),
	placesTotal: yup
		.number()
		.required(makeRequiredMessage("die Anzahl insgesamt verfügbarer Plätze in Ihrer Einrichtung")),

	street: yup.string().required(""),
	streetNumber: yup.string().required(""),
	zip: yup.string().required(""),
	city: yup.string().required(""),

	homepage: yup
		.string()
		.url("Bitte geben Sie hier eine URL ein – also z.B. https://www.freie-plaetze.de"),
	email: yup.string().email("Ungültige E-Mail-Adresse"),
	phone: yup.string(),
	mobilePhone: yup.string(),
});

export const institutionFormInitialValues = {
	name: "",
	gender: InstitutionGenderType.Mixed,
	ageFrom: "",
	ageTo: "",
	placesAvailable: "",
	placesTotal: "",
	street: "",
	streetNumber: "",
	zip: "",
	city: "",
	homepage: "",
	email: "",
	phone: "",
	mobilePhone: "",
	descriptionPlain: "",

	photo: null as File | null,
	logo: null as File | null,
};

export type InstitutionFormData = typeof institutionFormInitialValues;

export const InstitutionFormContent: React.FC = () => {
	return (
		<>
			<Stack spacing={4}>
				<InputControl isRequired name="name" label="Name der Einrichtung" />
				<SimpleGrid gap={6} columns={{md: 2}}>
					<InputControl isRequired name="street" label="Straße" />
					<InputControl isRequired name="streetNumber" label="Hausnummer" />

					<InputControl isRequired name="zip" label="Postleitzahl" />
					<InputControl isRequired name="city" label="Stadt" />
				</SimpleGrid>
			</Stack>

			<Stack spacing={4}>
				<SelectControl isRequired name="gender" label="Geschlecht">
					<option value={InstitutionGenderType.Mixed}>heterogen</option>
					<option value={InstitutionGenderType.F}>nur Mädchen</option>
					<option value={InstitutionGenderType.M}>nur Jungen</option>
				</SelectControl>
				<SimpleGrid gap={{base: 4, md: 6}} columns={2}>
					<NumberInputControl
						isRequired
						name="ageFrom"
						label="Mindestalter"
						numberInputProps={{min: 0}}
					/>
					<NumberInputControl
						isRequired
						name="ageTo"
						label="Höchstalter"
						numberInputProps={{min: 1}}
					/>
					<NumberInputControl
						isRequired
						name="placesAvailable"
						label="Freie Plätze"
						numberInputProps={{min: 0}}
					/>
					<NumberInputControl
						isRequired
						name="placesTotal"
						label="Plätze insgesamt"
						numberInputProps={{min: 1}}
					/>
				</SimpleGrid>
			</Stack>

			<Stack spacing={4}>
				<InputControl name="homepage" label="Homepage" />
				<InputControl name="email" label="E-Mail-Adresse" />
				<InputControl name="phone" label="Telefonnummer" />
				<InputControl name="mobilePhone" label="Mobiltelefonnummer" />
			</Stack>

			<TextareaControl
				name="descriptionPlain"
				label="Beschreibung der Einrichtung"
				textareaProps={{minH: "60"}}
			/>

			<SimpleGrid gap={6} columns={{md: 2}}>
				<ImageInputControl name="photo" label="Foto von der Einrichtung" />
				<ImageInputControl name="logo" label="Logo der Einrichtung oder des Trägers" />
			</SimpleGrid>

			<SubmitButton colorScheme="blue">Speichern</SubmitButton>
		</>
	);
};
