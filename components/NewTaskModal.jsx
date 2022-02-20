import React, { useRef } from "react";
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

export default function NewTaskModal({ handleSaveSubmit }) {
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
  };
  //title maxLength should be 40
  //notes should be 80?
  return (
    <Container
      top="70%"
      border="solid"
      pos="absolute"
      maxW="320px"
      align="center"
    >
      <FormControl maxW="300px">
        <Flex direction="column">
          <Select ref={listRef} placeholder="List">
            <option value="misc">Misc</option>
          </Select>
          <Input ref={titleRef} maxLength="40" placeholder="task name"></Input>
          <Textarea
            ref={notesRef}
            maxLength="68"
            placeholder="additional notes"
          />
          <Box>Deadline:</Box>
          <Flex>
            <Select ref={monthRef} placeholder="Month">
              <option value="1">January</option>
            </Select>
            <Select ref={dayRef} placeholder="Day">
              <option value="1">1</option>
            </Select>
          </Flex>
          <Button variant="submit" onClick={handleClick} margin={2}>
            save
          </Button>
        </Flex>
      </FormControl>
    </Container>
  );
}
