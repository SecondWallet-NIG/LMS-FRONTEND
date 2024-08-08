import React from "react";
import Select from "react-select";

const _options = [

];

const formatOptionLabel = ({ label, isSelected }) => (
  <div className="flex">
    <div style={{ display: isSelected ? "none" : "block" }}>{label}</div>
  </div>
);

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    height: "40px",
    borderColor: state.isFocused
      ? "your-custom-border-color"
      : provided.borderColor,
    boxShadow: state.isFocused ? "none" : provided.boxShadow,
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#f5f5f5" : "white",
    color: state.isFocused ? "#000000" : "#000000",
    borderRadius: "5px",
    margin: "5px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  }),
};

const SelectField = ({
  label,
  name,
  required,
  placeholder,
  isSearchable,
  noOptionsMessage,
  optionValue,
  onChange,
  value,
  disabled,
  setValue,
}) => {
  const handleSelectChange = (selectedOption) => {
    if (onChange) {
      onChange(selectedOption);
    }
  };

  return (
    <div>
      <label className="block text-gray-700 text-sm mb-2 capitalize">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      <Select
        setValue={setValue}
        name={name}
        isDisabled={disabled}
        styles={customStyles}
        isSearchable={isSearchable}
        options={optionValue ? optionValue : _options}
        placeholder={placeholder}
        value={value}
        noOptionsMessage={noOptionsMessage}
        formatOptionLabel={formatOptionLabel}
        onChange={handleSelectChange} // Step 4: Pass the onChange function
      />
    </div>
  );
};

export default SelectField;
