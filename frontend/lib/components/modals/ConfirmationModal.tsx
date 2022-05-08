import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
} from "@chakra-ui/react";
import {create, show, useModal} from "@ebay/nice-modal-react";
import React from "react";

export interface ConfirmationModalProps {
	title: string;
	message: string;
	confirmLabel: string;
	cancelLabel: string;
}

export const ConfirmationModal = create<ConfirmationModalProps>(
	({title, message, confirmLabel, cancelLabel}) => {
		const modal = useModal();
		const cancelRef = React.useRef<HTMLButtonElement>(null);

		return (
			<AlertDialog isOpen={modal.visible} leastDestructiveRef={cancelRef} onClose={modal.hide}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							{title}
						</AlertDialogHeader>

						<AlertDialogBody>{message}</AlertDialogBody>

						<AlertDialogFooter>
							<Button
								ref={cancelRef}
								mr={3}
								onClick={async () => {
									modal.resolve(false);
									await modal.hide();
								}}
							>
								{cancelLabel}
							</Button>
							<Button
								colorScheme="red"
								onClick={async () => {
									modal.resolve(true);
									await modal.hide();
								}}
							>
								{confirmLabel}
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		);
	}
);

export const showConfirmationModal = async (props: ConfirmationModalProps) =>
	show<boolean>(ConfirmationModal, props);
