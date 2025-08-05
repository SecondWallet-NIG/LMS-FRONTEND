// PrevNextBtn.js
import React from 'react';
import Image from 'next/image';
import PreviousBtn from '../shared/previousBtn/PreviousBtn';
import NextBtn from '../shared/nextBtn/NextBtn';
const PaginationIcon = "/images/Pagination.svg";


const PrevNextBtn = ({ step, handlePrev, handleNext, disablePrev, disableNext }) => {
  return (
    <div className='flex justify-between items-center mt-10 px-5'>
      <PreviousBtn onClick={handlePrev} disabled={disablePrev} />
      <Image src={PaginationIcon} alt="pagination icon" width={20} height={20} />
      <NextBtn onClick={handleNext} disabled={disableNext} />
    </div>
  );
};

export default PrevNextBtn;
