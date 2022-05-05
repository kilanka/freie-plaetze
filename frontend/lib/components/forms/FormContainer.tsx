import {Heading, Stack, Text} from "@chakra-ui/react";
import React from "react";

export interface FormContainerProps {
	title: string;
	description?: string;
}

export const FormContainer: React.FC<FormContainerProps> = ({title, description, children}) => {
	return (
		<Stack p={8} gap={8} bg="white" rounded="lg" shadow="lg">
			<Heading as="h1" fontSize="3xl">
				{title}
			</Heading>
			{description && <Text fontSize="lg">{description}</Text>}

			{children}
		</Stack>
	);
};
