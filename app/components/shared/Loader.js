import React from "react";
import { Oval } from "react-loader-spinner";

const Loader = ({ isOpen,bgColor, onClose, children, width}) => {
  if (!isOpen) return null;
  const modalStyles = {
    width: width || "90%",
    maxWidth: "1000px",
    minWidth: "300px",
  };
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-white z-[110]">
      <div className={`${bgColor ? bgColor : "bg-white"} p-4 rounded-md shadow-md" style={modalStyles}`}>
    
        
        <Oval
          height="100"
          width="100"
          color="#2769B3"
          secondaryColor="#2769B3"
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