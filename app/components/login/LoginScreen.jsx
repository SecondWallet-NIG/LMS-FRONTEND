// LoginScreen.js
import React, { useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineEmail, MdKey } from "react-icons/md";
import InputField from "../shared/input/InputField";
import Button from "../shared/buttonComponent/Button";
import Link from 'next/link'
import axios from "axios";

//slice
import { loginUser } from "@/redux/slices/userSlice";

//toast
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { isValidEmail } from "../helpers/utils";

//redux
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/authSlice";

const LoginScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [validInput, setValidInput] = useState({
    email: false,
    password: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });

    if (name === "email") {
      const isValid = isValidEmail(value);
      setValidInput({ ...validInput, email: isValid });
    } else if (name === "password") {
      const isValidPassword = value.length >= 8;
      setValidInput({ ...validInput, password: isValidPassword });
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        loginData
      );
      setLoading(false);
      toast.success(response.data.message);

      const user = response.data.data.user;

      if (user.firstLogin) {
        router.push("/dashboard");
      } else {
        router.push("/dashboard");
      }
      dispatch(login(user));
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
      setLoading(false);
      return error.response.data.error;
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-[30%] bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl text-center font-semibold mb-4">
          Log into your account
        </h2>
        <div className="mt-2">
          <InputField
            name="email"
            inputType="email"
            placeholder="Email Address"
            hintText="This is your email address"
            required={true}
            //   value={loginData.email}
            onChange={handleInputChange}
            endIcon={<BsInfoCircle />}
            startIcon={<MdOutlineEmail />}
          />
        </div>
        <div className="mt-2">
          <InputField
            name="password"
            inputType="password"
            placeholder="Password"
            required={true}
            //  value={loginData.password}
            onChange={handleInputChange}
            endIcon={<BsInfoCircle />}
            startIcon={<MdKey />}
          />
        </div>
        <Button
          onClick={handleLogin}
          disabled={
            !validInput.email || !validInput.password || loading === "pending"
          }
          className={`w-full text-white py-2 px-4 rounded-md mt-4 ${
            (!validInput.email || !validInput.password) &&
            "bg-gray-300 cursor-not-allowed"
          } ${validInput.email && validInput.password && "bg-swBlue"} `}
        >
          {loading === true ? "Logging In..." : "Log In"}
        </Button>
        <p className="text-sm mt-2 pt-2 text-center">
          <Link href="/forgetPassword">Forget Password</Link> | <a href="#">Change Password</a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginScreen;
