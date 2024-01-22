import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import classes from "./noteItem.module.css";
import useCategories from "../../hooks/Categories/useCategories";
import { useState } from "react";

function NoteItem({
  note,
  toggleArchiveNote,
  handleClickEdit,
  handleNoteToDelete,
}) {
  const { categories } = useCategories();
  const [checked, setChecked] = useState(note.is_archived);

  const handleCheck = () => {
    setChecked(!checked);
    toggleArchiveNote(note);
  }

  return (
    <div
      className={classes.note_container}
    >
      <div className={classes.container_left}>
        <div className={classes.checkbox_container}>
          <input
            id={`persistent_${note.id}`}
            className={classes.checkbox_persistent}
            type="checkbox"
            title={checked ? "Unarchive" : "Archive"}
            value={checked}
            checked={checked}
            onChange={handleCheck}
          />
          <label htmlFor={`persistent_${note.id}`} className={classes.persistent_label}></label>
        </div>
        <div className={classes.container_content}>
          <h3>{note.title}</h3>
          <div className={classes.note_category_container}>
            {note.categories?.map((category) => (
              <span className={classes.note_category_chip} key={category.name}>
                {category.name ??
                  categories.find((item) => item.id === category).name}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className={classes.button_container}>
        <span title="Edit" onClick={() => handleClickEdit(note)}>
          <AiTwotoneEdit />
        </span>
        <span title="Delete" onClick={() => handleNoteToDelete(note.id)} >
          <AiFillDelete />
        </span>
      </div>
    </div>
  );
}

export default NoteItem;
