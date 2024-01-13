"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";

import PaymentHistoryTable from "../components/payment-history/PaymentHistoryTable";

const PaymentHistory = () => {
  const dispatch = useDispatch()
  
  return (
    <DashboardLayout>
      <PaymentHistoryTable />
    </DashboardLayout>
  );
};

export default PaymentHistory;
