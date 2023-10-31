import {Formik} from "formik";
import React from "react";

import {useProviderByIdQuery, useUpdateProviderMutation} from "../../../api/generated";
import {useMutationErrorHandler} from "../../../hooks/useMutationErrorHandler";
import {FormContainer} from "../FormContainer";
import {ProviderFormContent} from "./ProviderFormContent";
import {
	processProviderFormValues,
	ProviderFormData,
	providerFormInitialValues,
	providerFormSchema,
} from "./ProviderFormFields";

export interface EditProviderFormProps {
	providerId: string;
}

export const EditProviderForm: React.FC<EditProviderFormProps> = ({providerId}) => {
	const [updateProvider] = useUpdateProviderMutation({refetchQueries: ["myProviders"]});
	const {wrapMutationFunction} = useMutationErrorHandler({
		process: "Aktualisieren des Trägers",
		successMessage: "Angaben erfolgreich aktualisiert",
	});

	const {data} = useProviderByIdQuery({variables: {id: providerId}});

	const provider = data?.provider;

	const initialFormValues: ProviderFormData = React.useMemo(
		() =>
			provider
				? {
						name: provider.name ?? "",

						hasHomepage: JSON.stringify(Boolean(provider.homepage)),
						homepage: provider.homepage ?? "",

						street: provider.street ?? "",
						streetNumber: provider.streetNumber ?? "",
						zip: provider.zip ?? "",
						city: provider.city ?? "",
				  }
				: providerFormInitialValues,
		[provider]
	);

	if (!provider) {
		return null;
	}

	return (
		<FormContainer title="Träger bearbeiten">
			<Formik
				enableReinitialize
				initialValues={initialFormValues}
				validationSchema={providerFormSchema}
				onSubmit={wrapMutationFunction(async (data) => {
					await updateProvider({
						variables: {
							providerId,
							...processProviderFormValues(data),
						},
					});
				})}
			>
				<ProviderFormContent />
			</Formik>
		</FormContainer>
	);
};
