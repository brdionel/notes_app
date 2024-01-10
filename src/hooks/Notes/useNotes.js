import { useContext } from "react";
import NotesContext from "../../contexts/notesContext";

function useNotes() {
  const context = useContext(NotesContext);

  return context;
}

export default useNotes;
