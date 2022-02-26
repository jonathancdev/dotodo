import React from "react";
import { Flex, Heading, useColorModeValue } from "@chakra-ui/react";

export default function Menu() {
  return (
    <Flex
      w="300px"
      bg="white"
      borderRadius="4px"
      shadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
      justify="center"
    >
      <Heading py="3" fontWeight="700" color="primary" letterSpacing="0.25px">
        MY LISTS
      </Heading>
    </Flex>
  );
}
