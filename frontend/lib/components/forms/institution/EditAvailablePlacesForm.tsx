import {ApolloError} from "@apollo/client";
import {Stack, useToast} from "@chakra-ui/react";
import {Form, Formik} from "formik";
import {SliderControl, SubmitButton} from "formik-chakra-ui";
import React from "react";

import {
	useInstitutionByIdQuery,
	useUpdateAvailablePlacesMutation,
	useUpdateInstitutionMutation,
} from "../../../api/generated";
import {useMutationErrorHandler} from "../../../hooks/useMutationErrorHandler";
import {stringToInt} from "../../../util";
import {PlacesStat} from "../../content/institution/PlacesStat";
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

export interface EditAvailablePlacesFormProps {
	institutionId: string;
}

export const EditAvailablePlacesForm: React.FC<EditAvailablePlacesFormProps> = ({
	institutionId,
}) => {
	const [updateAvailablePlaces] = useUpdateAvailablePlacesMutation();
	const {wrapMutationFunction} = useMutationErrorHandler({
		process: "Aktualisieren der Einrichtung",
		successMessage: "Freie Plätze erfolgreich aktualisiert",
	});

	const {data} = useInstitutionByIdQuery({variables: {id: institutionId}});

	const institution = data?.institution;
	if (!institution) {
		return null;
	}

	const initialFormValues = {
		placesAvailable: institution.placesAvailable,
	};

	return (
		<FormContainer title="Freie Plätze anpassen">
			<Formik
				enableReinitialize
				initialValues={initialFormValues}
				onSubmit={wrapMutationFunction(async (data) => {
					await updateAvailablePlaces({variables: {institutionId, ...data}});
				})}
			>
				{({dirty: isDirty, values}) => (
					<Stack as={Form} spacing={12}>
						<PlacesStat
							institution={institution}
							overrideAvailablePlaces={values.placesAvailable}
						/>
						<SliderControl
							name="placesAvailable"
							sliderProps={{max: institution.placesTotal}}
							helperText="Bewegen Sie den Slider, um die Anzahl freie Plätze in der Einrichtung einzustellen."
						/>
						<SubmitButton colorScheme="blue" isDisabled={!isDirty}>
							Aktualisieren
						</SubmitButton>
					</Stack>
				)}
			</Formik>
		</FormContainer>
	);
};
