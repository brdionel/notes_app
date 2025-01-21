import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AppContextProvider } from "./contexts/appContext";
import { NotesContextProvider } from "./contexts/notesContext";
import { UserContextProvider } from "./contexts/userContext";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { FiltersContextProvider } from "./contexts/filtersContext";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <QueryClientProvider client={queryClient}>
    <AppContextProvider>
      <UserContextProvider>
        <FiltersContextProvider>
          <NotesContextProvider>
            <App />
          </NotesContextProvider>
        </FiltersContextProvider>
      </UserContextProvider>
    </AppContextProvider>
  </QueryClientProvider>
);
