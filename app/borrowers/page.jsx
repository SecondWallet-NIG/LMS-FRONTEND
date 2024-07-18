"use client";

import React from "react";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import CustomerLoan from "../components/customers/CustomerLoan";


const Customers = () => {
  return (
    <DashboardLayout>
      <CustomerLoan />
    </DashboardLayout>
  );
};

export default Customers;
