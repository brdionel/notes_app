import { ErrorMessage, Field } from "formik";
import classes from "./input.module.css"

function Input(props) {

    const { name, label, touched, errors, placeholder, values } = props;

    return (
        <div className={classes.form_control}>
            <Field
                placeholder={placeholder}
                name={name}
                className={`${
                    values[name].length > 0
                    ? classes.input_with_text  
                    : ""
                } ${
                touched.title
                    ? errors.title
                    ? classes.input_error
                    : classes.input_valid
                    : ""
                }`}
                value={values[name]}
            />
            <label htmlFor="title" className={classes.floating_label}>{label}</label>
            <ErrorMessage
                className={classes.form_error_message}
                name={name}
                component="small"
            />
        </div>
    )
}

export default Input;