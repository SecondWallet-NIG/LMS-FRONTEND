"use client";
import React, { useState, useEffect } from "react";
import InvestmentsCards from "../cards/InvestmentsCard/InvestmentsCards";
import ReusableDataTable from "../shared/tables/ReusableDataTable";
import { useRouter } from "next/navigation";

const header = [
  { id: "investorName", label: "Investor name" },
  { id: "id", label: "ID" },
  { id: "investmentType", label: "Investment type" },
  { id: "roi", label: "ROI" },
  { id: "startDate", label: "Start date" },
  { id: "endDate", label: "End date" },
  { id: "investmentDuration", label: "Investment duration" },
  { id: "investmentStatus", label: "Investment status" },
];

const customDataTransformer = (apiData) => {
  console.log({ apiData });
  return apiData?.investments?.map((item, i) => ({
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

export default function InvestmentsRecords() {
  const router = useRouter();

  const cards = [
    { title: "Number of investors", value: "22" },
    { title: "Amount invested", value: "123368937.03" },
    { title: "Returns earned", value: "25256259.68" },
  ];

  return (
    <div className="flex flex-col gap-5">
      <InvestmentsCards cards={cards} />
      <ReusableDataTable
        dataTransformer={customDataTransformer}
        onClickRow="/investors/view-investment-product"
        headers={header}
        initialData={[]}
        apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/investment/all`}
        btnText={
          <div className="flex gap-1 items-center p-1">
            <p className="">Create Investment</p>
          </div>
        }
        btnTextClick={() => {
          router.push("/investors/create-investment");
        }}
        filters={true}
        pagination={true}
      />
    </div>
  );
}
