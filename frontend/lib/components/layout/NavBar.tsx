import {
	Avatar,
	Box,
	Flex,
	FlexProps,
	HStack,
	Icon,
	IconButton,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Text,
} from "@chakra-ui/react";
import React from "react";
import {FiChevronDown, FiMenu} from "react-icons/fi";

import {LinkButton} from "../next/LinkButton";
import {Logo} from "./Logo";

const isLoggedIn = false;

export const navBarWidth = 60;

export interface NavBarProps extends FlexProps {
	onOpen: () => void;
}
export const NavBar: React.FC<NavBarProps> = ({onOpen, ...flexProps}) => {
	return (
		<Flex
			ml={{base: 0, md: isLoggedIn ? navBarWidth : 0}}
			px={{base: 4, md: 4}}
			height={16}
			alignItems="center"
			bg="white"
			borderBottomWidth="1px"
			borderBottomColor="gray.200"
			shadow="sm"
			justifyContent="space-between"
			{...flexProps}
		>
			<IconButton
				order={isLoggedIn ? 0 : 1}
				display={{base: "flex", md: "none"}}
				variant="outline"
				aria-label="open menu"
				icon={<FiMenu />}
				onClick={onOpen}
			/>

			<Box order={isLoggedIn ? 1 : 0}>
				<Logo />
			</Box>

			{(isLoggedIn && (
				<Flex order={2} alignItems="center">
					<Menu>
						<MenuButton py={2} transition="all 0.3s">
							<HStack>
								<Avatar size="sm" name="John Doe" />
								<Text display={{base: "none", md: "flex"}} fontSize="sm">
									John Doe
								</Text>
								<Icon as={FiChevronDown} display={{base: "none", md: "flex"}} />
							</HStack>
						</MenuButton>
						<MenuList>
							<MenuItem>Benutzerdaten</MenuItem>
							<MenuItem>Meine Einrichtungen</MenuItem>
							<MenuDivider />
							<MenuItem>Abmelden</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			)) || (
				<Box>
					<LinkButton href="/members/login" colorScheme="blue" display={{base: "none", md: "flex"}}>
						Anmelden
					</LinkButton>
				</Box>
			)}
		</Flex>
	);
};
