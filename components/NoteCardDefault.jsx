import React from "react";
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
  ViewOffIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  SmallCloseIcon,
  CheckCircleIcon,
  MinusIcon,
  StarIcon,
} from "@chakra-ui/icons";
import { numToMonth } from "../utils/formData";
export default function NoteCardDefault({
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
}) {
  return (
    <>
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
                  iconColor="green"
                  borderColor={completed ? "green" : "red"}
                  isChecked={completed}
                  onChange={() => setCompleted(!completed)}
                ></Checkbox>
              )}
              <Text
                p="1"
                fontSize="12px"
                fontWeight="500"
                whiteSpace="nowrap"
                overflow="hidden"
                color="gray.600"
                letterSpacing=".5px"
              >
                {title.toLowerCase()}
              </Text>

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
                  onClick={() => setShouldShowDetails(false)}
                  icon={<SmallCloseIcon />}
                />
              )}
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
                  <Text
                    w="100%"
                    variant="details"
                    px="1"
                    py="2"
                    letterSpacing="0.25px"
                  >
                    {notes}
                  </Text>
                </>
              )}
              {shouldShowDetails && (
                <Flex w="10%" justify="end">
                  <IconButton
                    mr="2"
                    size="sm"
                    color="purple"
                    variant="iconTodo"
                    aria-label="edit task"
                    icon={<EditIcon />}
                    onClick={() => setEditing(true)}
                  />
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>
        {/* EXPANDED ROW */}
        {shouldShowDetails && (
          <Flex ml="33px" my=".5" mr="2" align="center" py="2.5px">
            <Flex flex-basis="4" w="150px">
              <Flex
                px="2"
                mr="3"
                color="gray.500"
                fontSize="11px"
                fontWeight="500"
                borderRadius="4px"
                border="0.5px solid"
                borderColor="gray.600"
                align="center"
                w="auto"
                h="16px"
              >
                {list}
              </Flex>
            </Flex>
            <Flex width="55%" align="center" justify="end">
              <Flex
                h="16px"
                align="center"
                justify="center"
                pr="3"
                w="60px"
                borderRadius="4px"
                border="0.5px solid"
                borderColor="gray.600"
                mr="5"
              >
                <CalendarIcon fontSize="11px" mx={1.5} color="gray.500" />

                <Box fontSize="10px" mx={0.5} color="gray.600">
                  {day}
                </Box>
                <Box fontSize="10px" ml={0.5} color="gray.600">
                  {numToMonth(month)}
                </Box>
              </Flex>

              <Flex>
                <IconButton
                  mt="-.75"
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
        )}
      </Flex>
    </>
  );
}
