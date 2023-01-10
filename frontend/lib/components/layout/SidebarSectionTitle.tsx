import {Flex, FlexProps} from "@chakra-ui/react";
import React from "react";

export interface SidebarSectionTitleProps extends FlexProps {}

export const SidebarSectionTitle: React.FC<SidebarSectionTitleProps> = ({
	children,
	...flexProps
}) => (
	<Flex align="center" px={8} pt={2} role="heading" fontWeight="bold" fontSize="sm" {...flexProps}>
		{children}
	</Flex>
);
