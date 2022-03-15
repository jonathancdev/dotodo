import React from "react";
import { useConfirmationDialog } from "../components/ConfirmationDialog";
import { useAuth } from "../context/AuthUserContext";
import useFirestore from "../firebase/useFirestore";
import { useRouter } from "next/router";
import { Flex, Heading, Text, Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
export default function Account() {
  const { getConfirmation } = useConfirmationDialog();
  const { db, deleteDoc, doc } = useFirestore();
  const router = useRouter();
  const { auth, authUser, loading, signOut, clear, deleteUser } = useAuth();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      clear();
      router.push("/");
    });
  };
  const deleteAuthUser = async () => {
    deleteUser(auth.currentUser)
      .then(() => {
        console.log("Successfully deleted user");
        clear();
        router.push("/");
      })
      .catch((error) => {
        console.log("Error deleting user:", error);
      });
  };
  const removeUserDocument = async () => {
    await deleteDoc(doc(db, "users", "USER_" + authUser.uid))
      .then(() => {
        console.log("Successfully deleted document");
      })
      .catch((error) => {
        console.log("Error deleting document:", error);
      });
  };
  const handleDeleteUser = async () => {
    const confirmed = await getConfirmation({
      title: "Are you sure?",
      message: "This will permanently delete your account.",
    });
    if (confirmed) {
      removeUserDocument();
      deleteAuthUser();
    }
  };

  return (
    <Flex
      as="section"
      m="10"
      py="10"
      h="90%"
      direction="column"
      align="center"
      maxW="600px"
    >
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
          <Text fontWeight="400" fontSize="15px" textAlign="center">
            {authUser.email}
          </Text>
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
            <DeleteIcon pos="absolute" left="6" fontSize="12px" />
            delete account
          </Button>
        </Flex>
      )}
    </Flex>
  );
}
