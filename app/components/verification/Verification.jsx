import React, { useState, useRef } from "react";
import companyLogo from "../../../public/images/Logo.png";
import Button from "../shared/buttonComponent/Button";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { verifyToken } from "@/redux/slices/userSlice";

//toast
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Verification = ({ email, step, setStep, onEmailChange, onNextStep }) => {
  const inputRefs = useRef([]);
  const router = useRouter();
  const dispatch = useDispatch();

  const { loading, error, data: userData } = useSelector((state) => state.user);
  const [verificationCodes, setVerificationCodes] = useState(["", "", "", "", "", ""]);

  const handleInputChange = (e, index) => {
    const value = e.target.value;
  
    // Update the verification code at the current index
    const updatedCodes = [...verificationCodes];
    updatedCodes[index] = value;
    setVerificationCodes(updatedCodes);

  
    // Clear the previous input and center cursor in the new input
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index].value = "";
      inputRefs.current[index + 1].focus();
    } else if (!value && index > 0) {
      // If the input is empty and not the first input, focus on the previous input
      inputRefs.current[index - 1].focus();
    }
  };
  

  const handleSubmit = () => {
  
    const verificationCode = verificationCodes.join('');
    const user = JSON.parse(localStorage.getItem("email"))


    const payload = {
      email: user,
      verificationToken: verificationCode
    }
    dispatch(verifyToken(payload))
    .unwrap()
    .then(() => {
      toast.success("success");
      localStorage.setItem("verificationCode", JSON.stringify(verificationCode) )
      onNextStep();
    })
    .catch((error) => {
      toast.error(error.message);
    });

  };

  const handleReset = () => {
    onNextStep();
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-center items-center mt-20 -ml-5">
        <Image src={companyLogo} alt="company logo" />
      </div>
      <div className="h-[70%] flex justify-center mt-20 items-center">
        <div className="w-[30%] bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-md text-justify font-semibold mb-12">
            We’ve sent a verification code to your email address
          </h2>
          <div className="flex space-x-2 justify-between mb-8">
            {Array.from({ length: 6 }, (_, index) => (
              <input
                key={index}
                name="code"
                type="text"
                className="w-12 h-12 text-4xl border rounded focus:outline-none focus:border-blue-500"
                maxLength="1"
                placeholder="0"
                onChange={(e) => handleInputChange(e, index)}
                value={verificationCodes[index]}
                ref={(ref) => (inputRefs.current[index] = ref)}
              />
            ))}
          </div>
          <Button
            onClick={handleSubmit}
            className="bg-swBlue w-full text-white py-2 px-4 rounded-md mt-4 hover:bg-bswBlue"
          >
            Reset password
          </Button>
          <p className="text-sm mt-2 pt-2 text-center">
            <a href="#">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Verification;
