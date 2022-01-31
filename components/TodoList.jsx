import React, { useState, useEffect, useRef } from "react";
import NoteCard from "./NoteCard";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthUserContext";
import useFirestore from "../firebase/useFirestore";
import {
  Flex,
  Box,
  Heading,
  Text,
  Input,
  Button,
  FormControl,
  Container,
  Textarea,
  Select,
} from "@chakra-ui/react";

export default function TodoList({ user }) {
  const {
    db,
    collection,
    getDocs,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
  } = useFirestore();
  const { authUser, loading } = useAuth();

  const router = useRouter();

  useEffect(() => {
    console.log(authUser);
    if (!loading && !authUser) {
      router.push("/");
    } else if (!loading) {
      setUserCollection(authUser.uid + "notes");
    }
  }, [authUser, loading]);
  const [userCollection, setUserCollection] = useState(null);
  const [notesList, setNotesList] = useState([]);
  const [shouldModalShow, setShouldModalShow] = useState(false);
  //form refs
  const listRef = useRef();
  const titleRef = useRef();
  const notesRef = useRef();
  const monthRef = useRef();
  const dayRef = useRef();

  useEffect(() => {
    if (authUser) {
      console.log(authUser.email);
      onSnapshot(collection(db, authUser.uid + "notes"), (snapshot) => {
        const notes = [];
        snapshot.docs.forEach((doc) => {
          notes.push({ ...doc.data(), id: doc.id });
          console.log(notes);
        });
        setNotesList(notes);
      });
    }
  }, [loading]);

  const handleSaveSubmit = (e) => {
    // setLoading(true);
    e.preventDefault();
    const list = titleRef.current.value;
    const title = titleRef.current.value;
    const notes = notesRef.current.value;
    const month = monthRef.current.value;
    const day = dayRef.current.value;
    addDoc(collection(db, authUser.uid + "notes"), {
      list: list,
      title: title,
      notes: notes,
      month: month,
      day: day,
      completed: false,
    }).then(() => {
      resetForm();
      // setLoading(false);
    });
  };
  const handleDeleteSubmit = (id) => {
    const docRef = doc(db, authUser.uid + "notes", id);
    deleteDoc(docRef).then(() => {
      // setLoading(false);
    });
    // setLoading(true);
  };

  const handleUpdateSubmit = (updatedValue, id) => {
    const docRef = doc(db, authUser.uid + "notes", id);
    updateDoc(docRef, { text: updatedValue }).then(() => {
      // setLoading(false);
    });
    // setLoading(true);
  };
  const resetForm = () => {
    titleRef.current.value;
    titleRef.current.value;
    notesRef.current.value;
    monthRef.current.value;
    dayRef.current.value;
  };
  const toggleModal = () => {
    setShouldModalShow(!shouldModalShow);
  };
  return (
    <Flex
      as="main"
      width="100vw"
      direction="column"
      align="center"
      pos="relative"
    >
      <Flex width="100%" direction="column" align="center">
        {notesList.length > 0 ? (
          notesList.map((note) => {
            return (
              <NoteCard
                note={note}
                handleDeleteSubmit={handleDeleteSubmit}
                handleUpdateSubmit={handleUpdateSubmit}
              ></NoteCard>
            );
          })
        ) : (
          <Text m={2}>create your first note!</Text>
        )}
      </Flex>

      <Button m={10} onClick={toggleModal}>
        add
      </Button>
      {shouldModalShow && (
        <Container
          top="70%"
          border="solid"
          pos="absolute"
          maxW="320px"
          bg="green.100"
          align="center"
        >
          <FormControl maxW="300px">
            <Flex direction="column">
              <Select ref={listRef} placeholder="List">
                <option value="misc">Misc</option>
              </Select>
              <Input ref={titleRef} placeholder="task name"></Input>
              <Textarea ref={notesRef} placeholder="additional notes" />
              <Box>Deadline:</Box>
              <Flex>
                <Select ref={monthRef} placeholder="Month">
                  <option value="january">January</option>
                </Select>
                <Select ref={dayRef} placeholder="Day">
                  <option value="1">1</option>
                </Select>
              </Flex>
              <Button variant="submit" onClick={handleSaveSubmit} margin={2}>
                save
              </Button>
            </Flex>
          </FormControl>
        </Container>
      )}
    </Flex>
  );
}
