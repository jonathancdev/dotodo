import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthUserContext";
import {
  Flex,
  Box,
  Spacer,
  Heading,
  Button,
  Link,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import ChakraNextLinkButton from "./ChakraNextLinkButton";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
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
    <Flex px={8} mb="3" as="header" height="7rem" width="100vw" align="center">
      <Box mt="8" p={2}>
        {currentPath !== "/" ? (
          <Link href="/">
            <Heading size="lg" variant="logo">
              DO_TODO
            </Heading>
          </Link>
        ) : (
          <Heading size="lg" variant="logo">
            DO_TODO
          </Heading>
        )}
      </Box>
      <Spacer />
      <Box mt="8">
        {currentPath === "/" && authUser && (
          <>
            <ChakraNextLinkButton
              href="/account"
              text="my account"
              variant="primary"
              size="sm"
            />
          </>
        )}
        {authUser && currentPath !== "/account" && (
          <Button onClick={handleSignOut} variant="primaryOutline" size="sm">
            sign out
          </Button>
        )}
        <IconButton
          onClick={toggleColorMode}
          aria-label="color mode toggle"
          icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
          variant="primary"
          size="sm"
          w="25px"
        />
      </Box>
    </Flex>
  );
};

export default Header;
