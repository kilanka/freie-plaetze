import {List, ListIcon, ListItem} from "@chakra-ui/react";
import React from "react";
import {IoIosArrowDroprightCircle} from "react-icons/io";

import {useInstitutionTypes} from "../../../hooks/useInstitutionTypes";
import {ParagraphLink} from "../ParagraphLink";

export const InstitutionTypesList: React.FC = () => {
	const institutionTypes = useInstitutionTypes();

	return (
		<List spacing={4}>
			{institutionTypes.map((type) => (
				<ListItem key={type.id}>
					<ListIcon as={IoIosArrowDroprightCircle} color="blue.500" boxSize={6} />
					{type.name} (<ParagraphLink paragraph={type.paragraph} />)
				</ListItem>
			))}
		</List>
	);
};
