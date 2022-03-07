import React from "react";
import { Flex, useColorModeValue } from "@chakra-ui/react";

export default function Backdrop() {
  return (
    <Flex
      className="backdrop"
      bg="black"
      pos="absolute"
      h="100vh"
      w="100vw"
      zIndex="4"
      opacity=".7"
    ></Flex>
  );
}
