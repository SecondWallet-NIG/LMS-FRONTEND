"use client";

import React, { useState } from "react";
import ReusableDataTable from "../shared/tables/ReusableDataTable";
import { ToastContainer } from "react-toastify";
import { format } from "date-fns";

import "react-toastify/dist/ReactToastify.css";

const CustomerPaymentHistory = ({ loanId }) => {
  const [enableLogRepaymentBtn, setEnableLogRepaymentBtn] = useState(true);
  const [enableLogRepayment, setEnableLogRepayment] = useState(true);

  const headers = [
    { id: "amountLogged", label: "Amount Logged" },
    { id: "dateCollected", label: "Date Collected" },
    { id: "loggedBy", label: "Collected By" },
    { id: "repaymentMethod", label: "Payment Method" },
    { id: "status", label: "Payment Status" },
  ];

  const customDataTransformer = (apiData) => {
    if (apiData?.length > 0) {
      setEnableLogRepayment(false);
    }
    return apiData?.map((item) => ({
      id: item._id,
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
      dateCollected: (
        <div>

          <div className="text-md font-[500] text-gray-700">
            {
              item?.dateCollected != null ? <div> {format(new Date(item?.dateCollected), "PPP")}</div> : <div>NIL</div>
            }

          </div>
        </div>
      ),
      loggedBy: (
        <div>
          <div className="text-md font-[500] text-gray-700">
            {item?.loggedBy === null ? "NIL" : item?.loggedBy?.firstName}{" "}
            {item?.loggedBy === null ? "NIL" : item?.loggedBy?.lastName}
          </div>
          <div className="text-sm font-[500] text-gray-700">
            {" "}
            {item?.loggedBy === null ? "NIL" : item?.loggedBy?.email}
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
      amountPaid: (
        <div>
          <div className="text-md font-[500] text-gray-700">
            ₦{" "}
            {item?.amountLogged === null
              ? "0"
              : item?.amountLogged.toLocaleString()}
          </div>
        </div>
      ),
      status: (
        <button
          className={`${item.status === "New"
              ? "bg-[#E7F1FE] text-swBlue text-xs font-normal px-2 py-1 rounded-full"
              : item.status === "Approved"
                ? "bg-green-50 text-swGreen"
                : "text-red-400 bg-red-100"
            } px-2 py-1 rounded-full`}
        >
          {item?.status}
        </button>
      ),
      //   balanceToPay: (
      //     <div>
      //       <div className="text-md font-[500] text-gray-700">
      //       ₦ {item?.balanceToPay === null ? "0" : item?.balanceToPay.toLocaleString()}
      //       </div>
      //     </div>
      //   ),
    }));
  };

  return (
    <div className="w-full">
      <ToastContainer />
      <div>
        {enableLogRepaymentBtn == true ? (
          <ReusableDataTable
            onClickRow={"/payment-history/payment/"}
            dataTransformer={customDataTransformer}
            headers={headers}
            initialData={[]}
            apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/repayment/payment-history/${loanId}`}
            filters={false}
            pagination={false}
          />
        ) : null}
      </div>
    </div>
  );
};

export default CustomerPaymentHistory;
