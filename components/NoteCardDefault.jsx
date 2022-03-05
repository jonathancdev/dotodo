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
      <Flex
        direction="column"
        justify={shouldShowDetails ? "space-between" : "center"}
        pos="absolute"
        left="14"
        w="255px"
        // border="0.5px solid"
        h="100%"
        py="5"
      >
        {/* FIRST ROW */}

        <Flex>
          <Text
            fontSize="12px"
            fontWeight="500"
            color="inherit"
            letterSpacing=".5px"
          >
            {title.toLowerCase()}
          </Text>
        </Flex>

        {shouldShowDetails && (
          <>
            {/* /* SECOND ROW */}
            <Flex minH="30px" align="center">
              <Text
                fontSize="12px"
                fontWeight="300"
                color="inherit"
                letterSpacing=".5px"
              >
                {notes.toLowerCase()}
              </Text>
            </Flex>
            {/* /* THIRD ROW */}

            <Flex align="center" justify="space-between">
              <Flex
                color="inherit"
                fontSize="10.5px"
                fontWeight="600"
                align="center"
                w="auto"
                pl="1px"
              >
                {list}
              </Flex>

              <Flex align="center" justify="center" w="60px">
                <CalendarIcon fontSize="10px" color="gray.500" mr="1" />
                <Box fontSize="10px" color="gray.600" fontWeight="500" mr="1">
                  {day}
                </Box>
                <Box fontSize="10px" color="gray.600" fontWeight="500">
                  {numToMonth(month)}
                </Box>
              </Flex>
            </Flex>
          </>
        )}
      </Flex>
    </>
  );
}
