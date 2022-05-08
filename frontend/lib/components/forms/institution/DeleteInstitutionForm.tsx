import {Button} from "@chakra-ui/react";
import {useRouter} from "next/router";
import React from "react";

import {useDeleteInstitutionMutation, useInstitutionByIdQuery} from "../../../api/generated";
import {useMutationErrorHandler} from "../../../hooks/useMutationErrorHandler";
import {showConfirmationModal} from "../../modals/ConfirmationModal";
import {FormContainer} from "../FormContainer";

export interface DeleteInstitutionFormProps {
	institutionId: string;
}

export const DeleteInstitutionForm: React.FC<DeleteInstitutionFormProps> = ({institutionId}) => {
	const [deleteInstitution] = useDeleteInstitutionMutation({refetchQueries: ["myInstitutions"]});
	const {wrapMutationFunction} = useMutationErrorHandler({
		process: "Löschen der Einrichtung",
		successMessage: "Einrichtung gelöscht",
	});

	const router = useRouter();

	const {data} = useInstitutionByIdQuery({variables: {id: institutionId}});

	const institution = data?.institution;
	if (!institution) {
		return null;
	}

	return (
		<FormContainer
			title="Einrichtung löschen"
			description={`Bei Bedarf können Sie die Einrichtung "${institution.name}" hier löschen. Sie ist danach nicht mehr auf Freie-Plaetze.de gelistet.`}
		>
			<Button
				colorScheme="red"
				onClick={async () => {
					if (
						await showConfirmationModal({
							title: `${institution.name} löschen?`,
							message: `Sind Sie sicher, dass Sie die Einrichtung "${institution.name}" unwiderruflich löschen wollen? `,
							confirmLabel: "Ja, Einrichtung löschen",
							cancelLabel: "Nein, abbrechen",
						})
					) {
						await wrapMutationFunction(async () => {
							await deleteInstitution({variables: {institutionId}});
							await router.push("/members");
						})();
					}
				}}
			>
				{institution.name} löschen
			</Button>
		</FormContainer>
	);
};
