import { useContext } from "react";
import CategoriesContext from "../../contexts/categoriesContext";

function useCategories() {
  const { categories, getCategories } = useContext(CategoriesContext);

  return {
    categories,
    getCategories,
  };
}

export default useCategories;
