import useNotes from "../../hooks/Notes/useNotes";
import classes from "./notesList.module.css";
import useApp from "../../hooks/App/useApp";
import NoteItem from "../NoteItem/noteItem";
import { useUser } from "../../hooks/Users/useUser";
import Loader from "../Loader/loader";
import InfiniteScroll from "react-infinite-scroll-component";

function NotesList() {
  const {
    filter: categoryFilter,
    notes,
    handleNoteToEdit,
    toggleArchiveNote,
    handleNoteToDelete,
    loadingNotes,
    pageControl,
    fetchMoreData,
    hasMore,
  } = useNotes();
  
  const { setShowNoteForm, mode } = useApp();
  const { currentUser } = useUser();
  
  if (!currentUser) return [];
  if (!pageControl) return <div>
    <h5>You have no notes here ...</h5>
  </div>;

  const { totalPages } = pageControl;
  
  const handleClickEdit = (noteClick) => {
    const noteToEdit = notes.find((note) => note._id === noteClick._id);

    if (noteToEdit) {
      handleNoteToEdit(noteToEdit);
      setShowNoteForm(true);
    }
  };
  
  const getNotesList = () => {
    switch (mode) {
      case "main": {
        return notes.filter((note) => {
          return (
            !note.is_archived &&
            (categoryFilter.name === "all" ||
              note.categories.some(
                (category) => category.name === categoryFilter.name
              ))
          );
        });
      }
      case "archived": {
        return notes.filter(
          (note) =>
            note.is_archived &&
            (categoryFilter.name === "all" ||
              note.categories.some(
                (category) => category.name === categoryFilter.name
              ))
        );
      }
      default: {
        return [];
      }
    }
  };

  const listNotes = getNotesList().map((note) => (
    <NoteItem
      note={note}
      toggleArchiveNote={toggleArchiveNote}
      handleClickEdit={handleClickEdit}
      handleNoteToDelete={handleNoteToDelete}
      key={note._id}
    />
  ));

  if (loadingNotes) return <Loader />;
  
  const infiniteScrollComponente =
    totalPages === 1 ? (
      listNotes
    ) : (
      <InfiniteScroll
        dataLength={notes.length}
        next={fetchMoreData}
        hasMore={hasMore}
        scrollThreshold={0.5}
        loader={<Loader />}
        endMessage={
          <div className={classes.noMoreProducts}>
            <span>{"Yay! You have seen it all"}</span>
          </div>
        }
      >
        {listNotes}
      </InfiniteScroll>
    );

  return (
    <>
      {getNotesList().length > 0 ? (
        <ul className={classes.notes_list}>{infiniteScrollComponente}</ul>
      ) : (
        <div>
          <h5>You have no notes here ...</h5>
        </div>
      )}
    </>
  );
}

export default NotesList;
