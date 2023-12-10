"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ReusableDataTable from "../shared/tables/ReusableDataTable";
import { AiOutlinePlus } from "react-icons/ai";

const header = [
  { id: "firstName", label: "First Name" },
  { id: "lastName", label: "Last Name" },
  { id: "middleName", label: "Middle Name" },
  { id: "dateOfBirth", label: "Date of Birth" },
  { id: "gender", label: "Gender" },
  { id: "nin", label: "NIN" },
  { id: "status", label: "Status" },
];

const CustomerRepayment = ({loanId}) => {
  const router = useRouter();
  return (
    <div className="w-full">
      <ReusableDataTable
        headers={header}
        initialData={[]}
        apiEndpoint={`https://secondwallet-stag.onrender.com/api/repayment/loan-application/${loanId}`}
        filters={false}
        pagination={false}
      />
    </div>
  );
};

export default CustomerRepayment;
