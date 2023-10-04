import React, { useState, useEffect } from "react";
import Button from "../shared/buttonComponent/Button";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import companyLogo from "../../../public/images/Logo.png";
import ResetPasswordScreen from "../reset-password/ResetPasswordScreen";
import ResetSuccessful from "../resetSuccesfully/ResetSuccessful";

const OnboardingScreen = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [user, setUser] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <div className="">
      <div>
        {step === 1 && (
          <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit}>
              <div className="items-center text-center">
                <div className="flex justify-center items-center mb-20">
                  <Image src={companyLogo} alt="company logo" />
                </div>
                <h2 className="text-xl font-semibold mb-8">
                  Hi {user?.firstName} {user?.lastName},
                </h2>
                <p className="mb-4">
                  You’ve been added to the Second Wallet Loan Management App as
                  an Admin.
                </p>
                <p>Let’s set up your account</p>
                <Button onClick={handleNextStep} className="mt-4 block w-full">
                  Set up account
                </Button>
              </div>
            </form>
          </div>
        )}

        {step === 2 && <ResetPasswordScreen onNextStep={handleNextStep} />}

        {step === 3 && <ResetSuccessful />}
      </div>
    </div>
  );
};

export default OnboardingScreen;
