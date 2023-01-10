import {Button} from "@chakra-ui/react";
import {useRouter} from "next/router";
import React from "react";

import {useDeleteProviderMutation, useProviderByIdQuery} from "../../../api/generated";
import {useMutationErrorHandler} from "../../../hooks/useMutationErrorHandler";
import {showConfirmationModal} from "../../modals/ConfirmationModal";
import {FormContainer} from "../FormContainer";

export interface DeleteProviderFormProps {
	providerId: string;
}

export const DeleteProviderForm: React.FC<DeleteProviderFormProps> = ({providerId}) => {
	const [deleteProvider] = useDeleteProviderMutation({
		refetchQueries: ["myProviders", "myInstitutions"],
	});
	const {wrapMutationFunction} = useMutationErrorHandler({
		process: "Löschen des Trägers",
		successMessage: "Träger gelöscht",
	});

	const router = useRouter();
	const {data} = useProviderByIdQuery({variables: {id: providerId}});

	const provider = data?.provider;
	if (!provider) {
		return null;
	}

	return (
		<FormContainer
			title="Träger löschen"
			description={`Bei Bedarf können Sie den Träger "${provider.name}" hier löschen. Die Einrichtungen des Trägers bleiben dabei bestehen.`}
		>
			<Button
				colorScheme="red"
				onClick={async () => {
					if (
						await showConfirmationModal({
							title: `${provider.name} löschen?`,
							message: `Sind Sie sicher, dass Sie den Träger "${provider.name}" unwiderruflich löschen wollen? `,
							confirmLabel: "Ja, Träger löschen",
							cancelLabel: "Nein, abbrechen",
						})
					) {
						await wrapMutationFunction(async () => {
							await deleteProvider({variables: {providerId}});
							await router.push("/members");
						})();
					}
				}}
			>
				{provider.name} löschen
			</Button>
		</FormContainer>
	);
};
