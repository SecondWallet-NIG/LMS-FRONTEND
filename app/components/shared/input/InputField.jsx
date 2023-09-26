import React from "react";

const InputField = ({
  label,
  placeholder,
  inputType,
  borderColor,
  required,
  onChange,
  value,
  name,
  hintText,
  endIcon 
}) => {
  return (
    <div className="">
      <label
        htmlFor={name}
        className="block text-gray-700 text-xs mb-2"
      >
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>

      <div className="relative">
        <input
          type={inputType}
          id={name}
          name={name}
          placeholder={placeholder}
          className={`w-full h-10 px-3 py-2 rounded border ${borderColor} ${
            required ? "border-gray-300" : "border-gray-300"
          } focus:outline-none focus:${borderColor}`}
          required={required}
          onChange={onChange}
          value={value}
        />

        {endIcon && (
          <span className="absolute inset-y-0 right-0 pr-3 pb-5 flex items-center">
            {endIcon}
          </span>
        )}

        {hintText && (
          <p className="text-gray-500 text-xs mt-2">{hintText}</p>
        )}
      </div>
    </div>
  );
};

export default InputField;
