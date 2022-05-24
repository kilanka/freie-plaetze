import {Box, Drawer, DrawerContent, Flex, useDisclosure} from "@chakra-ui/react";
import React, {ReactNode} from "react";

import {useClientOnlyLoginState} from "../../hooks/useClientOnlyLoginState";
import {Footer} from "./Footer";
import {NavBar} from "./NavBar";
import {Sidebar, sidebarWidth} from "./Sidebar";

export interface LayoutProps {
	children?: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({children}) => {
	const isUserLoggedIn = useClientOnlyLoginState();

	const {isOpen, onOpen, onClose} = useDisclosure();
	return (
		<Flex minH="100vh" direction="column" bg="white.50">
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
			<Flex
				as="main"
				direction="column"
				flexBasis="auto"
				flexGrow={1}
				ml={{md: isUserLoggedIn ? sidebarWidth : 0}}
				pb={16}
			>
				{children}
			</Flex>
			<Footer />
		</Flex>
	);
};
