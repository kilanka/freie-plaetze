import {Link as ChakraLink, LinkProps as ChakraLinkProps} from "@chakra-ui/react";
import {LinkProps as NextLinkProps} from "next/dist/client/link";
import NextLink from "next/link";
import React from "react";
import {Except} from "type-fest";

export type LinkProps = Except<NextLinkProps, "as"> & ChakraLinkProps;

//  Has to be a new component because both chakra and next share the `as` keyword
export const Link: React.FC<LinkProps> = ({
	href,
	replace,
	scroll,
	shallow,
	prefetch,
	children,
	...chakraProps
}: LinkProps) => {
	return (
		<NextLink
			passHref
			href={href}
			replace={replace}
			scroll={scroll}
			shallow={shallow}
			prefetch={prefetch}
		>
			<ChakraLink {...chakraProps}>{children}</ChakraLink>
		</NextLink>
	);
};
