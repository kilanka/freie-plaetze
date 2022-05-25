import {Stack} from "@chakra-ui/react";
import {useFormikContext} from "formik";
import {
	InputControl,
	NumberInputControl,
	SelectControl,
	SubmitButton,
	TextareaControl,
} from "formik-chakra-ui";
import React from "react";
import * as yup from "yup";

import {InstitutionGenderType, InstitutionTypeType} from "../../../api/generated";
import {institutionTypeNames} from "../../../constants";
import {institutionTypeToParagraphNumber, makeRequiredMessage} from "../../../util";
import {ImageInputControl, ImageInputFormData} from "../fields/ImageInputControl";
import {FormColumns} from "../FormColumns";

export const institutionFormSchema = yup.object({
	name: yup.string().required(makeRequiredMessage("den Namen der Einrichtung")),

	ageFrom: yup.number().required(makeRequiredMessage("das Mindestalter in Ihrer Einrichtung")),
	ageTo: yup.number().required(makeRequiredMessage("das Höchstalter in Ihrer Einrichtung")),

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
	type: InstitutionTypeType.P34,
	gender: InstitutionGenderType.Mixed,
	ageFrom: "",
	ageTo: "",
	arePlacesAvailable: "true",
	street: "",
	streetNumber: "",
	zip: "",
	city: "",
	homepage: "",
	email: "",
	phone: "",
	mobilePhone: "",
	descriptionPlain: "",

	photo: {},
	logo: {},
};

export type InstitutionFormData = typeof institutionFormInitialValues & {
	photo?: ImageInputFormData;
	logo?: ImageInputFormData;
};

export const InstitutionFormContent: React.FC = () => {
	const {dirty: isDirty, isValid} = useFormikContext();

	return (
		<>
			<Stack spacing={4}>
				<InputControl isRequired name="name" label="Name der Einrichtung" />
				<FormColumns>
					<InputControl isRequired name="street" label="Straße" />
					<InputControl isRequired name="streetNumber" label="Hausnummer" />

					<InputControl isRequired name="zip" label="Postleitzahl" />
					<InputControl isRequired name="city" label="Stadt" />
				</FormColumns>
			</Stack>

			<Stack spacing={4}>
				<SelectControl isRequired name="type" label="Hilfeform">
					{Object.entries(institutionTypeNames).map(([type, typeName]) => (
						<option key={type} value={type}>
							{typeName} (§ {institutionTypeToParagraphNumber(type as InstitutionTypeType)} SGB
							VIII)
						</option>
					))}
				</SelectControl>
				<SelectControl isRequired name="gender" label="Geschlecht">
					<option value={InstitutionGenderType.Mixed}>heterogen</option>
					<option value={InstitutionGenderType.F}>nur Mädchen</option>
					<option value={InstitutionGenderType.M}>nur Jungen</option>
				</SelectControl>
				<FormColumns noResponsive>
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
				</FormColumns>
				<SelectControl isRequired name="arePlacesAvailable" label="Gibt es aktuell freie Plätze?">
					<option value="true">Ja</option>
					<option value="false">Nein</option>
				</SelectControl>
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

			<FormColumns>
				<ImageInputControl name="photo" label="Foto von der Einrichtung" />
				<ImageInputControl name="logo" label="Logo der Einrichtung oder des Trägers" />
			</FormColumns>

			<SubmitButton colorScheme="blue" isDisabled={!isDirty || !isValid}>
				Speichern
			</SubmitButton>
		</>
	);
};
