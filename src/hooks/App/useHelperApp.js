import { useEffect, useState } from "react";
import { useUser } from "../Users/useUser";
import useNotes from "../Notes/useNotes";
import { setToken } from "../../services/notes";
import useApp from "./useApp";

function useHelperApp() {
  const { setCurrentUser, currentUser } = useUser();
  const { getNotes, clearNoteToEditState, setLoadingNotes } = useNotes();
  const { handleCloseNoteForm } = useApp();
  const [loadingCurrentUser, setLoadingCurrentUser] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const fn = async () => {
      const loggedUserJSON = JSON.parse(localStorage.getItem("currentUser"));
      if (loggedUserJSON && !isInitialized) {
        setCurrentUser(loggedUserJSON);
        setToken(loggedUserJSON.token);
        setIsInitialized(true)
        try {
          setLoadingNotes(true)  
          await getNotes();
          setLoadingNotes(false)
        } catch(error) {
          setLoadingNotes()
        }
      }
      setLoadingCurrentUser(false)
    }

    fn()
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
