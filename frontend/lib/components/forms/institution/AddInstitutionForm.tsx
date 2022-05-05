import {ApolloError} from "@apollo/client";
import {Stack, useToast} from "@chakra-ui/react";
import {Form, Formik} from "formik";
import {useRouter} from "next/router";
import React from "react";
import {useSelector} from "react-redux";

import {useAddInstitutionMutation} from "../../../api/generated";
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
	const toast = useToast();
	const router = useRouter();

	return (
		<FormContainer
			title="Einrichtung hinzufügen"
			description="Mit diesem Formular können Sie eine von Ihnen verwaltete Einrichtung zur Anzeige auf freie-plaetze.de hinzufügen."
		>
			<Formik
				initialValues={institutionFormInitialValues}
				validationSchema={institutionFormSchema}
				onSubmit={async (data) => {
					try {
						const result = await addInstitution({
							variables: {
								ownerId: userId,
								...data,
								ageFrom: stringToInt(data.ageFrom),
								ageTo: stringToInt(data.ageTo),
								placesAvailable: stringToInt(data.placesAvailable),
								placesTotal: stringToInt(data.placesTotal),
								photo: convertImageInputFormatToApiFormat(data.photo),
								logo: convertImageInputFormatToApiFormat(data.logo),
							},
						});
						if (result.data?.createInstitution?.id) {
							await router.push(
								`/members/institution/${result.data.createInstitution.id}?isNew=true`
							);
						}
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
