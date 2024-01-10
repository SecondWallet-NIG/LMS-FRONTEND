"use client";
import { useState, useEffect } from "react";
import ReusableDataTable from "../shared/tables/ReusableDataTable";
import { formatDate } from "@/helpers";
const UnpaidRepaymentTable = () => {

  const [currentPage, setCurrentPage] = useState("all-repayment");

  const header = [
    { id: "loanId", label: "Loan ID" },
    { id: "dueDate", label: "Due Date" },
    { id: "repaymentNumber", label: "Loan Repayment No" },
    { id: "amountDue", label: "Due Amount" },
    { id: "amountPaid", label: "Amount Paid" },
    { id: "balanceToPay", label: "Balance To Pay" },
    { id: "status", label: "Status" },
  ];

  const customDataTransformer = (apiData) => {
    return apiData?.map((item) => ({
      id: item._id,
      loanId: (
        <div className="text-md font-[500] text-gray-700">
          SWL - {item?.loanApplication?.loanId}
        </div>
      ),
      repaymentNumber: (
        <div className="text-md font-[500] text-gray-700">
          {item?.repaymentNumber}
        </div>
      ),
      dueDate: (
        <div className="text-md font-[500] text-gray-700">
          {formatDate(item.dueDate?.slice(0, 10))}
        </div>
      ),
      amountDue: (
        <div className="text-md font-[500] text-gray-700">
         ₦ {item?.amountDue.toLocaleString()|| 0} 
        </div>
      ),
      amountPaid: (
        <div className="text-md font-[500] text-gray-700">
         ₦ {item?.amountPaid?.toLocaleString() || 0} 
        </div>
      ),
      balanceToPay: (
        <div className="text-md font-[500] text-gray-700">
         ₦ {item?.balanceToPay?.toLocaleString() || 0} 
        </div>
      ),
      status: (
        <button
          className={`${
            item.status === "Unpaid"
              ? "bg-[#E7F1FE] text-swBlue text-xs font-normal px-2 py-1 rounded-full"
              : "bg-[#F8A9A3] text-white"
          } px-2 py-1 rounded-full`}
        >
          {item.status}
        </button>
      ),
    }));
  };


  return (

      <main>
        <div className="flex">
          <p
            className={`border-b-2 px-6 py-2 cursor-pointer ${
              currentPage === "all-repayment"
                ? "text-swBlue border-swBlue font-medium"
                : "border-transparent"
            } `}
            onClick={() => setCurrentPage("all-repayment")}
          >
            All repayment
          </p>
          {/* <p
            className={` border-b-2  px-6 py-2 cursor-pointer ${
              currentPage === "overdue-repayment"
                ? "text-swBlue border-b-swBlue font-medium"
                : "border-transparent"
            }`}
            onClick={() => setCurrentPage("overdue-repayment")}
          >
            Overdue repayment
          </p> */}
        </div>

        <div className="w-full">
          <ReusableDataTable
            headers={header}
            dataTransformer={customDataTransformer}
            initialData={[]}
            apiEndpoint="https://secondwallet-stag.onrender.com/api/repayment"
            btnTextClick={() => {
              router.push("/create-borrower");
            }}
            filters={true}
            pagination={true}
            role="unpaid-repayment"
          />
        </div>
      </main>

  );
};

export default UnpaidRepaymentTable;
