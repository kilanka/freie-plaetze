import React from "react";

import {InstitutionTypeType} from "../../api/generated/ssr";
import {institutionTypeParagraphNumbers, institutionTypeParagraphURLs} from "../../constants";
import {ParagraphLink} from "./ParagraphLink";

interface ParagraphLinkProps {
	type: InstitutionTypeType;
	children?: React.ReactNode;
}

export const InstitutionTypeParagraphLink: React.FC<ParagraphLinkProps> = ({type, children}) => (
	<ParagraphLink
		paragraph={institutionTypeParagraphNumbers[type]}
		href={institutionTypeParagraphURLs[type]}
	>
		{children}
	</ParagraphLink>
);
