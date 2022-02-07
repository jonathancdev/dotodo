import React, { useRef } from "react";
import { useAuth } from "../context/AuthUserContext";
import { useRouter } from "next/router";
import { Flex, Heading, Input, Button, Text } from "@chakra-ui/react";
import ChakraNextLinkButton from "../components/ChakraNextLinkButton";

export default function SignIn() {
  const router = useRouter();
  const { auth, signInWithEmailAndPassword } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <Flex direction="column" p={12} rounded={6}>
      <form onSubmit={handleSubmit} action="">
        <Flex direction="column" alignItems="center">
          <Heading p={2.5} mb={2} alignSelf="start">
            sign in:
          </Heading>
          <Input
            ref={emailRef}
            type="email@dotodo.com"
            required
            placeholder="email"
            w={250}
            variant="primary"
          />
          <Input
            ref={passwordRef}
            type="password"
            required
            placeholder="********"
            w={250}
            variant="primary"
          />
          <Button variant="primaryOutline" type="submit" mb={4} w={250}>
            submit
          </Button>
          <Flex align="center">
            <Text textAlign="center">Don't have an account?</Text>
            <ChakraNextLinkButton
              size="sm"
              href="/signup"
              mx={2}
              text="sign up"
              variant="primary"
            />
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
}
