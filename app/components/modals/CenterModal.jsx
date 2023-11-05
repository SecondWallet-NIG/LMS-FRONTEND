import React from "react";

const CenterModal = ({ isOpen,bgColor, onClose, children, width}) => {
  if (!isOpen) return null;
  const modalStyles = {
    width: width || "90%",
    maxWidth: "1000px",
    minWidth: "300px",
  };
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50 z-[110]">
      <div className={`${bgColor ? bgColor : "bg-white"} p-4 rounded-md shadow-md" style={modalStyles}`}>
        {children}
      </div>
    </div>
  );
};

export default CenterModal;
