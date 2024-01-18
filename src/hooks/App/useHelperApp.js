import { useEffect, useState } from "react";
import { useUser } from "../Users/useUser";
import useNotes from "../Notes/useNotes";
import { setToken } from "../../services/notes";
import useApp from "./useApp";

function useHelperApp() {
  const { setCurrentUser, currentUser } = useUser();
  const { getNotes, clearNoteToEditState } = useNotes();
  const { handleCloseNoteForm } = useApp();
  const [loadingCurrentUser, setLoadingCurrentUser] = useState(true);

  useEffect(() => {
    const loggedUserJSON = JSON.parse(localStorage.getItem("currentUser"));
    if (loggedUserJSON) {
      setCurrentUser(loggedUserJSON);
      setToken(loggedUserJSON.token);
      getNotes();
    }
    setLoadingCurrentUser(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseFormNotesModal = () => {
    clearNoteToEditState();
    handleCloseNoteForm();
  };

  return {
    handleCloseFormNotesModal,
    currentUser,
    loadingCurrentUser
  };
}

export default useHelperApp;
