import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import { BiSolidBox } from "react-icons/bi";
import { BsBoxArrowUp } from "react-icons/bs";
import classes from "./noteItem.module.css";
import useCategories from "../../hooks/Categories/useCategories";

function NoteItem({ note, toggleArchiveNote, handleClickEdit, handleNoteToDelete }) {
  const { categories } = useCategories()
  
  return (
    <div className={classes.note_container}>
      <div>
        <h3>{note.title}</h3>
        <div className={classes.note_category_container}>
          {note.categories?.map(category => (
          <span className={classes.note_category_chip}>
            {category.name ?? categories.find(item => item.id === category).name}
          </span>
          ))}
        </div>
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
        <span title="Delete" onClick={() => handleNoteToDelete(note.id)}>
          <AiFillDelete />
        </span>
      </div>
    </div>
  );
}

export default NoteItem;
