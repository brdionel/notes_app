import { createContext, useEffect, useState } from "react";
import { getAllCategories } from "../services/categories";

const CategoriesContext = createContext();

export function CategoriesContextProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const getCategories = () => {
    getAllCategories()
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        getCategories,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export default CategoriesContext;
