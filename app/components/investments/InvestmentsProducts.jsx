"use client";
import React, { useState, useEffect } from "react";
import ReusableDataTable from "../shared/tables/ReusableDataTable";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

const header = [
  { id: "productName", label: "Product Name" },
  { id: "totalInvestments", label: "Total Investments Count" },
  { id: "totalInvestmentAmount", label: "Total Investment Amount" },
  { id: "dateCreated", label: "Date created" },
];

const customDataTransformer = (apiData) => {
  return apiData?.investmentProducts?.map((item, i) => ({
    id: item?._id,
    productName: (
      <div className="text-[15px] font-light text-gray-700">{item?.name}</div>
    ),
    totalInvestments: (
      <div className="text-[15px] font-light text-gray-700">
        {item?.totalInvestments.toLocaleString()}
      </div>
    ),
    totalInvestmentAmount: (
      <div className="text-[15px] font-light text-gray-700 whitespace-nowrap">
        ₦ {item?.totalInvestmentsAmount.toLocaleString()}
      </div>
    ),
    dateCreated: (
      <div className="text-[15px] font-light text-gray-700">
        {format(new Date(item?.createdAt), "PPP")}
      </div>
    ),
  }));
};

export default function InvestmentProducts() {
  const router = useRouter();
  return (
    <div>
      <ReusableDataTable
        dataTransformer={customDataTransformer}
        onClickRow="/investors/view-investment-product/"
        headers={header}
        initialData={[]}
        apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/investment/product/all`}
        btnText={
          <div className="flex gap-1 items-center p-1">
            <p className="">Create Investment Product</p>
          </div>
        }
        btnTextClick={() => {
          router.push("investors/create-investment-product");
        }}
        filters={true}
        pagination={true}
      />
    </div>
  );
}
