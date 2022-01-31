import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthUserContext";
import { Flex, Box, Spacer, Heading, Button, Link } from "@chakra-ui/react";
import ChakraNextLinkButton from "./ChakraNextLinkButton";

const Header = () => {
  const { auth, authUser, loading, signOut, clear } = useAuth();
  const router = useRouter();
  const currentPath = router.pathname;

  const handleSignOut = () => {
    signOut(auth).then(() => {
      clear();
      router.push("/");
    });
  };

  return (
    <Flex p={8} as="header" height={40} width="100vw" alignItems="center">
      <Box p={2}>
        {currentPath !== "/" ? (
          <Link href="/">
            <Heading color="brand.700">DO_TODO</Heading>
          </Link>
        ) : (
          <Heading color="brand.700">DO_TODO</Heading>
        )}
      </Box>
      <Spacer />
      <Box>
        {currentPath === "/" && authUser && (
          <>
            <ChakraNextLinkButton href="/account">
              my account
            </ChakraNextLinkButton>
          </>
        )}
        {authUser && <Button onClick={handleSignOut}>sign out</Button>}
      </Box>
    </Flex>
  );
};

export default Header;
