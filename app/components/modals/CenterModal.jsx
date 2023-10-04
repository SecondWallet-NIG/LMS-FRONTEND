import React from 'react';

const CenterModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-md">
        <button className=" " onClick={onClose}>
          close
        </button>
       
        {children}
      </div>
    </div>
  );
};

export default CenterModal;
