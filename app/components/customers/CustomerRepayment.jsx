"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ReusableDataTable from "../shared/tables/ReusableDataTable";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "../shared/buttonComponent/Button";

const headers = [
  { id: "createdAt", label: "Date Created" },
  { id: "amountDue", label: "Amount Due" },
  { id: "loggedBy", label: "Collected By" },
  { id: "repaymentMethod", label: "Payment Method" },
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
          {item?.loggedBy === null ? "NIL" : item?.loggedBy}
        </div>
      </div>
    ),
    repaymentMethod: (
      <div>
        <div className="text-md font-[500] text-gray-700">
          {item?.repaymentMethod === null ? "NIL" : item?.loggedBy}
        </div>
      </div>
    ),
    loanPackageId: (
      <div>
        <div className="text-md font-[500] text-gray-700">{`${item?.loanPackage?.name}`}</div>
        <div className="text-xs text-gray-500">SWL-{`${item?.loanId}`}</div>
      </div>
    ),
    status: (
      <button
        className={`${
          item.status === "Unpaid"
            ? "bg-[#E7F1FE] text-swBlue text-xs font-normal px-2 py-1 rounded-full"
            : "bg-[#F8A9A3]"
        } px-2 py-1 rounded`}
      >
        {item.status}
      </button>
    ),
  }));
};

const CustomerRepayment = ({ loanId }) => {
  const router = useRouter();
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
        <Button variant="secondary">Log Repayment</Button>
      </div>
    </div>
  );
};

export default CustomerRepayment;
