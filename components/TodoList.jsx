import React, { useState, useEffect } from "react";
import NoteCard from "./NoteCard";
import { useAuth } from "../context/AuthUserContext";
import useFirestore from "../firebase/useFirestore";
import {
  Flex,
  Box,
  Button,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";
export default function TodoList({
  notesList,
  projectsList,
  toggleModal,
  toggleBlur,
  currentProject,
}) {
  //chakra color mode
  const borderColor = useColorModeValue("gray.400", "gray.500");
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const addTaskBtnBg = useColorModeValue("gray.500", "gray.600");
  const addTaskBtnColor = useColorModeValue("gray.100", "gray.900");

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
  console.log(currentProject);
  return (
    <Flex
      minW="350px"
      w="350px"
      h="100%;"
      borderRadius="3px"
      as="main"
      direction="column"
      align="center"
      pos="relative"
    >
      <IconButton
        pos="absolute"
        right="12"
        bottom="8"
        fontSize="18px"
        borderRadius="100%"
        w="45px"
        h="45px"
        shadow="md"
        bg={useColorModeValue("gray.200", "gray.700")}
        _hover={{
          bg: useColorModeValue("gray.300", "gray.600"),
          color: useColorModeValue("gray.700", "gray.200"),
        }}
        color={useColorModeValue("gray.600", "gray.300")}
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
      >
        <Flex direction="column" align="center">
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
          <>
            {notesList && filteredNotes.length < 1 && (
              <Flex
                h="40px"
                w="330px"
                p="8"
                justify="center"
                alignItems="center"
                border="none"
                borderColor={borderColor}
                borderRadius="8px"
                py="4"
                bg={bgColor}
                mb="1.5"
                boxShadow="md"
                opacity=".5"
                fontFamily="Work Sans"
                fontSize="14px"
                fontWeight="600"
                pos="relative"
                color={textColor}
              >
                no tasks in this list
              </Flex>
            )}
          </>
          {/* {notesList && notesList.length < 1 && <Spinner />} */}
          {/* {loading && <Spinner />}
        {notesList.length === 0 && <p>nothing here yet</p>} */}
        </Flex>
      </Flex>
    </Flex>
  );
}
