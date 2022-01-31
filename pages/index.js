import { useAuth } from "../context/AuthUserContext";
import { Flex, Heading, Text } from "@chakra-ui/react";
import ChakraNextLinkButton from "../components/ChakraNextLinkButton";
import TodoList from "../components/todoList";

export default function Home() {
  const { authUser, loading } = useAuth();

  return (
    <Flex as="main" width="100vw" direction="column" alignItems="center">
      {!authUser && (
        <>
          <Heading mb={6}>Welcome to DO_TODO!</Heading>
          <Text>
            Get started by
            <ChakraNextLinkButton href="/signin">
              signing in
            </ChakraNextLinkButton>
            or{" "}
            <ChakraNextLinkButton href="/signup">
              signing up
            </ChakraNextLinkButton>
            .
          </Text>
        </>
      )}
      {authUser && <TodoList></TodoList>}
    </Flex>
  );
}
