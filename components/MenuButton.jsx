import React, { useState, useEffect } from "react";
import { useConfirmationDialog } from "./ConfirmationDialog";
import {
  Flex,
  Heading,
  IconButton,
  Input,
  Button,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
export default function MenuButton({
  project,
  toggleModal,
  toggleBlur,
  deleteTask,
  deleteProject,
  currentProject,
  updateCurrentProject,
  notesList,
}) {
  const { getConfirmation } = useConfirmationDialog();
  const [shouldShowAdd, setShouldShowAdd] = useState(false);
  const [quantity, setQuantity] = useState(null);
  useEffect(() => {
    if (notesList) {
      const filtered = notesList.filter((note) => note.list === project.name);
      setQuantity(filtered.length);
    }
  }, [notesList]);
  const deleteTasksInList = () => {
    const filtered = notesList.filter((note) => note.list === project.name);
    console.log(filtered);
    filtered.forEach((task) => {
      deleteTask(task.id);
    });
  };
  const handleDeleteList = async (e) => {
    const confirmed = await getConfirmation({
      title: "Are you sure?",
      message: "This will delete the list " + project.name + " and its tasks.",
    });
    if (confirmed) {
      e.stopPropagation();
      updateCurrentProject("all");
      deleteProject(project.id);
      //testing
      deleteTasksInList();
    }
  };

  const bgColor = useColorModeValue("white", "gray.800");
  const activeBgColor = useColorModeValue("gray.300", "gray.900");
  const hoverColor = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const addBtnBg = useColorModeValue("gray.200", "gray.700");
  const addBtnColor = useColorModeValue("gray.800", "gray.400");

  return (
    <>
      <Flex
        as="button"
        align="center"
        //justify="space-between"
        pos="relative"
        onMouseEnter={() => setShouldShowAdd(true)}
        onMouseLeave={() => setShouldShowAdd(false)}
        onClick={() => updateCurrentProject(project.name)}
        _hover={{ bg: hoverColor }}
        bg={currentProject === project.name ? activeBgColor : bgColor}
      >
        <Flex align="center">
          <Box
            fontSize="16px"
            fontWeight="600"
            letterSpacing=".5px"
            mx="0"
            my="1"
            borderRadius="0"
            bg="inherit"
            color={textColor}
            key={project.id}
            justifyContent="flex-start"
            w="100%"
            pos="relative"
            _hover={{ bg: "transparent" }}
            px="6"
          >
            {project.name}
          </Box>
          {quantity > 0 && (
            <Flex
              fontSize="11px"
              color="primary"
              fontWeight="800"
              w="20px"
              h="20px"
              bg="transparent"
              borderRadius="100%"
              justify="center"
              align="center"
              m="0"
              p="4"
            >
              {quantity}
            </Flex>
          )}
        </Flex>
        {shouldShowAdd && (
          <Flex bg="transparent" pos="absolute" right="0">
            <IconButton
              fontSize="10px"
              borderRadius="100%"
              w="25px"
              h="25px"
              m="0"
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
            />
            <IconButton
              fontSize="12px"
              borderRadius="100%"
              w="25px"
              h="25px"
              ml="1"
              mr="1"
              opacity="0.7"
              bg={useColorModeValue("gray.200", "gray.700")}
              _hover={{
                bg: useColorModeValue("gray.300", "gray.600"),
                color: useColorModeValue("red.800", "gray.200"),
                opacity: 1,
              }}
              color="red"
              icon={<DeleteIcon />}
              onClick={(e) => {
                handleDeleteList(e);
              }}
            />
          </Flex>
        )}
      </Flex>
    </>
  );
}
