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
  Text,
} from "@chakra-ui/react";
import { AddIcon, CheckIcon } from "@chakra-ui/icons";
import { useAuth } from "../context/AuthUserContext";
import useFirestore from "../firebase/useFirestore";

export default function Menu({
  notesList,
  projectsList,
  toggleModal,
  toggleBlur,

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
  //error
  const [error, setError] = useState(false);

  //outside click
  const inputRef = useRef();
  const handleOutsideClick = () => {
    setShouldShowAdd(false);
    setError(false);
  };
  useOutsideClickHandler(inputRef, () => {
    handleOutsideClick();
  });
  const deleteTask = (id) => {
    const docRef = doc(db, "users", "USER_" + authUser.uid, "tasks", id);
    deleteDoc(docRef).then(() => {});
  };

  const handleSaveProject = () => {
    if (project) {
      if (!projectsList || !projectsList.some((p) => p.name === project)) {
        setShouldShowAdd(false);
        addDoc(collection(db, "users", "USER_" + authUser.uid, "projects"), {
          name: project,
        }).then(() => {
          console.log("PROJECT SAVED");
        });
        updateCurrentProject(project);
      }
    } else {
      setError(true);
    }
  };
  const handleAddClick = () => {};
  const bgColor = useColorModeValue("white", "gray.800");
  const btnBgColor = useColorModeValue("white", "gray.800");
  const btnActiveBgColor = useColorModeValue("gray.300", "gray.900");
  const hoverColor = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const addListBtnBg = useColorModeValue("gray.200", "gray.700");
  const addListBtnColor = useColorModeValue("gray.800", "gray.400");
  console.log(projectsList);
  return (
    <Flex
      h="100%"
      w="250px"
      bg={bgColor}
      borderRadius="8px"
      shadow="md"
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
            px="6"
          >
            MY LISTS
          </Heading>
        ) : (
          <Input
            maxLength="30"
            fontSize="15px"
            fontWeight="600"
            opacity="0.6"
            p="3"
            ml="3"
            height="30px"
            w="80%"
            placeholder={error ? "list name required" : ""}
            borderColor={error ? "red" : "inherit"}
            onChange={(e) => setProject(e.target.value)}
          />
        )}
        <IconButton
          fontSize="14px"
          borderRadius="100%"
          w="35px"
          h="35px"
          shadow="sm"
          bg={useColorModeValue("gray.200", "gray.700")}
          _hover={{
            bg: useColorModeValue("gray.300", "gray.600"),
            color: useColorModeValue("gray.700", "gray.200"),
          }}
          color={useColorModeValue("gray.600", "gray.300")}
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
          _hover={{ bg: hoverColor }}
          cursor="pointer"
          bg={currentProject === "all" ? btnActiveBgColor : btnBgColor}
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
            color={textColor}
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
            {projectsList
              .sort((a, b) => (a.name > b.name && 1) || -1)
              .map((project) => {
                return (
                  <MenuButton
                    key={project.id}
                    project={project}
                    toggleModal={toggleModal}
                    toggleBlur={toggleBlur}
                    deleteProject={deleteProject}
                    currentProject={currentProject}
                    updateCurrentProject={updateCurrentProject}
                    notesList={notesList}
                    deleteTask={deleteTask}
                  />
                );
              })}
          </>
        )}
      </Flex>
    </Flex>
  );
}
