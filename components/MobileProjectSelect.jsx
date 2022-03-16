import React from "react";
import { Select, useColorModeValue } from "@chakra-ui/react";
export default function MobileProjectSelect({
  currentProject,
  updateCurrentProject,
  projectsList,
}) {
  return (
    <Select
      bg={useColorModeValue("gray.100", "gray.900")}
      fontSize="15px"
      fontWeight="600"
      color={useColorModeValue("gray.600", "gray.400")}
      letterSpacing="1px"
      h="3rem"
      borderRadius="8px"
      border="none"
      iconSize="30px"
      value={currentProject.name === "all" ? "all" : currentProject.name}
      onChange={(e) => {
        updateCurrentProject(e.target.value);
      }}
    >
      <option key="defaultprojectmobile" value="all">
        all tasks
      </option>
      {projectsList &&
        projectsList.map((project) => {
          return (
            <option key={project.id} value={project.name}>
              {project.name}
            </option>
          );
        })}
    </Select>
  );
}
