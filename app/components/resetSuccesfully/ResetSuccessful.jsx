"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '../shared/buttonComponent/Button';
import PrevNextBtn from '../prevNextBtn/PrevNextBtn';
import companyLogo from "../../../public/images/Logo.png";
import checkMark from "../../../public/images/check.svg";
import Image from 'next/image';

const ResetSuccessful = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/");
  };
  return (
    <div>
      {/* <div className="mb-3">
        <PrevNextBtn />
      </div> */}
      <div className="flex justify-center items-center mt-20 -ml-5">
        <Image src={companyLogo} alt="company logo" />
      </div>
      <div className="h-[70%] flex justify-center mt-20 items-center">
        <div className="w-[30%] bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl text-center font-semibold mb-4">Password reset successful</h2>
          <div className="flex justify-center items-center mb-2 -ml-5">
            <Image src={checkMark} alt='checkmart-icon' />
          </div>

          <p className="text-current text-center text-sm mt-2 pt-2">You can now log into your account with your new password.</p>

          <p className="text-current text-center text-sm mt-2 pt-2">Cheers.</p>
          <Button
            onClick={handleLogin}
            className="bg-swBlue w-full text-white py-2 px-4 rounded-md mt-5 hover:bg-bswBlue"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ResetSuccessful
