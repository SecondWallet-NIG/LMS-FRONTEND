import React from 'react';
import Button from '../buttonComponent/Button';
import { FaChevronRight } from 'react-icons/fa'

const NextBtn = () => {
  return (
    <div>
      <Button
        className="bg-white border border-Gray px-2 py-1 text-sm rounded-md hover:bg-white"
      >
        <span className='flex justify-center items-center gap-x-1.5 text-gray-500 text-sm'>
          Next
          <FaChevronRight />
        </span>
      </Button>
    </div>
  )
}

export default NextBtn
