import React, { useState, useEffect } from "react";
import NoteCard from "./NoteCard";
import { useAuth } from "../context/AuthUserContext";
import useFirestore from "../firebase/useFirestore";
import { Flex, Button, useColorModeValue, IconButton } from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";
export default function TodoList({
  notesList,
  projectsList,
  toggleModal,
  toggleBlur,
  currentProject,
}) {
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

  //filter noteslist based on currentProject
  const [filteredNotes, setFilteredNotes] = useState([]);
  useEffect(() => {
    if (currentProject === "all") {
      setFilteredNotes(notesList);
    } else {
      const filtered = notesList.filter((note) => note.list === currentProject);
      setFilteredNotes(filtered);
    }
  }, [currentProject, notesList]);

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
  console.log(filteredNotes);
  return (
    <Flex
      w="360px"
      h="100%;"
      px={2}
      borderRadius="3px"
      as="main"
      direction="column"
      align="center"
      pos="relative"
    >
      <IconButton
        pos="absolute"
        right="12"
        bottom="10"
        fontSize="18px"
        borderRadius="100%"
        borderColor="primary"
        borderWidth="2px"
        w="40px"
        h="40px"
        mr="4"
        bg="white"
        color="primary"
        icon={<AddIcon />}
        onClick={() => {
          toggleModal();
          toggleBlur();
        }}
        zIndex="3"
      />
      <Flex
        width="100%"
        h="100%"
        direction="column"
        align="center"
        pos="relative"
        overflow="scroll"
        ml="2"
        mr="10"
      >
        <Flex width="100%" direction="column" align="center">
          {notesList &&
            filteredNotes.length > 0 &&
            filteredNotes.map((note) => {
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
      </Flex>
    </Flex>
  );
}
