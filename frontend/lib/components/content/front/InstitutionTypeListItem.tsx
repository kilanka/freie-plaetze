import {ListIcon, ListItem} from "@chakra-ui/react";
import React from "react";
import {IoIosArrowDroprightCircle} from "react-icons/io";

import {InstitutionTypeType} from "../../../api/generated";
import {institutionTypeNames} from "../../../constants";
import {InstitutionTypeParagraphLink} from "../InstitutionTypeParagraphLink";

export interface InstitutionTypeListItemProps {
	type: InstitutionTypeType;
}

export const InstitutionTypeListItem: React.FC<InstitutionTypeListItemProps> = ({type}) => (
	<ListItem>
		<ListIcon as={IoIosArrowDroprightCircle} color="blue.500" boxSize={6} />
		{institutionTypeNames[type]} (<InstitutionTypeParagraphLink type={type} />)
	</ListItem>
);
