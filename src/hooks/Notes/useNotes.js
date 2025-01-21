import { useContext } from "react";
import NotesContext from "../../contexts/notesContext";
import FiltersContext from "../../contexts/filtersContext";

function useNotes() {
  const context = useContext(NotesContext);
  const { filter } = useContext(FiltersContext);

  return {
    ...context,
    filter,
  };
}

export default useNotes;
