"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ReusableDataTable from "../shared/tables/ReusableDataTable";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "../shared/buttonComponent/Button";
import CenterModal from "../modals/CenterModal";
import InputField from "../shared/input/InputField";
import SelectField from "../shared/input/SelectField";
import { AiOutlinePaperClip } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";

const headers = [
  { id: "createdAt", label: "Date Created" },
  { id: "amountDue", label: "Amount Due" },
  { id: "loggedBy", label: "Collected By" },
  { id: "repaymentMethod", label: "Payment Method" },
  { id: "amountPaid", label: "Amount Paid" },
  { id: "balanceToPay", label: "Balance To Pay" },
  { id: "status", label: "Loan Status" },
];

const customDataTransformer = (apiData) => {
  return apiData?.map((item) => ({
    id: item._id,
    createdAt: (
      <div className="text-md font-[500] text-gray-700">11th Aug, 2023</div>
    ),

    amountDue: (
      <div>
        <div className="text-md font-[500] text-gray-700">
          ₦ {item?.amountDue}
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
          {item?.amountPaid === null ? "0" : item?.amountPaid}
        </div>
      </div>
    ),
    balanceToPay: (
      <div>
        <div className="text-md font-[500] text-gray-700">
          {item?.balanceToPay === null ? "0" : item?.balanceToPay}
        </div>
      </div>
    ),
    status: (
      <button
        className={`${
          item.status === "Unpaid"
            ? "bg-[#E7F1FE] text-swBlue text-xs font-normal px-2 py-1 rounded-full"
            : "bg-[#F8A9A3]"
        } px-2 py-1 rounded-full`}
      >
        {item.status}
      </button>
    ),
  }));
};

const CustomerRepayment = ({ loanId }) => {
  const router = useRouter();
  const [logRepayment, setLogRepayment] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    paymentMehod: "",
    docs: null,
  });

  const handleFileChange = (e) => {
    let { name, files } = e.target;
    const file = files[0];
    console.log({ file });
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

  const paymentMethodTypes = [
    { value: "cash", label: "Cash" },
    { value: "bankTransfer", label: "Bank Transfer" },
  ];
  return (
    <div className="w-full">
      <ReusableDataTable
        dataTransformer={customDataTransformer}
        headers={headers}
        initialData={[]}
        apiEndpoint={`https://secondwallet-stag.onrender.com/api/repayment/loan-application/${loanId}`}
        filters={false}
        pagination={false}
      />
      <div className="mt-5 flex items-center justify-center">
        <Button
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
            <button
              className="text-black"
              onClick={() => {
                setLogRepayment(!logRepayment);
              }}
            >
              x
            </button>
          </div>
          <div className="text-sm text-swGray pt-4">
            Provide payment information
          </div>
          <div className="pt-4">
            <div className="pt-4">
              <InputField
                name="amount"
                label="Amount received"
                required={true}
                placeholder="Enter amount"
                onChange={(e) => {
                  setInputState(e);
                  //  calCommitmentTotal(e);
                }}
                hintText="Amount paid that received the current repayment amount will spill into the next repayment cycle"
              />
            </div>
            <div className="pt-4">
              <SelectField
                optionValue={paymentMethodTypes}
                name="paymentMehod"
                label="Payment Method"
                required={true}
                placeholder="Select payment method"
                onChange={(selectedOption) => {
                  handleSelectChange(selectedOption, "paymentMehod");
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
              <div className="relative">
                <input
                  name="docs"
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
                      {formData?.docs ? "Change file" : "Select file"}
                    </p>
                  </span>
                </label>
                {formData?.docs ? (
                  <div
                    id="fileLabel"
                    className="bg-swLightGray p-2 flex justify-between"
                  >
                    <div className="text-xs">{formData?.docs?.name}</div>
                    <div
                      onClick={() => {
                        deleteFile("docs");
                      }}
                    >
                      <AiOutlineDelete color="red" size={20} />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex pt-4 mb-4 items-end gap-2 justify-end">
              <Button variant="secondary">Cancel</Button>
              <Button variant="secondary">Confirm</Button>
            </div>
          </div>
        </div>
      </CenterModal>
    </div>
  );
};

export default CustomerRepayment;
