import {Flex, FlexProps, Icon} from "@chakra-ui/react";
import React from "react";
import {IconType} from "react-icons";

import {Link} from "../next/Link";

export interface SidebarItemProps extends FlexProps {
	icon: IconType;
	link: string;
}
export const SidebarItem: React.FC<SidebarItemProps> = ({icon, link, children, ...flexProps}) => (
	<Link href={link} style={{textDecoration: "none"}} _focus={{boxShadow: "none"}}>
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
			{icon && <Icon mr="4" fontSize="16" as={icon} />}
			{children}
		</Flex>
	</Link>
);
