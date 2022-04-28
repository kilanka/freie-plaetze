import {Box, Stack} from "@chakra-ui/react";
import React from "react";

import {GistFragment} from "../../../api/generated";
import {GistBullet} from "./GistBullet";

export type GistProps = {
	institution: GistFragment;
};

export const Gist: React.FC<GistProps> = ({institution}) => {
	return (
		<>
			{institution.city}
			<GistBullet />
			{{mixed: "geschlechtsgemischt", f: "nur Mädchen", m: "nur Jungen"}[institution.gender]}
			<GistBullet />
			{institution.ageFrom}&nbsp;-&nbsp;{institution.ageTo}&nbsp;Jahre
		</>
	);
};
