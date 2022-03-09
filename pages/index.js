import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthUserContext";
import useFirestore from "../firebase/useFirestore";

import {
  Flex,
  Heading,
  Text,
  Spinner,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import ChakraNextLinkButton from "../components/ChakraNextLinkButton";
import TodoList from "../components/TodoList";
import Menu from "../components/Menu";
import NewTaskModal from "../components/NewTaskModal";

export default function Home({ toggleBlur }) {
  const {
    db,
    collection,
    getDocs,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
  } = useFirestore();

  //chakra color mode
  const bgColor = useColorModeValue("gray.200", "gray.900");

  const { authUser, loading } = useAuth();
  const [spinnerShouldShow, setSpinnerShouldShow] = useState(true);
  const [projectsList, setProjectsList] = useState(null);
  const [currentProject, setCurrentProject] = useState("all");
  const [notesList, setNotesList] = useState([]);
  const [shouldModalShow, setShouldModalShow] = useState(false);

  useEffect(() => {
    if (authUser) {
      onSnapshot(
        collection(db, "users", "USER_" + authUser.uid, "projects"),
        (snapshot) => {
          const projects = [];
          snapshot.docs.forEach((doc) => {
            projects.push({ ...doc.data(), id: doc.id });
          });
          if (projects.length > 0) {
            setProjectsList(projects);
          } else {
            setProjectsList([]);
          }
        }
      );
    }
  }, [loading]);

  useEffect(() => {
    if (authUser) {
      onSnapshot(
        collection(db, "users", "USER_" + authUser.uid, "tasks"),
        (snapshot) => {
          const notes = [];
          snapshot.docs.forEach((doc) => {
            notes.push({ ...doc.data(), id: doc.id });
          });
          if (notes.length > 0) {
            setNotesList(notes);
          } else {
            setNotesList([]);
          }
        }
      );
    }
  }, [loading]);

  const handleSaveSubmit = (obj) => {
    // setLoading(true);
    const { list, title, notes, month, day, timestamp } = obj;
    addDoc(collection(db, "users", "USER_" + authUser.uid, "tasks"), {
      list: list,
      title: title,
      notes: notes,
      month: parseInt(month, 10),
      day: parseInt(day, 10),
      completed: false,
      timestamp: timestamp,
    }).then(() => {
      console.log("NEW TASK ADDED");
    });
  };

  const deleteProject = (id) => {
    deleteDoc(
      doc(db, "users", "USER_" + authUser.uid, "projects", id),
      {}
    ).then(() => {
      console.log("PROJECT DELETED");
    });
  };

  const toggleModal = () => {
    setShouldModalShow(!shouldModalShow);
  };

  const updateCurrentProject = (project) => {
    setCurrentProject(project);
  };

  console.log(currentProject);
  return (
    <Box
      as="main"
      w="100%"
      minH="100vh"
      h="100vh"
      direction="column"
      pos="relative"
    >
      {!authUser && !loading && (
        <>
          <Flex mb={8}>
            <Heading size="md">Welcome to</Heading>
            <Heading variant="logo" size="sm" mx={3} mt={0.5}>
              DO_TODO
            </Heading>
            <Heading size="md">!</Heading>
          </Flex>
          <Flex>
            <ChakraNextLinkButton
              variant="primary"
              href="/signin"
              text="sign in"
            />
            <ChakraNextLinkButton
              variant="primary"
              href="/signup"
              text="sign up"
            />
          </Flex>
        </>
      )}

      <Flex
        direction={{
          base: "column",
          md: "row",
        }}
        align={{
          base: "center",
          md: "start",
        }}
        minH="0"
        //height must be 100 on md
        height="100%"
        maxH="88vh"
        w="100%"
        bg={bgColor}
        pl="4"
        py="4"
        //
        overflow="hidden"
      >
        {!loading && authUser && (
          <Menu
            notesList={notesList}
            projectsList={projectsList}
            toggleModal={toggleModal}
            toggleBlur={toggleBlur}
            deleteProject={deleteProject}
            currentProject={currentProject}
            updateCurrentProject={updateCurrentProject}
          />
        )}
        {!loading && authUser && (
          <TodoList
            toggleModal={toggleModal}
            toggleBlur={toggleBlur}
            notesList={notesList}
            projectsList={projectsList}
            currentProject={currentProject}
          />
        )}
      </Flex>

      {shouldModalShow && (
        <NewTaskModal
          handleSaveSubmit={handleSaveSubmit}
          toggleModal={toggleModal}
          toggleBlur={toggleBlur}
          projectsList={projectsList}
          currentProject={currentProject}
        />
      )}

      {authUser && loading && <Spinner />}
    </Box>
  );
}
