import {Box, BoxProps, CloseButton, Flex} from "@chakra-ui/react";
import React from "react";
import {IconType} from "react-icons";
import {FiCompass, FiHome, FiSettings, FiStar} from "react-icons/fi";

import {Logo} from "./Logo";
import {SidebarItem} from "./SidebarItem";

const SidebarItems: Array<{
	name: string;
	icon: IconType;
}> = [{name: "Start", icon: FiHome}];

export interface SidebarContentProps extends BoxProps {
	onClose: () => void;
}

export const SidebarContent: React.FC<SidebarContentProps> = ({onClose, ...boxProps}) => {
	return (
		<Box
			transition="3s ease"
			bg="white"
			borderRight="1px"
			borderRightColor="gray.200"
			w={{base: "full", md: 60}}
			h="full"
			pos="fixed"
			{...boxProps}
		>
			<Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
				<Logo />
				<CloseButton display={{base: "flex", md: "none"}} onClick={onClose} />
			</Flex>

			{SidebarItems.map((link) => (
				<SidebarItem key={link.name} link="" icon={link.icon}>
					{link.name}
				</SidebarItem>
			))}
		</Box>
	);
};
