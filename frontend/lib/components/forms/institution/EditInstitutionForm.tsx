import {ApolloError} from "@apollo/client";
import {Stack, useToast} from "@chakra-ui/react";
import {Form, Formik} from "formik";
import React from "react";

import {useInstitutionByIdQuery, useUpdateInstitutionMutation} from "../../../api/generated";
import {
	convertApiFormatToImageInputFormat,
	convertImageInputFormatToApiFormat,
} from "../fields/ImageInputControl";
import {FormContainer} from "../FormContainer";
import {
	InstitutionFormContent,
	InstitutionFormData,
	institutionFormInitialValues,
	institutionFormSchema,
} from "./InstitutionFormContent";

export interface EditInstitutionFormProps {
	institutionId: string;
}

export const EditInstitutionForm: React.FC<EditInstitutionFormProps> = ({institutionId}) => {
	const [updateInstitution] = useUpdateInstitutionMutation();
	const toast = useToast();

	const {data} = useInstitutionByIdQuery({variables: {id: institutionId}});

	const institution = data?.institution;

	const initialFormValues: InstitutionFormData = React.useMemo(
		() =>
			institution
				? {
						...institution,
						ageFrom: institution.ageFrom.toString(),
						ageTo: institution.ageTo.toString(),
						placesAvailable: institution.placesAvailable.toString(),
						placesTotal: institution.placesTotal.toString(),
						homepage: institution.homepage ?? "",
						email: institution.email ?? "",
						phone: institution.phone ?? "",
						mobilePhone: institution.mobilePhone ?? "",
						descriptionPlain: institution.descriptionPlain ?? "",
						photo: convertApiFormatToImageInputFormat(institution.photo),
						logo: convertApiFormatToImageInputFormat(institution.logo),
				  }
				: institutionFormInitialValues,
		[institution]
	);

	if (!institution) {
		return null;
	}

	return (
		<FormContainer
			title="Angaben bearbeiten"
			description="Mit diesem Formular können Sie Angaben zur Einrichtung ändern."
		>
			<Formik
				enableReinitialize
				isInitialValid
				initialValues={initialFormValues}
				validationSchema={institutionFormSchema}
				onSubmit={async (data) => {
					try {
						const result = await updateInstitution({
							variables: {
								institutionId,
								...data,
								ageFrom: Number.parseInt(data.ageFrom, 10),
								ageTo: Number.parseInt(data.ageTo, 10),
								placesAvailable: Number.parseInt(data.placesAvailable, 10),
								placesTotal: Number.parseInt(data.placesTotal, 10),
								photo: convertImageInputFormatToApiFormat(data.photo),
								logo: convertImageInputFormatToApiFormat(data.logo),
							},
						});
						toast({
							status: "success",
							title: "Angaben erfolgreich gespeichert",
							isClosable: true,
							position: "top",
							duration: 3000,
						});
					} catch (error: unknown) {
						let errorTitle = "Fehler beim Hinzufügen der Einrichtung";
						let errorMessage =
							error instanceof ApolloError
								? error.graphQLErrors[0].message
								: "Bitte überprüfen Sie Ihre Internetverbindung und versuchen es erneut.";

						if (errorMessage.includes("Position not found")) {
							errorTitle = "Adresse nicht gefunden";
							errorMessage =
								"Bitte überprüfen Sie die Adressdaten Ihrer Einrichtung und versuchen Sie es erneut.";
						}

						toast({
							status: "error",
							title: errorTitle,
							description: errorMessage,
							isClosable: true,
							position: "top",
						});
					}
				}}
			>
				<Stack as={Form} spacing={12}>
					<InstitutionFormContent />
				</Stack>
			</Formik>
		</FormContainer>
	);
};
