"use client";

import React, { useState } from "react";
import ReusableDataTable from "../shared/tables/ReusableDataTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const CustomerPaymentHistory = ({ loanId }) => {

  const [enableLogRepaymentBtn, setEnableLogRepaymentBtn] = useState(true);
  const [enableLogRepayment, setEnableLogRepayment] = useState(true);



  const headers = [
    // { id: "createdAt", label: "Due Date" },
    { id: "amountLogged", label: "Amount Logged" },
    { id: "loggedBy", label: "Collected By" },
    { id: "repaymentMethod", label: "Payment Method" },
    // { id: "amountPaid", label: "Amount Paid" },
    // { id: "balanceToPay", label: "Balance To Pay" },
    // { id: "status", label: "Loan Status" },
  ];

  const customDataTransformer = (apiData) => {
    console.log({ apiData });
    if (apiData?.length > 0) {
      setEnableLogRepayment(false);
    }
    return apiData?.map((item) => ({
      //   id: item._id,
      //   createdAt: (
      //     <div className="text-md font-[500] text-gray-700">{item?.dueDate.slice(0, 10)}</div>
      //   ),

      amountLogged: (
        <div>
          <div className="text-md font-[500] text-gray-700">
            ₦ {item?.amountLogged?.toLocaleString()}
          </div>
        </div>
      ),
      loggedBy: (
        <div>
          <div className="text-md font-[500] text-gray-700">
            {item?.loggedBy === null ? "NIL" : item?.loggedBy?.firstName}
          </div>
        </div>
      ),
      repaymentMethod: (
        <div>
          <div className="text-md font-[500] text-gray-700">
            {item?.repaymentMethod === null ? "NIL" : item?.repaymentMethod}
          </div>
        </div>
      ),
      //   amountPaid: (
      //     <div>
      //       <div className="text-md font-[500] text-gray-700">
      //       ₦ {item?.amountPaid === null ? "0" : item?.amountPaid.toLocaleString()}
      //       </div>
      //     </div>
      //   ),
      //   balanceToPay: (
      //     <div>
      //       <div className="text-md font-[500] text-gray-700">
      //       ₦ {item?.balanceToPay === null ? "0" : item?.balanceToPay.toLocaleString()}
      //       </div>
      //     </div>
      //   ),
      //   status: (
      //     <button
      //       className={`${
      //         item.status === "Unpaid"
      //           ? "bg-[#E7F1FE] text-swBlue text-xs font-normal px-2 py-1 rounded-full"
      //           : "bg-[#F8A9A3] text-white"
      //       } px-2 py-1 rounded-full `}
      //     >
      //       {item.status}
      //     </button>
      //   ),
    }));
  };




  return (
    <div className="w-full">
      <ToastContainer />
      <div>
        {enableLogRepaymentBtn == true ?
          <ReusableDataTable
            dataTransformer={customDataTransformer}
            headers={headers}
            initialData={[]}
            apiEndpoint={`https://secondwallet-stag.onrender.com/api/repayment/payment-history/${loanId}`}
            filters={false}
            pagination={false}
          /> : null
        }
      </div>


    </div>
  );
};

export default CustomerPaymentHistory;
