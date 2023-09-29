import React from "react";

const InputField = ({
  label,
  placeholder,
  inputType,
  borderColor,
  dropDown,
  customSelect,
  required,
  onChange,
  value,
  name,
  hintText,
  endIcon,
  startIcon, // New prop for the icon before placeholder
  onclick,
  inputOpen,
  isActive,
}) => {
  return (
    <div
      className={`${
        inputOpen === isActive && !customSelect && !dropDown && "mb-5 "
      } relative flex items-center p-2 w-full translate-all ${borderColor} duration-1000 cursor-pointer rounded border hover:border-swBlue }`}
      onClick={onclick}
    >
      {/* Added flex container */}
      {startIcon && <span className=" flex items-center">{startIcon}</span>}
      <label htmlFor={name} className="text-gray-700 stext-xs z-50">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      {!customSelect && !dropDown && (
        <input
          type={inputType}
          id={name}
          name={name}
          placeholder={placeholder}
          className={`w-[100.4%] p-2 -ml-[0.6rem] ${
            inputOpen === isActive
              ? "opacity-100 translate-y-8 outline-none focus:outline-none rounded rounded-t-none border border-t-0 border-swBlue w-[100.4%]"
              : "opacity-0 outline-none focus:outline-none rounded rounded-t-none border border-t-0 cursor-pointer w-[100.3%]"
          } transition-all duration-1000 ease-in-out absolute`}
          required={required}
          onChange={onChange}
          value={value}
        />
      )}

      {hintText && <p className="text-gray-500 text-xs mt-2">{hintText}</p>}
      {endIcon && (
        <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {endIcon}
        </span>
      )}
    </div>
  );
};

export default InputField;
