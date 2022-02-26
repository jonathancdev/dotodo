import { useState } from "react";
import { useAuth } from "../context/AuthUserContext";
import { Flex, Heading, Text, Spinner } from "@chakra-ui/react";
import ChakraNextLinkButton from "../components/ChakraNextLinkButton";
import TodoList from "../components/todoList";
import Menu from "../components/Menu";

export default function Home() {
  const { authUser, loading } = useAuth();
  const [spinnerShouldShow, setSpinnerShouldShow] = useState(true);
  console.log(authUser, loading);
  return (
    <Flex as="main" width="100vw" direction="column" alignItems="center">
      {!authUser && !loading && (
        <>
          <Flex mb={8} align="center">
            <Heading size="md">Welcome to</Heading>
            <Heading variant="logo" size="sm" mx={3} mt={0.5}>
              DO_TODO
            </Heading>
            <Heading size="md">!</Heading>
          </Flex>
          <Flex>
            <ChakraNextLinkButton
              variant="primary"
              href="/signin"
              text="sign in"
            />
            <ChakraNextLinkButton
              variant="primary"
              href="/signup"
              text="sign up"
            />
          </Flex>
        </>
      )}
      <Flex maxW="90vw">
        {!loading && authUser && <Menu />}
        {!loading && authUser && <TodoList />}
      </Flex>
      {authUser && loading && <Spinner />}
    </Flex>
  );
}
