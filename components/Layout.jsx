import React from "react";
import { Flex, useColorModeValue } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  const bgColor = useColorModeValue("white", "gray.800");
  return (
    <Flex
      height="100vh"
      className="layout"
      flexDirection="column"
      align={{
        base: "center",
        md: "start",
      }}
      justifyContent="center"
      bg={useColorModeValue("gray.200", "gray.900")}
      pos="relative"
    >
      <Header />
      <section className="layout__main">{children}</section>
      <Footer />
    </Flex>
  );
}
