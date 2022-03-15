import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthUserContext";
import useFirestore from "../firebase/useFirestore";
import { useRouter } from "next/router";
import { Flex, Heading, Input, Button, Text } from "@chakra-ui/react";
import ChakraNextLinkButton from "../components/ChakraNextLinkButton";

export default function SignUp() {
  const router = useRouter();
  const { auth, createUserWithEmailAndPassword } = useAuth();
  const { db, collection, doc, setDoc } = useFirestore();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        createUserCollection(user);
        router.push("/");
      })
      .catch((err) => {
        console.log(err.message);
        setError(true);
        setErrorMessage("sign up failed");
      });
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };
  const createUserCollection = (user) => {
    // setLoading(true);
    const { metadata, uid, email } = user;
    // setDoc(collection(db, "users"), {
    setDoc(doc(db, "users", "USER_" + uid), {
      history: {
        id: uid,
        creationTime: metadata.creationTime,
        createdAt: metadata.createdAt,
        email: email,
      },
    }).then(() => {
      console.log("USER CREATED");
    });
  };
  return (
    <Flex align="center" direction="column" p={12} rounded={6} maxW="600px">
      <form onSubmit={handleSubmit} action="">
        <Flex maxW="350px" direction="column" alignItems="center">
          <Heading p={2.5} mb={2} alignSelf="start">
            sign up:
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
            <Flex
              borderRadius="2px"
              w="250px"
              align="center"
              color="red"
              fontWeight="500"
              letterSpacing="1px"
              mb="3"
              p="1"
            >
              {errorMessage}
            </Flex>
          )}
          <Button variant="primaryOutline" type="submit" mb={4} w={250}>
            submit
          </Button>
          <Flex align="center">
            <Text textAlign="center">Already have an account?</Text>
            <ChakraNextLinkButton
              size="sm"
              href="/signin"
              mx={2}
              text="sign in"
              variant="primary"
            />
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
}
