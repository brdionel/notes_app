
import { Formik, Form } from "formik";
import classes from "./noteForm.module.css";
import TextArea from "../TextArea/textArea";
import Input from "../Input/input";
import Button from "../Button/button";
import useNotes from "../../hooks/Notes/useNotes";
import useApp from "../../hooks/App/useApp";

function NoteForm() {

    const {addToNotes, noteToEdit, handleNoteToEdit, updateNote} = useNotes();
    const { handleCloseNoteForm } = useApp()

    return (
        <div className={classes.form_container}>
            <h1>
                {
                    noteToEdit
                    ? "Edit note"
                    : "Create note"
                }
                
            </h1>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    title: noteToEdit ? noteToEdit.title : '',
                    content: noteToEdit ? noteToEdit.content : '',
                }}
                validate={(values) => {
                    const errors = {};
    
                    if (!values.title) {
                    errors.title = "Write a title to create a note";
                    } 
    
                    return errors;
                }}
                onSubmit={(values,actions) => {
                    const note = {
                        ...noteToEdit,
                        title: values.title,
                        content: values.content
                    };
                    if(noteToEdit) {
                        updateNote(note);
                        
                    } else {
                        addToNotes(note);
                    }
                    actions.resetForm();
                    handleCloseNoteForm();

                }}
            >
                {
                    ({touched, errors, values, resetForm}) => <Form className={classes.form}>
                        <Input 
                            name="title" 
                            label="Title *" 
                            touched={touched}
                            errors={errors}
                            placeholder="Title *"
                            values={values}
                        />
                        <TextArea 
                            placeholder="Put the conten here"
                            label="Content"
                            name="content"
                            touched={touched}
                            errors={errors}
                            values={values}
                        />
                        <div className={classes.button_container}>
                            <Button
                                text="Cancel"
                                type="button"
                                handleClick={() => {
                                    resetForm()
                                    handleNoteToEdit(null);
                                    handleCloseNoteForm();
                                }}
                            />
                            <Button 
                                text={`${noteToEdit ? "Edit" : "Save"}`}
                                type="submit"
                            />
                        </div>
                    </Form>
                }

            </Formik>
        </div>
    )
}

export default NoteForm;