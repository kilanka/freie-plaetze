import {Stat, StatHelpText, StatLabel, StatNumber, StatProps} from "@chakra-ui/react";
import React from "react";

import {PlacesStatFragment} from "../../../api/generated";

export interface PlacesStatProps extends StatProps {
	institution: PlacesStatFragment;
}

export const PlacesStat: React.FC<PlacesStatProps> = ({institution, ...statProps}) => {
	return (
		<Stat {...statProps}>
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
