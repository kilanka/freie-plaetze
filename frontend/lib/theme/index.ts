import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

import colors from "./colors";
import components from "./components";
import styles from "./styles";

export default extendTheme(
  /*withDefaultColorScheme({ colorScheme: "red" }),*/ {
    styles,
    colors,
    components,
  }
);
