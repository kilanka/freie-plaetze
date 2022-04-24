import {Stat, StatHelpText, StatLabel, StatNumber} from "@chakra-ui/react";
import React from "react";

import {PlacesStatFragment} from "../../../api/generated";

export type PlacesStatProps = {
	institution: PlacesStatFragment;
};

export const PlacesStat: React.FC<PlacesStatProps> = ({institution}) => {
	return (
		<Stat>
			<StatLabel>Freie Plätze</StatLabel>
			<StatNumber>
				{institution.placesAvailable} / {institution.placesTotal}
			</StatNumber>
			<StatHelpText>
				Stand {new Date(institution.lastUpdated).toLocaleDateString("de-DE")}
			</StatHelpText>
		</Stat>
	);
};
