import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthUserContext";
import useFirestore from "../firebase/useFirestore";
import { useRouter } from "next/router";
import { Flex, Heading, Input, Button, Text } from "@chakra-ui/react";
import ChakraNextLinkButton from "../components/ChakraNextLinkButton";

export default function SignUp() {
  const router = useRouter();
  const { auth, createUserWithEmailAndPassword } = useAuth();
  const { db, collection, doc, setDoc, addDoc } = useFirestore();
  const emailRef = useRef();
  const passwordRef = useRef();

  //date
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const currentDay = date.getDate();
  const timestamp = date.getTime();

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
        createListDoc(user, "get started");
        createListDoc(user, "prepare taxes :(");
        createListDoc(user, "holiday planning");
        createTaskDoc(user, {
          list: "get started",
          title: "add a new task",
          notes:
            "click + next to the correct list or at the bottom of the page ",
          month: currentMonth,
          day: currentDay,
          timestamp: timestamp,
        });
        createTaskDoc(user, {
          list: "get started",
          title: "add a new list",
          notes: "click + next to 'my lists' to start a new list",
          month: currentMonth,
          day: currentDay,
          timestamp: timestamp,
        });
        createTaskDoc(user, {
          list: "prepare taxes :(",
          title: "download work documents and receipts",
          notes: "",
          month: currentMonth,
          day: currentDay,
          timestamp: timestamp,
        });
        createTaskDoc(user, {
          list: "prepare taxes :(",
          title: "download documents from bank",
          notes: "",
          month: currentMonth,
          day: currentDay,
          timestamp: timestamp,
        });
        createTaskDoc(user, {
          list: "prepare taxes :(",
          title: "compare free vs. paid tax tools",
          notes: "IRS free file vs. Turbotax vs. taxact vs. freetaxusa???",
          month: currentMonth,
          day: currentDay,
          timestamp: timestamp,
        });
        createTaskDoc(user, {
          list: "holiday plans",
          title: "renew passport",
          notes: "send application before the end of the month",
          month: currentMonth,
          day: 28,
          timestamp: timestamp,
        });
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
  const createDefaultDocuments = (user) => {};
  const createTaskDoc = (user, obj) => {
    const { list, title, notes, month, day, timestamp } = obj;
    addDoc(collection(db, "users", "USER_" + user.uid, "tasks"), {
      list: list,
      title: title,
      notes: notes,
      month: parseInt(month, 10),
      day: parseInt(day, 10),
      completed: false,
      timestamp: timestamp,
    }).then(() => {
      console.log("DEFAULT TASK ADDED");
    });
  };
  const createListDoc = (user, project) => {
    addDoc(collection(db, "users", "USER_" + user.uid, "projects"), {
      name: project.toLowerCase(),
    }).then(() => {
      console.log("DEFAULT PROJECT ADDED");
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
