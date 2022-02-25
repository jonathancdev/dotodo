import React, { useState, useEffect } from "react";
import NoteCard from "./NoteCard";
import { useAuth } from "../context/AuthUserContext";
import useFirestore from "../firebase/useFirestore";
import { Flex, Button, useColorModeValue } from "@chakra-ui/react";
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
  const [projectsList, setProjectsList] = useState([
    "misc",
    "fix car",
    "revise documents",
  ]);
  const [shouldModalShow, setShouldModalShow] = useState(false);

  useEffect(() => {
    if (authUser) {
      onSnapshot(
        collection(db, "users", "USER_" + authUser.uid, "tasks"),
        (snapshot) => {
          const notes = [];
          snapshot.docs.forEach((doc) => {
            notes.push({ ...doc.data(), id: doc.id });
          });
          if (notes.length > 0) {
            setNotesList(notes);
          } else {
            setNotesList(null);
          }
        }
      );
    }
  }, [loading]);
  const handleSaveSubmit = (obj) => {
    // setLoading(true);
    const { list, title, notes, month, day } = obj;
    addDoc(collection(db, "users", "USER_" + authUser.uid, "tasks"), {
      list: list,
      title: title,
      notes: notes,
      month: parseInt(month, 10),
      day: parseInt(day, 10),
      completed: false,
    }).then(() => {
      console.log("need to do soemthing here");
    });
  };
  const handleDeleteSubmit = (id) => {
    console.log(id);
    const docRef = doc(db, "users", "USER_" + authUser.uid, "tasks", id);
    deleteDoc(docRef).then(() => {
      // setLoading(false);
    });
    // setLoading(true);
  };

  const handleUpdateSubmit = (updatedValue, id) => {
    console.log(updatedValue, id);
    const docRef = doc(db, "users", "USER_" + authUser.uid, "tasks", id);
    updateDoc(docRef, updatedValue).then(() => {
      // setLoading(false);
    });
    // setLoading(true);
  };
  const toggleModal = () => {
    setShouldModalShow(!shouldModalShow);
  };

  return (
    <Flex
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
                projectsList={projectsList}
                key={note.id}
                note={note}
                handleDeleteSubmit={handleDeleteSubmit}
                handleUpdateSubmit={handleUpdateSubmit}
              ></NoteCard>
            );
          })}
        {/* {notesList && notesList.length < 1 && <Spinner />} */}
        {/* {loading && <Spinner />}
        {notesList.length === 0 && <p>nothing here yet</p>} */}
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
