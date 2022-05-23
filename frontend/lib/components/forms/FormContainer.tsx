import {Heading, Stack, Text} from "@chakra-ui/react";
import React from "react";

export interface FormContainerProps {
	title: string;
	description?: string;
	children?: React.ReactNode;
}

export const FormContainer: React.FC<FormContainerProps> = ({title, description, children}) => {
	return (
		<Stack p={8} spacing={8} bg="white" rounded="lg" shadow="lg">
			<Heading as="h1" size="lg">
				{title}
			</Heading>
			{description && <Text fontSize="lg">{description}</Text>}

			{children}
		</Stack>
	);
};
