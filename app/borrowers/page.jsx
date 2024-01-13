"use client";

import React from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import ReusableDataTable from "../components/shared/tables/ReusableDataTable";
import { AiOutlinePlus } from "react-icons/ai";
import CustomerLoan from "../components/customers/CustomerLoan";


const Customers = () => {
  const router = useRouter();
  return (
    <DashboardLayout>
      <CustomerLoan />
    </DashboardLayout>
  );
};

export default Customers;
