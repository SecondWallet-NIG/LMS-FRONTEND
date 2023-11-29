// LoginScreen.js
"use client";
import React, { useState, useEffect } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineEmail, MdKey } from "react-icons/md";
import InputField from "../shared/input/InputField";
import Button from "../shared/buttonComponent/Button";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import companyLogo from "../../../public/images/Logo.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { isValidEmail } from "../helpers/utils";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/slices/userSlice";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LoginScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { loading, error, data: userData } = useSelector((state) => state.user);
  // const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [validInput, setValidInput] = useState({
    email: false,
    password: false,
  });

  const [seePassword, setSeePassword] = useState(false);

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

  const _handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://secondwallet-stag.onrender.com/api/auth/login",
        loginData
      );
      setLoading(false);
      toast.success(response.data.message);

      const user = response.data.data.user;
      ///    localStorage.setItem("user", JSON.stringify(user));

      if (user.firstLogin) {
        router.push("/onboarding");
      } else {
        router.push("/onboarding");
      }
    } catch (error) {
      toast.error(error?.response?.data?.error);
      setLoading(false);
    }
  };

  const handleLogin = () => {
    // Dispatch the loginUser async thunk with the loginData
    dispatch(loginUser(loginData))
      .unwrap()
      .then(() => {
        toast.success("Login successful");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // Handle the response data when it changes
  useEffect(() => {
  
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
      if (userData?.data?.user.firstLogin === true) {
        router.push("/onboarding");
      } else {
        router.push("/dashboard");
      }
    }
  }, [userData]);

  const handleSeePassWord = () => {
    setSeePassword(!seePassword);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <ToastContainer />
      <div className="w-full sm:w-[70%] md:w-[50%] lg:w-[40%] bg-white p-6 ">
        <div className="flex justify-center items-center mb-20 -ml-5">
          <Image src={companyLogo} alt="company logo" />
        </div>
        <h2 className="text-2xl text-center font-semibold mb-4">
          Log into your account
        </h2>
        <div className="mt-2">
          <InputField
            css={"relative"}
            name="email"
            label="Email address"
            inputType="email"
            placeholder="Email Address"
            required={true}
            //   value={loginData.email}
            onChange={handleInputChange}
            endIcon={<BsInfoCircle />}
            startIcon={<MdOutlineEmail />}
          />
        </div>
        <div className="mt-4">
          <InputField
            css={"relative"}
            name="password"
            label="Password"
            inputType={!seePassword ? "password" : "text"}
            placeholder="Password"
            required={true}
            //  value={loginData.password}
            onChange={handleInputChange}
            endIcon={
              !seePassword ? (
                <AiOutlineEye size={20} onClick={handleSeePassWord} />
              ) : (
                <AiOutlineEyeInvisible size={20} onClick={handleSeePassWord} />
              )
            }
            startIcon={<MdKey />}
          />
        </div>
        <Button
          onClick={handleLogin}
          disabled={
            !validInput.email || !validInput.password || loading === "pending"
          }
          className={`w-full text-white py-2 px-4 rounded-md mt-8 ${
            (!validInput.email || !validInput.password) &&
            "bg-gray-300 cursor-not-allowed"
          } ${validInput.email && validInput.password && "bg-swBlue"} `}
        >
          {loading === true ? "Logging In..." : "Log In"}
        </Button>
        <p className="text-sm mt-2 pt-2 text-center">
          <Link href="/forgetPassword">Forget Password</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginScreen;
