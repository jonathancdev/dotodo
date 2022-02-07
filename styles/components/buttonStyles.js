import { darken, mode, whiten } from "@chakra-ui/theme-tools";

const buttonStyles = {
  //style obj for base/default style
  baseStyle: {
    color: "black",
    fontWeight: "700",
    m: "2",
  },
  //styles for different sizes (sm, md, lg, xl)
  sizes: {
    sm: { h: "25px", fontSize: "12px", p: "8px" },
    md: {
      h: "35px",
      fontSize: "14px",
      p: "10px",
    },
  },
  //styles for dif visual variants (outline, solid)
  variants: {
    primary: (props) => ({
      bg: "primary",
      color: mode("white", "gray.800")(props),
      _hover: {
        bg: mode(darken("primary", 10), whiten("primary", 10))(props),
        boxShadow: "sm",
      },
    }),
    primaryIcon: (props) => ({
      bg: "primary",
      color: mode("white", "gray.800")(props),
      _hover: {
        bg: mode(darken("primary", 10), whiten("primary", 10))(props),
        boxShadow: "sm",
      },
    }),
    primaryOutline: (props) => ({
      bg: "transparent",
      border: "1px solid",
      borderColor: mode("primary", whiten("primary", 20))(props),
      color: mode("primary", whiten("primary", 20))(props),
      _hover: {
        color: mode(darken("primary", 10), whiten("primary", 30))(props),
        borderColor: mode(darken("primary", 10), whiten("primary", 30))(props),
        boxShadow: "sm",
      },
    }),
    todo: (props) => ({
      p: "2",
      h: "25px",
      fontSize: "9px",
      bg: "primary",
      color: mode("white", "gray.800")(props),
      _hover: {
        bg: mode(darken("primary", 10), whiten("primary", 10))(props),
        boxShadow: "sm",
      },
    }),
    todoDetails: (props) => ({
      p: "1",
      mx: "0",
      h: "25px",
      fontSize: "10px",
      fontWeight: "400",
      textDecoration: "underline",
      borderColor: mode("primary", whiten("primary", 20))(props),
      color: mode("green", whiten("green", 20))(props),
      _hover: {
        color: mode(darken("primary", 10), whiten("primary", 30))(props),
        borderColor: mode(darken("primary", 10), whiten("primary", 30))(props),
        boxShadow: "sm",
      },
    }),
  },
  //default values for 'size' and 'variant'
  defaultProps: {},
};

export { buttonStyles };
