import { darken, mode, whiten } from "@chakra-ui/theme-tools";

const inputStyles = {
  baseStyle: {},
  sizes: {},
  variants: {
    primary: (props) => ({
      field: {
        mb: "3",
        border: "solid",
        borderColor: mode("gray.400", "gray.500")(props),
        borderWidth: "1px",
        bg: "transparent",
        _placeholder: {
          color: mode("gray.400", "gray.500")(props),
        },
      },
    }),
  },
  defaultProps: {},
};

export { inputStyles };
