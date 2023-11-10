"use client";

import React from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import ReusableDataTable from "../components/shared/tables/ReusableDataTable";
import { AiOutlinePlus } from "react-icons/ai";
import CustomerLoan from "../components/customers/CustomerLoan";

const header = [
  { id: "firstName", label: "First Name" },
  { id: "lastName", label: "Last Name" },
  { id: "middleName", label: "Middle Name" },
  { id: "dateOfBirth", label: "Date of Birth" },
  { id: "gender", label: "Gender" },
  { id: "nin", label: "NIN" },
  { id: "status", label: "Status" },
];

const Customers = () => {
  const router = useRouter();
  return (
    <DashboardLayout>
      <CustomerLoan />
    </DashboardLayout>
  );
};

export default Customers;
