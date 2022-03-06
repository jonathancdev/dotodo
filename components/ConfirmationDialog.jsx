import React, { useState, useRef } from "react";
import { months, calculateDays } from "../utils/formData";
import useOutsideClickHandler from "../hooks/useOutsideClickHandler";
import {
  Flex,
  Box,
  Input,
  Text,
  Button,
  FormControl,
  FormLabel,
  Container,
  Textarea,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";

export default function ConfirmationDialog({
  showDialog,
  shouldShowDialog,
  title,
  message,
  onConfirm,
  onDismiss,
}) {
  const handleOutsideClick = () => {
    // toggleModal();
    // toggleBlur();
  };
  // useOutsideClickHandler(modalRef, () => {
  //   handleOutsideClick();
  // });

  const [error, setError] = useState(false);

  const handleClick = () => {
    // if (titleRef.current.value.length < 1) {
    //   setError(true);
    // } else {
    //   const obj = createTaskObj();
    //   handleSaveSubmit(obj);
    //   toggleModal();
    //   toggleBlur();
    // }
  };
  const handleCancel = () => {
    toggleBlur();
  };
  const textColor = useColorModeValue("gray.600", "gray.300");
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const selectColor = useColorModeValue("white", "gray.700");

  return (
    <>
      {shouldShowDialog && (
        <Flex
          top="-90"
          pos="absolute"
          w="100vw"
          h="100vh"
          justify="center"
          align="center"
          bg="transparent"
          zIndex="4"
          color={textColor}
        >
          <Flex
            direction="column"
            h="150px"
            w="300px"
            borderRadius="8px"
            bg={bgColor}
            shadow="md"
            align="center"
            justify="center"
          >
            <Box></Box>
            <Flex>
              <Button>ok</Button>
              <Button onClick={handleCancel}>cancel</Button>
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
}
