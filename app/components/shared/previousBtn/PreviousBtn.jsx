import React from "react";
import Button from "../buttonComponent/Button";
import { FaChevronLeft } from "react-icons/fa";

const PreviousBtn = ({ onClick, disabled }) => {
  return (
    <div>
      <button
        onClick={onClick}
        disabled={disabled}
        className="bg-white border border-Gray px-2 py-1 text-sm rounded-md hover:bg-white"
      >
        <span className="flex justify-center items-center gap-x-1.5 text-gray-500 text-sm">
          <FaChevronLeft />
          Previous
        </span>
      </button>
    </div>
  );
};

export default PreviousBtn;
