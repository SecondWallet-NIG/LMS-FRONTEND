"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import ReusableDataTable from "../components/shared/tables/ReusableDataTable";

import PaymentHistoryTable from "../components/payment-history/PaymentHistoryTable";

const PaymentHistory = () => {
  return (
    <DashboardLayout>
      <PaymentHistoryTable />
    </DashboardLayout>
  );
};

export default PaymentHistory;
