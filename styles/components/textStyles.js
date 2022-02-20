import { darken, mode, whiten } from "@chakra-ui/theme-tools";

const textStyles = {
  //style obj for base/default style
  baseStyle: (props) => ({
    color: mode("gray.800", "white")(props),
    fontSize: "12px",
    fontWeight: "500",
    lineHeight: "1.2",
  }),
  //styles for different sizes (sm, md, lg, xl)
  sizes: {},
  //styles for dif visual variants (outline, solid)
  variants: {
    details: {
      fontSize: "12px",
      fontWeight: "200",
    },
    // primary: (props) => ({
    //   bg: "primary",
    //   color: mode("white", "gray.800")(props),
    //   _hover: {
    //     bg: mode(darken("primary", 10), whiten("primary", 10))(props),
    //     boxShadow: "md",
    //   },
    // }),
  },
  //default values for 'size' and 'variant'
  defaultProps: {},
};
const headingStyles = {
  baseStyle: (props) => ({
    color: mode("gray.800", "white")(props),
    fontWeight: "400",
  }),
  sizes: {
    sm: {
      fontSize: "16px",
    },
    md: {
      fontSize: "18px",
    },
    lg: {
      fontSize: "20px",
    },
  },
  variants: {
    logo: {
      color: "primary",
      fontWeight: "800",
      // border: "solid",
      // borderWidth: "1px",
      // borderRadius: "25px",

      letterSpacing: "4px",
    },
  },
  //default values for 'size' and 'variant'
  defaultProps: {},
};
const linkStyles = {
  baseStyle: {
    outline: "none",
    _hover: {
      textDecoration: "none",
    },
    _focus: {
      boxShadow: "none",
    },
  },
};
export { textStyles, headingStyles, linkStyles };
