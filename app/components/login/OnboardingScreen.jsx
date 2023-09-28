import React, { useState  } from "react";
import Button from "../shared/button/Button";
import { useDispatch, useSelector } from "react-redux";


const OnboardingScreen = () => {
    const user = useSelector((state) => state.auth.user);
    console.log({user});
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

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
    // Handle form submission (e.g., send data to the server)
    console.log("Form data submitted:", formData);
  };

  return (
    <div
      className="h-screen flex justify-center items-center"
      style={{ background: "#f0f0f0" }}
    >
      <div
        className="w-[30%] bg-white p-6 rounded-lg shadow-md"
        style={{ minWidth: "400px" }}
      >
        <div>
          <h1 className="text-2xl font-semibold mb-4">Three-Step Form</h1>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  Hi {user.firstName} {user.lastName},
                </h2>
                <p className="mb-4">
                  You’ve been added to the Second Wallet Loan Management App as
                  a {user.role}.
                </p>
                <p>Let’s set up your account</p>
                <Button onClick={handleNextStep} className="mt-4">
                  Set up account
                </Button>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Step 2: Email and Password
                </h2>
                <label className="block mb-2">
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border rounded px-2 py-1 w-full"
                    required
                  />
                </label>
                <label className="block mb-4">
                  Password:
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="border rounded px-2 py-1 w-full"
                    required
                  />
                </label>
                <div className="flex justify-between">
                  <Button onClick={handlePrevStep}>Previous</Button>
                  <Button type="submit">Next</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Step 3: Review and Submit
                </h2>
                <p className="mb-2">First Name: {formData.firstName}</p>
                <p className="mb-2">Last Name: {formData.lastName}</p>
                <p className="mb-2">Email: {formData.email}</p>
                <div className="flex justify-between">
                  <Button onClick={handlePrevStep}>Previous</Button>
                  <Button type="submit">Submit</Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
