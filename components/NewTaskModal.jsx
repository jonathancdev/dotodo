import React, { useState, useRef } from "react";
import { months, calculateDays } from "../utils/formData";
import useOutsideClickHandler from "../hooks/useOutsideClickHandler";
import {
  Flex,
  Box,
  Input,
  Button,
  FormControl,
  Container,
  Textarea,
  Select,
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

  const createTaskObj = () => {
    const obj = {
      list: listRef.current.value.toLowerCase(),
      title: titleRef.current.value.toLowerCase(),
      notes: notesRef.current.value.toLowerCase(),
      month: monthRef.current.value,
      day: dayRef.current.value,
    };
    return obj;
  };
  const handleClick = () => {
    const obj = createTaskObj();
    handleSaveSubmit(obj);
    toggleModal();
  };

  return (
    <Flex
      pos="absolute"
      w="100vw"
      h="100vh"
      justify="center"
      align="center"
      bg="transparent"
      zIndex="4"
    >
      <FormControl
        ref={modalRef}
        maxW="300px"
        h="300px"
        borderRadius="8px"
        bg="gray.300"
        shadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
        pos="absolute"
        top="8%"
        p="5"
      >
        <Flex direction="column">
          <Select ref={listRef} defaultValue={currentProject}>
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
          <Input
            variant="modal"
            ref={titleRef}
            maxLength="40"
            placeholder="task name"
          ></Input>
          <Textarea
            m="1"
            ref={notesRef}
            maxLength="68"
            placeholder="additional notes"
          />
          <Box m="1">Due:</Box>
          <Flex>
            <Select
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
          <Button variant="submit" onClick={handleClick} margin={2}>
            save
          </Button>
        </Flex>
      </FormControl>
    </Flex>
  );
}
