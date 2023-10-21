import React from "react";

const InputField = ({
  css,
  label,
  placeholder,
  inputType,
  borderColor,
  required,
  onChange,
  value,
  name,
  hintText,
  endIcon,
  startIcon,
  disabled,
  maxLength // Add maxLength prop
}) => {
  return (
    <div className="">
      <label htmlFor={name} className="block text-gray-700 text-xs mb-2">
        {label}
        {required ? <span className="text-red-600 ml-1">*</span> : <div className="mb-2 text-white">*</div>}
      </label>

      <div className={`${css} relative flex items-center`}>
        {startIcon && (
          <span className="absolute inset-y-0 left-0 pt-5 p-2 pb-5 flex items-center">
            {startIcon}
          </span>
        )}

        <input
          type={inputType}
          id={name}
          name={name}
          placeholder={placeholder}
          className={`w-full h-10 px-3 py-2 rounded border ${borderColor} ${
            required ? "border-gray-300" : "border-gray-300"
          } focus:outline-none focus:${borderColor} ${
            startIcon ? "pl-8" : ""
          }`}
          required={required}
          onChange={onChange}
          value={value}
          disabled={disabled}
          maxLength={maxLength} // Pass maxLength prop
        />

        {endIcon && (
          <span className="absolute inset-y-0 right-0 pr-3 pt-5 pb-5 flex items-center">
            {endIcon}
          </span>
        )}
      </div>

      {hintText && (
        <p className="text-gray-500 text-xs mt-2">{hintText}</p>
      )}
    </div>
  );
};

export default InputField;
