import { createContext, useEffect, useRef, useState } from "react";

const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [mode, setMode] = useState("main");
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [showConfirmDeleteNote, setShowConfirmDeleteNote] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dialogRef = useRef();

  const toggleMode = () => {
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
        showConfirmDeleteNote &&
        dialogRef.current &&
        !dialogRef.current.contains(event.target)
      ) {
        setShowConfirmDeleteNote(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showConfirmDeleteNote]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleShowModal = () => {
    setIsModalOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        mode,
        toggleMode,
        showNoteForm,
        setShowNoteForm,
        handleShowNoteForm,
        handleCloseNoteForm,
        handleShowConfirmDeleteNote,
        handleCloseConfirmDeleteNote,
        showConfirmDeleteNote,
        dialogRef,
        isModalOpen,
        handleCloseModal,
        handleShowModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
