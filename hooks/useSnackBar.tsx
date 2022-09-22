import { atom, useAtom } from "jotai";
import { useState } from "react";
import { Snackbar } from "react-native-paper";

const openAtom = atom(false);
const messageAtom = atom("");

export const useSnackBar = () => {
  const [open, setOpen] = useAtom(openAtom);
  const [message, setMessage] = useAtom(messageAtom);

  const openSnack = (message: string) => {
    setMessage(message);
    setOpen(true);
  };

  const closeSnack = () => {
    setMessage("");
    setOpen(false);
  };

  const render = () => (
    <Snackbar visible={open} onDismiss={closeSnack}>
      {message}
    </Snackbar>
  );

  return { openSnack, closeSnack, render };
};
