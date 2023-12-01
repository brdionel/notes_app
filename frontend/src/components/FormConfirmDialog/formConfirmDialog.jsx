import Button from "../Button/button";
import classes from "./formConfirmDialog.module.css"

function FormConfirmDialog({text, onConfirm, onCancel}) {
    return (
        <div className={classes.form_container}>
            <form>
                <h4>
                    {text}
                </h4>
                <div className={classes.button_container}>
                    <Button 
                        text="Yes"
                        type="button"
                        handleClick={onConfirm}
                    />
                    <Button
                        text="No"
                        type="button"
                        handleClick={onCancel} 
                    />
                </div>
            </form>
        </div>
    )
}

export default FormConfirmDialog;