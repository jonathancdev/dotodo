import React, { useState, useRef } from "react";
import NoteCardDefault from "./NoteCardDefault";
import NoteCardEditing from "./NoteCardEditing";
import { Flex, useColorModeValue } from "@chakra-ui/react";

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
      minH="40px"
      w="99%"
      w="320px"
      alignItems="center"
      key={note.id}
      border="none"
      borderColor={borderColor}
      borderRadius="8px"
      py="4"
      pr="1"
      bg="white"
      my="1"
      shadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
      fontFamily="Work Sans"
      pos="relative"
    >
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
