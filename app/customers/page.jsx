"use client";

import React from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import ReusableDataTable from "../components/shared/tables/ReusableDataTable";

const header = [
  { id: "firstName", label: "First Name" },
  { id: "lastName", label: "Last Name" },
  { id: "middleName", label: "Middle Name" },
  { id: "dateOfBirth", label: "Date of Birth" },
  { id: "gender", label: "Gender" },
  { id: "nin", label: "NIN" },
];



const Customers = () => {
  const router = useRouter()
  return (
    <DashboardLayout>
      <ReusableDataTable
        headers={header}
        initialData={[]}
        apiEndpoint="https://secondwallet-stag.onrender.com/api/customer/profile-information"
        btnText="+ create customer"
        btnTextClick={() => {
          router.push("/create-customer")
        }}
      />
    </DashboardLayout>
  );
};

export default Customers;
