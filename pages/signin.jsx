import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthUserContext";
import { useRouter } from "next/router";
import { Flex, Heading, Input, Button, Text } from "@chakra-ui/react";
import ChakraNextLinkButton from "../components/ChakraNextLinkButton";

export default function SignIn() {
  const router = useRouter();
  const { auth, signInWithEmailAndPassword } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
        setError(true);
        setErrorMessage("sign in failed");
      });
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <Flex align="center" direction="column" p={12} rounded={6} maxW="600px">
      <form onSubmit={handleSubmit} action="">
        <Flex maxW="350px" direction="column" alignItems="center">
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
          {error && (
            <Flex borderRadius="2px" w="250px" align="center" mb="3" p="1">
              <Text color="red" fontWeight="500" letterSpacing="1px">
                {errorMessage}
              </Text>
            </Flex>
          )}
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
