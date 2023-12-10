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
    <div className="flex items-center justify-center w-full h-[400px] bg-white">
      <div className={`${bgColor ? bgColor : "bg-white"} p-4 rounded-md shadow-md"`}>
    
        
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