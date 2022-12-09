import {Flex, FlexProps, Icon} from "@chakra-ui/react";
import {Link} from "next-chakra-ui";
import React from "react";
import {IconType} from "react-icons";

export interface SidebarItemProps extends FlexProps {
	icon: IconType;
	href: string;
}
export const SidebarItem: React.FC<SidebarItemProps> = ({icon, href, children, ...flexProps}) => (
	<Link href={href} style={{textDecoration: "none"}} _focus={{boxShadow: "none"}}>
		<Flex
			align="center"
			px={8}
			py={4}
			role="group"
			cursor="pointer"
			_hover={{bg: "gray.100"}}
			_active={{bg: "gray.200"}}
			{...flexProps}
		>
			{icon && <Icon mr="4" fontSize={20} as={icon} />}
			{children}
		</Flex>
	</Link>
);
