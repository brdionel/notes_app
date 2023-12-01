import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AppContextProvider } from "./contexts/appContext";
import { NotesContextProvider } from "./contexts/notesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <NotesContextProvider>
        <App />
      </NotesContextProvider>
    </AppContextProvider>
  </React.StrictMode>
);
