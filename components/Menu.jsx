import React, { useState, useEffect, useRef } from "react";
import MenuButton from "./MenuButton";
import useOutsideClickHandler from "../hooks/useOutsideClickHandler";
import {
  Flex,
  Heading,
  IconButton,
  Input,
  Box,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { AddIcon, CheckIcon } from "@chakra-ui/icons";
import { useAuth } from "../context/AuthUserContext";
import useFirestore from "../firebase/useFirestore";

export default function Menu({
  notesList,
  projectsList,
  toggleModal,
  deleteProject,
  currentProject,
  updateCurrentProject,
}) {
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
  // const [projectsList, setProjectsList] = useState(null);
  const [shouldShowAdd, setShouldShowAdd] = useState(false);
  const [project, setProject] = useState();

  //outside click
  const inputRef = useRef();
  const handleOutsideClick = () => {
    setShouldShowAdd(false);
  };
  useOutsideClickHandler(inputRef, () => {
    handleOutsideClick();
  });

  const handleSaveProject = () => {
    if (project) {
      setShouldShowAdd(false);
      addDoc(collection(db, "users", "USER_" + authUser.uid, "projects"), {
        name: project,
      }).then(() => {
        console.log("PROJECT SAVED");
      });
    }
  };

  return (
    <Flex
      h="100%"
      w="250px"
      bg="white"
      borderRadius="8px"
      shadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
      direction="column"
      py="5"
      flexShrink="0"
    >
      <Flex ref={inputRef} align="center" justify="space-between">
        {!shouldShowAdd ? (
          <Heading
            fontWeight="700"
            color="primary"
            letterSpacing="0.25px"
            px="3"
          >
            MY LISTS
          </Heading>
        ) : (
          <Input
            ml="3"
            height="30px"
            w="80%"
            onChange={(e) => setProject(e.target.value)}
          />
        )}
        <IconButton
          fontSize="15px"
          borderRadius="100%"
          w="35px"
          h="35px"
          icon={!shouldShowAdd ? <AddIcon /> : <CheckIcon />}
          onClick={
            shouldShowAdd
              ? () => handleSaveProject()
              : () => setShouldShowAdd(true)
          }
        />
      </Flex>

      <Flex w="100%" direction="column" my="3">
        <Flex
          align="center"
          justify="space-between"
          pos="relative"
          onClick={() => updateCurrentProject("all")}
          _hover={{ bg: "gray.100" }}
          cursor="pointer"
          bg={currentProject === "all" ? "gray.300" : "white"}
          px="2"
        >
          <Box
            fontSize="16px"
            fontWeight="600"
            letterSpacing=".5px"
            mx="4"
            my="1"
            borderRadius="0"
            bg="inherit"
            color="gray.600"
            key="defaultproject"
            justifyContent="flex-start"
            w="100%"
            _hover={{ bg: "transparent" }}
          >
            all tasks
          </Box>
        </Flex>
        {projectsList && (
          <>
            {projectsList.map((project) => {
              return (
                <MenuButton
                  key={project.id}
                  project={project}
                  toggleModal={toggleModal}
                  deleteProject={deleteProject}
                  currentProject={currentProject}
                  updateCurrentProject={updateCurrentProject}
                  notesList={notesList}
                />
              );
            })}
          </>
        )}
      </Flex>
    </Flex>
  );
}
