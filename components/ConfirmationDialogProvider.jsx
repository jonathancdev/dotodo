import React, { createContext, useState } from "react";
import ConfirmationDialog from "./ConfirmationDialog";

const ConfirmationDialogContext = createContext({});
export default function ConfirmationDialogProvider({ children }) {
  const [shouldShowDialog, setShouldShowDialog] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({});

  const showDialog = ({ title, message, actionCallback }) => {
    setShouldShowDialog(true);
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
    <ConfirmationDialogContext.Provider>
      <ConfirmationDialog
        shouldShowDialog={shouldShowDialog}
        showDialog={showDialog}
        title={dialogConfig.title}
        message={dialogConfig.message}
        onConfirm={onConfirm}
        onDismiss={onDismiss}
      />
      {children}
    </ConfirmationDialogContext.Provider>
  );
}
