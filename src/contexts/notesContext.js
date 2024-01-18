import { createContext, useReducer, useState } from "react";
import iziToast from "izitoast";
import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote as updateNoteService,
} from "../services/notes";
import { notesReducer, NOTES_ACTION_TYPES } from "../reducers/notes";
import useApp from "../hooks/App/useApp";

const NotesContext = createContext();

export function NotesContextProvider({ children }) {
  const [state, dispatch] = useReducer(notesReducer, []);
  const {
    ADD_TO_NOTES,
    REMOVE_FROM_NOTES,
    UPDATE_NOTE,
    TOGGLE_ARCHIVE_NOTE,
    SET_NOTES,
    CLEAR_NOTES,
  } = NOTES_ACTION_TYPES;
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [isEdited, setIsEdited] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const {
    handleShowConfirmDeleteNote,
    handleCloseConfirmDeleteNote,
    toggleMode,
    mode,
  } = useApp();

  const handleNoteIsEdited = (value) => setIsEdited(value);

  const handleNoteToEdit = (note) => setNoteToEdit(note);

  const clearNoteToEditState = () => setNoteToEdit(null);

  const handleNoteToDelete = (id) => {
    setNoteToDelete(id);
    handleShowConfirmDeleteNote();
  };

  const addToNotes = async (noteData) => {
    try {
      const response = await createNote(noteData);
      if (response.status === 201) {
        if (mode === "archived") toggleMode();
        dispatch({
          type: ADD_TO_NOTES,
          payload: response.data,
        });
        iziToast.success({
          title: "OK",
          message: "Successfully created note!",
          position: "topRight",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateNote = async (noteData) => {
    try {
      const { id, ...data } = noteData;
      const categoriesToUpdate = data.categories.map( item => item.id ?? item)
      const response = await updateNoteService(id, {
        ...data,
        is_archived: !!data.is_archived,
        categories: categoriesToUpdate,
      });
      if (response.status === 200) {
        dispatch({
          type: UPDATE_NOTE,
          payload: {
            noteData,
            clearNoteToEditState,
            handleNoteIsEdited,
            isEdited,
          },
        });
        iziToast.success({
          title: "OK",
          message: "Successfully updated note!",
          position: "topRight",
        });
      }
    } catch (error) {
      iziToast.error({
        title: "Error",
        message: "Error updating note! Try again, please.",
        position: "topRight",
      });
    }
  };

  const removeFromNotes = async (token) => {
    try {
      const response = await deleteNote(noteToDelete, token);
      if (response.status === 200) {
        dispatch({
          type: REMOVE_FROM_NOTES,
          payload: noteToDelete,
        });
        handleCloseConfirmDeleteNote();
        iziToast.success({
          title: "OK",
          message: "Successfully deleted note!",
          position: "topRight",
        });
      }
    } catch (error) {}
  };

  const toggleArchiveNote = async (noteData, token) => {
    try {
      const { id, is_archived } = noteData;
      const response = await updateNoteService(id, {
        is_archived: !is_archived,
      });
      if (response.status === 200) {
        dispatch({
          type: TOGGLE_ARCHIVE_NOTE,
          payload: noteData,
        });
        iziToast.success({
          title: "OK",
          message: "Successfully updated note!",
          position: "topRight",
        });
      }
    } catch (error) {}
  };

  const getNotes = async () => {
    try {
      setLoadingNotes(true);
      const response = await getAllNotes();
      if (response.status === 200) {
        dispatch({
          type: SET_NOTES,
          payload: response.data,
        });
      }
      setLoadingNotes(false);
    } catch (error) {
      setLoadingNotes(false);
    }
  };

  const clearNotes = () => {
    dispatch({
      type: CLEAR_NOTES,
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
        loadingNotes,
        getNotes,
        clearNotes,
        clearNoteToEditState,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export default NotesContext;
