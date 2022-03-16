import React from "react";
import { months, calculateDays } from "../utils/formData";
import {
  Flex,
  Select,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";
import { CalendarIcon, TriangleDownIcon } from "@chakra-ui/icons";

export default function NoteCardEditing({
  shouldShowDetails,
  title,
  notes,
  month,
  day,
  list,
  projectsList,
  setTitle,
  setNotes,
  setList,
  setMonth,
  setDay,
}) {
  console.log(notes);
  return (
    <>
      <Flex
        direction="column"
        justify={shouldShowDetails ? "space-between" : "center"}
        pos="absolute"
        left="14"
        w={{
          base: "75%",
          md: "70%",
        }}
        h="100%"
        py="3"
      >
        {/* FIRST ROW */}

        <Editable
          defaultValue={title}
          fontSize="12px"
          fontWeight="500"
          letterSpacing=".5px"
          color="inherit"
          onChange={(e) => setTitle(e.toLowerCase())}
          startWithEditView="true"
          mt="0.25"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <EditablePreview
            w={{
              base: "100%",
              md: "250px",
            }}
          />
          <EditableInput
            letterSpacing=".5px"
            w={{
              base: "100%",
              md: "250px",
            }}
            maxLength="40"
          />
        </Editable>

        {shouldShowDetails && (
          <>
            <Editable
              mt="-4"
              fontSize="12px"
              fontWeight="300"
              color="inherit"
              letterSpacing="0.5px"
              defaultValue={notes}
              placeholder={notes !== "" ? notes : "add notes here"}
              onChange={(e) => setNotes(e.toLowerCase())}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <EditablePreview
                mt="2"
                w={{
                  base: "100%",
                  md: "250px",
                }}
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
              />
              <EditableInput
                w={{
                  base: "100%",
                  md: "250px",
                }}
                letterSpacing="0.5px"
                my="1"
                maxLength="68"
              />
            </Editable>
            <Flex h="15px" />
            <Flex
              pos="absolute"
              bottom="4"
              align="center"
              justify="space-between"
              w="100%"
            >
              <Select
                icon={<TriangleDownIcon />}
                iconSize="9px"
                borderRadius="4px"
                border="0.5px solid"
                borderColor="gray.500"
                color="gray.500"
                w="90px"
                px="0"
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                h="16px"
                fontSize="11px"
                fontWeight="500"
                defaultValue={list ? list : "select project"}
                onChange={(e) => setList(e.target.value.toLowerCase())}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <option key="defaultproject" value="all">
                  all
                </option>
                {projectsList.map((project) => {
                  return <option key={project.id}>{project.name}</option>;
                })}
              </Select>

              <Flex
                borderRadius="4px"
                border="0.5px solid"
                borderColor="gray.600"
                align="center"
                h="16px"
                ml="3.5rem"
              >
                <CalendarIcon fontSize="11px" mx={2} />

                <Select
                  mr="-4"
                  ml="-4"
                  icon={<TriangleDownIcon />}
                  iconSize="9px"
                  border="none"
                  width="50px"
                  defaultValue={day ? day : 1}
                  onChange={(e) => setDay(e.target.value)}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
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
                  onChange={(e) => setMonth(e.target.value)}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
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
            </Flex>
          </>
        )}
      </Flex>
    </>
  );
}
