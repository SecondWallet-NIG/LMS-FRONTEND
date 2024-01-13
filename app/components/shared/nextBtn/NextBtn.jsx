import React from "react";
import Button from "../buttonComponent/Button";
import { FaChevronRight } from "react-icons/fa";

const NextBtn = ({ onClick, disabled }) => {
  return (
    <div>
      <button
        disabled={disabled}
        onClick={onClick}
        className="bg-white border border-Gray px-2 py-1 text-sm rounded-md hover:bg-white"
      >
        <span className="flex justify-center items-center gap-x-1.5 text-gray-500 text-sm">
          Next
          <FaChevronRight />
        </span>
      </button>
    </div>
  );
};

export default NextBtn;
