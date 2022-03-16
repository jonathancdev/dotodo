import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthUserContext";

import {
  Flex,
  Box,
  Heading,
  Button,
  Link,
  IconButton,
  useColorMode,
  useColorModeValue,
  Drawer,
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

  const handleSignOut = () => {
    signOut(auth).then(() => {
      clear();
      router.push("/");
    });
  };

  return (
    <Flex
      pos="relative"
      mb="1"
      as="header"
      h={{
        base: "4rem",
        md: "7rem",
      }}
      w={{
        base: "99%",
        md: "100%",
      }}
      minW="320px"
      maxW={{
        base: "none",
        md: "610px",
      }}
      px="6"
      justify="center"
    >
      <Flex w="100%" align="center" minW="320px" justify="space-between">
        <Box
          mt={{
            base: "4",
            md: "8",
          }}
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
                PLUSLIST
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
              PLUSLIST
            </Heading>
          )}
        </Box>
        {!isOpen && (
          <Flex
            //mobile hamburger menu
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
            {authUser && currentPath !== "/account" && (
              <IconButton
                variant="primaryOutline"
                size="sm"
                w="25px"
                mr="0"
                my="0"
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
        )}
        <Box
          //non-mobile buttons for my account/signout
          mt="8"
          display={{
            base: "none",
            md: "block",
          }}
        >
          {currentPath === "/" && authUser && (
            <>
              {/* <ChakraNextLinkButton
                href={auth.currentUser.isAnonymous ? "/signin" : "/account"}
                text={auth.currentUser.isAnonymous ? "sign in" : "my account"}
                variant={
                  auth.currentUser.isAnonymous ? "primaryOutline" : "primary"
                }
                size="sm"
              /> */}
              <ChakraNextLinkButton
                href="/account"
                text="my account"
                variant="primary"
                size="sm"
              />
            </>
          )}
          {authUser &&
            currentPath !== "/account" &&
            !auth.currentUser.isAnonymous && (
              <Button
                onClick={handleSignOut}
                variant="primaryOutline"
                size="sm"
              >
                sign out
              </Button>
            )}
          {/* {authUser && currentPath === "/" && auth.currentUser.isAnonymous && (
            <ChakraNextLinkButton
              href={"/signup"}
              text="sign up"
              variant="primary"
              size="sm"
            />
          )} */}

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
              bg="transparent"
              pos="absolute"
              justify="center"
              align="end"
              right="0"
              top="4"
              w="auto"
              px="3"
              py="4px"
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
                    m="0"
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
