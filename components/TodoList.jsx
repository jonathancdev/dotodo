import React, { useState, useEffect } from "react";
import NoteCard from "./NoteCard";
import { useAuth } from "../context/AuthUserContext";
import useFirestore from "../firebase/useFirestore";
import { Flex, Text, useColorModeValue, IconButton } from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";
export default function TodoList({
  notesList,
  projectsList,
  toggleModal,
  currentProject,
}) {
  //chakra color mode
  const borderColor = useColorModeValue("gray.400", "gray.500");
  const bgColor = useColorModeValue("white", "gray.800");
  const addTaskBtnBg = useColorModeValue("gray.400", "gray.600");
  const addTaskBtnColor = useColorModeValue("gray.100", "gray.400");
  const addTaskBtnBgHover = useColorModeValue("gray.200", "gray.300");

  const { db, deleteDoc, doc, updateDoc } = useFirestore();
  const { authUser, loading } = useAuth();

  //filter noteslist based on currentProject
  const [filteredNotes, setFilteredNotes] = useState([]);
  useEffect(() => {
    const sorted = notesList.sort((a, b) => a.timestamp < b.timestamp && 1);
    if (currentProject.name === "all") {
      setFilteredNotes(sorted);
    } else {
      const filtered = sorted.filter(
        (note) => note.list === currentProject.name
      );
      setFilteredNotes(filtered);
    }
  }, [currentProject, notesList]);

  const handleDeleteSubmit = (id) => {
    const docRef = doc(db, "users", "USER_" + authUser.uid, "tasks", id);
    deleteDoc(docRef).then(() => {});
  };

  const handleUpdateSubmit = (updatedValue, id) => {
    const docRef = doc(db, "users", "USER_" + authUser.uid, "tasks", id);
    updateDoc(docRef, updatedValue).then(() => {
      // setLoading(false);
    });
    // setLoading(true);
  };

  return (
    <Flex
      minW="330px"
      w={{
        base: "95vw",
        md: "330px",
      }}
      //base must be 100% to scroll
      h={{ base: "100%", md: "100%" }}
      borderRadius="3px"
      as="main"
      direction="column"
      align="center"
      pos={{
        base: "static",
        md: "relative",
      }}
      mr="4"
      //make space for last task if overflown
      pb={{
        base: "10%",
        md: "0",
      }}
    >
      <IconButton
        pos="absolute"
        right="8%"
        bottom={{
          base: "15%",
          md: "8",
        }}
        fontSize="24px"
        borderRadius="100%"
        w="45px"
        h="45px"
        shadow="md"
        bg={addTaskBtnBg}
        _hover={{
          bg: "gray.500",
          color: addTaskBtnBgHover,
        }}
        color={addTaskBtnColor}
        icon={<AddIcon />}
        onClick={() => {
          toggleModal();
        }}
        zIndex="3"
      />
      <Flex
        width="100%"
        h={{
          base: "auto",
          md: "100%",
        }}
        //pb to make sure last items show on mobile scroll
        pb="20%"
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
            {(!filteredNotes || filteredNotes.length < 1) && (
              <Flex
                h="40px"
                w={{
                  base: "95vw",
                  md: "330px",
                }}
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
                pos="relative"
              >
                <Text fontFamily="Work Sans" fontSize="14px" fontWeight="600">
                  no tasks in this list
                </Text>
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
