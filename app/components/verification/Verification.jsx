import React, { useState } from "react";
import companyLogo from "../../../public/images/Logo.png";
import Button from "../shared/buttonComponent/button";
import Image from "next/image";
import PrevNextBtn from "../prevNextBtn/PrevNextBtn";
import InputField from "../shared/input/InputField";

const Verification = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };



  const handleReset = () => {
    // Handle the login logic here
  };

  return (
    <div>
      <div className="mb-3">
        <PrevNextBtn />
      </div>
      <div className="flex justify-center items-center mb-20 -ml-5">
        <Image src={companyLogo} alt="company logo" />
      </div>
      <div className="h-[70%] flex justify-center items-center">
        <div className="w-[30%] bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg text-justify font-semibold mb-4">We’ve sent a verification code to your email address</h2>
          <p className="text-current text-sm mt-2 pt-2">Enter verification code</p>
          <div className="flex gap-x-2 mb-10">
            <div className="mt-2">
              <input
                className="w-14 border border-Gray py-2 px-4 rounded-sm text-3xl"
                type="number"
                placeholder="0"
                required
              />
            </div>
            <div className="mt-2">
              <input
                className="w-14 border border-Gray py-2 px-4 rounded-sm text-3xl"
                type="number"
                placeholder="0"
                required
              />
            </div>
            <div className="mt-2">
              <input
                className="w-14 border border-Gray py-2 px-4 rounded-sm text-3xl"
                type="number"
                placeholder="0"
                required
              />
            </div>
            <div className="mt-2">
              <input
                className="w-14 border border-Gray py-2 px-4 rounded-sm text-3xl"
                type="number"
                placeholder="0"
                required
              />
            </div>
            <div className="mt-2">
              <input
                className="w-14 border border-Gray py-2 px-4 rounded-sm text-3xl"
                type="number"
                placeholder="0"
                required
              />
            </div>
            <div className="mt-2">
              <input
                className="w-14 border border-Gray py-2 px-4 rounded-sm text-3xl"
                type="number"
                placeholder="0"
                required
              />
            </div>
          </div>
          <Button
            onClick={handleReset}
            className="bg-swBlue w-full text-white py-2 px-4 rounded-md mt-4 hover:bg-bswBlue"
          >
            Reset password
          </Button>
          <p className="text-sm mt-2 pt-2 text-center">
            <a href="#">Login</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Verification;
