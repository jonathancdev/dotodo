import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <Flex
      height="100vh"
      className="layout"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bg="white"
    >
      <Header />
      <section className="layout__main">{children}</section>
      <Footer />
    </Flex>
  );
}
