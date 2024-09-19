"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";

import PaymentHistoryTable from "../components/payment-history/PaymentHistoryTable";

const PaymentHistory = () => {
  const dispatch = useDispatch()
  const roles = [
    "LO",
    "CFO",
    "CEO",
    "CAO",
    "ICO",
    "HRM",
    "COF",
    "CT0",
    "LR0",
    "Dir",
    "System Admin",
  ]
  
  return (
    <DashboardLayout roles={roles}>
      <PaymentHistoryTable />
    </DashboardLayout>
  );
};

export default PaymentHistory;
