import React, { useState } from "react";
import { Flex, useColorModeValue } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";
import Backdrop from "./Backdrop";

export default function Layout({ children, shouldBackgroundBlur }) {
  const bgColor = useColorModeValue("white", "gray.800");
  return (
    <Flex
      height="100vh"
      className="layout"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bg={{
        base: "transparent",
        md: bgColor,
      }}
      pos="relative"
    >
      {shouldBackgroundBlur && <Backdrop />}

      <Header />
      <section className="layout__main">{children}</section>
      <Footer />
    </Flex>
  );
}
