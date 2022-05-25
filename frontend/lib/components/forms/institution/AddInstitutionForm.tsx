import {Stack} from "@chakra-ui/react";
import {Form, Formik} from "formik";
import {useRouter} from "next/router";
import React from "react";
import {useSelector} from "react-redux";

import {useAddInstitutionMutation} from "../../../api/generated";
import {useMutationErrorHandler} from "../../../hooks/useMutationErrorHandler";
import {selectUserId} from "../../../store/auth";
import {stringToInt} from "../../../util";
import {convertImageInputFormatToApiFormat} from "../fields/ImageInputControl";
import {FormContainer} from "../FormContainer";
import {
	InstitutionFormContent,
	institutionFormInitialValues,
	institutionFormSchema,
} from "./InstitutionFormContent";

export const AddInstitutionForm: React.FC = () => {
	const userId = useSelector(selectUserId);
	const [addInstitution] = useAddInstitutionMutation({refetchQueries: ["myInstitutions"]});
	const {wrapMutationFunction} = useMutationErrorHandler({process: "Hinzufügen der Einrichtung"});
	const router = useRouter();

	return (
		<FormContainer
			title="Einrichtung hinzufügen"
			description="Mit diesem Formular können Sie eine von Ihnen verwaltete Einrichtung zur Anzeige auf freie-plaetze.de hinzufügen."
		>
			<Formik
				initialValues={institutionFormInitialValues}
				validationSchema={institutionFormSchema}
				onSubmit={wrapMutationFunction(async (data) => {
					const result = await addInstitution({
						variables: {
							ownerId: userId,
							...data,
							ageFrom: stringToInt(data.ageFrom),
							ageTo: stringToInt(data.ageTo),
							arePlacesAvailable: JSON.parse(data.arePlacesAvailable) as boolean,

							photo: convertImageInputFormatToApiFormat(data.photo),
							logo: convertImageInputFormatToApiFormat(data.logo),
						},
					});
					if (result.data?.createInstitution?.id) {
						await router.push(
							`/members/institution/${result.data.createInstitution.id}?isNew=true`
						);
					}
				})}
			>
				<Stack as={Form} spacing={12}>
					<InstitutionFormContent />
				</Stack>
			</Formik>
		</FormContainer>
	);
};
