import { createPortal } from "react-dom";
import { GrClose } from "react-icons/gr";
import useApp from "../../hooks/App/useApp";
import classes from "./modal.module.css";

function ModalContent({ children }) {
  const { modalRef, handleCloseNoteForm } = useApp();
  return (
    <div className={classes.modal_container}>
      <div className={classes.modal_content} ref={modalRef}>
        <button
          onClick={handleCloseNoteForm}
          className={classes.close_button}
        >
          <GrClose />
        </button>
        {children}
      </div>
    </div>
  );
}

export default function Modal(props) {
  return createPortal(
    <ModalContent {...props} />,
    document.getElementById("root-modal")
  );
}
