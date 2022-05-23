import {Stack, StackProps} from "@chakra-ui/react";
import React from "react";

export interface InstitutionStackProps extends StackProps {}

export const InstitutionStack: React.FC<InstitutionStackProps> = ({children, ...stackPops}) => (
	<Stack gap={{base: 12, md: 8}} {...stackPops}>
		{children}
	</Stack>
);
