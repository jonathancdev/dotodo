import React from "react";
import { months, calculateDays, numToMonth } from "../utils/formData";
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
  CheckIcon,
  TriangleDownIcon,
} from "@chakra-ui/icons";

export default function NoteCardEditing({
  setCompleted,
  toggleDetails,
  shouldShowDetails,
  setShouldShowDetails,
  setEditing,
  handleDeleteSubmit,
  completed,
  title,
  notes,
  month,
  day,
  list,
  id,
  projectsList,
  handleUpdate,
  setTitle,
  setNotes,
  setList,
  setMonth,
  setDay,
}) {
  console.log(month);
  console.log(typeof month);
  return (
    <>
      <Flex direction="column" justify="space-between" w="100%">
        {/* FIRST CARD ROW */}
        <Flex direction="column">
          <Flex align="center" justify="space-between">
            <Flex align="center">
              <Spacer w="18px" p="1" mx="3"></Spacer>

              <Editable
                lineHeight="1.2"
                defaultValue={title}
                px={1}
                m={0}
                w="250px"
                fontSize="12px"
                fontWeight="500"
                letterSpacing=".5px"
                whiteSpace="nowrap"
                overflow="hidden"
                color="gray.600"
                onChange={(e) => setTitle(e.toLowerCase())}
              >
                <EditablePreview w="250px" />
                <EditableInput w="250px" maxLength="40" />
              </Editable>
              {shouldShowDetails && (
                <IconButton
                  pos="absolute"
                  top="4"
                  right="1"
                  size="sm"
                  fontSize="19px"
                  bg="transparent"
                  color="primary"
                  variant="iconTodoClose"
                  aria-label="edit task"
                  onClick={() => setEditing(false)}
                  icon={<SmallCloseIcon />}
                />
              )}
            </Flex>
          </Flex>

          <Flex w="100%" justify="space-between">
            <Flex w="100%" align="center">
              {shouldShowDetails && (
                <>
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

                  <Editable
                    fontSize="12px"
                    fontWeight="300"
                    w="250px"
                    px="1"
                    letterSpacing="0.25px"
                    lineHeight="1.2"
                    defaultValue={notes}
                    onChange={(e) => setNotes(e.toLowerCase())}
                  >
                    <EditablePreview w="250px" />
                    <EditableInput w="250px" maxLength="68" />
                  </Editable>
                </>
              )}

              <Flex w="10%" justify="end">
                <IconButton
                  mr="1"
                  size="sm"
                  fontSize="12px"
                  color="purple"
                  variant="iconTodo"
                  aria-label="save task"
                  icon={<CheckIcon />}
                  onClick={handleUpdate}
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        {/* EXPANDED ROW */}

        <Flex ml="33px" justify="space-between">
          <Select
            mr="-6"
            icon={<TriangleDownIcon />}
            iconSize="9px"
            ml="-4"
            border="none"
            width="75px"
            defaultValue={list ? list : "select project"}
            onChange={(e) => setList(e.target.value.toLowerCase())}
          >
            {projectsList.map((project) => {
              return <option key={project}>{project}</option>;
            })}
          </Select>
          <Flex align="center" pr="3">
            <CalendarIcon fontSize="13px" mx={2} />

            <Select
              mr="-6"
              ml="-4"
              icon={<TriangleDownIcon />}
              iconSize="9px"
              border="none"
              width="50px"
              defaultValue={day ? day : 1}
              onChange={(e) => setDay(e.target.value)}
            >
              {calculateDays(month).map((day) => {
                return (
                  <option key={day} value={day}>
                    {day}
                  </option>
                );
              })}
            </Select>
            <Select
              icon={<TriangleDownIcon />}
              iconSize="9px"
              border="none"
              width="57px"
              defaultValue={month ? month : "select project"}
              //placeholder={"-"}
              onChange={(e) => setMonth(e.target.value)}
            >
              {months.map((item) => {
                return (
                  <option
                    selected={item[0] === month ? true : false}
                    key={item[0]}
                    value={item[0]}
                  >
                    {item[1].substring(0, 3)}
                  </option>
                );
              })}
            </Select>
          </Flex>
          <Flex>
            <IconButton
              mr="2"
              size="sm"
              color="red"
              variant="iconTodo"
              aria-label="delete task"
              icon={<DeleteIcon />}
              onClick={() => handleDeleteSubmit(id)}
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
