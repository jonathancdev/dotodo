import React, { useState, useRef } from "react";

import {
  Flex,
  Spacer,
  Box,
  Text,
  Button,
  Checkbox,
  Select,
  IconButton,
  Editable,
  EditableInput,
  EditablePreview,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  CalendarIcon,
  EditIcon,
  DeleteIcon,
  SmallCloseIcon,
  CheckCircleIcon,
} from "@chakra-ui/icons";

import { months, calculateDays } from "../utils/formData";
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
      minH="50px"
      w="99%"
      w="320px"
      alignItems="center"
      key={note.id}
      border="2px solid"
      borderColor={borderColor}
      borderRadius="3px"
      py="1"
    >
      {/* DEFAULT CARD VIEW */}
      {!editing && (
        <Flex direction="column" justify="space-between" w="100%">
          {/* FIRST CARD ROW */}
          <Flex direction="column">
            <Flex align="center" justify="space-between">
              <Flex align="center">
                {shouldShowDetails ? (
                  <Spacer w="18px" p="1" mx="3"></Spacer>
                ) : (
                  <Checkbox
                    p="1"
                    mx={3}
                    height="18px"
                    width="18px"
                    size="lg"
                    iconColor="gray.500"
                    borderColor="gray.300"
                    isChecked={completed}
                    onChange={() => setCompleted(!completed)}
                  ></Checkbox>
                )}
                <Text
                  p="1"
                  fontSize="13px"
                  fontWeight="300"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  color="gray.700"
                >
                  {title.toLowerCase()}
                </Text>
              </Flex>
              {!shouldShowDetails && (
                <Button variant="todoDetails" onClick={toggleDetails}>
                  <Box
                    h="4px"
                    w="4px"
                    bg="primary"
                    borderRadius="100%"
                    m="0.5"
                  ></Box>
                  <Box
                    h="4px"
                    w="4px"
                    bg="primary"
                    borderRadius="100%"
                    m="0.5"
                  ></Box>
                  <Box
                    h="4px"
                    w="4px"
                    bg="primary"
                    borderRadius="100%"
                    m="0.5"
                  ></Box>
                </Button>
              )}
            </Flex>

            <Flex w="100%" justify="space-between">
              <Flex align="center">
                {shouldShowDetails && (
                  <>
                    <Checkbox
                      p="1"
                      mx={3}
                      height="18px"
                      width="18px"
                      size="lg"
                      iconColor="gray.500"
                      borderColor="gray.300"
                      isChecked={completed}
                      onChange={() => setCompleted(!completed)}
                    ></Checkbox>
                    <Text variant="details" w="200px" p="1">
                      {note.notes}
                    </Text>
                  </>
                )}
                {shouldShowDetails && (
                  <Flex justify="end">
                    <IconButton
                      size="sm"
                      fontSize="12px"
                      bg="purple"
                      variant="iconTodo"
                      aria-label="edit task"
                      icon={<EditIcon />}
                      onClick={() => setEditing(true)}
                    />
                    <IconButton
                      size="sm"
                      fontSize="12px"
                      bg="red"
                      variant="iconTodo"
                      aria-label="delete task"
                      icon={<DeleteIcon />}
                      onClick={() => handleDeleteSubmit(note.id)}
                    />
                    <IconButton
                      size="sm"
                      fontSize="20px"
                      bg="transparent"
                      color="primary"
                      variant="iconTodoClose"
                      aria-label="edit task"
                      onClick={() => setShouldShowDetails(false)}
                      icon={<SmallCloseIcon />}
                    />
                  </Flex>
                )}
              </Flex>
            </Flex>
          </Flex>
          {/* EXPANDED ROW */}
          {shouldShowDetails && (
            <Flex ml="33px" justify="space-between">
              <Flex
                bg="gray.400"
                px="5"
                color="white"
                fontSize="10px"
                fontWeight="800"
                borderRadius="4px"
                my="1"
              >
                {note.list}
              </Flex>
              <Flex align="center" pr="3">
                <CalendarIcon fontSize="13px" mx={2} />
                <Box fontSize="11px" mx={0.5}>
                  {note.month}
                </Box>
                <Box fontSize="11px" mx={0.5}>
                  {note.day}
                </Box>
              </Flex>
            </Flex>
          )}
        </Flex>
      )}

      {/* EDITING CARD VIEW */}
      {editing && (
        <Flex direction="column" justify="space-between" w="100%">
          {/* FIRST CARD ROW */}
          <Flex direction="column">
            <Flex align="center" justify="space-between">
              <Flex align="center">
                <Spacer w="18px" p="1" mx="3"></Spacer>

                <Editable
                  defaultValue={title}
                  px={1}
                  m={0}
                  fontSize="13px"
                  fontWeight="300"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  color="gray.700"
                  onChange={(e) => setTitle(e.toLowerCase())}
                >
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </Flex>
            </Flex>

            <Flex w="100%" justify="space-between">
              <Flex align="center">
                {shouldShowDetails && (
                  <>
                    <Checkbox
                      p="1"
                      mx={3}
                      height="18px"
                      width="18px"
                      size="lg"
                      iconColor="gray.500"
                      borderColor="gray.300"
                      isChecked={completed}
                      onChange={() => setCompleted(!completed)}
                    ></Checkbox>
                    {/* <Text variant="details" w="200px" p="1">
                      {note.notes}
                    </Text> */}
                    <Editable
                      w="200px"
                      p="1"
                      defaultValue={notes}
                      onChange={(e) => setNotes(e.toLowerCase())}
                    >
                      <EditablePreview />
                      <EditableInput />
                    </Editable>
                  </>
                )}

                <Flex justify="end">
                  <IconButton
                    size="sm"
                    fontSize="12px"
                    bg="purple"
                    variant="iconTodo"
                    aria-label="save task"
                    icon={<CheckCircleIcon />}
                    onClick={handleUpdate}
                  />
                  <IconButton
                    size="sm"
                    fontSize="12px"
                    bg="red"
                    variant="iconTodo"
                    aria-label="delete task"
                    icon={<DeleteIcon />}
                    onClick={() => handleDeleteSubmit(note.id)}
                  />
                  <IconButton
                    size="sm"
                    fontSize="20px"
                    bg="transparent"
                    color="primary"
                    variant="iconTodoClose"
                    aria-label="edit task"
                    onClick={() => {
                      setShouldShowDetails(false);
                      setEditing(false);
                    }}
                    icon={<SmallCloseIcon />}
                  />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          {/* EXPANDED ROW */}

          <Flex ml="33px" justify="space-between">
            <Select
              bg="gray.400"
              px="5"
              //color="white"
              fontSize="10px"
              fontWeight="800"
              borderRadius="4px"
              my="1"
              placeholder={list ? list : "select project"}
              onChange={(e) => setList(e.target.value.toLowerCase())}
            >
              {projectsList.map((project) => {
                return <option key={project}>{project}</option>;
              })}
            </Select>
            <Flex align="center" pr="3">
              <CalendarIcon fontSize="13px" mx={2} />
              <Select
                bg="gray.400"
                px="5"
                //color="white"
                fontSize="10px"
                fontWeight="800"
                borderRadius="4px"
                my="1"
                placeholder={month ? month : "-"}
                onChange={(e) => setMonth(e.target.value)}
              >
                {months.map((month) => {
                  return (
                    <option key={month[0]} value={month[0]}>
                      {month[1]}
                    </option>
                  );
                })}
              </Select>
              <Select
                bg="gray.400"
                //color="white"
                fontSize="10px"
                fontWeight="800"
                borderRadius="4px"
                my="1"
                defaultValue={day ? day : 1}
                onChange={(e) => setDay(e.target.value)}
              >
                {calculateDays(1).map((day) => {
                  return (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  );
                })}
              </Select>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}
