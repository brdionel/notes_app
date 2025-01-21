import { createContext, useState } from "react";

const FiltersContext = createContext();

export function FiltersContextProvider({ children }) {
  const [filter, setFilters] = useState({ name: "all" });

  const handleFilterSelected = (category) => {
    setFilters(category);
  };

  return (
    <FiltersContext.Provider
      value={{
        filter,
        handleFilterSelected,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}

export default FiltersContext;
