import { useState } from "react";
import { Field } from "formik";
import classes from "./multipleSelect.module.css";

const MultipleSelect = (props) => {
  const { name, options, values, setFieldValue } = props;
  const [isOpen, setIsOpen] = useState(false);

  const getInitialOptions = () => {
    if (Array.isArray(values[name]) && values[name].length > 0) {
      return values[name].map((option) => option._id ?? option);
    }
    return [];
  };

  const [selectedOptions, setSelectedOptions] = useState(getInitialOptions());
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (value) => {
    const newSelectedOptions = selectedOptions.includes(value)
      ? selectedOptions.filter((item) => item !== value)
      : [...selectedOptions, value];
    setSelectedOptions(newSelectedOptions);
    setFieldValue(name, newSelectedOptions);
  };

  const getSelectedOptionsLabels = () => {
    const categoryLabels = selectedOptions.map((option) => {
      const category = options.find((category) => category._id === option);
      return category?.name;
    });
    return categoryLabels.join(", ");
  };

  const getFloatingLabel = () => {
    if (selectedOptions.length <= 1) return "Category";
    return "Categories";
  };

  return (
    <div className={classes.custom_select}>
      <div
        className={`${classes.select_header} ${
          selectedOptions.length > 0 ? classes.select_with_option : ""
        } ${isOpen ? classes.select_open : ""}`}
        onClick={toggleDropdown}
      >
        <div className={classes.selected_options}>
          {selectedOptions.length > 0 && getSelectedOptionsLabels()}
        </div>
        <div
          className={`${classes.dropdown_icon} ${isOpen ? classes.open : ""}`}
        >
          &#9660;
        </div>
        <label className={classes.floating_label}>{getFloatingLabel()}</label>
      </div>
      {isOpen && (
        <Field
          type="checkbox"
          name={name}
          render={({ field }) => (
            <div className={classes.options_container}>
              {options.map((option) => (
                <label key={option._id} className={classes.option}>
                  <input
                    type="checkbox"
                    {...field}
                    value={option._id}
                    checked={selectedOptions.includes(option._id)}
                    onChange={() => handleOptionChange(option._id)}
                  />
                  {option.name}
                </label>
              ))}
            </div>
          )}
        />
      )}
    </div>
  );
};

export default MultipleSelect;
