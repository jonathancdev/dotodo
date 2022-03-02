import React, { useState, useEffect } from "react";
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
  deleteProject,
  currentProject,
  updateCurrentProject,
  notesList,
}) {
  const [shouldShowAdd, setShouldShowAdd] = useState(false);
  const [quantity, setQuantity] = useState(null);
  useEffect(() => {
    if (notesList) {
      const filtered = notesList.filter((note) => note.list === project.name);
      setQuantity(filtered.length);
    }
  }, [notesList]);

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
        _hover={{ bg: "gray.100" }}
        bg={currentProject === project.name ? "gray.300" : "white"}
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
            color="gray.600"
            key={project.id}
            justifyContent="flex-start"
            w="100%"
            pos="relative"
            _hover={{ bg: "transparent" }}
            px="6"
          >
            {project.name}
          </Box>
          <Flex
            fontSize="12px"
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
        </Flex>
        {shouldShowAdd && (
          <Flex bg="transparent" pos="absolute" right="3">
            <IconButton
              fontSize="10px"
              borderRadius="100%"
              w="25px"
              h="25px"
              mr="4"
              icon={<AddIcon />}
              onClick={toggleModal}
              bg="gray.300"
            />
            <IconButton
              fontSize="14px"
              borderRadius="100%"
              w="25px"
              h="25px"
              mr="4"
              bg="gray.300"
              color="red"
              icon={<DeleteIcon />}
              onClick={() => deleteProject(project.id)}
            />
          </Flex>
        )}
      </Flex>
    </>
  );
}
