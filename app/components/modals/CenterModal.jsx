import React from "react";

const CenterModal = ({
  isOpen,
  bgColor,
  onClose,
  children,
  width,
  twidth,
  height,
}) => {
  if (!isOpen) return null;
  const modalStyles = {
    width: width || "90%",
    //   maxWidth: "1000px",
    minWidth: "300px",
  };
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-screen p-5 h-screen bg-black bg-opacity-50 z-[110]">
      <div
        style={width && modalStyles}
        className={`${
          bgColor ? bgColor : "bg-white"
        } overflow-hidden rounded-md shadow-md" style={modalStyles} ${
          height && height
        } p-4 ${!width ? twidth || "max-w-xl w-full" : ""} `}
      >
        {children}
      </div>
    </div>
  );
};

export default CenterModal;
