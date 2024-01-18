
import { Formik, Form } from "formik";
import classes from "./noteForm.module.css";
import TextArea from "../TextArea/textArea";
import Input from "../Input/input";
import Button from "../Button/button";
import useNotes from "../../hooks/Notes/useNotes";
import useApp from "../../hooks/App/useApp";
import useCategories from "../../hooks/Categories/useCategories";
import MultipleSelect from "../MultipleSelect/multipleSelect";
import { useUser } from "../../hooks/Users/useUser";

function NoteForm() {

    const {addToNotes, noteToEdit, handleNoteToEdit, updateNote} = useNotes();
    const { handleCloseNoteForm } = useApp()
    const {categories, getCategories} = useCategories();
    const {currentUser} = useUser()
    
    if(!currentUser) return;

    if(categories && categories.length === 0) {
        getCategories()
    }

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
                    categories: noteToEdit ? noteToEdit.categories: []
                }}
                validate={(values) => {
                    const errors = {};
    
                    if (!values.title) {
                        errors.title = "Write a title to create a note";
                    }

                    if (values.title.length < 5) {
                        errors.title = "The title must contain more than 5 characters";
                    } 
    
                    return errors;
                }}
                onSubmit={(values,actions) => {
                    const note = {
                        ...noteToEdit,
                        title: values.title,
                        content: values.content,
                        categories: values.categories
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
                    ({touched, errors, values, resetForm, setFieldValue}) => <Form className={classes.form}>
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
                        {
                            categories.length 
                            ? <MultipleSelect 
                            name="categories"
                            values={values}
                            options={categories}
                            setFieldValue={setFieldValue}
                        />
                            : <p>Carregando categories</p>
                        }
                        
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
                                variant="primary"
                            />
                        </div>
                    </Form>
                }

            </Formik>
        </div>
    )
}

export default NoteForm;