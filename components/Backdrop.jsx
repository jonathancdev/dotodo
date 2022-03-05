import React from "react";
import { Flex, useColorModeValue } from "@chakra-ui/react";

export default function Backdrop() {
  return (
    <Flex
      className="backdrop"
      bg="black"
      pos="absolute"
      h="100rem"
      w="100rem"
      zIndex="4"
      opacity=".7"
    ></Flex>
  );
}
