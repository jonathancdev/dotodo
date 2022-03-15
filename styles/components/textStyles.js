import { darken, mode, whiten } from "@chakra-ui/theme-tools";

const textStyles = {
  //style obj for base/default style
  baseStyle: (props) => ({
    color: mode("gray.600", "gray.300")(props),
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
      fontWeight: "300",
    },
  },
  //default values for 'size' and 'variant'
  defaultProps: {},
};
const headingStyles = {
  baseStyle: (props) => ({
    color: mode("gray.700", "white")(props),
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

      letterSpacing: "-1px",
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
