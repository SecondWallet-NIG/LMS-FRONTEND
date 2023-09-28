import React from 'react';
import PreviousBtn from '../shared/previousBtn/PreviousBtn';
import NextBtn from '../shared/nextBtn/NextBtn';
import PaginationIcon from "../../../public/images/pagination.svg";
import Image from "next/image";
const PrevNextBtn = () => {
  return (
    <div className='flex justify-between items-center mt-10 px-5'>
      <PreviousBtn />
      <Image src={PaginationIcon} alt="pagination icon" />
      <NextBtn />
    </div>
  )
}

export default PrevNextBtn
