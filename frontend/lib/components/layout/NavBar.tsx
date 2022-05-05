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
import NextLink from "next/link";
import React from "react";
import {FiChevronDown, FiMenu} from "react-icons/fi";
import {useSelector} from "react-redux";

import {useClientOnlyLoginState} from "../../hooks/use-client-only-login-state";
import {useAppDispatch} from "../../store";
import {logout, selectIsUserLoggedIn, selectUser} from "../../store/auth";
import {LinkButton} from "../next/LinkButton";
import {Logo} from "./Logo";
import {sidebarWidth} from "./Sidebar";

export const navBarHeight = 16;

export interface NavBarProps extends FlexProps {
	onOpen: () => void;
}
export const NavBar: React.FC<NavBarProps> = ({onOpen, ...flexProps}) => {
	const dispatch = useAppDispatch();
	const isUserLoggedIn = useClientOnlyLoginState();
	const {name: userName} = useSelector(selectUser);

	return (
		<Flex
			ml={{base: 0, md: isUserLoggedIn ? sidebarWidth : 0}}
			px={{base: 4, md: 4}}
			height={navBarHeight}
			alignItems="center"
			bg="white"
			borderBottomWidth="1px"
			borderBottomColor="gray.200"
			shadow="sm"
			justifyContent="space-between"
			{...flexProps}
		>
			<IconButton
				order={isUserLoggedIn ? 0 : 1}
				display={{base: "flex", md: "none"}}
				variant="outline"
				aria-label="open menu"
				icon={<FiMenu />}
				onClick={onOpen}
			/>

			<Box order={isUserLoggedIn ? 1 : 0}>
				<Logo display={{md: isUserLoggedIn ? "none" : "block"}} />
			</Box>

			{(isUserLoggedIn && (
				<Flex order={2} alignItems="center">
					<Menu>
						<MenuButton py={2} transition="all 0.3s">
							<HStack>
								<Avatar size="sm" name={userName} />
								<Text display={{base: "none", md: "flex"}} fontSize="sm">
									{userName}
								</Text>
								<Icon as={FiChevronDown} display={{base: "none", md: "flex"}} />
							</HStack>
						</MenuButton>
						<MenuList>
							<NextLink href="/members/user">
								<MenuItem>Benutzerdaten</MenuItem>
							</NextLink>
							<NextLink href="/members">
								<MenuItem>Meine Einrichtungen</MenuItem>
							</NextLink>
							<MenuDivider />
							<MenuItem
								onClick={() => {
									dispatch(logout());
								}}
							>
								Abmelden
							</MenuItem>
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
