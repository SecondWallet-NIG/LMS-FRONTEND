"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "../shared/input/InputField";
import { MdKey } from "react-icons/md";
import Button from "../shared/buttonComponent/Button";
import Link from "next/link";
import Image from "next/image";
import companyLogo from '../../../public/images/Logo.png'

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPasswordScreen = ({
  email,
  step,
  setStep,
  onEmailChange,
  onNextStep,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [resetData, setResetData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [validInput, setValidInput] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResetData({ ...resetData, [name]: value });

    if (name === "newPassword" || name === "confirmPassword") {
      const isValidPassword = value.length >= 8;
      setValidInput({ ...validInput, [name]: isValidPassword });
    }
  };

  const handleResetPassword = async () => {
    try {
      onNextStep();
      toast.success("Password reset successful.");

      return response.data;
    } catch (error) {

    }
  };

  return (
    <div className="flex justify-center  items-center">
     
      <div className="w-[30%] bg-white p-6 rounded-lg shadow-m ">
      <div className="flex justify-center items-center mt-20 -ml-5">
        <Image src={companyLogo} alt="company logo" />
      </div>
        <h2 className="text-2xl text-center font-semibold mt-20 mb-4">
          Reset Your Password
        </h2>
        <div className="mt-2">
          <InputField
            name="newPassword"
            inputType="password"
            placeholder="Enter New Password"
            required={true}
            onChange={handleInputChange}
            startIcon={<MdKey />}
          />
        </div>
        <div className="mt-2">
          <InputField
            name="confirmPassword"
            inputType="password"
            placeholder="Confirm New Password"
            required={true}
            onChange={handleInputChange}
            startIcon={<MdKey />}
          />
        </div>
        <Button
          onClick={handleResetPassword}
          disabled={
            !validInput.newPassword ||
            !validInput.confirmPassword ||
            loading === "pending"
          }
          className={`w-full text-white py-2 px-4 rounded-md mt-4 ${
            (!validInput.newPassword || !validInput.confirmPassword) &&
            "bg-gray-300 cursor-not-allowed"
          } ${
            validInput.newPassword && validInput.confirmPassword && "bg-swBlue"
          } `}
        >
          {loading === true ? "Resetting Password..." : "Reset Password"}
        </Button>
        <p className="text-sm mt-2 pt-2 text-center">
          <Link href="/login">Back to Login</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPasswordScreen;
