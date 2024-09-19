"use client";

import React from "react";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import CustomerLoan from "../components/customers/CustomerLoan";
import { borrowersAuthRoles } from "../components/helpers/pageAuthRoles";

const Customers = () => {
  return (
    <DashboardLayout roles={borrowersAuthRoles}>
      <CustomerLoan />
    </DashboardLayout>
  );
};

export default Customers;
