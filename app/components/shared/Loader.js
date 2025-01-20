import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Loader = ({ isOpen, bgColor, onClose, children, width }) => {
  if (!isOpen) return null;
  const modalStyles = {
    width: width || "90%",
    maxWidth: "1000px",
    minWidth: "300px",
  };
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50 z-[110]">
      <div className={` p-2 rounded-md shadow-md"`}>
        <ThreeDots
          height="100"
          width="100"
          color="#ffffff"
          secondaryColor="#ffffff"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="circles-with-bar-loading"
        />
      </div>
    </div>
  );
};

export default Loader;
