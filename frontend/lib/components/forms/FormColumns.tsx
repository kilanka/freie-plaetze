import {SimpleGrid, SimpleGridProps} from "@chakra-ui/react";
import React from "react";

export interface FormColumnProps extends SimpleGridProps {
	noResponsive?: boolean;
}

export const FormColumns: React.FC<FormColumnProps> = ({noResponsive, children}) => (
	<SimpleGrid gap={{base: 4, md: 6}} columns={{base: noResponsive ? 2 : 1, md: 2}}>
		{children}
	</SimpleGrid>
);
