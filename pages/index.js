import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthUserContext";
import useFirestore from "../firebase/useFirestore";

import {
  Flex,
  Heading,
  Spinner,
  Box,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import ChakraNextLinkButton from "../components/ChakraNextLinkButton";
import TodoList from "../components/TodoList";
import Menu from "../components/Menu";
import NewTaskModal from "../components/NewTaskModal";

export default function Home() {
  const {
    db,
    collection,
    getDocs,
    setDoc,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
  } = useFirestore();

  //date
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const currentDay = date.getDate();
  const timestamp = date.getTime();

  //chakra color mode
  //keep this
  const bgColor = useColorModeValue("gray.200", "gray.900");

  const { auth, authUser, loading, signInAnonymously } = useAuth();
  const [spinnerShouldShow, setSpinnerShouldShow] = useState(true);
  const [projectsList, setProjectsList] = useState(null);

  const [currentProject, setCurrentProject] = useState({});
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
  useEffect(() => {
    if (Object.keys(currentProject).length == 0) {
      setCurrentProject({ name: "all", id: "alltasksid" });
    }
  }, [currentProject]);
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
    const obj = projectsList.find((p) => p.name === project);
    if (project === "all") {
      setCurrentProject({ name: "all", id: "alltasksid" });
    } else if (obj) {
      setCurrentProject(obj);
    } else {
      setCurrentProject({ name: project, id: "tempid" });
    }
  };

  const startTrialSession = () => {
    signInAnonymously(auth)
      .then((userCredential) => {
        const user = userCredential.user;
        createUserCollection(user);
        createListDoc(user, "get started");
        createListDoc(user, "prepare taxes :(");
        createListDoc(user, "holiday planning");
        createTaskDoc(user, {
          list: "get started",
          title: "add a new task",
          notes:
            "click + next to the correct list or at the bottom of the page ",
          month: currentMonth,
          day: currentDay,
          timestamp: timestamp,
        });
        createTaskDoc(user, {
          list: "get started",
          title: "add a new list",
          notes: "click + next to 'my lists' to start a new list",
          month: currentMonth,
          day: currentDay,
          timestamp: timestamp,
        });
        createTaskDoc(user, {
          list: "prepare taxes :(",
          title: "download work documents and receipts",
          notes: "",
          month: currentMonth,
          day: currentDay,
          timestamp: timestamp,
        });
        createTaskDoc(user, {
          list: "prepare taxes :(",
          title: "download documents from bank",
          notes: "",
          month: currentMonth,
          day: currentDay,
          timestamp: timestamp,
        });
        createTaskDoc(user, {
          list: "prepare taxes :(",
          title: "compare free vs. paid tax tools",
          notes: "IRS free file vs. Turbotax vs. taxact vs. freetaxusa???",
          month: currentMonth,
          day: currentDay,
          timestamp: timestamp,
        });
        createTaskDoc(user, {
          list: "holiday planning",
          title: "renew passport",
          notes: "send application before the end of the month",
          month: currentMonth,
          day: 28,
          timestamp: timestamp,
        });
      })
      .catch((error) => {
        console.log(error);
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // ...
      });
  };
  const createUserCollection = (user) => {
    // setLoading(true);
    const { metadata, uid, email } = user;
    // setDoc(collection(db, "users"), {
    setDoc(doc(db, "users", "USER_" + uid), {
      history: {
        id: uid,
        creationTime: metadata.creationTime,
        createdAt: metadata.createdAt,
        email: email,
      },
    }).then(() => {
      console.log("USER CREATED");
    });
  };
  const createTaskDoc = (user, obj) => {
    const { list, title, notes, month, day, timestamp } = obj;
    addDoc(collection(db, "users", "USER_" + user.uid, "tasks"), {
      list: list,
      title: title,
      notes: notes,
      month: parseInt(month, 10),
      day: parseInt(day, 10),
      completed: false,
      timestamp: timestamp,
    }).then(() => {
      console.log("DEFAULT TASK ADDED");
    });
  };
  const createListDoc = (user, project) => {
    addDoc(collection(db, "users", "USER_" + user.uid, "projects"), {
      name: project.toLowerCase(),
    }).then(() => {
      console.log("DEFAULT PROJECT ADDED");
    });
  };
  // const getAnonymousUsers = async () => {
  //   const q = query(collection(db, "users"), where());
  //   getDocs();
  // };
  console.log(authUser);
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
        <Flex p="20" direction="column" maxW="600px">
          <Flex justify="center" mb={8}>
            <Heading size="sm">Welcome to</Heading>
            <Heading variant="logo" size="sm" mx="2" mt={0.5}>
              PLUSLIST
            </Heading>
            <Heading size="sm">!</Heading>
          </Flex>
          <Flex align="center" justify="center">
            <ChakraNextLinkButton
              variant="primary"
              href="/signin"
              text="sign in"
              w="80px"
            />
            <ChakraNextLinkButton
              variant="primary"
              href="/signup"
              text="sign up"
              w="80px"
            />
          </Flex>
          <Flex w="100%" justify="center">
            <Button
              opacity="0.7"
              bg="transparent"
              mt="6"
              fontSize="12px"
              fontWeight="600"
              letterSpacing="1px"
              color="primary"
              as="button"
              w="auto"
              p="0"
              height="20px"
              borderRadius="0"
              onClick={startTrialSession}
              _hover={{
                opacity: "1",
                borderBottom: "solid",
                borderBottomWidth: "0.5px",
              }}
            >
              try it &#8212; no account required!
            </Button>
          </Flex>
        </Flex>
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
            deleteProject={deleteProject}
            currentProject={currentProject}
            updateCurrentProject={updateCurrentProject}
          />
        )}
        {!loading && authUser && (
          <TodoList
            toggleModal={toggleModal}
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
          projectsList={projectsList}
          currentProject={currentProject}
        />
      )}

      {authUser && loading && <Spinner />}
    </Box>
  );
}
