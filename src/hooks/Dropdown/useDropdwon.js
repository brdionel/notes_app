import { useEffect, useRef, useState } from "react";

export function useDropdown({ options, handleOptionSelected }) {
  const dropdownRef = useRef();
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options?.[0]);

  const handleInnerOptionSelected = (option) => {
    handleOptionSelected(option);
    setSelectedOption(option);
    setIsOpenDropdown(false);
  };

  const toggleDropdown = () => {
    setIsOpenDropdown(!isOpenDropdown);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isOpenDropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpenDropdown]);

  return {
    dropdownRef,
    isOpenDropdown,
    selectedOption,
    toggleDropdown,
    handleInnerOptionSelected,
  };
}
