"use client";

import React from "react";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import CustomerLoan from "../components/customers/CustomerLoan";

const Customers = () => {
  const roles = [
    "LO",
    "CFO",
    "CEO",
    "CAO",
    "ICO",
    "COF",
    "LR0",
    "CT0",
    "HRM",
    "Dir",
    "System Admin",
  ];
  return (
    <DashboardLayout roles={roles}>
      <CustomerLoan />
    </DashboardLayout>
  );
};

export default Customers;
