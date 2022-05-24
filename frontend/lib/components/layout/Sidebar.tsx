import {Box, BoxProps, CloseButton, Flex} from "@chakra-ui/react";
import React from "react";

import {Logo} from "./Logo";
import {navBarHeight, sidebarWidth} from "./NavBar";
import {SidebarContent} from "./SidebarContent";

export interface SidebarProps extends BoxProps {
	onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({onClose, ...boxProps}) => {
	return (
		<Box
			transition="3s ease"
			bg="white"
			borderRight="1px"
			borderRightColor="gray.200"
			w={{base: "full", md: sidebarWidth}}
			h="full"
			pos="fixed"
			{...boxProps}
		>
			<Flex h={navBarHeight} alignItems="center" mx="8" justifyContent="space-between">
				<Logo />
				<CloseButton display={{base: "flex", md: "none"}} onClick={onClose} />
			</Flex>

			<SidebarContent onClose={onClose} />
		</Box>
	);
};
