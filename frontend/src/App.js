import Header from "./components/Header/header";
import Modal from "./components/Modal/modal";
import NoteForm from "./components/NoteForm/noteForm";
import useApp from "./hooks/App/useApp";
import useNotes from "./hooks/Notes/useNotes";
import Wrapper from "./components/Wrapper/wrapper";
import NotesList from "./components/NotesList/notesList";
import ConfirmDialog from "./components/ConfirmDialog/confirmDialog";
import FormConfirmDialog from "./components/FormConfirmDialog/formConfirmDialog";

function App() {
  const { showNoteForm, handleCloseConfirmDeleteNote, showConfirmDeleteNote } =
    useApp();
  const { removeFromNotes } = useNotes();

  return (
    <div>
      <Header />
      <Wrapper>
        <NotesList />
      </Wrapper>

      {showNoteForm && (
        <Modal>
          <NoteForm />
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
    </div>
  );
}

export default App;
