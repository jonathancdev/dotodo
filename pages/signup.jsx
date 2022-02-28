import React, { useRef } from "react";
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const user = userCredential.user;
        createUserCollection(user);
        router.push("/");
      }
    );
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
      tasks: [{}],
    }).then(() => {
      console.log("USER CREATED");
    });
  };
  return (
    <Flex direction="column" p={12} rounded={6}>
      <form onSubmit={handleSubmit} action="">
        <Flex direction="column" alignItems="center">
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
