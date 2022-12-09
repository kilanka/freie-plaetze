import {Stack} from "@chakra-ui/react";
import {Form, Formik} from "formik";
import React from "react";

import {useInstitutionByIdQuery, useUpdateInstitutionMutation} from "../../../api/generated";
import {useMutationErrorHandler} from "../../../hooks/useMutationErrorHandler";
import {stringToInt} from "../../../util";
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
	const {wrapMutationFunction} = useMutationErrorHandler({
		process: "Aktualisieren der Einrichtung",
		successMessage: "Angaben erfolgreich aktualisiert",
	});

	const {data} = useInstitutionByIdQuery({variables: {id: institutionId}});

	const institution = data?.institution;

	const initialFormValues: InstitutionFormData = React.useMemo(
		() =>
			institution
				? {
						...institution,
						types: institution.types?.map((type) => type.paragraph) ?? [],
						ageFrom: institution.ageFrom?.toString() ?? "",
						ageTo: institution.ageTo?.toString() ?? "",
						arePlacesAvailable: JSON.stringify(institution.arePlacesAvailable),
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
				onSubmit={wrapMutationFunction(async (data) => {
					await updateInstitution({
						variables: {
							institutionId,
							...data,
							types: {set: data.types.map((paragraph) => ({paragraph}))},
							ageFrom: stringToInt(data.ageFrom),
							ageTo: stringToInt(data.ageTo),
							arePlacesAvailable: JSON.parse(data.arePlacesAvailable) as boolean,
							photo: convertImageInputFormatToApiFormat(data.photo),
							logo: convertImageInputFormatToApiFormat(data.logo),
						},
					});
				})}
			>
				<Stack as={Form} spacing={12}>
					<InstitutionFormContent />
				</Stack>
			</Formik>
		</FormContainer>
	);
};
