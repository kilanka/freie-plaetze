import {Icon, Stat, StatHelpText, StatLabel, StatNumber, StatProps} from "@chakra-ui/react";
import React from "react";
import {IoCheckmarkCircle, IoCloseCircle} from "react-icons/io5";

import {PlacesStatFragment} from "../../../api/generated";

export interface PlacesStatProps extends StatProps {
	institution: PlacesStatFragment;
}

export const PlacesStat: React.FC<PlacesStatProps> = ({institution, ...statProps}) => (
	<Stat {...statProps}>
		<StatLabel>Freie Plätze</StatLabel>
		<StatNumber pt={1}>
			<Icon
				as={institution.arePlacesAvailable ? IoCheckmarkCircle : IoCloseCircle}
				boxSize={6}
				color={institution.arePlacesAvailable ? "green.500" : "red.600"}
			/>
		</StatNumber>
		<StatHelpText>
			Stand {new Date(institution.lastUpdated).toLocaleDateString("de-DE")}
		</StatHelpText>
	</Stat>
);
