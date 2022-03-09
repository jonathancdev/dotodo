import React, { useState } from "react";
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
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import ChakraNextLinkButton from "./ChakraNextLinkButton";
import { SunIcon, MoonIcon, HamburgerIcon } from "@chakra-ui/icons";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { auth, authUser, loading, signOut, clear } = useAuth();
  const router = useRouter();
  const currentPath = router.pathname;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      clear();
      router.push("/");
    });
  };

  return (
    <Flex
      bg={{
        base: "gray.200",
        md: "inherit",
      }}
      pos="relative"
      px={8}
      mb="1"
      as="header"
      h={{
        base: "4rem",
        md: "7rem",
      }}
      width="100vw"
    >
      <Flex w="100%" align="center" maxW="580px">
        <Box
          mt={{
            base: "4",
            md: "8",
          }}
          p={2}
        >
          {currentPath !== "/" ? (
            <Link href="/">
              <Heading
                fontSize={{
                  base: "13px",
                  md: "20px",
                }}
                variant="logo"
              >
                DO_TODO
              </Heading>
            </Link>
          ) : (
            <Heading
              fontSize={{
                base: "13px",
                md: "20px",
              }}
              variant="logo"
            >
              DO_TODO
            </Heading>
          )}
        </Box>
        <Spacer />
        <Flex
          display={{
            base: "block",
            md: "none",
          }}
          align="center"
          mt={{
            base: "4",
            md: "8",
          }}
        >
          {currentPath !== "/account" && (
            <IconButton
              variant="primaryOutline"
              size="sm"
              w="25px"
              onClick={onOpen}
              icon={<HamburgerIcon />}
            ></IconButton>
          )}
          <IconButton
            onClick={toggleColorMode}
            aria-label="color mode toggle"
            icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
            variant="primary"
            size="sm"
            w="25px"
          />
        </Flex>
        <Box
          mt="8"
          display={{
            base: "none",
            md: "block",
          }}
        >
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
        <Drawer isOpen={isOpen} placement="top" onClose={onClose}>
          <DrawerContent>
            <Flex
              pos="absolute"
              justify="center"
              align="end"
              right="0"
              h="55px"
              w="50vw"
              px="3"
              py="3px"
              bg="gray.200"
              display={{
                base: "flex",
                md: "none",
              }}
            >
              {currentPath === "/" && authUser && (
                <>
                  <ChakraNextLinkButton
                    href="/account"
                    text="account"
                    variant="primary"
                    size="sm"
                    fontSize="10px"
                    w="60px"
                    onClick={onClose}
                  />
                </>
              )}
              {authUser && currentPath !== "/account" && (
                <Button
                  onClick={() => {
                    handleSignOut();
                    onClose();
                  }}
                  variant="primaryOutline"
                  size="sm"
                  fontSize="10px"
                  w="60px"
                >
                  sign out
                </Button>
              )}
            </Flex>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Flex>
  );
};

export default Header;
