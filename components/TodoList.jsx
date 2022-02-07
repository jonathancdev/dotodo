import React, { useState, useEffect } from "react";
import NoteCard from "./NoteCard";
import { useAuth } from "../context/AuthUserContext";
import useFirestore from "../firebase/useFirestore";
import {
  Flex,
  Text,
  Button,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import NewTaskModal from "./NewTaskModal";

export default function TodoList() {
  const borderColor = useColorModeValue("gray.400", "gray.500");
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

  //const [userCollection, setUserCollection] = useState(null);
  const [notesList, setNotesList] = useState([]);
  const [shouldModalShow, setShouldModalShow] = useState(false);
  //form refs

  useEffect(() => {
    if (authUser) {
      onSnapshot(collection(db, authUser.uid + "notes"), (snapshot) => {
        const notes = [];
        snapshot.docs.forEach((doc) => {
          notes.push({ ...doc.data(), id: doc.id });
        });
        if (notes.length > 0) {
          setNotesList(notes);
        } else {
          setNotesList(null);
        }
      });
    }
  }, [loading]);
  const handleSaveSubmit = (obj) => {
    // setLoading(true);
    const { list, title, notes, month, day } = obj;
    addDoc(collection(db, authUser.uid + "notes"), {
      list: list,
      title: title,
      notes: notes,
      month: month,
      day: day,
      completed: false,
    }).then(() => {
      console.log("need to do soemthing here");
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
  const toggleModal = () => {
    setShouldModalShow(!shouldModalShow);
  };
  console.log(notesList);
  return (
    <Flex
      border="1px solid"
      borderColor={borderColor}
      p={10}
      borderRadius="3px"
      as="main"
      width="90vw"
      direction="column"
      align="center"
      pos="relative"
    >
      <Flex width="100%" direction="column" align="center">
        {/* {notesList.length > 0 ? (
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
        )} */}
        {notesList &&
          notesList.length > 0 &&
          notesList.map((note) => {
            return (
              <NoteCard
                key={note.id}
                note={note}
                handleDeleteSubmit={handleDeleteSubmit}
                handleUpdateSubmit={handleUpdateSubmit}
              ></NoteCard>
            );
          })}
        {notesList && notesList.length < 1 && <Spinner />}
        {!notesList && <p>nothing here yet</p>}
      </Flex>
      <Button m={10} variant="primaryOutline" onClick={toggleModal}>
        add
      </Button>
      {shouldModalShow && (
        <NewTaskModal
          handleSaveSubmit={handleSaveSubmit}
          toggleModal={toggleModal}
        />
      )}
    </Flex>
  );
}
