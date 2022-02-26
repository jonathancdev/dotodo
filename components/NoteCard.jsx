import React, { useState, useRef } from "react";
import NoteCardDefault from "./NoteCardDefault";
import NoteCardEditing from "./NoteCardEditing";
import {
  Flex,
  Checkbox,
  Box,
  Button,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, CloseIcon, CheckIcon } from "@chakra-ui/icons";
export default function NoteCard({
  note,
  projectsList,
  handleDeleteSubmit,
  handleUpdateSubmit,
}) {
  //chakra color mode
  const borderColor = useColorModeValue("gray.400", "gray.500");

  //card view state
  const [editing, setEditing] = useState(false);
  const [shouldShowDetails, setShouldShowDetails] = useState(false);

  //card form values
  const [title, setTitle] = useState(note.title);
  const [notes, setNotes] = useState(note.notes);
  //month and day defaultVALUE, NOT SATE, should default to current date if it isn't already saved
  const [day, setDay] = useState(note.day);
  const [month, setMonth] = useState(note.month);
  const [list, setList] = useState(note.list);
  const [completed, setCompleted] = useState(note.completed);

  //event listeners
  const handleUpdate = () => {
    //pass obj w/ state values up to parent
    const obj = createObject();
    handleUpdateSubmit(obj, note.id);
    setEditing(false);
  };
  const toggleDetails = () => {
    setShouldShowDetails(!shouldShowDetails);
  };

  //organize data
  const createObject = () => {
    const obj = {
      title,
      notes,
      day,
      month,
      list,
      completed,
    };
    return obj;
  };

  return (
    <Flex
      h={shouldShowDetails ? "90px" : "40px"}
      w="320px"
      alignItems="center"
      key={note.id}
      border="none"
      borderColor={borderColor}
      borderRadius="8px"
      py="4"
      bg="white"
      mb="1.5"
      shadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
      fontFamily="Work Sans"
      pos="relative"
    >
      <Flex
        direction="column"
        justify="center"
        py="4"
        h="100%"
        pos="absolute"
        left="1"
      >
        <Checkbox
          p="1"
          mx={3}
          height="18px"
          width="18px"
          size="lg"
          iconColor="green"
          borderColor={completed ? "green" : "red"}
          isChecked={completed}
          onChange={() => setCompleted(!completed)}
        ></Checkbox>
      </Flex>
      <Flex
        direction="column"
        justify="space-between"
        py="4"
        h="100%"
        pos="absolute"
        right="2"
      >
        {!shouldShowDetails && (
          <Button variant="todoDetails" onClick={toggleDetails} mr="-1">
            <Box h="3px" w="3px" bg="primary" borderRadius="100%" mr="1"></Box>
            <Box h="3px" w="3px" bg="primary" borderRadius="100%" mr="1"></Box>
            <Box h="3px" w="3px" bg="primary" borderRadius="100%"></Box>
          </Button>
        )}
        {shouldShowDetails && (
          <>
            <IconButton
              size="sm"
              fontSize="9px"
              bg="transparent"
              color="primary"
              variant="iconTodo"
              aria-label="edit task"
              onClick={() => setShouldShowDetails(false)}
              icon={<CloseIcon />}
            />
            {!editing && (
              <IconButton
                size="sm"
                color="purple"
                variant="iconTodo"
                aria-label="edit task"
                icon={<EditIcon />}
                onClick={() => setEditing(true)}
              />
            )}
            {editing && (
              <IconButton
                size="sm"
                fontSize="12px"
                color="purple"
                variant="iconTodo"
                aria-label="save task"
                icon={<CheckIcon />}
                onClick={handleUpdate}
              />
            )}
            <IconButton
              size="sm"
              color="red"
              variant="iconTodo"
              aria-label="delete task"
              icon={<DeleteIcon />}
              onClick={() => handleDeleteSubmit(note.id)}
            />
          </>
        )}
      </Flex>
      {/* DEFAULT CARD VIEW */}
      {!editing && (
        <NoteCardDefault
          setCompleted={setCompleted}
          toggleDetails={toggleDetails}
          shouldShowDetails={shouldShowDetails}
          setShouldShowDetails={setShouldShowDetails}
          setEditing={setEditing}
          handleDeleteSubmit={handleDeleteSubmit}
          completed={completed}
          title={title}
          notes={notes}
          month={month}
          day={day}
          list={list}
          id={note.id}
        />
      )}

      {/* EDITING CARD VIEW */}
      {editing && (
        <NoteCardEditing
          setCompleted={setCompleted}
          toggleDetails={toggleDetails}
          shouldShowDetails={shouldShowDetails}
          setShouldShowDetails={setShouldShowDetails}
          setEditing={setEditing}
          handleDeleteSubmit={handleDeleteSubmit}
          completed={completed}
          title={title}
          notes={notes}
          month={month}
          day={day}
          list={list}
          id={note.id}
          projectsList={projectsList}
          handleUpdate={handleUpdate}
          setTitle={setTitle}
          setNotes={setNotes}
          setList={setList}
          setMonth={setMonth}
          setDay={setDay}
        />
      )}
    </Flex>
  );
}
