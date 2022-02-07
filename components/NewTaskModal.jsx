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
      list: listRef.current.value,
      title: titleRef.current.value,
      notes: notesRef.current.value,
      month: monthRef.current.value,
      day: dayRef.current.value,
    };
    return obj;
  };
  const handleClick = () => {
    const obj = createTaskObj();
    handleSaveSubmit(obj);
  };
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
          <Input ref={titleRef} placeholder="task name"></Input>
          <Textarea ref={notesRef} placeholder="additional notes" />
          <Box>Deadline:</Box>
          <Flex>
            <Select ref={monthRef} placeholder="Month">
              <option value="january">January</option>
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
