import {Stack} from "@chakra-ui/react";
import {useField} from "formik";
import {InputControl} from "formik-chakra-ui";
import React from "react";
import * as yup from "yup";

import {makeRequiredMessage} from "../../../util";
import {urlFieldSchema} from "../../../util/validation";
import {FormColumns} from "../FormColumns";

export const providerFormSchema = yup.object({
	name: yup.string().required(makeRequiredMessage("den Namen des Trägers")),
	homepage: urlFieldSchema,
	...Object.fromEntries(
		["street", "streetNumber", "zip", "city"].map((fieldName) => [
			fieldName,
			yup
				.string()
				.when("homepage", ([homepage], schema) => (homepage ? schema : schema.required(" "))),
		])
	),
});

export const providerFormInitialValues = {
	name: "",
	homepage: "",
	street: "",
	streetNumber: "",
	zip: "",
	city: "",
};

/**
 * Given the form values, returns a backend-compatible representation of the values.
 */
export function processProviderFormValues(values: ProviderFormData) {
	const hasHomepage = Boolean(values.homepage);

	return {
		name: values.name,
		homepage: values.homepage,

		street: hasHomepage ? "" : values.street,
		streetNumber: hasHomepage ? "" : values.streetNumber,
		city: hasHomepage ? "" : values.city,
		zip: hasHomepage ? "" : values.zip,
	};
}

export type ProviderFormData = typeof providerFormInitialValues;

export type ProviderFormFieldsProps = {
	fieldNamesPrefix?: string;
};

export const ProviderFormFields: React.FC<ProviderFormFieldsProps> = ({fieldNamesPrefix = ""}) => {
	const [homepageField] = useField(`${fieldNamesPrefix}homepage`);
	const isHomepageProvided = Boolean(homepageField.value);

	return (
		<Stack spacing={{base: 4, md: 6}}>
			<InputControl isRequired name={`${fieldNamesPrefix}name`} label="Name des Trägers" />
			<InputControl
				name={`${fieldNamesPrefix}homepage`}
				label="Homepage des Trägers (falls vorhanden)"
			/>

			{!isHomepageProvided && (
				<FormColumns>
					<InputControl
						isRequired={!isHomepageProvided}
						name={`${fieldNamesPrefix}street`}
						label="Straße"
					/>
					<InputControl
						isRequired={!isHomepageProvided}
						name={`${fieldNamesPrefix}streetNumber`}
						label="Hausnummer"
					/>

					<InputControl
						isRequired={!isHomepageProvided}
						name={`${fieldNamesPrefix}zip`}
						label="Postleitzahl"
					/>
					<InputControl
						isRequired={!isHomepageProvided}
						name={`${fieldNamesPrefix}city`}
						label="Stadt"
					/>
				</FormColumns>
			)}
		</Stack>
	);
};
