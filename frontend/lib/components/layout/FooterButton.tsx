import {Icon, IconButton} from "@chakra-ui/react";
import React from "react";
import {IconType} from "react-icons";

import {LinkButton, LinkButtonProps} from "../next/LinkButton";

export interface FooterButtonProps extends LinkButtonProps {
	children: string;
	icon: IconType;
}

export const FooterButton: React.FC<FooterButtonProps> = ({children, icon, ...linkProps}) => {
	return (
		<IconButton
			as={LinkButton}
			{...linkProps}
			icon={<Icon as={icon} boxSize={5} />}
			aria-label={children}
			rounded="full"
		/>
	);
};
