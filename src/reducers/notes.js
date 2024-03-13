import { formatDate } from "../utils/helper";

//aqui primero teno que ir a la base de datos;

export const NOTES_ACTION_TYPES = {
  ADD_TO_NOTES: "ADD_TO_NOTES",
  REMOVE_FROM_NOTES: "REMOVE_FROM_NOTES",
  UPDATE_NOTE: "UPDATE_NOTE",
  TOGGLE_ARCHIVE_NOTE: "TOGGLE_ARCHIVE_NOTE",
  SET_NOTES: "SET_NOTES",
  CLEAR_NOTES: "CLEAR_NOTES",
};

export const notesReducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action;

  switch (actionType) {
    case NOTES_ACTION_TYPES.ADD_TO_NOTES: {
      const newNotes = [...state, actionPayload];
      return newNotes;
    }

    case NOTES_ACTION_TYPES.REMOVE_FROM_NOTES: {
      const noteIndex = state.findIndex((note) => note._id === actionPayload);
      const newNotes = [...state];

      newNotes.splice(noteIndex, 1);
      return newNotes;
    }

    case NOTES_ACTION_TYPES.UPDATE_NOTE: {
      const { noteData, clearNoteToEditState, handleNoteIsEdited, isEdited } =
        actionPayload;
      const { _id, title, content, categories } = noteData;
      const noteIndex = state.findIndex((note) => note._id === _id);
      if (noteIndex >= 0) {
        const newNotesState = structuredClone(state);
        if (newNotesState[noteIndex].title !== title) {
          newNotesState[noteIndex].title = title;
          handleNoteIsEdited(true);
        }
        if (categories) {
          newNotesState[noteIndex].categories = categories;
          handleNoteIsEdited(true);
        }
        if (newNotesState[noteIndex].content !== content) {
          newNotesState[noteIndex].content = content;
          handleNoteIsEdited(true);
        }
        if (isEdited) newNotesState[noteIndex].date = formatDate(new Date());
        clearNoteToEditState();
        return newNotesState;
      }
      clearNoteToEditState();
      return state;
    }

    case NOTES_ACTION_TYPES.TOGGLE_ARCHIVE_NOTE: {
      const { _id } = actionPayload;
      const noteToToogleArchiveIndex = state.findIndex(
        (note) => note._id === _id
      );
      if (noteToToogleArchiveIndex >= 0) {
        const newNotesState = structuredClone(state);
        newNotesState[noteToToogleArchiveIndex].is_archived =
          !newNotesState[noteToToogleArchiveIndex].is_archived;
        return newNotesState;
      }
      return state;
    }

    case NOTES_ACTION_TYPES.SET_NOTES: {
      const notes = [...state, ...actionPayload];
      const notesSet = new Set();
      const notesFiltered = notes.filter((note) => {
        if (!notesSet.has(note._id)) {
          notesSet.add(note._id, note);
          return true;
        }
        return false;
      });

      return notesFiltered;
    }

    case NOTES_ACTION_TYPES.CLEAR_NOTES: {
      return [];
    }

    default:
      return state;
  }
};
