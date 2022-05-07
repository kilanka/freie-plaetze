import {Box, Drawer, DrawerContent, useDisclosure} from "@chakra-ui/react";
import React, {ReactNode} from "react";

import {useClientOnlyLoginState} from "../../hooks/useClientOnlyLoginState";
import {NavBar} from "./NavBar";
import {Sidebar, sidebarWidth} from "./Sidebar";

export interface LayoutProps {
	children?: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({children}) => {
	const isUserLoggedIn = useClientOnlyLoginState();

	const {isOpen, onOpen, onClose} = useDisclosure();
	return (
		<Box minH="100vh" bg="gray.50">
			{isUserLoggedIn && <Sidebar display={{base: "none", md: "block"}} onClose={() => onClose} />}
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
					<Sidebar onClose={onClose} />
				</DrawerContent>
			</Drawer>

			<NavBar onOpen={onOpen} />
			<Box as="main" minH="100%" ml={{md: isUserLoggedIn ? sidebarWidth : 0}}>
				{children}
			</Box>
		</Box>
	);
};
