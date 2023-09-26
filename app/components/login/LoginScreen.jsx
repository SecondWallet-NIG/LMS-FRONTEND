// LoginScreen.js
import React, { useState } from "react";
import { BsBarChart , BsPeopleFill, BsCalculator, BsInfoCircle} from "react-icons/bs";
import InputField from "../shared/input/InputField";

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
          />
        </div>
        <div className="mt-2">
          <InputField
            type="password"
            placeholder="Password"
            hintText="This is your password"
            required={true}
            value={password}
            onChange={handlePasswordChange}
            endIcon={<BsInfoCircle  />}
          />
        </div>

        <button
          onClick={handleLogin}
          className="bg-swBlue w-full text-white py-2 px-4 rounded-md mt-4 hover:bg-bswBlue"
        >
          Login 
        </button>
        <p className="text-sm mt-2 pt-2 text-center">
          <a href="#">Forgot Password</a> | <a href="#">Change Password</a>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
