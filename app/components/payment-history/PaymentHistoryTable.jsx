"use client";
import { useState, useEffect } from "react";
import ReusableDataTable from "../shared/tables/ReusableDataTable";
import { formatDate } from "@/helpers";

const PaymentHistoryTable = () => {


  const header = [
    { id: "createdAt", label: "Time Logged" },
    { id: "amountLogged", label: "Amount Logged" },
    { id: "repaymentMethod", label: "Repayment Method" },
    { id: "status", label: "Log Status" },
  ];

  const customDataTransformer = (apiData) => {
    console.log({apiData});
    return apiData?.map((item) => ({
      createdAt: (
        <div className="text-md font-[500] text-gray-700">
          {formatDate(item?.createdAt?.slice(0, 10))}
        </div>
      ),
      amountLogged: (
        <div className="text-md font-[500] text-gray-700">
         ₦ {item?.amountLogged.toLocaleString()|| 0} 
        </div>
      ),
      repaymentMethod: (
        <div className="text-md font-[500] text-gray-700">
          {item?.repaymentMethod} 
        </div>
      ),
      status: (
        <button
          className={`${
            item.status === "New"
              ? "bg-[#E7F1FE] text-swBlue text-xs font-normal px-2 py-1 rounded-full"
              : "bg-[#F8A9A3] text-white"
          } px-2 py-1 rounded-full`}
        >
          {item?.status}
        </button>
      ),
    }));
  };


  return (
      <main>
        <div className="w-full">
          <ReusableDataTable
            headers={header}
            dataTransformer={customDataTransformer}
            initialData={[]}
            apiEndpoint="https://secondwallet-stag.onrender.com/api/repayment/payment-history-all"
            btnTextClick={() => {
              router.push("/create-borrower");
            }}
            filters={true}
            pagination={true}
          />
        </div>
      </main>

  );
};

export default PaymentHistoryTable;
