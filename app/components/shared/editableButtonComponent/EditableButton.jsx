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
      className={`flex text-sm font-semibold border-2 border-white rounded-lg overflow-hidden cursor-pointer ${
        whiteBtn
          ? "hover:border-gray-300"
          : blueBtn
          ? " hover:border-blue-300"
          : ""
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      <div
        className={` ${
          whiteBtn
            ? `bg-white border-2`
            : blueBtn
            ? `bg-swBlue border-2 text-white`
            : ""
        } ${className} flex text-sm semi-bold py-2 px-5 rounded-lg gap-1`}
      >
        {startIcon && <span>{startIcon}</span>}
        <p>{label}</p>
        {endIcon && <span>{endIcon}</span>}
      </div>
    </button>
  );
};

export default EditableButton;
