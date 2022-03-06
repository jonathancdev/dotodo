import React from "react";
import { useAuth } from "../context/AuthUserContext";
import { useRouter } from "next/router";
import {
  Flex,
  Heading,
  Box,
  Icon,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import { useConfirmationDialog } from "../components/ConfirmationDialog";

import { DeleteIcon } from "@chakra-ui/icons";
export default function account() {
  const router = useRouter();
  const { auth, authUser, loading, signOut, clear, deleteUser } = useAuth();
  const currentPath = router.pathname;
  const deleteIcon = <DeleteIcon pos="absolute" left="6" fontSize="12px" />;
  const { getConfirmation } = useConfirmationDialog();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      clear();
      router.push("/");
    });
  };
  const handleDeleteUser = async () => {
    const confirmed = await getConfirmation({
      title: "Are you sure?",
      message: "This will permanently delete your account.",
    });
    if (confirmed) {
      deleteUser(auth.currentUser)
        .then(() => {
          console.log("Successfully deleted user");
          clear();
          router.push("/");
        })
        .catch((error) => {
          console.log("Error deleting user:", error);
        });
    }
  };
  return (
    <Flex as="section" m="10" py="10" h="90%" direction="column">
      <Heading fontWeight="700" letterSpacing="1px">
        MY ACCOUNT
      </Heading>
      {!loading && authUser && (
        <Flex
          mt="25"
          w="100%"
          justify="center"
          align="center"
          direction="column"
        >
          <Box fontWeight="400" fontSize="15px" textAlign="center">
            {authUser.email}
          </Box>
          <Button
            mt="5"
            mb="2"
            onClick={handleSignOut}
            variant="primaryOutline"
            size="sm"
            w="180px"
          >
            sign out
          </Button>
          <Button
            w="180px"
            mt="2"
            mb="2"
            onClick={handleDeleteUser}
            variant="primaryOutline"
            size="sm"
            borderColor="red"
            color="red"
            opacity="0.9"
            _hover={{
              color: "red",
              opacity: "1",
            }}
          >
            {deleteIcon}
            delete account
          </Button>
        </Flex>
      )}
    </Flex>
  );
}
