import React, { useRef } from "react";
import { useAuth } from "../context/AuthUserContext";
import { useRouter } from "next/router";
import { Flex, Heading, Input, Button, Text } from "@chakra-ui/react";
import ChakraNextLinkButton from "../components/ChakraNextLinkButton";

export default function SignUp() {
  const router = useRouter();
  const { auth, createUserWithEmailAndPassword } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    createUserWithEmailAndPassword(auth, email, password).then(() => {
      router.push("/");
    });
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };
  return (
    <Flex direction="column" p={12} rounded={6}>
      <form onSubmit={handleSubmit} action="">
        <Flex direction="column" alignItems="center">
          <Heading m={5} alignSelf="start">
            sign up:
          </Heading>
          <Input
            ref={emailRef}
            type="email@dotodo.com"
            required
            placeholder="email"
            mb={3}
            w={250}
          />
          <Input
            ref={passwordRef}
            type="password"
            required
            placeholder="********"
            mb={6}
            w={250}
          />
          <Button variant="submit" type="submit" mb={4} w={250}>
            submit
          </Button>
          <Text w={275} textAlign="center">
            Already have an account?
            <ChakraNextLinkButton href="/signin" mx={2}>
              Sign in here
            </ChakraNextLinkButton>
            .
          </Text>
        </Flex>
      </form>
    </Flex>
  );
}
