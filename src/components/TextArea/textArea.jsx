import { Field, ErrorMessage } from "formik";
import classes from "./textArea.module.css";
import { useEffect, useRef } from "react";

function TextArea(props) {

    const { label, name, placeholder, values } = props;
    const textareaRef = useRef(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
          textarea.style.height = "auto"; // Resetea la altura
          textarea.style.height = `${textarea.scrollHeight}px`; // Ajusta según el contenido inicial
        }
      }, [] );
    
    const handleInput = (event) => {
        const textarea = event.target;
        textarea.style.height = "auto"; // Resetea la altura
        textarea.style.height = `${textarea.scrollHeight}px`; // Ajusta al contenido
      };

    return (
        <div className={classes.form_control}>
            <Field 
                as="textarea"
                id={name}
                innerRef={textareaRef}
                name={name}
                onInput={handleInput}
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