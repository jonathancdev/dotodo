import React, { useState, useRef } from "react";
import MenuButton from "./MenuButton";
import { useConfirmationDialog } from "./ConfirmationDialog";
import useOutsideClickHandler from "../hooks/useOutsideClickHandler";
import {
  Flex,
  Text,
  Heading,
  IconButton,
  Input,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { AddIcon, CheckIcon } from "@chakra-ui/icons";
import { useAuth } from "../context/AuthUserContext";
import useFirestore from "../firebase/useFirestore";
import MobileProjectSelect from "./MobileProjectSelect";

export default function Menu({
  notesList,
  projectsList,
  toggleModal,
  deleteProject,
  currentProject,
  updateCurrentProject,
}) {
  const { getConfirmation } = useConfirmationDialog();
  const { db, collection, addDoc, deleteDoc, doc } = useFirestore();
  const { authUser, loading } = useAuth();
  const [shouldShowAdd, setShouldShowAdd] = useState(false);
  const [project, setProject] = useState();
  //error
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //outside click
  const inputRef = useRef();
  const inputContainerRef = useRef();

  const handleOutsideClick = () => {
    setShouldShowAdd(false);
    setError(false);
    setErrorMessage("");
  };
  useOutsideClickHandler(inputContainerRef, () => {
    handleOutsideClick();
  });
  const deleteTask = (id) => {
    const docRef = doc(db, "users", "USER_" + authUser.uid, "tasks", id);
    deleteDoc(docRef).then(() => {});
  };

  const addProjectToFirestore = (project) => {
    addDoc(collection(db, "users", "USER_" + authUser.uid, "projects"), {
      name: project,
    }).then(() => {
      console.log("PROJECT ADDED");
    });
  };

  const handleSaveProject = () => {
    if (project) {
      if (projectsList.length < 10) {
        if (!projectsList || !projectsList.some((p) => p.name === project)) {
          addProjectToFirestore(project);
          setShouldShowAdd(false);
          updateCurrentProject(project);
        }
      } else {
        setError(true);
        setErrorMessage("limit 10 lists");
        inputRef.current.value = "";
      }
    } else {
      setError(true);
      setErrorMessage("list name required");
    }
  };
  const bgColor = useColorModeValue("white", "gray.800");
  const btnBgColor = useColorModeValue("white", "gray.800");
  const btnActiveBgColor = useColorModeValue("gray.300", "gray.900");
  const hoverColor = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const iconBgColor = useColorModeValue("gray.200", "gray.700");
  const iconBgHover = useColorModeValue("gray.300", "gray.600");
  const deleteHover = useColorModeValue("red.800", "red.600");

  const deleteTasksInList = () => {
    const filtered = notesList.filter(
      (note) => note.list === currentProject.name
    );
    filtered.forEach((task) => {
      deleteTask(task.id);
    });
  };
  const handleDeleteList = async (e, project) => {
    const confirmed = await getConfirmation({
      title: "Are you sure?",
      message: "This will delete the list " + project.name + " and its tasks.",
    });
    if (confirmed) {
      e.stopPropagation();
      updateCurrentProject({ name: "all", id: "alltasksid" });
      deleteProject(project.id);
      deleteTasksInList();
    }
  };
  return (
    <Flex
      minW={{
        base: "320px",
        md: "250px",
      }}
      w={{
        base: "95vw",
        md: "250px",
      }}
      h={{
        base: "auto",
        md: "100%",
      }}
      bg={bgColor}
      borderRadius="8px"
      shadow="md"
      direction="column"
      py="5"
      mb="3"
      mr="4"
    >
      <Flex
        ref={inputContainerRef}
        align="center"
        justify={{
          base: "start",
          md: "space-between",
        }}
      >
        {!shouldShowAdd ? (
          <Heading
            fontSize={{
              base: "14px",
              md: "20px",
            }}
            fontWeight="700"
            color="primary"
            letterSpacing="0.25px"
            px="6"
          >
            MY LISTS
          </Heading>
        ) : (
          <Input
            ref={inputRef}
            maxLength="20"
            fontSize="15px"
            fontWeight="600"
            opacity="0.6"
            p="3"
            ml="3"
            height="30px"
            w="80%"
            maxW="300px"
            borderRadius="8px"
            placeholder={error ? errorMessage : "new list"}
            borderColor={error ? "red" : "inherit"}
            onChange={(e) => setProject(e.target.value)}
            autoFocus
          />
        )}
        <IconButton
          fontSize={{
            base: "10px",
            md: "14px",
          }}
          borderRadius="100%"
          w={{
            base: "25px",
            md: "25px",
          }}
          h={{
            base: "25px",
            md: "25px",
          }}
          mt={{
            base: "-1",
            md: "0",
          }}
          shadow="sm"
          bg={iconBgColor}
          _hover={{
            bg: iconBgHover,
          }}
          color={textColor}
          icon={!shouldShowAdd ? <AddIcon /> : <CheckIcon />}
          onClick={
            shouldShowAdd
              ? () => handleSaveProject()
              : () => setShouldShowAdd(true)
          }
        />
      </Flex>

      <Flex
        w="100%"
        direction="column"
        my="3"
        maxH={{
          base: "40px",
          md: "100%",
        }}
        overflow="scroll"
      >
        <Flex
          px="0"
          ml="3"
          align="center"
          display={{ base: "flex", md: "none" }}
        >
          <MobileProjectSelect
            currentProject={currentProject}
            updateCurrentProject={updateCurrentProject}
            projectsList={projectsList}
          />

          {currentProject.name !== "all" && (
            <IconButton
              fontSize="15px"
              borderRadius="100%"
              w="30px"
              h="30px"
              mx="3"
              opacity="0.7"
              bg="transparent"
              _hover={{
                bg: iconBgHover,
                color: deleteHover,
                opacity: 1,
              }}
              color="red"
              icon={<DeleteIcon />}
              onClick={(e) => {
                handleDeleteList(e, currentProject);
              }}
            />
          )}
        </Flex>
        <Flex
          align="center"
          justify="space-between"
          pos="relative"
          onClick={() => updateCurrentProject("all")}
          _hover={{ bg: hoverColor }}
          cursor="pointer"
          bg={currentProject === "all" ? btnActiveBgColor : btnBgColor}
          px="2"
          height="100%"
          display={{ base: "none", md: "flex" }}
        >
          <Flex align="center">
            <Box
              mx="4"
              my="1"
              borderRadius="0"
              bg="inherit"
              key="defaultproject"
              justifyContent="flex-start"
              w="100%"
              _hover={{ bg: "transparent" }}
            >
              <Text fontSize="18px" fontWeight="600" letterSpacing=".5px">
                all tasks
              </Text>
            </Box>
            {notesList.length > 0 && (
              <Flex
                fontSize="12px"
                color="primary"
                fontWeight="800"
                w="20px"
                h="100%"
                bg="transparent"
                borderRadius="100%"
                justify="center"
                align="center"
                m="0"
                mt="2.5px"
                px="4"
              >
                {notesList.length}
              </Flex>
            )}
          </Flex>
        </Flex>
        {projectsList && (
          <Flex direction="column" display={{ base: "none", md: "flex" }}>
            {projectsList
              .sort((a, b) => (a.name > b.name && 1) || -1)
              .map((project) => {
                return (
                  <MenuButton
                    key={project.id}
                    project={project}
                    toggleModal={toggleModal}
                    deleteProject={deleteProject}
                    currentProject={currentProject}
                    updateCurrentProject={updateCurrentProject}
                    notesList={notesList}
                    deleteTask={deleteTask}
                    handleDeleteList={handleDeleteList}
                  />
                );
              })}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
