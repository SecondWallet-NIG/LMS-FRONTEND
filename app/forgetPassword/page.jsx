"use client";
import React, { useState } from "react";
import companyLogo from "../../public/images/Logo.png";
import InputField from "../components/shared/input/InputField";
import Button from "../components/shared/buttonComponent/Button";
import Image from "next/image";
import PrevNextBtn from "../components/prevNextBtn/PrevNextBtn";
import Verification from "../components/verification/Verification";
import ResetSuccessful from "../components/resetSuccesfully/ResetSuccessful";
import ResetPasswordScreen from "../components/reset-password/ResetPasswordScreen";

const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
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

  return (
    <div>
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
              <div className="w-[30%] bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl flex justify-center items-center  text-justify font-semibold mb-4">
                  Reset password
                </h2>
                <p className="text-current text-sm mt-2 pt-2">
                  Enter your email address so we can send you a reset code
                </p>
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
                  onClick={handleNextStep}
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
        )}
        {step === 2 && (
          <div>
            <Verification
              email={email}
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
