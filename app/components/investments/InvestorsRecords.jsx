"use client";
import React, { useState, useEffect } from "react";
import InvestmentsCards from "../cards/InvestmentsCard/InvestmentsCards";
import ReusableDataTable from "../shared/tables/ReusableDataTable";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

const header = [
  { id: "investorName", label: "Investor name" },
  { id: "investorId", label: "ID" },
  { id: "dateOfBirth", label: "Date of birth" },
  { id: "gender", label: "Gender" },
  { id: "state", label: "state" },
  { id: "phone", label: "Phone no" },
  { id: "annualIncome", label: "Annual income" },
  { id: "workStatus", label: "Work status" },
  { id: "investorStatus", label: "Investor status" },
];

const customDataTransformer = (apiData) => {
  console.log("record", apiData);
  return apiData?.investorProfiles?.map((item) => ({
    id: item?._id,
    investorName: (
      <div className="text-md font-[500] text-gray-700">
        {item?.firstName} {item?.lastName}
      </div>
    ),
    investorId: (
      <div className="text-md font-[500] text-gray-700">{item?.investorId}</div>
    ),
    dateOfBirth: (
      <div className="text-md font-[500] text-gray-700">
        {item?.dateOfBirth && format(new Date(item?.dateOfBirth), "PPP")}
      </div>
    ),
    gender: (
      <div className="text-md font-[500] text-gray-700">{item?.gender}</div>
    ),
    state: (
      <div className="text-md font-[500] text-gray-700">{item?.state}</div>
    ),
    phone: (
      <div className="text-xs font-[500] text-gray-700">
        {item?.phoneNumber}
      </div>
    ),
    annualIncome: (
      <div className="text-xs font-[500] text-gray-700">
        {item?.annualIncome.toLocaleString()}
      </div>
    ),
    workStatus: (
      <div className="text-xs font-[500] text-gray-700">{item?.workStatus}</div>
    ),
    investorStatus: (
      <div className="text-xs font-[500] text-gray-700">
        {item?.investorStatus || "status"}
      </div>
    ),
  }));
};

export default function InvestorsRecords() {
  const router = useRouter();
  const cards = [
    { title: "Number of investors", value: "12,820,382.36" },
    { title: "Current pending payments", value: "20" },
    { title: "Returns earned", value: "25,256,259.68" },
  ];

  return (
    <div className="flex flex-col gap-5">
      <InvestmentsCards cards={cards} />
      <ReusableDataTable
        dataTransformer={customDataTransformer}
        onClickRow="/investors/investor-profile/"
        headers={header}
        initialData={[]}
        apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/investment/investor/all`}
        btnText={
          <div className="flex gap-1 items-center p-1">
            <p className="">create investor</p>
          </div>
        }
        btnTextClick={() => {
          router.push("/investors/create-investor");
        }}
        filters={true}
        pagination={true}
      />
    </div>
  );
}
