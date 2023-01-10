import {Box, Icon, Stack} from "@chakra-ui/react";
import {Link} from "next-chakra-ui";
import React from "react";
import {IconType} from "react-icons";

export interface ContactDetailRowProps {
	icon: IconType;
	children: React.ReactNode;
	href?: string;
}

export const ContactDetailRow: React.FC<ContactDetailRowProps> = ({icon, href, children}) => (
	<Stack direction="row" spacing={4}>
		<Icon w={6} h={6} as={icon} />
		{href ? (
			<Link href={href} target="_blank" wordBreak="break-word">
				{children}
			</Link>
		) : (
			<Box>{children}</Box>
		)}
	</Stack>
);
