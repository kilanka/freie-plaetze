import {Stack} from "@chakra-ui/react";
import {useFormikContext} from "formik";
import {InputControl, SubmitButton} from "formik-chakra-ui";
import React from "react";
import * as yup from "yup";

import {makeRequiredMessage} from "../../../util";

export const userFormSchema = yup.object({
	name: yup.string().required(makeRequiredMessage("Ihren Namen")),
	email: yup
		.string()
		.required(makeRequiredMessage("Ihre E-Mail-Adresse"))
		.email("Ungültige E-Mail-Adresse"),
});

export const userFormInitialValues = {
	name: "",
	email: "",
};

export type UserFormData = typeof userFormInitialValues;

export const UserFormContent: React.FC = () => {
	const {dirty: isDirty, isValid} = useFormikContext();

	return (
		<>
			<Stack spacing={4}>
				<InputControl isRequired name="name" label="Name" />
				<InputControl isRequired name="email" label="E-Mail-Adresse" />
			</Stack>

			<SubmitButton colorScheme="blue" isDisabled={!isDirty || !isValid}>
				Speichern
			</SubmitButton>
		</>
	);
};
