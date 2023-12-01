import { formatDate } from "../utils/helper";

import notesMock from "../mocks/notes.json";

const initialStatePartal = notesMock || [];
export const initialState = initialStatePartal.map((note) => {
  return {
    ...note,
    date: formatDate(new Date()),
  };
});
//aqui primero teno que ir a la base de datos;

export const NOTES_ACTION_TYPES = {
  ADD_TO_NOTES: "ADD_TO_NOTES",
  REMOVE_FROM_NOTES: "REMOVE_FROM_NOTES",
  UPDATE_NOTE: "UPDATE_NOTE",
  TOGGLE_ARCHIVE_NOTE: "TOGGLE_ARCHIVE_NOTE",
};

export const notesReducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action;

  switch (actionType) {
    case NOTES_ACTION_TYPES.ADD_TO_NOTES: {
      const { title, content } = actionPayload;
      const newNote = {
        id: state.length + 1,
        title,
        content,
        date: formatDate(new Date()),
        is_archived: false,
      };

      const newNotes = [...state, newNote];
      return newNotes;
    }

    case NOTES_ACTION_TYPES.REMOVE_FROM_NOTES: {
      const { id } = actionPayload;
      const noteIndex = state.findIndex((note) => note.id === id);
      const newNotes = [...state];

      newNotes.splice(noteIndex, 1);
      return newNotes;
    }

    case NOTES_ACTION_TYPES.UPDATE_NOTE: {
      const { noteData, clearNoteToEditState, handleNoteIsEdited, isEdited } =
        actionPayload;
      const { id, title, content } = noteData;
      const noteIndex = state.findIndex((note) => note.id === id);
      if (noteIndex >= 0) {
        const newNotesState = structuredClone(state);
        if (newNotesState[noteIndex].title !== title) {
          newNotesState[noteIndex].title = title;
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
      const { id } = actionPayload;
      const noteToToogleArchiveIndex = state.findIndex(
        (note) => note.id === id
      );
      if (noteToToogleArchiveIndex >= 0) {
        const newNotesState = structuredClone(state);
        newNotesState[noteToToogleArchiveIndex].is_archived =
          !newNotesState[noteToToogleArchiveIndex].is_archived;
        return newNotesState;
      }
      return state;
    }

    default:
      return state;
  }
};
