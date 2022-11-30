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
	Stack,
	Text,
} from "@chakra-ui/react";
import {LinkButton} from "next-chakra-ui";
import NextLink from "next/link";
import {useRouter} from "next/router";
import React from "react";
import {FiChevronDown, FiMenu} from "react-icons/fi";
import {useSelector} from "react-redux";

import {useClientOnlyLoginState} from "../../hooks/useClientOnlyLoginState";
import {useAppDispatch} from "../../store";
import {logout, selectUser} from "../../store/auth";
import {Logo} from "./Logo";

export const sidebarWidth = 80;
export const navBarHeight = 16;

export interface NavBarProps extends FlexProps {
	onOpen: () => void;
}
export const NavBar: React.FC<NavBarProps> = ({onOpen, ...flexProps}) => {
	const dispatch = useAppDispatch();
	const isUserLoggedIn = useClientOnlyLoginState();
	const {name: userName} = useSelector(selectUser);
	const router = useRouter();

	return (
		<Flex
			ml={{base: 0, md: isUserLoggedIn ? sidebarWidth : 0}}
			px={{base: 4, md: 4}}
			height={navBarHeight}
			alignItems="center"
			justifyContent="space-between"
			bg="white"
			borderBottomWidth="1px"
			borderBottomColor="gray.200"
			shadow="sm"
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
								onClick={async () => {
									await dispatch(logout());
								}}
							>
								Abmelden
							</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			)) || (
				<Stack direction="row" gap={2} display={{base: "none", md: "flex"}}>
					<LinkButton href="/about" variant="outline">
						Über Uns
					</LinkButton>
					<LinkButton href="/members/login" colorScheme="blue">
						Anmelden
					</LinkButton>
				</Stack>
			)}
		</Flex>
	);
};
