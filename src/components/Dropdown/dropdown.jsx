import { MdKeyboardArrowUp } from "react-icons/md";
import { useDropdown } from "../../hooks/Dropdown/useDropdwon";
import DropdownOption from "../DropwdownItem/dropdownItem";
import classes from "./dropdown.module.css";

function Dropdown({ label, options, handleOptionSelected }) {
  const {
    dropdownRef,
    isOpenDropdown,
    toggleDropdown,
    selectedOption,
    handleInnerOptionSelected,
  } = useDropdown({
    handleOptionSelected,
    options,
  });

  return (
    <div>
      <div className={classes.dropdown} ref={dropdownRef}>
        <button
          className={`${classes.dropdownToggleOrder} ${
            isOpenDropdown ? classes.openDropArrow : ""
          }`}
          onClick={toggleDropdown}
        >
          <span className={classes.dropdownToggleOrderText}>
            {label}
            <span>{selectedOption.name}</span>
          </span>
          <MdKeyboardArrowUp />
        </button>
        {isOpenDropdown && (
          <ul
            className={`${classes.dropdownMenu} ${
              isOpenDropdown ? "open" : ""
            }`}
          >
            {options.map((option) => (
              <DropdownOption
                handleInnerOptionSelected={handleInnerOptionSelected}
                key={option.id}
                labelOption={option.name}
                option={option}
                selectedOption={selectedOption}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dropdown;
