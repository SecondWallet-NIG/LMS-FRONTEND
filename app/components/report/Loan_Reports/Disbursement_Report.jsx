"use client";
import { useState, useEffect } from "react";
import DisbursedLoans from "../../loans/DisbursedLoans";
import { getDisbursementSummary, getRepaymentReport } from "@/redux/slices/loanRepaymentSlice";
import { useDispatch, useSelector } from "react-redux";
import DisbursementCard from "../../cards/DisbursmentCard/DisbursementCard";

const DisbursementReport = () => {
  const dispatch = useDispatch();

  return (
    <main className="w-full rounded-lg bg-swLightGray p-5 shadow-xl">
     

      <div className="rounded-xl overflow-hidden bg-white border mt-5">
      <DisbursementCard />
        <DisbursedLoans />
      </div>
    </main>
  );
};

export default DisbursementReport;
