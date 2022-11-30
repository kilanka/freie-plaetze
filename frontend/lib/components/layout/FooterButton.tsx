import {Icon} from "@chakra-ui/react";
import {LinkIconButton, LinkIconButtonProps} from "next-chakra-ui";
import React from "react";
import {IconType} from "react-icons";

export interface FooterButtonProps extends Omit<LinkIconButtonProps, "icon" | "aria-label"> {
	children: string;
	icon: IconType;
}

export const FooterButton: React.FC<FooterButtonProps> = ({children, icon, ...linkProps}) => {
	return (
		<LinkIconButton
			{...linkProps}
			icon={<Icon as={icon} boxSize={5} />}
			aria-label={children}
			rounded="full"
		/>
	);
};
