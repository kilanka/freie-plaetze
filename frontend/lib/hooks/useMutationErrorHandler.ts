import {ApolloError} from "@apollo/client";
import {useToast} from "@chakra-ui/react";

export class DetailError extends Error {
	constructor(message?: string) {
		super(message ?? "Bitte warten Sie einen Moment und versuchen Sie es dann erneut.");
	}
}

export interface MutationErrorHandlerArguments {
	/**
	 * Infinitive description of what the mutation did
	 */
	process: string;
	successMessage?: string;
}

export function useMutationErrorHandler({process, successMessage}: MutationErrorHandlerArguments) {
	const showToast = useToast();

	const handleMutationError = (error: unknown) => {
		let errorTitle = `Fehler beim ${process}`;
		let errorMessage = "";
		if (error instanceof ApolloError) {
			if (error.graphQLErrors.length > 0) {
				errorMessage = error.graphQLErrors[0].message;

				// Extract custom error message string, if any
				const customErrorMessageMatches = /CustomErrorMessage\[(.*?)]/.exec(errorMessage);
				if (customErrorMessageMatches?.length) {
					errorMessage = customErrorMessageMatches[1];
				}
			} else if (error.networkError) {
				console.error(error.message);
				errorMessage = "Bitte überprüfen Sie Ihre Internetverbindung und versuchen es erneut.";
			}
		}

		if (error instanceof DetailError) {
			errorMessage = error.message;
		} else if (errorMessage.includes("Position not found")) {
			errorTitle = "Adresse nicht gefunden";
			errorMessage =
				"Bitte überprüfen Sie die Adressdaten der Einrichtung und versuchen Sie es erneut.";
		}

		showToast({
			status: "error",
			title: errorTitle,
			description: errorMessage,
			isClosable: true,
			position: "top",
		});
	};

	const wrapMutationFunction =
		<T extends any[]>(mutationFunction: (...args: T) => Promise<void>) =>
		async (...args: T) => {
			try {
				await mutationFunction(...args);
				if (successMessage) {
					showToast({
						status: "success",
						title: successMessage,
						isClosable: true,
						position: "top",
						duration: 3000,
					});
				}
			} catch (error: unknown) {
				handleMutationError(error);
			}
		};

	return {handleMutationError, wrapMutationFunction};
}
