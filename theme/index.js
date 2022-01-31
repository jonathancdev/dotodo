import {
  extendTheme,
  theme as base,
  withDefaultColorScheme,
  withDefaultVariant,
} from "@chakra-ui/react";

const theme = extendTheme(
  {
    colors: {
      //base color: #07c
      //https://palx.jxnblk.com/
      brand: {
        50: "#f9f9fe",
        100: "#ebedfb",
        200: "#dddff8",
        300: "#cdd1f5",
        400: "#bcc0f2",
        500: "#a9aeee",
        600: "#929ae9",
        700: "#7780e4",
        800: "#525edc",
        900: "#0516cd",
      },
    },
    fonts: {
      heading: `Roboto, ${base.fonts?.heading}`,
      body: `Roboto, ${base.fonts?.body}`,
    },
    components: {
      Button: {
        variants: {
          link: {
            bg: "brand.500",
            p: "3",
          },
          submit: {
            bg: "brand.700",
            p: "3",
            color: "white",
          },
          delete: {
            bg: "red.500",
            p: "2",
            color: "white",
          },
          edit: {
            bg: "teal.500",
            p: "2",
            color: "white",
          },
          details: {
            bg: "orange.300",
            p: "2",
            color: "white",
          },
        },
      },
      Input: {
        variants: {
          filled: {
            field: {
              _focus: {
                borderColor: "brand.500",
              },
            },
          },
        },
        sizes: {
          md: {
            field: {
              borderRadius: "none",
              height: "30px",
              m: "3",
            },
          },
        },
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: "brand",
    components: [],
  }),
  withDefaultVariant({
    variant: "filled",
    components: ["Select"],
  })
);

export default theme;
