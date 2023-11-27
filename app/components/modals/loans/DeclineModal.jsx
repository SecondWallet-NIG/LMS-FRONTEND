"use client";

import { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMail } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "next/navigation";
import InputField from "../../shared/input/InputField--";
import Button from "../../shared/buttonComponent/Button";
import SelectField from "../../shared/input/SelectField";
import { requestLoanApproval } from "@/redux/slices/loanApprovalSlice";

const DeclineModal = ({
  isOpen,
  onClose,
  width,
  data,
  selected,
  approvalId,
  approvalLevel,
}) => {
  if (!isOpen) return null;
  const dispatch = useDispatch();
  const [usersToApprove, setUsersToApprove] = useState([]);
  const { id } = useParams();

  const [formData, setFormData] = useState({
    approvalLevel: approvalId,
    requestNote: "",
    assignee: "",
  });

  const modalStyles = {
    width: width || "90%",
    maxWidth: "500px",
  };

  const modifyUsersToApprove = (user) => {
    if (Array.isArray(user)) {
      const users = user.filter((item) => item?.role?.name === approvalLevel);
      setUsersToApprove(
        users.map((item) => ({
          label: item.firstName + " " + item.lastName,
          value: item._id,
        }))
      );
    }
  };

  const handleInputChange = async (e) => {
    let { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelectChange = async (selectedOption, name) => {
    setFormData({
      ...formData,
      [name]: selectedOption.value,
    });
  };

  const resetForm = () => {
    setFormData({
      employerName: "",
    });
    setVerificationResponse(null);
    setBankNameVal("");
  };
  const submitLoan = (e) => {
  const payload = {id, formData}
    e.preventDefault();
    dispatch(requestLoanApproval(payload))
      .unwrap()
      .then(() => {
        toast("Loan approval request successful");
        router.push(`/loan-applications/view-loan/${id}`);
      })
      .catch((error) => {
        toast.error(`An error occured`);
      });
  };

  useEffect(() => {
    modifyUsersToApprove(data);
  }, []);

  return (
    <main className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50 z-[110]">
        <ToastContainer />
      <form style={modalStyles} id="add-user-form">
        <div className="border bg-white border-swLightGray rounded-lg">
          <div className="flex justify-between items-center p-3 text-white">
            <div>
              <p className="text-base font-semibold text-swGray">
                Disapprove Credit
              </p>
              <p className="text-xs  text-swGray">Provide a comment</p>
            </div>
            <AiOutlineClose
              color="red"
              size={20}
              onClick={onClose}
              className="cursor-pointer"
            />
          </div>
          <div className="p-4">
            <textarea
              name="requestNote"
              id="requestNote"
              className="w-full border border-1"
              rows="5"
              onChange={(e) => {
                handleInputChange(e);
              }}
            ></textarea>
            <div className="flex justify-between gap-3">
              <Button variant="secondary" onClick={submitLoan} className="mt-4 block w-full rounded-lg">
                Cancel
              </Button>
              <Button onClick={submitLoan} className="mt-4 block w-full rounded-lg">
                Disapprove Credit
              </Button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default DeclineModal;
