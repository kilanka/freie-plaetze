import React from "react";

import {AgeRangeFragment} from "../../../api/generated";

export type InstitutionAgeRangeProps = {
	institution: AgeRangeFragment;
};

export const InstitutionAgeRange: React.FC<InstitutionAgeRangeProps> = ({institution}) => {
	return (
		<>
			{institution.ageFrom}&nbsp;-&nbsp;{institution.ageTo}&nbsp;Jahre
		</>
	);
};
