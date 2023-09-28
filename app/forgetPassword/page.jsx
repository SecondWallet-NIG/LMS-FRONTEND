"use client";
import { useState } from "react";
import companyLogo from "../../public/images/Logo.png";
import InputField from "../components/shared/input/InputField";
import Button from "../components/shared/buttonComponent/Button";
import Image from "next/image";
import PrevNextBtn from "../components/prevNextBtn/PrevNextBtn";


const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };



  const handleReset = () => {
    // Handle the reset logic here
  };
  return (
    <div>
      <div>
        <div className="mb-3">
          <PrevNextBtn />
        </div>
        <div className="flex justify-center items-center mb-20 -ml-5">
          <Image src={companyLogo} alt="company logo" />
        </div>
        <div className="h-[70%] flex justify-center items-center">
          <div className="w-[30%] bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl text-justify font-semibold mb-4">Reset password</h2>
            <p className="text-current text-sm mt-2 pt-2">Enter your email address so we can send you a reset code</p>
            <div className="mt-2">
              <InputField
                type="email"
                placeholder="Email Address"
                required={true}
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <Button
              onClick={handleReset}
              className="bg-swBlue w-full text-white py-2 px-4 rounded-md mt-4 hover:bg-bswBlue"
            >
              Send email
            </Button>
            <p className="text-sm mt-2 pt-2 text-center">
              <a href="#">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword;
