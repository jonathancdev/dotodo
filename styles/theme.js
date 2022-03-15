import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import {
  buttonStyles as Button,
  iconButtonStyles as IconButton,
} from "./components/buttonStyles";
import { inputStyles as Input } from "./components/inputStyles";
import {
  textStyles as Text,
  headingStyles as Heading,
  linkStyles as Link,
} from "./components/textStyles";
const breakpoints = createBreakpoints({
  xs: "300px",
  sm: "375px",
  md: "600px",
  lg: "800px",
  xl: "1200px",
  "2xl": "1536px",
});
const theme = extendTheme({
  breakpoints,
  colors: {
    primary: "#6c8ccf",
    pink: "#FF99D5",
    blue: "#4285F4",
    green: "#008a61",
    yellow: "#eee8a9",
    red: "#cd7182",
    purple: "#876eba",
    orange: "#D86800",
    black70: "#000000b2",
  },
  components: {
    Button,
    Text,
    Heading,
    Link,
    Input,
    IconButton,
  },
});

export default theme;
