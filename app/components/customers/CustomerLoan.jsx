"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ReusableDataTable from "../shared/tables/ReusableDataTable";
import { AiOutlinePlus } from "react-icons/ai";

const header = [
  { id: "firstName", label: "Borrower Name" },
  { id: "customerId", label: "SWID" },
  { id: "numberOfLoans", label: " Number of Loans" },
  { id: "totalLoanAmount", label: "Total Loan Amount" },
  { id: "status", label: "Status" },
];

const customDataTransformer = (apiData) => {
  console.log({ apiData });
  return apiData?.map((item) => ({
    id: item._id,
    firstName: (
      <div className="text-md font-[500] text-gray-700">
        {item?.firstName} {item?.lastName}
      </div>
    ),
    customerId: (
      <div className="text-sm font-[400] text-swBlue">{item?.customerId}</div>
    ),
    numberOfLoans: (
      <div>
        <div className="text-md font-[500] text-gray-700">
          {item.numberOfLoans}
        </div>
      </div>
    ),
    totalLoanAmount: (
      <div>
        <div className="text-md font-[500] text-gray-700">
          ₦ {item?.totalLoanAmount?.toLocaleString()}
        </div>
      </div>
    ),
    status: (
      <button
        className={`${
          item.status === "Active"
            ? "bg-[#E7F1FE] text-swBlue text-xs font-normal px-2 py-1 rounded-full"
            : "bg-[#F8A9A3] text-white"
        } px-2 py-1 rounded-full`}
      >
        {item.status}
      </button>
    ),
  }));
};

const CustomerLoan = () => {
  const router = useRouter();
  return (
    <div className="w-full">
      <ReusableDataTable
        dataTransformer={customDataTransformer}
        onClickRow="/borrowers/profile"
        headers={header}
        initialData={[]}
        apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/customer/profile-information`}
        btnText={
          <div className="flex gap-1 items-center p-1">
            <AiOutlinePlus size={15} />
            <p className="">Add Borrower</p>
          </div>
        }
        btnTextClick={() => {
          router.push("/create-borrower");
        }}
        filters={true}
        pagination={true}
      />
    </div>
  );
};

export default CustomerLoan;
