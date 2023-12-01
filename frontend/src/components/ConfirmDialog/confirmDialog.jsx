import { createPortal } from "react-dom";
import classes from "./confirmDialog.module.css";
import useApp from "../../hooks/App/useApp";

function ConfirmDialogContent({ children }){

    const { dialogRef, showConfirmDeleteNote } = useApp();

    return (
        <div className={`${classes.dialog_container} ${showConfirmDeleteNote ? classes.show: ""}`}>
            <div className={classes.dialog_content} ref={dialogRef}>
                {children}
            </div>
        </div>
    )
}

export default function ConfirmDialog(props) {
    return createPortal(<ConfirmDialogContent {...props} />, document.getElementById("root-dialog"))
};