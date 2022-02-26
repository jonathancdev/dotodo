import { darken, mode, whiten } from "@chakra-ui/theme-tools";

const buttonStyles = {
  //style obj for base/default style
  baseStyle: {
    color: "black",
    fontWeight: "700",
    mx: "2",
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
      p: "0",
      h: "20px",
      w: "20px",
      fontSize: "9px",
      bg: props.bg,
      color: mode("white", "gray.800")(props),
      _hover: {
        bg: mode(darken(props.bg, 10), whiten(props.bg, 10))(props),
        boxShadow: "sm",
      },
    }),
    iconTodo: (props) => ({
      p: "1",
      m: "0",
      h: "20px",
      w: "20px",
      fontSize: "14px",
      color: mode("white", "gray.800")(props),
      _hover: {
        color: mode(darken(props.color, 10), whiten(props.color, 10))(props),
        boxShadow: "sm",
      },
    }),
    iconTodoClose: (props) => ({
      p: "0",
      h: "20px",
      bg: props.bg,
      color: mode("white", "gray.800")(props),
      _hover: {
        color: mode(darken(props.color, 10), whiten(props.color, 10))(props),
        boxShadow: "sm",
      },
    }),
    todoDetails: (props) => ({
      p: "1",
      height: "20px",
      width: "20px",
      borderColor: mode("primary", whiten("primary", 20))(props),
      color: mode("primary", whiten("primary", 20))(props),
      _hover: {
        color: mode(darken("primary", 10), whiten("primary", 30))(props),
        borderColor: mode(darken("primary", 10), whiten("primary", 30))(props),
      },
    }),
  },
  //default values for 'size' and 'variant'
  defaultProps: {},
};

const iconButtonStyles = {
  //style obj for base/default style
  baseStyle: {
    color: "black",
    fontWeight: "700",
    m: "1",
  },
  //styles for different sizes (sm, md, lg, xl)
  // sizes: {
  //   sm: { h: "25px", w: "25px", fontSize: "12px" },
  // },
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
      h: "25px",
      w: "25px",
      bg: props.bg,
      color: mode("white", "gray.800")(props),
      _hover: {
        bg: mode(darken(props.bg, 10), whiten(props.bg, 10))(props),
        boxShadow: "sm",
      },
    }),
  },
  //default values for 'size' and 'variant'
  defaultProps: {},
};

export { buttonStyles, iconButtonStyles };
