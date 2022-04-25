import {Box, Drawer, DrawerContent, useDisclosure} from "@chakra-ui/react";
import React, {ReactNode} from "react";

import {NavBar} from "./NavBar";
import {SidebarContent} from "./SidebarContent";

const isLoggedIn = false;

export interface LayoutProps {
	children?: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({children}) => {
	const {isOpen, onOpen, onClose} = useDisclosure();
	return (
		<Box minH="100vh" bg="gray.50">
			{isLoggedIn && (
				<SidebarContent display={{base: "none", md: "block"}} onClose={() => onClose} />
			)}
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement="left"
				returnFocusOnClose={false}
				size="full"
				onClose={onClose}
				onOverlayClick={onClose}
			>
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>

			<NavBar onOpen={onOpen} />
			<Box as="main" minH="100%" width="100%">
				{children}
			</Box>
		</Box>
	);
};
