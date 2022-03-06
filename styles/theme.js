import {
  extendTheme,
  theme as base,
  withDefaultColorScheme,
  withDefaultVariant,
} from "@chakra-ui/react";
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
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
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

// const theme = extendTheme(
//   {
//     colors: {
//       //base color: #07c
//       //https://palx.jxnblk.com/
//       brand: {
//         50: "#f9f9fe",
//         100: "#ebedfb",
//         200: "#dddff8",
//         300: "#cdd1f5",
//         400: "#bcc0f2",
//         500: "#a9aeee",
//         600: "#929ae9",
//         700: "#7780e4",
//         800: "#525edc",
//         900: "#0516cd",
//       },
//     },
//     fonts: {
//       heading: `Roboto, ${base.fonts?.heading}`,
//       body: `Roboto, ${base.fonts?.body}`,
//     },
//     components: {
//       Button: {
//         variants: {
//           link: {
//             bg: "brand.500",
//             p: "3",
//           },
//           submit: {
//             bg: "brand.700",
//             p: "3",
//             color: "white",
//           },
//           delete: {
//             bg: "red.500",
//             p: "2",
//             color: "white",
//           },
//           edit: {
//             bg: "teal.500",
//             p: "2",
//             color: "white",
//           },
//           details: {
//             bg: "orange.300",
//             p: "2",
//             color: "white",
//           },
//         },
//       },
//       Input: {
//         variants: {
//           filled: {
//             field: {
//               _focus: {
//                 borderColor: "brand.500",
//               },
//             },
//           },
//         },
//         sizes: {
//           md: {
//             field: {
//               borderRadius: "none",
//               height: "30px",
//               m: "3",
//             },
//           },
//         },
//       },
//     },
//   },
//   withDefaultColorScheme({
//     colorScheme: "brand",
//     components: [],
//   }),
//   withDefaultVariant({
//     variant: "filled",
//     components: ["Select"],
//   })
// );

export default theme;
