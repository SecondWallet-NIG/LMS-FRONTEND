"use client";
import React, { useState, useEffect } from "react";
import companyLogo from "../../public/images/Logo.png";
import InputField from "../components/shared/input/InputField";
import Button from "../components/shared/buttonComponent/Button";
import Image from "next/image";
import PrevNextBtn from "../components/prevNextBtn/PrevNextBtn";
import Verification from "../components/verification/Verification";
import ResetSuccessful from "../components/resetSuccesfully/ResetSuccessful";
import ResetPasswordScreen from "../components/reset-password/ResetPasswordScreen";
import { getVerifyToken } from "@/redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { isValidEmail } from "../components/helpers/utils";

//toast
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgetPassword = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { loading, error, data: userData } = useSelector((state) => state.user);

  const [step, setStep] = useState(1);

  const [payload, setPayload] = useState({
    email: "",
  });

  const [validInput, setValidInput] = useState({
    email: false,
  });

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });

    if (name === "email") {
      const isValid = isValidEmail(value);
      setValidInput({ ...validInput, email: isValid });
    }
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step === 1) {
      setStep(1);
    } else {
      setStep(step - 1);
    }
  };

  const handleVerifyEmail = () => {
    dispatch(getVerifyToken(payload))
      .unwrap()
      .then(() => {
        // Handle a successful login here if needed
        localStorage.setItem("email", JSON.stringify(payload.email));
        toast.success("Please check your email for the verification code");
        handleNextStep();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div>
      <ToastContainer />
      <div className="mb-3">
        <PrevNextBtn
          step={step}
          handlePrev={handlePrevStep}
          handleNext={handleNextStep}
          disablePrev={step === 1} // Disable Prev button on step 1
          disableNext={step === 3} // Enable Next button by default
        />
      </div>
      <div>
        {step === 1 && (
          <div>
            <div className="flex justify-center items-center mt-20 -ml-5">
              <Image src={companyLogo} alt="company logo" />
            </div>
            <div className="h-[70%] flex justify-center items-center mt-20">
              <div className="w-full sm:w-[70%] md:w-[50%] lg:w-[40%] bg-white p-6 rounded-lg">
                <h2 className="text-2xl flex justify-center items-center  text-justify font-semibold mb-4">
                  Reset password
                </h2>
                <p className="text-current text-sm mt-2 pt-2">
                  Enter your email address so we can send you a reset code
                </p>
                <div className="mt-2">
                  <InputField
                    name="email"
                    inputType="email"
                    placeholder="Email Address"
                    required={true}
                    // value={payload.email}
                    onChange={handleEmailChange}
                  />
                </div>
                <Button
                  onClick={handleVerifyEmail}
                  disabled={!validInput.email || loading === "pending"}
                  className={`w-full text-white py-2 px-4 rounded-md mt-8 ${
                    !validInput.email && "bg-gray-300 cursor-not-allowed"
                  } ${validInput.email && "bg-swBlue"} `}
                >
                  {loading === true ? "Processing..." : "Verify Email"}
                </Button>
                <p className="text-sm mt-2 pt-2 text-center">
                  <a href="#">Login</a>
                </p>
              </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <Verification
              //   email={email}
              step={step}
              setStep={setStep}
              onEmailChange={handleEmailChange}
              onNextStep={handleNextStep}
            />
          </div>
        )}
        {step === 3 && (
          <div>
            <ResetPasswordScreen onNextStep={handleNextStep} />
          </div>
        )}
        {step === 4 && (
          <div>
            <ResetSuccessful />
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
