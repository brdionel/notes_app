import { Field, ErrorMessage } from "formik";
import classes from "./textArea.module.css";

function TextArea(props) {

    const { label, name, placeholder, values } = props;
    
    return (
        <div className={classes.form_control}>
            <Field 
                as="textarea"
                id={name}
                name={name}
                placeholder={placeholder}
                className={`${
                    values[name].length > 0
                    ? classes.textarea_with_text  
                    : ""
                }`}
                value={values[name]}
            />
            <label htmlFor={name} className={classes.floating_label}>{label}</label>
            <ErrorMessage
                name={name}
                className={classes.form_error_message}
                component="small"
            />
        </div>
    )
}

export default TextArea;