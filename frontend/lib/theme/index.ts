import {extendTheme, withDefaultColorScheme} from "@chakra-ui/react";

import colors from "./colors";
import components from "./components";
import styles from "./styles";

export default extendTheme(
	/* WithDefaultColorScheme({ colorScheme: "red" }), */ {
		styles,
		colors,
		components,
	}
);
