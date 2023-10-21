import React from "react";

const CenterModal = ({ isOpen, onClose, children, width}) => {
  if (!isOpen) return null;
  const modalStyles = {
    width: width || "90%", // Use full width on mobile
    maxWidth: "1000px", // Set a maximum width for larger screens
  };
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-md" style={modalStyles}>
        <button className=" " onClick={onClose}>
          X
        </button>

        {children}
      </div>
    </div>
  );
};

export default CenterModal;
