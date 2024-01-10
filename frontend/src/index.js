import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AppContextProvider } from "./contexts/appContext";
import { NotesContextProvider } from "./contexts/notesContext";
import { CategoriesContextProvider } from "./contexts/categoriesContext";
import { UserContextProvider } from "./contexts/userContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <UserContextProvider>
        <CategoriesContextProvider>
          <NotesContextProvider>
            <App />
          </NotesContextProvider>
        </CategoriesContextProvider>
      </UserContextProvider>
    </AppContextProvider>
  </React.StrictMode>
);
