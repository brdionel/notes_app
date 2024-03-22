import { useContext } from "react";
import CategoriesContext from "../../contexts/categoriesContext";

function useCategories() {
  const categoriesContext = useContext(CategoriesContext);

  return categoriesContext;
}

export default useCategories;
