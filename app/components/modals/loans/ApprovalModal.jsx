"use client";

import { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMail } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "next/navigation";
import InputField from "../../shared/input/InputField--";
import Button from "../../shared/buttonComponent/Button";
import SelectField from "../../shared/input/SelectField";
import {
  declineLoanRequest,
  getLoanApprovals,
  approveLoanRequest,
  requestLoanApproval,
} from "@/redux/slices/loanApprovalSlice";
import { getSingleLoan } from "@/redux/slices/loanApplicationSlice";

const ApprovalModal = ({
  isOpen,
  onClose,
  width,
  data,
  selected,
  closeModal,
  approvalId,
  approvalLevel,
  currentTaskId
}) => {
  console.log({currentTaskId});
  const dispatch = useDispatch();
  const [usersToApprove, setUsersToApprove] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const [formData, setFormData] = useState({
    approvalLevel: approvalId,
    approvalNote: "",
  });
  console.log("here",{  approvalId,
    approvalLevel,});

  // const modalStyles = {
  //   width: width || "90%",
  //   maxWidth: "500px",
  // };

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


  const submitLoan = (e) => {
    setLoading(true);
    let _formData = {
      approvalLevel: approvalId,
      approvalNote: formData?.approvalNote,
      taskId : currentTaskId
    };

   // console.log({taskId});
    const payload = { id, _formData };
    console.log({ payload });
    e.preventDefault();
    dispatch(approveLoanRequest(payload))
      .unwrap()
      .then(() => {
        toast("Loan approved for this level");
        dispatch(getSingleLoan(id));
        dispatch(getLoanApprovals(id));
        setLoading(false);
        closeModal(false);
     
      })
      .catch((error) => {
        toast.error(`${error?.message}`);
        dispatch(getSingleLoan(id));
        dispatch(getLoanApprovals(id));
        setLoading(false);
     
      });
  };
  //let taskId;
  useEffect(() => {
    modifyUsersToApprove(data);

   
  }, [data]);

  return (
    <main>
      <ToastContainer />
      <form
        //  style={modalStyles}
        className="w-full"
        id="add-user-form"
      >
        <div className="border bg-white border-swLightGray rounded-lg">
          <div className="flex justify-between items-center p-3 text-white">
            <div>
              <p className="text-base font-semibold text-swGray">
                Approve Loan
              </p>
              <p className="text-xs  text-swGray">Provide a comment</p>
            </div>
          </div>
          <div className="p-4">
            <textarea
              name="approvalNote"
              id="approvalNote"
              className="w-full border border-1"
              rows="5"
              onChange={(e) => {
                handleInputChange(e);
              }}
            ></textarea>
            <div className="flex justify-between gap-3">
              <Button
                variant="secondary"
                onClick={onClose}
                className="mt-4 block w-full rounded-lg"
              >
                Cancel
              </Button>
              <Button
                disabled={loading ? true : false}
                onClick={submitLoan}
                className="mt-4 block w-full rounded-lg"
              >
                Approve Loan
              </Button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default ApprovalModal;
