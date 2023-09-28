import React, { useState } from "react";
import companyLogo from "../../../public/images/Logo.png";
import checkbox from "../../../public/images/Checkbox.svg";
import { BsInfoCircle } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { MdOutlineEmail, MdKey } from "react-icons/md";
import InputField from "../shared/input/InputField";
import Button from "../shared/buttonComponent/button";
import Image from "next/image";
import PrevNextBtn from "../prevNextBtn/PrevNextBtn";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };



  const handleResetPassword = () => {
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
          <h2 className="text-2xl text-justify font-semibold mb-4">Reset password</h2>
          <div className="mt-2">
            <InputField
              type="email"
              placeholder="Email Address"
              required={true}
              value={email}
              onChange={handleEmailChange}
              endIcon={<BsInfoCircle />}
              startIcon={<MdOutlineEmail />}
            />
          </div>
          <div className="mt-2">
            <InputField
              type="password"
              placeholder="Password"
              required={true}
              value={password}
              onChange={handlePasswordChange}
              endIcon={<FaEye />}
              startIcon={<MdKey />}
            />
          </div>
          <div>
            <p className="text-current text-sm text-gray-500 mt-2 pt-2">Your password should contain</p>
            <ul>
              <li className="flex items-center gap-x-3 text-sm text-gray-500 mt-1"> <Image src={checkbox} alt="checkbox-icon" /> Between 8 to 20 characters</li>
              <li className="flex items-center gap-x-3 text-sm text-gray-500 mt-1"><Image src={checkbox} alt="checkbox-icon" /> 1 number</li>
              <li className="flex items-center gap-x-3 text-sm text-gray-500 mt-1"><Image src={checkbox} alt="checkbox-icon" /> Capital Letters</li>
              <li className="flex items-center gap-x-3 text-sm text-gray-500 mt-1"><Image src={checkbox} alt="checkbox-icon" /> Small letters</li>
              <li className="flex items-center gap-x-3 text-sm text-gray-500 mt-1"><Image src={checkbox} alt="checkbox-icon" /> Symbols (_, @, #, )</li>
            </ul>
          </div>

          <Button
            onClick={handleResetPassword}
            className="bg-swBlue w-full text-white py-2 px-4 rounded-md mt-8 hover:bg-bswBlue"
          >
            Save password
          </Button>

        </div>
      </div>
    </div>
  )
}


export default ResetPassword;
