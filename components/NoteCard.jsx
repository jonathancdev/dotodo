import React, { useState, useRef } from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  Input,
  Button,
  Checkbox,
  Select,
  Textarea,
  Editable,
  EditableInput,
  EditablePreview,
  useColorModeValue,
} from "@chakra-ui/react";

export default function NoteCard({
  note,
  handleDeleteSubmit,
  handleUpdateSubmit,
}) {
  const borderColor = useColorModeValue("gray.400", "gray.500");
  const [editing, setEditing] = useState(false);
  const [shouldShowDetails, setShouldShowDetails] = useState(false);
  const [value, setValue] = useState(note.text);
  const [notesValue, setNotesValue] = useState("should come from firestore");
  const inputRef = useRef();
  const textareaRef = useRef();
  const handleUpdate = () => {
    console.log(inputRef.current.value);
    handleUpdateSubmit(inputRef.current.value, note.id);
  };
  const toggleDetails = () => {
    setShouldShowDetails(!shouldShowDetails);
  };
  console.log(value, notesValue);
  return (
    <Flex
      w="90%"
      alignItems="center"
      key={note.id}
      border="2px solid"
      borderColor={borderColor}
      borderRadius="3px"
    >
      {/* DEFAULT CARD VIEW */}
      {!editing && (
        <Flex direction="column">
          {/* FIRST CARD ROW */}
          <Flex align="center">
            <Checkbox></Checkbox>
            <Text>{note.text}</Text>
            <Button variant="details" onClick={toggleDetails}>
              details
            </Button>
            <Box>Month</Box>
            <Box>Day</Box>
            <Button variant="edit" m={2} onClick={() => setEditing(true)}>
              edit
            </Button>
            <Button
              variant="delete"
              m={2}
              onClick={() => handleDeleteSubmit(note.id)}
            >
              delete
            </Button>
          </Flex>
          {/* EXPANDED ROW */}
          {shouldShowDetails && (
            <Flex align="center">
              <Box>additional notes</Box>
              <Flex direction="column">
                <Box>created Month Day</Box>
                <Box>List</Box>
              </Flex>
            </Flex>
          )}
        </Flex>
      )}

      {/* EDITING CARD VIEW */}
      {editing && (
        <Flex direction="column">
          {/* FIRST CARD ROW */}
          <Flex align="center">
            <Checkbox></Checkbox>
            <Editable
              defaultValue={value}
              onChange={() => setValue(inputRef.current.value)}
            >
              <EditablePreview />
              <EditableInput ref={inputRef} />
            </Editable>
            <Button variant="details" onClick={toggleDetails}>
              details
            </Button>
            <Box>Month</Box>
            <Box>Day</Box>

            <Button variant="edit" m={2} onClick={handleUpdate}>
              save
            </Button>
            <Button
              variant="delete"
              m={2}
              onClick={() => handleDeleteSubmit(note.id)}
            >
              delete
            </Button>
          </Flex>
          <Flex align="center">
            {/* EDITABLE INPUT */}
            <Editable
              defaultValue={notesValue}
              onChange={() => setValue(textareaRef.current.value)}
            >
              <EditablePreview />
              <EditableInput ref={textareaRef} />
            </Editable>
            {/* <Box h="60px" width="100px">
              <Textarea isDisabled pos="absolute" value={notesValue} />
              <Textarea
                pos="absolute"
                ref={textareaRef}
                onChange={() => setNotesValue(textareaRef.current.value)}
              />
            </Box> */}
            <Flex direction="column">
              <Flex>
                <Select placeholder="Month"></Select>
                <Select placeholder="Day"></Select>
              </Flex>
              <Select placeholder="List"></Select>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}
