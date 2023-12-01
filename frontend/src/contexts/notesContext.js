import { createContext, useReducer, useState } from "react";
import {
  notesReducer,
  NOTES_ACTION_TYPES,
  initialState,
} from "../reducers/notes";
import useApp from "../hooks/App/useApp";
const NotesContext = createContext();

export function NotesContextProvider({ children }) {
  // const forceUpdate = useReducer((x) => x + 1, 0)[1];
  const [state, dispatch] = useReducer(notesReducer, initialState);
  const { ADD_TO_NOTES, REMOVE_FROM_NOTES, UPDATE_NOTE, TOGGLE_ARCHIVE_NOTE } =
    NOTES_ACTION_TYPES;
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [isEdited, setIsEdited] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const { handleShowConfirmDeleteNote, handleCloseConfirmDeleteNote } =
    useApp();

  const handleNoteIsEdited = (value) => setIsEdited(value);

  const handleNoteToEdit = (note) => setNoteToEdit(note);

  const clearNoteToEditState = () => setNoteToEdit(null);

  const handleNoteToDelete = (note) => {
    setNoteToDelete(note);
    handleShowConfirmDeleteNote();
  };

  const addToNotes = (noteData) =>
    dispatch({
      type: ADD_TO_NOTES,
      payload: noteData,
    });

  const updateNote = (noteData) => {
    dispatch({
      type: UPDATE_NOTE,
      payload: { noteData, clearNoteToEditState, handleNoteIsEdited, isEdited },
    });
  };

  const removeFromNotes = () => {
    dispatch({
      type: REMOVE_FROM_NOTES,
      payload: noteToDelete,
    });
    handleCloseConfirmDeleteNote();
  };

  const toggleArchiveNote = (noteData) => {
    dispatch({
      type: TOGGLE_ARCHIVE_NOTE,
      payload: noteData,
    });
  };

  return (
    <NotesContext.Provider
      value={{
        notes: state,
        addToNotes,
        removeFromNotes,
        updateNote,
        handleNoteToEdit,
        noteToEdit,
        toggleArchiveNote,
        handleNoteToDelete,
        noteToDelete,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export default NotesContext;
