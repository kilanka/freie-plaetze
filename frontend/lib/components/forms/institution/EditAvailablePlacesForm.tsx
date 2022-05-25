import {Stack} from "@chakra-ui/react";
import {Form, Formik} from "formik";
import {SwitchControl} from "formik-chakra-ui";
import React from "react";

import {useInstitutionByIdQuery, useUpdateArePlacesAvailableMutation} from "../../../api/generated";
import {useMutationErrorHandler} from "../../../hooks/useMutationErrorHandler";
import {PlacesStat} from "../../content/institution/PlacesStat";
import {FormContainer} from "../FormContainer";

export interface EditAvailablePlacesFormProps {
	institutionId: string;
}

export const EditAvailablePlacesForm: React.FC<EditAvailablePlacesFormProps> = ({
	institutionId,
}) => {
	const [updateArePlacesAvailable] = useUpdateArePlacesAvailableMutation();
	const {wrapMutationFunction} = useMutationErrorHandler({
		process: "Aktualisieren der Angaben",
	});

	const {data} = useInstitutionByIdQuery({variables: {id: institutionId}});

	const institution = data?.institution;
	if (!institution) {
		return null;
	}

	const initialFormValues = {
		arePlacesAvailable: institution.arePlacesAvailable,
	};

	return (
		<FormContainer title="Freie Plätze anpassen">
			<Formik
				enableReinitialize
				initialValues={initialFormValues}
				onSubmit={wrapMutationFunction(async (data) => {
					await updateArePlacesAvailable({variables: {institutionId, ...data}});
				})}
			>
				{({submitForm}) => (
					<Stack as={Form} spacing={4}>
						<PlacesStat institution={institution} />
						<SwitchControl
							name="arePlacesAvailable"
							label="Gibt es aktuell freie Plätze?"
							onChange={submitForm}
						/>
					</Stack>
				)}
			</Formik>
		</FormContainer>
	);
};
