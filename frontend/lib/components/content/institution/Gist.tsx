import React from "react";

import {GistFragment} from "../../../api/generated";
import {institutionGenderNames} from "../../../constants";
import {GistBullet} from "./GistBullet";
import {InstitutionAgeRange} from "./InstitutionAgeRange";

export type GistProps = {
	institution: GistFragment;
	hasInstitutionType?: boolean;
};

export const Gist: React.FC<GistProps> = ({institution, hasInstitutionType}) => {
	return (
		<>
			{institution.city}
			<GistBullet />
			{hasInstitutionType && (
				<>
					{institution.types?.map((type) => type.shortName).join(", ")}
					<GistBullet />
				</>
			)}
			{institutionGenderNames[institution.gender]}
			<GistBullet />
			<InstitutionAgeRange institution={institution} />
		</>
	);
};
