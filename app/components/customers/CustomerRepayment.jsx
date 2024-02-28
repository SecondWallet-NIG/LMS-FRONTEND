"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ReusableDataTable from "../shared/tables/ReusableDataTable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../shared/buttonComponent/Button";
import CenterModal from "../modals/CenterModal";
import InputField from "../shared/input/InputField";
import SelectField from "../shared/input/SelectField";
import { AiOutlinePaperClip } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { logRepaymentFunc } from "@/redux/slices/loanRepaymentSlice";
import { useDispatch } from "react-redux";
import { clearUserState } from "@/redux/slices/loanPackageSlice";

const CustomerRepayment = ({ loanId }) => {
  const dispatch = useDispatch();
  const [logRepayment, setLogRepayment] = useState(false);
  const [enableLogRepaymentBtn, setEnableLogRepaymentBtn] = useState(true);
  const [enableLogRepayment, setEnableLogRepayment] = useState(true);
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState("");
  const [formData, setFormData] = useState({
    repaymentMethod: "",
    repaymentAmount: "",
    repaymentReceipts: null,
  });

  const handleFileChange = (e) => {
    setFileError("");
    let { name, files } = e.target;
    const file = files[0];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    const allowedExtensions = ["jpg", "jpeg", "png", "pdf"];
    if (!allowedExtensions.includes(fileExtension)) {
      setFileError(
        "Invalid file type. Please select an image (.jpg, .jpeg, .png) or PDF (.pdf)."
      );
      return;
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: file,
    }));
  };

  const deleteFile = (name) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: null,
    }));
  };

  const setInputState = async (e) => {
    let { name, value } = e.target;
    const ariaLabel = e.target.getAttribute("aria-label");

    if (ariaLabel === "Number input") {
      const num = Number(value.replace(/\D/g, ""));
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: num,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = async (selectedOption, name) => {
    setFormData({
      ...formData,
      [name]: selectedOption.value,
    });
  };

  const paymentMethodTypes = [
    { value: "Card", label: "Card" },
    { value: "Bank transfer", label: "Bank Transfer" },
  ];

  const headers = [
    { id: "createdAt", label: "Due Date" },
    { id: "amountDue", label: "Amount Due" },
    { id: "loggedBy", label: "Collected By" },
    { id: "repaymentMethod", label: "Payment Method" },
    { id: "amountPaid", label: "Amount Paid" },
    { id: "balanceToPay", label: "Balance To Pay" },
    { id: "status", label: "Loan Status" },
  ];

  const customDataTransformer = (apiData) => {
    if (apiData?.length > 0) {
      setEnableLogRepayment(false);
    }
    return apiData?.map((item) => ({
      id: item._id,
      createdAt: (
        <div className="text-md font-[500] text-gray-700">
          {item?.dueDate.slice(0, 10)}
        </div>
      ),

      amountDue: (
        <div>
          <div className="text-md font-[500] text-gray-700">
            ₦ {item?.amountDue.toLocaleString()}
          </div>
        </div>
      ),
      loggedBy: (
        <div>
          <div className="text-md font-[500] text-gray-700">
            {item?.loggedBy === null ? "NIL" : item?.loggedBy?.firstName}
          </div>
        </div>
      ),
      repaymentMethod: (
        <div>
          <div className="text-md font-[500] text-gray-700">
            {item?.repaymentMethod === null ? "NIL" : item?.repaymentMethod}
          </div>
        </div>
      ),
      amountPaid: (
        <div>
          <div className="text-md font-[500] text-gray-700">
            ₦{" "}
            {item?.amountPaid === null
              ? "0"
              : item?.amountPaid.toLocaleString()}
          </div>
        </div>
      ),
      balanceToPay: (
        <div>
          <div className="text-md font-[500] text-gray-700">
            ₦{" "}
            {item?.balanceToPay === null
              ? "0"
              : item?.balanceToPay.toLocaleString()}
          </div>
        </div>
      ),
      status: (
        <button
          className={`${
            item.status === "Unpaid"
              ? "bg-[#E7F1FE] text-swBlue"
              : item.status === "Fully paid"
              ? "bg-swLightGreenIndcatorBg text-swGreen"
              : item.status === "Due"
              ? "bg-swLightPinkIndcatorBg text-swIndicatorLightRed"
              : item.status === "Overdue"
              ? "text-red-400 bg-red-100"
              : "bg-[#F8A9A3] text-white"
          } px-2 py-1 text-xs font-normal rounded-full`}
        >
          {item.status}
        </button>
      ),
    }));
  };

  const resetFormData = () => {
    setFormData({
      repaymentMethod: "",
      repaymentAmount: "",
      repaymentReceipts: null,
    });
  };

  const preventMinus = (e) => {
    if (/[^0-9,]/g.test(e.key)) {
      e.preventDefault();
    }
  };

  const logRepaymentFunction = (e) => {
    setLoading(true);
    setEnableLogRepaymentBtn(false);
    const data = new FormData();
    data.append("repaymentMethod", formData?.repaymentMethod);
    data.append("repaymentAmount", formData?.repaymentAmount);
    data.append("repaymentReceipts", formData?.repaymentReceipts);
    e.preventDefault();
    dispatch(logRepaymentFunc({ loanId, payload: data }))
      .unwrap()
      .then(() => {
        resetFormData();
        setLogRepayment(!logRepayment);
        toast("Payment logged successfully");
        setEnableLogRepaymentBtn(true);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(`${error?.message}`);
        setLogRepayment(!logRepayment);
        setEnableLogRepaymentBtn(true);
        setLoading(false);
      });
  };

  return (
    <div className="w-full">
      <ToastContainer />
      <div>
        {enableLogRepaymentBtn == true ? (
          <ReusableDataTable
            dataTransformer={customDataTransformer}
            headers={headers}
            initialData={[]}
            apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/repayment/loan-application/${loanId}`}
            filters={false}
            pagination={false}
          />
        ) : null}
      </div>
      <div className="mt-5 flex items-center justify-center">
        <Button
          disabled={enableLogRepayment === false ? false : true}
          variant="secondary"
          onClick={() => {
            setLogRepayment(!logRepayment);
          }}
        >
          Log Repayment
        </Button>
      </div>
      <CenterModal isOpen={logRepayment} width={"40%"}>
        <div className="p-4">
          <div className="flex justify-between items-center text-white">
            <div>
              <p className="text-base font-semibold text-black">
                Log Repayment
              </p>
            </div>
            {/* <button
              className="text-black"
              onClick={() => {
                setLogRepayment(!logRepayment);
              }}
            >
              x
            </button> */}
          </div>
          <div className="text-sm text-swGray pt-4">
            Provide payment information
          </div>
          <div className="pt-4">
            <div className="pt-4">
              <InputField
                name="repaymentAmount"
                label="Amount received"
                required={true}
                placeholder="Enter amount"
                ariaLabel={"Number input"}
                value={formData?.repaymentAmount?.toLocaleString()}
                onKeyPress={preventMinus}
                onChange={(e) => {
                  setInputState(e);
                }}
                hintText="Amount paid that received the current repayment amount will spill into the next repayment cycle"
              />
            </div>
            <div className="pt-4">
              <SelectField
                optionValue={paymentMethodTypes}
                name="repaymentMethod"
                label="Repayment Method"
                required={true}
                placeholder="Select repayment method"
                onChange={(selectedOption) => {
                  handleSelectChange(selectedOption, "repaymentMethod");
                }}
              />
            </div>
            <div className="pt-4">
              <p className="font-semibold pt-2 text-sm">
                Upload payment receipt
              </p>
              <p className="text-xs pt-2">
                Document types uploaded should be JPEGS, PNG or PDF and should
                not exceed 4mb
              </p>
              {fileError && <p className="text-red-500 text-sm">{fileError}</p>}
              <div className="relative">
                <input
                  name="repaymentReceipts"
                  type="file"
                  id="fileInput"
                  className="absolute w-0 h-0 opacity-0"
                  onChange={handleFileChange}
                  onClick={(e) => (e.target.value = null)}
                />
                <label
                  htmlFor="fileInput"
                  className="px-4 py-2 text-white rounded-md cursor-pointer"
                >
                  <span className="py-2 px-6 rounded-md flex gap-2 border w-fit">
                    <AiOutlinePaperClip color="black" size={20} />
                    <p className="font-semibold text-black">
                      {formData?.repaymentReceipts
                        ? "Change file"
                        : "Select file"}
                    </p>
                  </span>
                </label>
                {formData?.repaymentReceipts != null ? (
                  <div
                    id="fileLabel"
                    className="bg-swLightGray p-2 flex justify-between"
                  >
                    <div className="text-xs">
                      {formData?.repaymentReceipts?.name}
                    </div>
                    <div
                      onClick={() => {
                        deleteFile("repaymentReceipts");
                      }}
                    >
                      <AiOutlineDelete color="red" size={20} />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex pt-4 mb-4 items-end gap-2 justify-end">
              <Button
                variant="secondary"
                onClick={() => {
                  resetFormData();
                  setLogRepayment(!logRepayment);
                }}
              >
                Cancel
              </Button>
              <Button
                disabled={loading ? true : false}
                variant="secondary"
                onClick={logRepaymentFunction}
              >
                Log Repayment
              </Button>
            </div>
          </div>
        </div>
      </CenterModal>
    </div>
  );
};

export default CustomerRepayment;
