import React from "react";

import {GistFragment, InstitutionGenderType} from "../../../api/generated";
import {GistBullet} from "./GistBullet";

export type GistProps = {
	institution: GistFragment;
};

export const Gist: React.FC<GistProps> = ({institution}) => {
	return (
		<>
			{institution.city}
			<GistBullet />
			{
				{
					[InstitutionGenderType.Mixed]: "geschlechtsgemischt",
					[InstitutionGenderType.F]: "nur Mädchen",
					[InstitutionGenderType.M]: "nur Jungen",
				}[institution.gender]
			}
			<GistBullet />
			{institution.ageFrom}&nbsp;-&nbsp;{institution.ageTo}&nbsp;Jahre
		</>
	);
};
