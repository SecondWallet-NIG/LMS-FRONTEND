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
  { id: "status", label: "Status" },
];

const customDataTransformer = (apiData) => {
  return apiData?.map((item) => ({
    id: item._id,
    firstName: (
      <div className="text-md font-[500] text-gray-700">
        {item.firstName}
      </div>
    ),
    lastName: (
      <div className="text-md font-[500] text-gray-700">
        {item.lastName}
      </div>
    ),
    middleName: (
      <div className="text-md font-[500] text-gray-700">
        {item.middleName}
      </div>
    ),
    dateOfBirth: (
      <div>
        <div className="text-md font-[500] text-gray-700">{item.dateOfBirth}</div>
      </div>
    ),
    dateOfBirth: (
      <div>
        <div className="text-md font-[500] text-gray-700">{item.dateOfBirth}</div>
      </div>
    ),
    gender: (
      <div>
        <div className="text-md font-[500] text-gray-700">{`${item?.gender}`}</div>
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
        apiEndpoint="https://secondwallet-stag.onrender.com/api/customer/profile-information"
        btnText={
          <div className="flex gap-1 items-center p-1">
            <AiOutlinePlus size={15} />
            <p className="hidden lg:block">create borrower</p>
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
