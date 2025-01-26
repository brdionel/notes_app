import { createPortal } from "react-dom";
import { GrClose } from "react-icons/gr";
import classes from "./modal.module.css";

function ModalContent({ propsClasses={}, handleClose, children }) {

  return (
    <div className={classes.modal_container}>
      <div className={`${classes.modal_content} ${propsClasses}`}>
        <button
          onClick={handleClose}
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
