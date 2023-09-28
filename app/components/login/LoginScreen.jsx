// LoginScreen.js
import React, { useState } from "react";
import { BsBarChart , BsPeopleFill, BsCalculator, BsInfoCircle} from "react-icons/bs";
import { MdOutlineEmail, MdKey } from "react-icons/md";
import InputField from "../shared/input/InputField";
import Button from "../shared/buttonComponent/Button";
import Link from 'next/link'

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // Handle the login logic here
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-[30%] bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl text-center font-semibold mb-4">Log into your account</h2>
        <div className="mt-2">
          <InputField
            type="email"
            placeholder="Email Address"
            hintText="This is your email address"
            required={true}
            value={email}
            onChange={handleEmailChange}
            endIcon={<BsInfoCircle  />}
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
            endIcon={<BsInfoCircle  />}
            startIcon={<MdKey />}
          />
        </div>

        <Button
          onClick={handleLogin}
          className="bg-swBlue w-full text-white py-2 px-4 rounded-md mt-4 hover:bg-bswBlue"
        >
          Login 
        </Button>
        <p className="text-sm mt-2 pt-2 text-center">
          <Link href="/forgetPassword">Forget Password</Link> | <a href="#">Change Password</a>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
