import React from "react";

import {GistFragment} from "../../../api/generated";
import {institutionGenderNames, institutionTypeShortNames} from "../../../constants";
import {institutionTypeToParagraphNumber} from "../../../util";
import {GistBullet} from "./GistBullet";
import {InstitutionAgeRange} from "./InstitutionAgeRange";

export type GistProps = {
	institution: GistFragment;
};

export const Gist: React.FC<GistProps> = ({institution}) => {
	return (
		<>
			{institution.city}
			<GistBullet />
			{institutionTypeShortNames[institution.type]} (§{" "}
			{institutionTypeToParagraphNumber(institution.type)})
			<GistBullet />
			{institutionGenderNames[institution.gender]}
			<GistBullet />
			<InstitutionAgeRange institution={institution} />
		</>
	);
};
