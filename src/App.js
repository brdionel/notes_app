import { Helmet } from "react-helmet";
import Header from "./components/Header/header";
import Modal from "./components/Modal/modal";
import NoteForm from "./components/NoteForm/noteForm";
import useApp from "./hooks/App/useApp";
import useNotes from "./hooks/Notes/useNotes";
import Wrapper from "./components/Wrapper/wrapper";
import NotesList from "./components/NotesList/notesList";
import ConfirmDialog from "./components/ConfirmDialog/confirmDialog";
import FormConfirmDialog from "./components/FormConfirmDialog/formConfirmDialog";
import Login from "./components/Login/login";
import useHelperApp from "./hooks/App/useHelperApp";
import Introduction from "./components/Introduction/introduction";
import classes from "./App.module.css";
import Loader from "./components/Loader/loader";
import Filters from "./components/Filters/filters";

function App() {
  const {
    showNoteForm,
    handleCloseConfirmDeleteNote,
    showConfirmDeleteNote,
    isModalOpen,
    handleCloseModal,
  } = useApp();

  const { removeFromNotes } = useNotes();

  const { handleCloseFormNotesModal, currentUser, loadingCurrentUser } =
    useHelperApp();

  return (
    <div>
      <Helmet>
        <title>My Notes</title>
      </Helmet>

      <Header />

      {loadingCurrentUser && <Loader />}
      {!loadingCurrentUser && !currentUser && <Introduction />}

      <Wrapper>
        {!loadingCurrentUser && currentUser && <Filters />}
        <NotesList />
      </Wrapper>

      {showNoteForm && (
        <Modal handleClose={handleCloseFormNotesModal}>
          <NoteForm />
        </Modal>
      )}

      {isModalOpen && (
        <Modal handleClose={handleCloseModal}>
          <Login />
        </Modal>
      )}

      {showConfirmDeleteNote && (
        <ConfirmDialog>
          <FormConfirmDialog
            text="Are you sure you want to delete this note?"
            onConfirm={removeFromNotes}
            onCancel={handleCloseConfirmDeleteNote}
          />
        </ConfirmDialog>
      )}

      <div className={classes.box_mobile_shadow}></div>
    </div>
  );
}

export default App;
