import React, { useEffect, useState } from "react";
import { Select, useColorModeValue } from "@chakra-ui/react";
export default function MobileProjectSelect({
  currentProject,
  updateCurrentProject,
  projectsList,
}) {
  const [name, setName] = useState("");
  useEffect(() => {
    setName(currentProject.name);
  }, [currentProject]);
  console.log(currentProject);
  console.log(name);
  return (
    <Select
      w="82%"
      maxW="300px"
      bg={useColorModeValue("gray.100", "gray.900")}
      fontSize="15px"
      fontWeight="600"
      color={useColorModeValue("gray.600", "gray.400")}
      letterSpacing="1px"
      h="3rem"
      borderRadius="8px"
      border="none"
      iconSize="30px"
      defaultValue={name}
      onChange={(e) => {
        updateCurrentProject(e.target.value);
      }}
    >
      <option
        selected={currentProject.name === "all"}
        key="defaultprojectmobile"
        value="all"
      >
        all tasks
      </option>
      {projectsList &&
        projectsList.map((project) => {
          return (
            <option
              selected={currentProject.name === project.name}
              key={project.id}
              value={project.name}
            >
              {project.name}
            </option>
          );
        })}
    </Select>
  );
}
