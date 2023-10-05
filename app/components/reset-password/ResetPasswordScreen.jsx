"use client";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "../shared/input/InputField";
import { MdKey } from "react-icons/md";
import Button from "../shared/buttonComponent/Button";
import Link from "next/link";
import Image from "next/image";
import companyLogo from "../../../public/images/Logo.png";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ResetPasswordScreen = ({
  email,
  step,
  setStep,
  onEmailChange,
  onNextStep,
}) => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [ndPasswordVisible, setNdPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetData, setResetData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [validInput, setValidInput] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const handleInputChange = (e, num) => {
    const { name, value } = e.target;
    setResetData({ ...resetData, [name]: value });

    if (name === "newPassword" || name === "confirmPassword") {
      const isValidPassword = value.length >= 8;
      setValidInput({ ...validInput, [name]: isValidPassword });
    }

    if (num === 1) {
      setPassword(e.target.value);
    }
  };

  const handleResetPassword = async () => {
    try {
      onNextStep();
      toast.success("Password reset successful.");

      return response.data;
    } catch (error) {}
  };

  const handlePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleNdPasswordVisible = () => {
    setNdPasswordVisible(!ndPasswordVisible);
  };

  const handleRadioClick = (e) => {
    e.preventDefault();
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
            inputType={passwordVisible ? "text" : "password"}
            placeholder="Enter New Password"
            required={true}
            onChange={(e) => {
              handleInputChange(e, 1);
            }}
            startIcon={<MdKey />}
            endIcon={
              passwordVisible ? (
                <AiOutlineEyeInvisible
                  onClick={handlePasswordVisible}
                  className="cursor-pointer"
                  size={20}
                />
              ) : (
                <AiOutlineEye
                  onClick={handlePasswordVisible}
                  className="cursor-pointer"
                  size={20}
                />
              )
            }
          />
        </div>
        <div className="mt-2">
          <InputField
            name="confirmPassword"
            inputType={ndPasswordVisible ? "text" : "password"}
            placeholder="Confirm New Password"
            required={true}
            onChange={(e) => {
              handleInputChange(e, 2);
            }}
            startIcon={<MdKey />}
            endIcon={
              ndPasswordVisible ? (
                <AiOutlineEyeInvisible
                  onClick={handleNdPasswordVisible}
                  className="cursor-pointer"
                  size={20}
                />
              ) : (
                <AiOutlineEye
                  onClick={handleNdPasswordVisible}
                  className="cursor-pointer"
                  size={20}
                />
              )
            }
          />
        </div>
        <div className="mt-4 text-swGray">
          <p>Your password should contain</p>
          <div className="flex gap-1">
            <input
              type="radio"
              checked={/^.{8,20}$/.test(password) ? true : false}
              onClick={handleRadioClick}
            />
            <p>Between 8 to 20 characters</p>
          </div>
          <div className="flex gap-1">
            <input
              type="radio"
              checked={/^(?=.*[0-9])/.test(password) ? true : false}
              onClick={handleRadioClick}
            />
            <p>1 number</p>
          </div>
          <div className="flex gap-1">
            <input
              type="radio"
              checked={/^(?=.*[A-Z])/.test(password) ? true : false}
              onClick={handleRadioClick}
            />
            <p>Capital Letters</p>
          </div>
          <div className="flex gap-1">
            <input
              type="radio"
              checked={/^(?=.*[a-z])/.test(password) ? true : false}
              onClick={handleRadioClick}
            />
            <p>Small letters</p>
          </div>
          <div className="flex gap-1">
            <input
              type="radio"
              checked={/^(?=.*[!@#\$%\^&\*])/.test(password) ? true : false}
              onClick={handleRadioClick}
            />
            <p>Symbols (_, @, #, &lt;, &gt;, etc)</p>
          </div>
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
