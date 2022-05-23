import {Box, Heading, Stack, Text} from "@chakra-ui/react";
import React from "react";

export type FormBoxProps = {
	title: string;
	subtitle: string;
	children?: React.ReactNode;
};

export const FormBox: React.FC<FormBoxProps> = ({title, subtitle, children}) => {
	return (
		<Stack spacing={8} mx="auto" maxW="lg" py={8} px={4}>
			<Stack align="center" textAlign="center">
				<Heading size="xl">{title}</Heading>
				<Text fontSize="lg" color="gray.600">
					{subtitle}
				</Text>
			</Stack>
			<Box rounded="lg" shadow="lg" bg="white" p={8}>
				{children}
			</Box>
		</Stack>
	);
};
