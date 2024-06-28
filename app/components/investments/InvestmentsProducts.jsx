"use client";
import React, { useState, useEffect } from "react";
import ReusableDataTable from "../shared/tables/ReusableDataTable";

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

export default function InvestmentProducts() {
  return (
    <div>
      <ReusableDataTable
        dataTransformer={customDataTransformer}
        // onClickRow="/expenses/view-expense"
        headers={header}
        initialData={[]}
        apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/investment/product/all`}
        btnText={
          <div className="flex gap-1 items-center p-1">
            <p className="">create investment product</p>
          </div>
        }
        btnTextClick={() => {
          router.push("/create-investment-product");
        }}
        filters={true}
        pagination={true}
      />
    </div>
  );
}
