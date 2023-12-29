const EditableButton = ({
  label,
  disabled,
  className,
  onClick,
  startIcon,
  endIcon,
  whiteBtn,
  blueBtn,
}) => {
  return (
    <button
      className={`flex text-sm font-semibold border-2 border-white rounded-lg overflow-hidden h-fit relative ${className} ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      } ${
        whiteBtn
          ? "hover:border-gray-300"
          : blueBtn
          ? " hover:border-blue-300"
          : ""
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {disabled && (
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-70"></div>
      )}
      <div
        className={` ${
          whiteBtn ? `bg-white border` : blueBtn ? `bg-swBlue text-white` : ""
        }  flex items-center justify-center text-sm semi-bold w-full py-2 px-5 rounded-md gap-1`}
      >
        {startIcon && <span>{startIcon}</span>}
        <p>{label}</p>
        {endIcon && <span>{endIcon}</span>}
      </div>
    </button>
  );
};

export default EditableButton;
