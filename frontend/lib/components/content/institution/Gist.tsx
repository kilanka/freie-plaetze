import {Box, Stack} from "@chakra-ui/react";
import React from "react";

import {GistFragment} from "../../../api/generated";
import {GistBullet} from "./GistBullet";

export type GistProps = {
	institution: GistFragment;
};

export const Gist: React.FC<GistProps> = ({institution}) => {
	return (
		<Stack direction="row" divider={<GistBullet />}>
			<Box>{institution.city}</Box>
			<Box>
				{{mixed: "geschlechtsgemischt", f: "nur Mädchen", m: "nur Jungen"}[institution.gender]}
			</Box>
			<Box>
				{institution.ageFrom} - {institution.ageTo} Jahre
			</Box>
		</Stack>
	);
};
