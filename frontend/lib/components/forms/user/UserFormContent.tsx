import {Box, Button, SimpleGrid, Stack} from "@chakra-ui/react";
import {useFormikContext} from "formik";
import {InputControl, SubmitButton} from "formik-chakra-ui";
import React from "react";
import * as yup from "yup";

import {makeRequiredMessage} from "../../../util";
import {FormColumns} from "../FormColumns";

export const userFormSchema = yup.object({
	name: yup.string().required(makeRequiredMessage("Ihren Namen")),
	email: yup
		.string()
		.required(makeRequiredMessage("Ihre E-Mail-Adresse"))
		.email("Ungültige E-Mail-Adresse"),
	password: yup.string(),
	confirmPassword: yup
		.string()
		.test("passwords-match", "Die Passwörter stimmen nicht überein.", function (value) {
			return this.parent.password === value;
		}),
});

export const userFormInitialValues = {
	name: "",
	email: "",
	password: "",
	confirmPassword: "",
};

export type UserFormData = typeof userFormInitialValues;

export interface UserFormContentProps {
	arePasswordFieldsVisible: boolean;
	showPasswordFields: () => void;
}

export const UserFormContent: React.FC<UserFormContentProps> = ({
	arePasswordFieldsVisible,
	showPasswordFields,
}) => {
	const {dirty: isDirty, isValid} = useFormikContext();

	return (
		<>
			<Stack spacing={4}>
				<InputControl isRequired name="name" label="Name" />
				<InputControl isRequired name="email" label="E-Mail-Adresse" />
				<Box>
					{!arePasswordFieldsVisible && (
						<Button variant="outline" mt={4} onClick={showPasswordFields}>
							Passwort ändern
						</Button>
					)}
					{arePasswordFieldsVisible && (
						<FormColumns>
							<InputControl
								name="password"
								label="Neues Passwort"
								inputProps={{type: "password"}}
							/>
							<InputControl
								name="confirmPassword"
								label="Neues Passwort wiederholen"
								inputProps={{type: "password"}}
							/>
						</FormColumns>
					)}
				</Box>
			</Stack>

			<SubmitButton colorScheme="blue" isDisabled={!isDirty || !isValid}>
				Speichern
			</SubmitButton>
		</>
	);
};
