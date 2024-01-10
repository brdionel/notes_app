import { useEffect } from "react";
import { useUser } from "../Users/useUser";
import useNotes from "../Notes/useNotes";
import { setToken } from "../../services/notes";
import useApp from "./useApp";

function useHelperApp() {
  const { setCurrentUser, currentUser } = useUser();
  const { getNotes, clearNoteToEditState } = useNotes();
  const { handleCloseNoteForm } = useApp();

  useEffect(() => {
    const loggedUserJSON = JSON.parse(localStorage.getItem("currentUser"));
    if (loggedUserJSON) {
      setCurrentUser(loggedUserJSON);
      setToken(loggedUserJSON.token);
      getNotes();
    }
  }, []);

  const handleCloseFormNotesModal = () => {
    clearNoteToEditState();
    handleCloseNoteForm();
  };

  return {
    handleCloseFormNotesModal,
    currentUser,
  };
}

export default useHelperApp;
