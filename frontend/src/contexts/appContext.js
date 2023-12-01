import { createContext, useEffect, useRef, useState } from "react";

const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [mode, setMode] = useState("main");
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [showConfirmDeleteNote, setShowConfirmDeleteNote] = useState(false);

  const modalRef = useRef();
  const dialogRef = useRef();

  const handleMode = (value) => {
    if (mode === "main") {
      setMode("archived");
    } else if (mode === "archived") {
      setMode("main");
    }
  };

  const handleShowNoteForm = () => {
    setShowNoteForm(true);
  };

  const handleCloseNoteForm = () => {
    setShowNoteForm(false);
  };

  const handleShowConfirmDeleteNote = () => {
    setShowConfirmDeleteNote(true);
  };

  const handleCloseConfirmDeleteNote = () => {
    setShowConfirmDeleteNote(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        showNoteForm &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        setShowNoteForm(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showNoteForm]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      console.log("Event Target -> ", event.target);
      console.log(dialogRef);
      if (
        showConfirmDeleteNote &&
        dialogRef.current &&
        !dialogRef.current.contains(event.target)
      ) {
        setShowConfirmDeleteNote(false);
      }
    };

    console.log({ showConfirmDeleteNote });

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showConfirmDeleteNote]);

  return (
    <AppContext.Provider
      value={{
        mode,
        handleMode,
        modalRef,
        showNoteForm,
        setShowNoteForm,
        handleShowNoteForm,
        handleCloseNoteForm,
        handleShowConfirmDeleteNote,
        handleCloseConfirmDeleteNote,
        showConfirmDeleteNote,
        dialogRef,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
