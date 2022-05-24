import {Button, ButtonProps, HTMLChakraProps} from "@chakra-ui/react";
import {LinkProps as NextLinkProps} from "next/dist/client/link";
import NextLink from "next/link";
import React from "react";
import {Except} from "type-fest";

export type LinkButtonProps = Except<NextLinkProps, "as"> & ButtonProps & HTMLChakraProps<"a">;

//  Has to be a new component because both chakra and next share the `as` keyword
export const LinkButton: React.FC<LinkButtonProps> = ({
	href,
	replace,
	scroll,
	shallow,
	prefetch,
	children,
	...chakraProps
}: LinkButtonProps) => {
	return (
		<NextLink
			passHref
			href={href}
			replace={replace}
			scroll={scroll}
			shallow={shallow}
			prefetch={prefetch}
		>
			<Button {...chakraProps} as="a">
				{children}
			</Button>
		</NextLink>
	);
};
