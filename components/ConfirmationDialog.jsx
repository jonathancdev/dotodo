import React, { createContext, useContext, useState, useRef } from "react";
import { Flex, Box, Text, Button, useColorModeValue } from "@chakra-ui/react";
import useOutsideClickHandler from "../hooks/useOutsideClickHandler";

const ConfirmationDialog = ({ open, title, message, onConfirm, onDismiss }) => {
  const dialogRef = useRef();
  const handleOutsideClick = () => {
    onDismiss();
  };
  useOutsideClickHandler(dialogRef, () => {
    handleOutsideClick();
  });

  return (
    <>
      {open && (
        <Flex
          top="-90"
          pos="absolute"
          w="100vw"
          h="100vh"
          justify="center"
          align="center"
          bg="black70"
          zIndex="4"
          color={useColorModeValue("gray.600", "gray.300")}
        >
          <Flex
            ref={dialogRef}
            opacity="1"
            direction="column"
            h="150px"
            w="300px"
            borderRadius="8px"
            bg={useColorModeValue("gray.100", "gray.900")}
            shadow="md"
            align="center"
            justify="center"
          >
            <Box fontWeight="600" fontSize="14px">
              {title}
            </Box>
            <Flex
              w="200px"
              textAlign="center"
              my="5"
              fontWeight="600"
              fontSize="12px"
            >
              {message}
            </Flex>
            <Flex>
              <Button
                variant="primary"
                h="30px"
                w="75px"
                my="3"
                onClick={onConfirm}
              >
                ok
              </Button>
              <Button
                variant="primaryOutline"
                w="70px"
                h="30px"
                my="3"
                onClick={onDismiss}
              >
                cancel
              </Button>
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
};
const ConfirmationDialogContext = createContext({});

const ConfirmationDialogProvider = ({ children }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({});

  const openDialog = ({ title, message, actionCallback }) => {
    setDialogOpen(true);
    setDialogConfig({ title, message, actionCallback });
  };

  const resetDialog = () => {
    setDialogOpen(false);
    setDialogConfig({});
  };

  const onConfirm = () => {
    resetDialog();
    dialogConfig.actionCallback(true);
  };
  const onDismiss = () => {
    resetDialog();
    dialogConfig.actionCallback(false);
  };
  return (
    <ConfirmationDialogContext.Provider value={{ openDialog }}>
      <ConfirmationDialog
        open={dialogOpen}
        title={dialogConfig?.title}
        message={dialogConfig?.message}
        onConfirm={onConfirm}
        onDismiss={onDismiss}
      />
      {children}
    </ConfirmationDialogContext.Provider>
  );
};
const useConfirmationDialog = () => {
  const { openDialog } = useContext(ConfirmationDialogContext);

  const getConfirmation = ({ ...options }) =>
    new Promise((res) => {
      openDialog({ actionCallback: res, ...options });
    });

  return { getConfirmation };
};

export default ConfirmationDialog;
export { ConfirmationDialogProvider, useConfirmationDialog };
