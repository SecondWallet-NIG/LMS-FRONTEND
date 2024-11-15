"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "next/navigation";
import SelectField from "../../shared/input/SelectField";
import { requestLoanApproval } from "@/redux/slices/loanApprovalSlice";
import Button from "../../shared/buttonComponent/Button";

const RequestApproval = ({ data, approvalId, approvalLevel, onClose }) => {
  const dispatch = useDispatch();
  const [usersToApprove, setUsersToApprove] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    approvalLevel: approvalId,
    requestNote: "",
    assignee: "",
  });

  // const modifyUsersToApprove = (user) => {
  //   if (Array.isArray(user)) {
  //     console.log({approvalLevel});
  //     const users = user.filter((item) => item?.role?.name === approvalLevel);

  //     setUsersToApprove(
  //       users.map((item) => ({
  //         label: item.firstName + " " + item.lastName,
  //         value: item._id,
  //       }))
  //     );
  //   }
  // };

  const modifyUsersToApprove = (user) => {
    if (Array.isArray(user)) {
      // Filter users based on role
      const users = user.filter((item) => {
        // Check for approvalLevel being "CFO"
        if (approvalLevel === 'Chief Financial Officer') {
          return (
            item?.role?.name === 'Chief Financial Officer' ||
            item?.role?.name === 'Finance Officer'
          );
        } else {
          return item?.role?.name === approvalLevel;
        }
      });
  
      // Update users to approve
      setUsersToApprove(
        users.map((item) => ({
          label: `${item.firstName} ${item.lastName}`,
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

  const submitLoan = (e) => {
    setLoading(true);
    const payload = { id, formData };
    e.preventDefault();
    dispatch(requestLoanApproval(payload))
      .unwrap()
      .then(() => {
        setLoading(false);
        onClose();
        toast.success("Loan approval request successful");
      })
      .catch((error) => {
        if (error?.message == '"assignee" is not allowed to be empty') {
          toast.error("Please select an assignee");
          setLoading(false);
        } else {
          toast.error(`${error?.message}`);
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    modifyUsersToApprove(data);
  }, []);
  return (
    <main className="w-full">
      <ToastContainer />
      <div
        // style={modalStyles}

        id="add-user-form "
      >
        <div className="border bg-white border-swLightGray rounded-lg">
          <div className="flex justify-between items-center p-3 text-white">
            <div>
              <p className="text-base font-semibold text-swGray">
                Request Approval
              </p>
            </div>
            <button className="text-black" onClick={onClose}>
              x
            </button>
          </div>
          <div className="p-4">
            <div className="w-full pb-4">
              <SelectField
                name="assignee"
                disabled={false}
                optionValue={usersToApprove}
                label={"Assignee"}
                required={true}
                placeholder={"Click to search"}
                isSearchable={true}
                onChange={(selectedOption) => {
                  handleSelectChange(selectedOption, "assignee");
                }}
              />
            </div>
            <p className="text-xs pb-3 text-gray-700">
              You can add an approval message
            </p>
            <textarea
              name="requestNote"
              id="requestNote"
              className="w-full text-sm border border-1 p-3"
              rows="4"
              onChange={(e) => {
                handleInputChange(e);
              }}
            ></textarea>
            <Button
              disabled={loading ? true : false}
              onClick={submitLoan}
              className="mt-4 block w-full"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RequestApproval;
