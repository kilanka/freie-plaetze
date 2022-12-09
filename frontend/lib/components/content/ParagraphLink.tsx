import {Link} from "next-chakra-ui";
import React from "react";

import {makeParagraphURL} from "../../util";

interface ParagraphLinkProps {
	paragraph: string;
	children?: React.ReactNode;
}

export const ParagraphLink: React.FC<ParagraphLinkProps> = ({paragraph, children}) => (
	<Link
		href={makeParagraphURL(paragraph)}
		textDecoration="underline"
		textDecorationStyle="dotted"
		target="_blank"
	>
		{children ?? <>§&nbsp;{paragraph} SGB&nbsp;VIII</>}
	</Link>
);
