import {Stack} from "@chakra-ui/react";
import {Form, useFormikContext} from "formik";
import {
	InputControl,
	NumberInputControl,
	SelectControl,
	SubmitButton,
	TextareaControl,
} from "formik-chakra-ui";
import React from "react";
import {useSelector} from "react-redux";
import * as yup from "yup";

import {InstitutionGenderType, useMyProvidersQuery} from "../../../api/generated";
import {selectUserId} from "../../../store/auth";
import {makeRequiredMessage} from "../../../util";
import {urlFieldSchema} from "../../../util/validation";
import {ImageInputControl, ImageInputFormData} from "../fields/ImageInputControl";
import {InstitutionTypesSelectControl} from "../fields/InstitutionTypesSelectControl";
import {FormColumns} from "../FormColumns";
import {
	ProviderFormFields,
	providerFormInitialValues,
	providerFormSchema,
} from "../provider/ProviderFormFields";

export const institutionFormSchema = yup.object({
	name: yup.string().required(makeRequiredMessage("den Namen der Einrichtung")),
	types: yup.array().min(1, "Bitte wählen Sie mindestens eine Hilfeform."),

	ageFrom: yup.number().min(1, ""),
	ageTo: yup.number().min(1, ""),

	street: yup.string().required(" "),
	streetNumber: yup.string().required(" "),
	zip: yup.string().required(" "),
	city: yup.string().required(" "),

	homepage: urlFieldSchema,
	email: yup.string().email("Ungültige E-Mail-Adresse"),
	phone: yup.string(),
	mobilePhone: yup.string(),

	providerId: yup.string(),
	provider: yup.object().when("providerId", {
		is: "create",
		// eslint-disable-next-line unicorn/no-thenable
		then: providerFormSchema,
	}),
});

export const institutionFormInitialValues = {
	name: "",
	types: ["34"],
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

	/**
	 * Can be either an empty string for "no provider", "create" to create a new provider, or the ID
	 * of an existing provider
	 */
	providerId: "",
	provider: providerFormInitialValues,

	photo: {},
	logo: {},
};

export type InstitutionFormData = typeof institutionFormInitialValues & {
	photo?: ImageInputFormData;
	logo?: ImageInputFormData;
};

export const InstitutionFormContent: React.FC = () => {
	const {values, dirty: isDirty, isValid} = useFormikContext<InstitutionFormData>();
	const userId = useSelector(selectUserId);
	const {data: providersData} = useMyProvidersQuery({variables: {userId}});
	const providers = providersData?.providers ?? [];

	return (
		<Stack as={Form} id="institution" spacing={12}>
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
				<SelectControl name="providerId" label="Träger">
					<option value="">Keine Angabe</option>
					{providers.map(({id, name}) => (
						<option key={id} value={id}>
							{name}
						</option>
					))}
					<option value="create">Träger hinzufügen</option>
				</SelectControl>
				{values.providerId === "create" && <ProviderFormFields fieldNamesPrefix="provider." />}
			</Stack>

			<Stack spacing={4}>
				<InstitutionTypesSelectControl isRequired name="types" label="Hilfeform(en)" />
				<SelectControl isRequired name="gender" label="Geschlecht">
					<option value={InstitutionGenderType.Mixed}>heterogen</option>
					<option value={InstitutionGenderType.F}>nur Mädchen</option>
					<option value={InstitutionGenderType.M}>nur Jungen</option>
				</SelectControl>
				<FormColumns noResponsive>
					<NumberInputControl name="ageFrom" label="Mindestalter" numberInputProps={{min: 1}} />
					<NumberInputControl name="ageTo" label="Höchstalter" numberInputProps={{min: 1}} />
				</FormColumns>
				<SelectControl name="arePlacesAvailable" label="Gibt es aktuell freie Plätze?">
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
		</Stack>
	);
};
