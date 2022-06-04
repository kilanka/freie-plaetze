import React from "react";

import {Link} from "../next/Link";

interface ParagraphLinkProps {
	paragraph: string;
	href: string;
	children?: React.ReactNode;
}

export const ParagraphLink: React.FC<ParagraphLinkProps> = ({paragraph, href, children}) => (
	<Link href={href} textDecoration="underline" textDecorationStyle="dotted" target="_blank">
		{children ?? <>§&nbsp;{paragraph} SGB&nbsp;VIII</>}
	</Link>
);
