import React from "react";

import {AgeRangeFragment} from "../../../api/generated";

export type InstitutionAgeRangeProps = {
	institution: AgeRangeFragment;
};

export const InstitutionAgeRange: React.FC<InstitutionAgeRangeProps> = ({
	institution: {ageFrom, ageTo},
}) => {
	if (!ageFrom && !ageTo) {
		return <>alle Altersklassen</>;
	}

	if (!ageFrom) {
		return <>bis&nbsp;{ageTo}&nbsp;Jahre</>;
	}

	if (!ageTo) {
		return <>ab&nbsp;{ageFrom}&nbsp;Jahre</>;
	}

	return (
		<>
			{ageFrom}&nbsp;-&nbsp;{ageTo}&nbsp;Jahre
		</>
	);
};
