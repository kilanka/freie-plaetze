import React from "react";

import {Link} from "../next/Link";

interface ParagraphLinkProps {
	paragraph: string;
	children?: React.ReactNode;
}

export const ParagraphLink: React.FC<ParagraphLinkProps> = ({paragraph, children}) => (
	<Link
		href={`https://www.gesetze-im-internet.de/sgb_8/__${paragraph}.html`}
		textDecoration="underline"
		textDecorationStyle="dotted"
		target="_blank"
	>
		{children ?? <>§&nbsp;{paragraph} SGB&nbsp;VIII</>}
	</Link>
);
