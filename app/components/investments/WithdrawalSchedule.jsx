"use client";
import React, { useState, useEffect } from "react";
import InvestmentsCards from "../cards/InvestmentsCard/InvestmentsCards";
import ReusableDataTable from "../shared/tables/ReusableDataTable";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { withdrawalSummary } from "@/redux/slices/investmentSlice";
import { toast, ToastContainer } from "react-toastify";

export default function WithdrawalSchedule() {
  const tableDataClass =
    "text-[12px] md:text-[15px] font-light whitespace-nowrap text-gray-700";
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.investment);

  useEffect(() => {
    dispatch(withdrawalSummary());
  }, []);

  const cardData = data?.data;
  const cards = [
    {
      title: "Total Number of Withdrawal Request",
      value: cardData?.total?.count || 0,
      extraVal: cardData?.total?.totalAmount || 0,
    },
    {
      title: "Number of Paid Withdrawals",
      value: cardData?.paid?.count || 0,
      extraVal: cardData?.paid?.totalAmount || 0,
    },
    {
      title: "Total Number of Unpaid Requests",
      value: cardData?.notPaid?.count || 0,
      extraVal: cardData?.notPaid?.totalAmount || 0,
    },
  ];

  const header = [
    { id: "dateLogged", label: "Date Logged" },
    { id: "investmentId", label: "Investor Name & ID" },
    { id: "datePaid", label: "Date Paid" },
    { id: "amountRequested", label: "Amount Requested" },
    { id: "disbursedBy", label: "Disbursed By" },
    { id: "status", label: "Status" },
    { id: "action", label: "Action" },
  ];

  const customDataTransformer = (apiData) => {
    return apiData?.withdrawalRequests?.map((item, i) => ({
      id: item._id,
      dateLogged: (
        <div className={`${tableDataClass}`}>
          {format(new Date(item?.createdAt), "dd/MM/yyyy")}
        </div>
      ),
      investmentId: (
        <div className="flex gap-3">
          <div>
            <img
              src={
                item?.profilePicture
                  ? item?.profilePicture
                  : "https://cdn-icons-png.flaticon.com/512/4128/4128349.png"
              }
              alt="user"
              width={32}
              height={32}
              x
              className="cursor-pointer border-2 border-swGold rounded-full hidden lg:flex"
            />
          </div>
          <div>
            <p className="text-[12px] md:text-[15px] mb-2">
              {item?.investment?.investorProfile?.firstName}{" "}
              {item?.investment?.investorProfile?.middleName} {""}
              {item?.investment?.investorProfile?.lastName}
            </p>
            <p className={`${tableDataClass}`}>
              {item?.investment?.investmentId}
            </p>
          </div>
        </div>
      ),
      datePaid: (
        <div className={`${tableDataClass}`}>
          {format(new Date(item?.updatedAt), "dd/MM/yyyy")}
        </div>
      ),
      amountRequested: (
        <div>
          <p className="text-[12px] md:text-[15px] mb-1">
            {" "}
            {item?.withdrawalAmount}
          </p>
          <p className={`${tableDataClass}`}>
            {item?.investment?.interestRate?.value}% (
            {item?.investment?.interestRate?.metric})
          </p>
        </div>
      ),
      disbursedBy: (
        <div className={`${tableDataClass}`}>
          {item?.approvedBy && (
            <>
              {item?.approvedBy?.firstName} {item?.approvedBy?.middleName}{" "}
              {item?.approvedBy?.lastName}
            </>
          )}
          {item?.approvedBy ? "" : "Nil"}
        </div>
      ),
      status: (
        <button
          className={`${
            item.status === "New"
              ? "bg-[#E7F1FE] text-swBlue text-xs font-normal px-2 py-1 rounded-full"
              : item.status === "Paid"
              ? "bg-green-50 text-swGreen"
              : item.status === "Cancelled"
              ? "text-red-400 bg-red-100"
              : "text-yellow-400 bg-yellow-100"
          }
                        px-2 py-1 rounded-full`}
        >
          {item?.status}
        </button>
      ),
    }));
  };

  return (
    <div className="flex flex-col gap-5">
      <ToastContainer />
      <InvestmentsCards cards={cards} hasIcon={true} />
      <ReusableDataTable
        dataTransformer={customDataTransformer}
        headers={header}
        initialData={[]}
        apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/investment/withdrawal-request/all`}
        filters={true}
        pagination={true}
        onClickRow={`/investors/disburse-roi`}
      />
    </div>
  );
}
