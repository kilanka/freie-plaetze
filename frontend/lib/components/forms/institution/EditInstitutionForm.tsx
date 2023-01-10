import {Formik} from "formik";
import React from "react";
import {useSelector} from "react-redux";

import {useInstitutionByIdQuery, useUpdateInstitutionMutation} from "../../../api/generated";
import {useMutationErrorHandler} from "../../../hooks/useMutationErrorHandler";
import {selectUserId} from "../../../store/auth";
import {stringToInt} from "../../../util";
import {
	convertApiFormatToImageInputFormat,
	convertImageInputFormatToApiFormat,
} from "../fields/ImageInputControl";
import {FormContainer} from "../FormContainer";
import {processProviderFormValues} from "../provider/ProviderFormFields";
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
	const [updateInstitution] = useUpdateInstitutionMutation({refetchQueries: ["myProviders"]});
	const {wrapMutationFunction} = useMutationErrorHandler({
		process: "Aktualisieren der Einrichtung",
		successMessage: "Angaben erfolgreich aktualisiert",
	});
	const userId = useSelector(selectUserId);

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
						providerId: institution.provider?.id ?? "",
						provider: institutionFormInitialValues.provider,
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
				initialValues={initialFormValues}
				validationSchema={institutionFormSchema}
				onSubmit={wrapMutationFunction(async ({providerId, provider, ...data}) => {
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
							provider:
								providerId === ""
									? {disconnect: true}
									: providerId === "create"
									? {
											create: {
												owner: {connect: {id: userId}},
												...processProviderFormValues(provider),
											},
									  }
									: {connect: {id: providerId}},
						},
					});
				})}
			>
				<InstitutionFormContent />
			</Formik>
		</FormContainer>
	);
};
