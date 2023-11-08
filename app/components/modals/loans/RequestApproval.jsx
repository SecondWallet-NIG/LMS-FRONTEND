"use client";

import { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMail } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import InputField from "../../shared/input/InputField--";
import Button from "../../shared/buttonComponent/Button";

const RequestApproval = ({ isOpen, onClose, width, data, selected }) => {
  if (!isOpen) return null;
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading } = useSelector((state) => state.user);

  const successPopup = (selected) => {
    selected(true);
  };

  const [formData, setFormData] = useState({
    employerName: "",
  });

  const [errors, setErrors] = useState({
    employerName: "",
  });

  const modalStyles = {
    width: width || "90%",
    maxWidth: "800px",
  };

  const handleInputChange = async (e) => {
    let { name, value } = e.target;
    setErrors({ ...errors, [name]: "" });
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (formData.employerName.trim() === "") {
      newErrors.employerName = "Employee name is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const resetForm = () => {
    setFormData({
      employerName: "",
    });
    setVerificationResponse(null);
    setBankNameVal("");
  };
  const handleSubmit = (e) => {};

  return (
    <main className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-10">
      <form style={modalStyles} id="add-user-form">
        <div className="border bg-white border-swLightGray">
          <div className="flex justify-between items-center p-3 text-white">
            <div>
              <p className="text-base font-semibold text-swGray">
                Request Approval
              </p>
              <p className="text-xs text-swGray">
                You can add an approval message
              </p>
            </div>
            <AiOutlineClose
              color="red"
              size={20}
              onClick={onClose}
              className="cursor-pointer"
            />
          </div>
          <div className="p-4">
            <input
              className="w-full h-[200px] border border-1 items-top"
              type="textarea"
              placeholder="Input an approval message"
            />
            <Button className="mt-4 block w-full">Submit</Button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default RequestApproval;
