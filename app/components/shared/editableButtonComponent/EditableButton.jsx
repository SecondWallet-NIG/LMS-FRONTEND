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
      className={`flex text-sm font-semibold border-2 rounded-lg overflow-hidden h-fit relative ${
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
          whiteBtn
            ? `bg-white border border-white`
            : blueBtn
            ? `bg-swBlue border text-white border-white`
            : ""
        } ${className} flex items-center text-sm semi-bold py-2 px-5 rounded-lg gap-1`}
      >
        {startIcon && <span>{startIcon}</span>}
        <p>{label}</p>
        {endIcon && <span>{endIcon}</span>}
      </div>
    </button>
  );
};

export default EditableButton;
