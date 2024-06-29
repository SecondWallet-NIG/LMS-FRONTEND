"use client";
import React, { useState, useEffect } from "react";
import InvestmentsCards from "../cards/InvestmentsCard/InvestmentsCards";
import ReusableDataTable from "../shared/tables/ReusableDataTable";
import { useRouter } from "next/navigation";

const header = [
  { id: "investorName", label: "Investor name" },
  { id: "id", label: "ID" },
  { id: "dob", label: "Date of birth" },
  { id: "gender", label: "Gender" },
  { id: "phone", label: "Phone no" },
  { id: "annualIncome", label: "Annual income" },
  { id: "workStatus", label: "Work status" },
  { id: "investement status", label: "Investment status" },
];

const customDataTransformer = (apiData) => {
  console.log({ apiData });
  return apiData?.expenses?.map((item, i) => ({
    id: item?._id,
    productName: (
      <div className="text-md font-[500] text-gray-700">
        {/* {format(new Date(item?.date), "PPP")} */} Product name
      </div>
    ),
    investorsUsingProduct: (
      <div className="text-md font-[500] text-gray-700">
        {/* {item?.description} */} Investors using product
      </div>
    ),
    roi: (
      <div className="text-md font-[500] text-gray-700">
        {/* {item?.category?.name} */} ROI
      </div>
    ),
    amountPaidOut: (
      <div className="text-md font-[500] text-gray-700">
        {/* {item?.amount} */} Amount paid out
      </div>
    ),
    dateCreated: (
      <div className="text-xs font-[500] text-gray-700">Date created</div>
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
        // onClickRow="/expenses/view-expense"
        headers={header}
        initialData={[]}
        apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/investment/product/all`}
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
