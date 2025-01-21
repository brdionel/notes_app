import { useFilters } from "../../hooks/Filters/useFilters";
import Dropdown from "../Dropdown/dropdown";
import classes from "./filters.module.css";

function Filters() {
  const { categoriesWithAll, handleFilterSelected } = useFilters();

  return (
    <section className={classes.filters_container}>
      <Dropdown
        label={"Filter by"}
        options={categoriesWithAll}
        handleOptionSelected={handleFilterSelected}
      />
    </section>
  );
}

export default Filters;
