import {Stack} from "@chakra-ui/react";
import {Form, Formik} from "formik";
import React from "react";
import {useDispatch, useSelector} from "react-redux";

import {useUpdateUserMutation} from "../../../api/generated";
import {useMutationErrorHandler} from "../../../hooks/useMutationErrorHandler";
import {selectUser, updateUserData} from "../../../store/auth";
import {FormContainer} from "../FormContainer";
import {UserFormContent, UserFormData, userFormSchema} from "./UserFormContent";

export const EditUserForm: React.FC = () => {
	const {id: userId, name, email} = useSelector(selectUser);
	const [updateUser] = useUpdateUserMutation();
	const {wrapMutationFunction} = useMutationErrorHandler({
		process: "Aktualisieren der Benutzerdaten",
		successMessage: "Benutzerdaten erfolgreich aktualisiert",
	});
	const dispatch = useDispatch();

	const initialFormValues: UserFormData = {name, email};

	return (
		<FormContainer
			title="Benutzerdaten bearbeiten"
			description="Ihre Benutzerdaten sind nicht öffentlich einsehbar."
		>
			<Formik
				enableReinitialize
				isInitialValid
				initialValues={initialFormValues}
				validationSchema={userFormSchema}
				onSubmit={wrapMutationFunction(async (data) => {
					await updateUser({variables: {userId, ...data}});
					dispatch(updateUserData(data));
				})}
			>
				<Stack as={Form} spacing={12}>
					<UserFormContent />
				</Stack>
			</Formik>
		</FormContainer>
	);
};
