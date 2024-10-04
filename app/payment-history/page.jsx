"use client";

import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import { useDispatch } from "react-redux";

import PaymentHistoryTable from "../components/payment-history/PaymentHistoryTable";
import { paymentHistoryAuthRoles } from "../components/helpers/pageAuthRoles";

const PaymentHistory = () => {
  
  return (
    <DashboardLayout roles={paymentHistoryAuthRoles}>
      <PaymentHistoryTable />
    </DashboardLayout>
  );
};

export default PaymentHistory;
