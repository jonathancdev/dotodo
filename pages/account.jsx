import React from "react";
import { useConfirmationDialog } from "../components/ConfirmationDialog";
import { useAuth } from "../context/AuthUserContext";
import useFirestore from "../firebase/useFirestore";
import { useRouter } from "next/router";
import { Flex, Heading, Text, Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { getDocs } from "firebase/firestore";
export default function Account() {
  const { getConfirmation } = useConfirmationDialog();
  const { db, collection, deleteDoc, doc, getDoc, getDocs, query } =
    useFirestore();
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
  const removeTaskDocuments = async () => {
    console.log("***Task document removal start***");
    const q = query(collection(db, "users", "USER_" + authUser.uid, "tasks"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
      deleteDoc(
        doc(db, "users", "USER_" + authUser.uid, "tasks", document.id)
      ).then(() => {
        console.log("deleted " + document.id + " successfully");
      });
      // console.log(document.id);
      // console.log(document.data());
    });
  };
  const removeProjectDocuments = async () => {
    console.log("***Project document removal start***");
    const q = query(
      collection(db, "users", "USER_" + authUser.uid, "projects")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
      deleteDoc(
        doc(db, "users", "USER_" + authUser.uid, "projects", document.id)
      ).then(() => {
        console.log("deleted " + document.id + " successfully");
      });
      // console.log(document.id);
      // console.log(document.data());
    });
  };
  const handleDeleteUser = async () => {
    const confirmed = await getConfirmation({
      title: "Are you sure?",
      message: "This will permanently delete your account.",
    });
    if (confirmed) {
      await removeTaskDocuments();
      await removeProjectDocuments();
      await removeUserDocument();
      deleteAuthUser();
    }
  };
  const handleDeleteAnonymousUser = async () => {
    await removeTaskDocuments();
    await removeProjectDocuments();
    await removeUserDocument();
    deleteAuthUser();
  };
  console.log(authUser);
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
          <Text fontWeight="400" fontSize="15px" textAlign="center" mb="5">
            {authUser.email || "test account"}
          </Text>
          {authUser.email && (
            <>
              <Button
                mt="2"
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
            </>
          )}
          {!authUser.email && (
            <Button
              w="180px"
              mt="2"
              mb="2"
              onClick={handleDeleteAnonymousUser}
              variant="primaryOutline"
              size="sm"
              opacity="0.9"
              _hover={{
                color: "red",
                opacity: "1",
              }}
            >
              sign out
            </Button>
          )}
        </Flex>
      )}
    </Flex>
  );
}
