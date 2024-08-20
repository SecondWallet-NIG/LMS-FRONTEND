import React from "react";
import { FaTimes } from "react-icons/fa"; // Import a close icon from react-icons

const RightModal = ({
  isOpen,
  bgColor,
  onClose,
  children,
  width,
  twidth,
  height,
}) => {
  if (!isOpen) return null;

  // Modal styles with width set to 50% of the screen width
  const modalStyles = {
    width: width || "50%", // Default to 50% of the screen width
    maxWidth: "1000px", // Optional: adjust maximum width as needed
    minWidth: "300px",
    height: height || "auto", // Adjust height if needed
  };

  return (
    <div className="fixed inset-0 flex items-start justify-end bg-black bg-opacity-50 z-[110] h-screen">
      <div
        style={modalStyles}
        className={`${
          bgColor ? bgColor : "bg-white"
        } overflow-hidden h-screen pt-2 ${
          twidth || "max-w-xl w-full"
        } relative`} // Added relative for positioning the close button
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 mt-2"
          aria-label="Close"
        >
          <FaTimes size={20} />
        </button>

        {/* Modal content */}
        {children}
      </div>
    </div>
  );
};

export default RightModal;
