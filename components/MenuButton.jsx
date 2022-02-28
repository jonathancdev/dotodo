import React, { useState, useEffect } from "react";
import {
  Flex,
  Heading,
  IconButton,
  Input,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
export default function MenuButton({
  project,
  toggleModal,
  deleteProject,
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
        align="center"
        //justify="space-between"
        pos="relative"
        onMouseEnter={() => setShouldShowAdd(true)}
        onMouseLeave={() => setShouldShowAdd(false)}
        onClick={() => updateCurrentProject(project.name)}
      >
        <Flex align="center">
          <Button
            fontSize="20px"
            fontWeight="600"
            letterSpacing=".5px"
            mx="0"
            my="1"
            borderRadius="0"
            bg="white"
            color="gray.600"
            key={project.id}
            justifyContent="flex-start"
            w="100%"
            pos="relative"
          >
            {project.name}
          </Button>
          <Flex>{quantity}</Flex>
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
            />
            <IconButton
              fontSize="10px"
              borderRadius="100%"
              w="25px"
              h="25px"
              mr="4"
              icon={<DeleteIcon />}
              onClick={() => deleteProject(project.id)}
            />
          </Flex>
        )}
      </Flex>
    </>
  );
}
