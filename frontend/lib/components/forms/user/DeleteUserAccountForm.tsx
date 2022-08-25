import {Button} from "@chakra-ui/react";
import {useRouter} from "next/router";
import React from "react";
import {useSelector} from "react-redux";

import {useDeleteUserAccountMutation} from "../../../api/generated";
import {useMutationErrorHandler} from "../../../hooks/useMutationErrorHandler";
import {useAppDispatch} from "../../../store";
import {logout, selectUserId} from "../../../store/auth";
import {showConfirmationModal} from "../../modals/ConfirmationModal";
import {FormContainer} from "../FormContainer";

export const DeleteUserAccountForm: React.FC = () => {
	const userId = useSelector(selectUserId);
	const [deleteUserAccount] = useDeleteUserAccountMutation();
	const {wrapMutationFunction} = useMutationErrorHandler({
		process: "Löschen Ihres Benutzerkontos",
		successMessage: "Ihr Benutzerkonto wurde gelöscht",
	});
	const dispatch = useAppDispatch();
	const router = useRouter();

	return (
		<FormContainer
			title="Benutzerkonto löschen"
			description="Bei Bedarf können Sie hier Ihr Benutzerkonto löschen. Bitte beachten Sie, dass dabei ebenfalls alle von Ihnen erstellten Einrichtungen gelöscht werden."
		>
			<Button
				colorScheme="red"
				onClick={async () => {
					if (
						await showConfirmationModal({
							title: "Benutzerkonto löschen?",
							message:
								"Sind Sie sicher, dass Sie Ihr Benutzerkonto löschen wollen? " +
								"Alle Ihre Einrichtungen werden damit ebenfalls unwiderruflich gelöscht.",
							confirmLabel: "Ja, Konto löschen",
							cancelLabel: "Nein, abbrechen",
						})
					) {
						await wrapMutationFunction(async () => {
							await deleteUserAccount({variables: {userId}});
							await dispatch(logout());
						})();
					}
				}}
			>
				Benutzerkonto löschen
			</Button>
		</FormContainer>
	);
};
