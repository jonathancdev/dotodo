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

export default function NewTaskModal({
  handleSaveSubmit,
  toggleModal,
  toggleBlur,
  projectsList,
  currentProject,
}) {
  //date
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const currentDay = date.getDate();
  const timestamp = date.getTime();
  //outside click handler
  const modalRef = useRef();
  const handleOutsideClick = () => {
    toggleModal();
    toggleBlur();
  };
  useOutsideClickHandler(modalRef, () => {
    handleOutsideClick();
  });
  //state for day and month
  const [month, setMonth] = useState(currentMonth);
  const [day, setDay] = useState(currentDay);
  //form refs
  const listRef = useRef();
  const titleRef = useRef();
  const notesRef = useRef();
  const monthRef = useRef();
  const dayRef = useRef();
  //error
  const [error, setError] = useState(false);

  const createTaskObj = () => {
    const obj = {
      list: listRef.current.value.toLowerCase(),
      title: titleRef.current.value.toLowerCase(),
      notes: notesRef.current.value.toLowerCase(),
      month: monthRef.current.value,
      day: dayRef.current.value,
      timestamp: timestamp,
    };
    return obj;
  };
  const handleClick = () => {
    if (titleRef.current.value.length < 1) {
      setError(true);
    } else {
      const obj = createTaskObj();
      handleSaveSubmit(obj);
      toggleModal();
      toggleBlur();
    }
  };
  const textColor = useColorModeValue("gray.600", "gray.300");

  const bgColor = useColorModeValue("gray.100", "gray.900");
  const selectColor = useColorModeValue("white", "gray.700");

  return (
    <Flex
      top="0"
      pos="absolute"
      w="100vw"
      h="100vh"
      justify="center"
      align="center"
      bg="transparent"
      zIndex="4"
      color={textColor}
    >
      <FormControl
        ref={modalRef}
        maxW="250px"
        h="auto"
        borderRadius="8px"
        bg={bgColor}
        shadow="md"
        pos="absolute"
        top="8%"
        p="5"
      >
        <Flex direction="column">
          <FormLabel
            htmlFor="project list"
            m="1"
            fontWeight="600"
            fontSize="11px"
          >
            Project list
          </FormLabel>

          <Select
            fontSize="12px"
            fontWeight="600"
            border="none"
            bg={selectColor}
            ref={listRef}
            defaultValue={currentProject}
          >
            <option key="defaultproject" value="all">
              all
            </option>
            {projectsList.map((project) => {
              return (
                <option key={project.id} value={project.name}>
                  {project.name}
                </option>
              );
            })}
          </Select>
          <FormLabel htmlFor="task name" m="1" fontWeight="600" fontSize="11px">
            Task name
          </FormLabel>
          <Input
            fontSize="12px"
            fontWeight="600"
            bg={selectColor}
            variant="modal"
            ref={titleRef}
            maxLength="40"
            border={error ? "1px solid" : "none"}
            placeholder={error ? "title required" : ""}
            borderColor="red"
            onChange={() => {
              if (error) {
                setError(false);
              }
            }}
          ></Input>
          <FormLabel htmlFor="notes" m="1" fontWeight="600" fontSize="11px">
            Notes
          </FormLabel>
          <Textarea
            fontSize="12px"
            border="none"
            bg={selectColor}
            m="1"
            ref={notesRef}
            maxLength="68"
            maxH="30px"
          />

          <FormLabel htmlFor="due date" m="1" fontWeight="600" fontSize="11px">
            Due date
          </FormLabel>
          <Flex>
            <Select
              border="none"
              w="60px"
              bg={selectColor}
              m="1"
              ref={dayRef}
              defaultValue={currentDay}
              onChange={(e) => {
                setDay(e.target.value);
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
              border="none"
              w="60px"
              bg={selectColor}
              m="1"
              ref={monthRef}
              defaultValue={currentMonth}
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
          <Flex w="100%" justify="center">
            <Button
              variant="primary"
              w="100px"
              onClick={handleClick}
              margin={2}
            >
              save
            </Button>
          </Flex>
        </Flex>
      </FormControl>
    </Flex>
  );
}
