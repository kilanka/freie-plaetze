import {ListIcon, ListItem} from "@chakra-ui/react";
import React from "react";
import {IoIosArrowDroprightCircle} from "react-icons/io";

import {ParagraphLink} from "./ParagraphLink";

export interface InstitutionTypeListItemProps {
	paragraph: string;
	children: React.ReactNode;
}

export const InstitutionTypeListItem: React.FC<InstitutionTypeListItemProps> = ({
	paragraph,
	children,
}) => (
	<ListItem>
		<ListIcon as={IoIosArrowDroprightCircle} color="blue.500" boxSize={6} />
		{children} (<ParagraphLink paragraph={paragraph} />)
	</ListItem>
);
