import React from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import { numToMonth } from "../utils/formData";
export default function NoteCardDefault({
  shouldShowDetails,
  title,
  notes,
  month,
  day,
  list,
}) {
  return (
    <>
      <Flex
        direction="column"
        justify={shouldShowDetails ? "space-between" : "center"}
        pos="absolute"
        left="14"
        w={{
          base: "80%",
          md: "80%",
        }}
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
                opacity={notes !== "" ? 1 : 0.3}
              >
                {notes !== "" ? notes.toLowerCase() : "add notes here..."}
              </Text>
            </Flex>
            {/* /* THIRD ROW */}

            <Flex align="center" justify="space-between">
              <Text
                color="inherit"
                fontSize="10.5px"
                fontWeight="600"
                align="center"
                w="auto"
                pl="1px"
              >
                {list}
              </Text>

              <Flex align="center" justify="center" w="60px">
                <CalendarIcon fontSize="10px" color="gray.500" mr="1" />
                <Text fontSize="10px" color="gray.600" fontWeight="500" mr="1">
                  {day}
                </Text>
                <Text fontSize="10px" color="gray.600" fontWeight="500">
                  {numToMonth(month)}
                </Text>
              </Flex>
            </Flex>
          </>
        )}
      </Flex>
    </>
  );
}
