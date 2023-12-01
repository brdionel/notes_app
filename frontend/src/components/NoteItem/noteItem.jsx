import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import { BiSolidBox } from "react-icons/bi";
import { BsBoxArrowUp } from "react-icons/bs";
import classes from "./noteItem.module.css";

function NoteItem({ note, toggleArchiveNote, handleClickEdit, handleNoteToDelete }) {
  return (
    <div className={classes.note_container} key={note.id}>
      <div>
        <h3>{note.title}</h3>
        <small>
          <span className={classes.dateLabel}>Last edited:</span> {note.date}
        </small>
      </div>
      <div className={classes.button_container}>
        <span
          title={`${note.is_archived ? "Unarchive" : "Archive"}`}
          onClick={() => toggleArchiveNote(note)}
        >
          {!note.is_archived ? <BiSolidBox /> : <BsBoxArrowUp />}
        </span>
        <span title="Edit" onClick={() => handleClickEdit(note)}>
          <AiTwotoneEdit />
        </span>
        <span title="Delete" onClick={() => handleNoteToDelete(note)}>
          <AiFillDelete />
        </span>
      </div>
    </div>
  );
}

export default NoteItem;
