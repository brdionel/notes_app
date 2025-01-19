import Wrapper from "../Wrapper/wrapper";
import noteClasses from "../NoteItem/noteItem.module.css";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import classes from "./introduction.module.css";

const notes = [
  {
    title: "Developing a To-Do List Application with React and Node.js",
    categories: ["Personal", "ideas", "Estudio"],
  },
  {
    title: "Implementing User Authentication",
    categories: ["Personal", "Estudio"],
  },
  {
    title:
      "Managing Global State in a Task List Application with React's Context API",
    categories: ["Estudio"],
  },
  {
    title:
      "Configuring a MySQL Database to Store Task and User Data in the Application",
    categories: ["Trabajo"],
  },
];

function Introduction() {
  return (
    <Wrapper>
      <main style={{ marginTop: "2rem" }}>
        <p>Example:</p>
        <div className={classes.introduction_notes_container}>
          {notes.map((note) => (
            <div className={noteClasses.note_container} key={note.title}>
              <div>
                <h3>{note.title}</h3>
                <div className={noteClasses.note_category_container}>
                  {note.categories.map((category) => (
                    <span
                      className={noteClasses.note_category_chip}
                      key={category}
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
              <div className={noteClasses.button_container}>
                <span title="Edit">
                  <AiTwotoneEdit />
                </span>
                <span title="Delete">
                  <AiFillDelete />
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </Wrapper>
  );
}

export default Introduction;
