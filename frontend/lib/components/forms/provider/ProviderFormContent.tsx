import {Stack} from "@chakra-ui/react";
import {Form, useFormikContext} from "formik";
import {SubmitButton} from "formik-chakra-ui";
import React from "react";

import {ProviderFormData, ProviderFormFields} from "./ProviderFormFields";

export const ProviderFormContent: React.FC = () => {
	const {dirty: isDirty, isValid} = useFormikContext<ProviderFormData>();

	return (
		<Stack as={Form} spacing={12}>
			<ProviderFormFields />

			<SubmitButton colorScheme="blue" isDisabled={!isDirty || !isValid}>
				Speichern
			</SubmitButton>
		</Stack>
	);
};
