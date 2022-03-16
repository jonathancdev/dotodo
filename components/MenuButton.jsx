import React, { useState, useEffect } from "react";
//import { useConfirmationDialog } from "./ConfirmationDialog";
import { Flex, Text, IconButton, useColorModeValue } from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
export default function MenuButton({
  project,
  toggleModal,
  deleteTask,
  deleteProject,
  currentProject,
  updateCurrentProject,
  notesList,
  handleDeleteList,
}) {
  const bgColor = useColorModeValue("white", "gray.800");
  const btnBgColor = useColorModeValue("white", "gray.800");
  const activeBgColor = useColorModeValue("gray.300", "gray.900");
  const hoverColor = useColorModeValue("gray.100", "gray.900");
  const iconBgColor = useColorModeValue("gray.200", "gray.700");
  const iconBgHover = useColorModeValue("gray.300", "gray.600");
  const deleteHover = useColorModeValue("red.800", "red.600");
  const textColor = useColorModeValue("gray.600", "gray.300");

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
    filtered.forEach((task) => {
      deleteTask(task.id);
    });
  };

  return (
    <>
      <Flex
        align="center"
        pos="relative"
        onMouseEnter={() => setShouldShowAdd(true)}
        onMouseLeave={() => setShouldShowAdd(false)}
        onClick={() => updateCurrentProject(project.name)}
        _hover={{ bg: hoverColor }}
        bg={currentProject.name === project.name ? activeBgColor : bgColor}
      >
        <Flex align="center" cursor="pointer">
          <Flex
            mx="0"
            my="3"
            borderRadius="0"
            bg="inherit"
            align="center"
            w="100%"
            h="100%"
            pos="relative"
            _hover={{ bg: "transparent" }}
            px="6"
          >
            <Text fontSize="18px" fontWeight="500" letterSpacing="1px">
              {project.name}
            </Text>
          </Flex>
          {quantity > 0 && (
            <Flex
              fontSize="10px"
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
              ml="-4"
              opacity=".7"
            >
              {quantity}
            </Flex>
          )}
        </Flex>
        <Flex
          bg="transparent"
          pos="absolute"
          right="0"
          opacity={shouldShowAdd ? "1" : ".2"}
        >
          <IconButton
            fontSize="10px"
            borderRadius="100%"
            w="25px"
            h="25px"
            m="0"
            color={textColor}
            bg={shouldShowAdd ? iconBgColor : "transparent"}
            _hover={{
              bg: iconBgHover,
            }}
            icon={<AddIcon />}
            onClick={() => {
              toggleModal();
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
            bg={shouldShowAdd ? iconBgColor : "transparent"}
            _hover={{
              color: deleteHover,
              opacity: 1,
            }}
            color="red"
            icon={<DeleteIcon />}
            onClick={(e) => {
              handleDeleteList(e, project);
            }}
          />
        </Flex>
      </Flex>
    </>
  );
}
