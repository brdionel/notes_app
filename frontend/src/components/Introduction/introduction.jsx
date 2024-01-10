import Wrapper from "../Wrapper/wrapper";
import defaultClasses from "./introduction.module.css";
import noteClasses from "../NoteItem/noteItem.module.css";
import { BiSolidBox } from "react-icons/bi";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";

function Introduction() {
  return (
    <Wrapper>
      <main>
        <p>
          It's a web application that allows you to take notes, tag and filter
          them.
        </p>
        <p>As a user, you can: </p>
        <ul>
          <li>Create, edit and delete notes.</li>
          <li>Archive/unarchive notes.</li>
          <li>Listing your active notes.</li>
          <li>Listing your archived notes.</li>
        </ul>

        <p>Example:</p>
        <div className={noteClasses.note_container}>
          <div>
            <h3>Developing a To-Do List Application with React and Node.js</h3>
            <div className={noteClasses.note_category_container}>
              {["Personal", "ideas", "Estudio"].map((category) => (
                <span className={noteClasses.note_category_chip}>
                  {category}
                </span>
              ))}
            </div>
          </div>
          <div className={noteClasses.button_container}>
            <span title={`${"Archive"}`}>{<BiSolidBox />}</span>
            <span title="Edit">
              <AiTwotoneEdit />
            </span>
            <span title="Delete">
              <AiFillDelete />
            </span>
          </div>
        </div>
      </main>
    </Wrapper>
  );
}

export default Introduction;
