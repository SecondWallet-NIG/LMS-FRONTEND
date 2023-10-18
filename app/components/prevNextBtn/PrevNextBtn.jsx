// PrevNextBtn.js
import React from 'react';
import PreviousBtn from '../shared/previousBtn/PreviousBtn';
import NextBtn from '../shared/nextBtn/NextBtn';
import PaginationIcon from "../../../public/images/Pagination.svg";
import Image from "next/image";

const PrevNextBtn = ({ step, handlePrev, handleNext, disablePrev, disableNext }) => {
  return (
    <div className='flex justify-between items-center mt-10 px-5'>
      <PreviousBtn onClick={handlePrev} disabled={disablePrev} />
      <Image src={PaginationIcon} alt="pagination icon" />
      <NextBtn onClick={handleNext} disabled={disableNext} />
    </div>
  );
};

export default PrevNextBtn;
