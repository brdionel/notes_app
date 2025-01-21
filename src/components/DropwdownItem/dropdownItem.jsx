function DropdownOption({ handleInnerOptionSelected, option, labelOption }) {
  return (
    <li key={labelOption} onClick={() => handleInnerOptionSelected(option)}>
      <span>{labelOption}</span>
    </li>
  );
}

export default DropdownOption;
