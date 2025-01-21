import { useContext } from "react";
import useCategories from "../Categories/useCategories";
import FiltersContext from "../../contexts/filtersContext";

export function useFilters() {
  const { filter, handleFilterSelected } = useContext(FiltersContext);

  const { categoriesWithAll } = useCategories();

  return {
    categoriesWithAll,
    filter,
    handleFilterSelected,
  };
}
