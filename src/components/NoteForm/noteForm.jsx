import { Formik, Form } from "formik";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { BiPlus } from "react-icons/bi";

import classes from "./noteForm.module.css";
import TextArea from "../TextArea/textArea";
import Input from "../Input/input";
import Button from "../Button/button";
import useNotes from "../../hooks/Notes/useNotes";
import useApp from "../../hooks/App/useApp";
import useCategories from "../../hooks/Categories/useCategories";
import MultipleSelect from "../MultipleSelect/multipleSelect";
import { useUser } from "../../hooks/Users/useUser";
import Loader from "../Loader/loader";

function NoteForm() {
  const { addToNotes, noteToEdit, handleNoteToEdit, updateNote } = useNotes();
  const { handleCloseNoteForm } = useApp();
  const {
    categories,
    categoryToCreate,
    handleCategoryToCreate,
    createNewCategory,
    handleShowCategoryInput,
    showCategoryInput,
    inputRef,
    isErrorGettingCategories,
    isLoadingCreateCategory,
    formRef,
    loadingCategory,
  } = useCategories();

  const { currentUser } = useUser();

  if (!currentUser) return;

  return (
    <div className={classes.form_container}>
      <Formik
        enableReinitialize={true}
        initialValues={{
          title: noteToEdit ? noteToEdit.title : "",
          content: noteToEdit ? noteToEdit.content : "",
          categories: noteToEdit ? noteToEdit.categories : [],
          category: "",
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
        onSubmit={(values, actions) => {
          const note = {
            ...noteToEdit,
            title: values.title,
            content: values.content,
            categories: values.categories,
          };
          if (noteToEdit) {
            updateNote(note);
          } else {
            addToNotes(note);
          }
          actions.resetForm();
          handleCloseNoteForm();
        }}
      >
        {({ touched, errors, values, resetForm, setFieldValue }) => (
          <Form className={classes.form}>
            <section className={classes.form_section}>
              <div>
                <Input
                  name="title"
                  label="Title *"
                  touched={touched}
                  errors={errors}
                  placeholder="Title *"
                  values={values}
                />
                <TextArea
                  placeholder="Put the content here"
                  label="Content"
                  name="content"
                  touched={touched}
                  errors={errors}
                  values={values}
                />
              </div>
              <div>
                {isErrorGettingCategories && (
                  <span className={classes.error_categories}>
                    <AiOutlineExclamationCircle />
                    <span>Error geting categories</span>
                  </span>
                )}

                {(loadingCategory || isLoadingCreateCategory) && (
                  <span className={classes.loaderCategoryContainer}>
                    <Loader size={"20"} />
                  </span>
                )}
                {!isErrorGettingCategories && categories?.length > 0 && (
                  <MultipleSelect
                    name="categories"
                    values={values}
                    options={categories}
                    setFieldValue={setFieldValue}
                  />
                )}

                <div className={classes.create_category_container}>
                  {showCategoryInput ? (
                    <div className={classes.formCreateCategory} ref={formRef}>
                      <input
                        className={`${classes.custom_input} ${loadingCategory ? classes.input_disabled : ""
                          }`}
                        name="category"
                        placeholder="Which category to create?"
                        value={categoryToCreate}
                        onChange={handleCategoryToCreate}
                        ref={inputRef}
                        disabled={loadingCategory}
                      />
                      <Button
                        text={<BiPlus />}
                        variant="primary"
                        handleClick={createNewCategory}
                        disabled={loadingCategory}
                      />
                    </div>
                  ) : (
                    <button
                      className={classes.create_category_button}
                      onClick={() => handleShowCategoryInput(true)}
                    >
                      <span>
                        <BiPlus />
                      </span>
                      Crear categoria
                    </button>
                  )}
                </div>
              </div>
            </section>
            <div className={classes.button_container}>
              <Button
                text="Cancel"
                type="button"
                handleClick={() => {
                  resetForm();
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
        )}
      </Formik>
    </div>
  );
}

export default NoteForm;
