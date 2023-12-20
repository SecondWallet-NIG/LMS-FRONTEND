"use client";
import { useEffect, useState } from "react";
import { PiCalendarBlankLight } from "react-icons/pi";
import { FiUser } from "react-icons/fi";
import { BsGraphDownArrow } from "react-icons/bs";
import CustomerLoan from "../../customers/CustomerLoan";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerSummary } from "@/redux/slices/customerSlice";
import { formatDate } from "@/helpers";

const BorrowersReport = () => {
  const dispatch = useDispatch();
  const customerSummary = useSelector((state) => state.customer);


  useEffect(() => {
    dispatch(getCustomerSummary());
  }, []);

  return (
    <main className="w-full rounded-lg bg-swLightGray p-5 shadow-xl">

      <div className="flex gap-5 mt-5">
        <div className="bg-white border rounded-xl p-3 w-full">
          <p className="font-semibold">Total borrowers</p>
          <p className="text-2xl font-bold mt-3">  {customerSummary?.data?.data?.totalCount}</p>
        </div>
        <div className="bg-white border rounded-xl p-3 w-full">
          <p className="font-semibold">Inactive borrowers</p>
          <p className="text-2xl font-bold mt-3">{customerSummary?.data?.data?.inactiveCount}</p>
        </div>
        <div className="bg-white border rounded-xl p-3 w-full">
          <p className="font-semibold">Active borrowers</p>
          <p className="text-2xl font-bold mt-3">{customerSummary?.data?.data?.activeCount}</p>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden bg-white border mt-5">
        <CustomerLoan />
      </div>
    </main>
  );
};

export default BorrowersReport;
