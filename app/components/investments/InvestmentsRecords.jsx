"use client";
import React, { useState, useEffect } from "react";
import InvestmentsCards from "../cards/InvestmentsCard/InvestmentsCards";
import ReusableDataTable from "../shared/tables/ReusableDataTable";
import { useRouter } from "next/navigation";

const header = [
  { id: "productName", label: "Product name" },
  { id: "investorsUsingProduct", label: "Investors using product" },
  { id: "roi", label: "ROI" },
  { id: "amountPaidOut", label: "Amount paid out" },
  { id: "dateCreated", label: "Date created" },
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

export default function InvestmentsRecords() {
  const router = useRouter();

  const cards = [
    { title: "Number of investors", value: "22" },
    { title: "Amount invested", value: "123,368,937.03" },
    { title: "Returns earned", value: "25,256,259.68" },
  ];

  return (
    <div>
      <InvestmentsCards cards={cards} />
      <ReusableDataTable
        dataTransformer={customDataTransformer}
        onClickRow="/investors/view-investment-product"
        headers={header}
        initialData={[]}
        apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/investment/product/all`}
        btnText={
          <div className="flex gap-1 items-center p-1">
            <p className="">create investment</p>
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
