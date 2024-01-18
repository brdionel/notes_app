import useNotes from "../../hooks/Notes/useNotes";
import classes from "./notesList.module.css";
import useApp from "../../hooks/App/useApp";
import NoteItem from "../NoteItem/noteItem";
import { useUser } from "../../hooks/Users/useUser";
import Loader from "../Loader/loader";

function NotesList() {

    const { notes, handleNoteToEdit, toggleArchiveNote, handleNoteToDelete, loadingNotes } = useNotes();
    const { setShowNoteForm, mode} = useApp();
    const {currentUser} = useUser()

    if(!currentUser) return []

    const handleClickEdit = (noteClick) => {
      const noteToEdit = notes.find( note => note.id === noteClick.id);
      
      if(noteToEdit) {
        handleNoteToEdit(noteToEdit);
        setShowNoteForm(true);
      }
    }

    const getNotesList = () => {
      switch(mode) {
        case "main": {
          return notes.filter( note => !note.is_archived);
        }
        case "archived": {
          return notes.filter( note => note.is_archived);
        }
        default: {
          return []
        }
      }
    }

    if(loadingNotes) return <Loader />

    return (
        <>
        {getNotesList().length > 0 
        ? (
          <ul className={classes.notes_list}>
            {getNotesList().map((note) => (
              <NoteItem 
                note={note} 
                toggleArchiveNote={toggleArchiveNote} 
                handleClickEdit={handleClickEdit} 
                handleNoteToDelete={handleNoteToDelete}
                key={note.id}
              />
            ))}
          </ul>
        )
        : <div>
          <h5>You have no notes here ...</h5>
        </div>
      }
        </>
    )
}

export default NotesList;