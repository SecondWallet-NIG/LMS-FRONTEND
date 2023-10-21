"use client";

import React from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import ReusableDataTable from "../components/shared/tables/ReusableDataTable";
import { AiOutlinePlus } from "react-icons/ai";

const header = [
  { id: "firstName", label: "First Name" },
  { id: "lastName", label: "Last Name" },
  { id: "middleName", label: "Middle Name" },
  { id: "dateOfBirth", label: "Date of Birth" },
  { id: "gender", label: "Gender" },
  { id: "nin", label: "NIN" },
];

const Customers = () => {
  const router = useRouter();
  return (
    <DashboardLayout>
      <div className="w-full">
        <ReusableDataTable
          onClickRow="/customers/profile"
          headers={header}
          initialData={[]}
          apiEndpoint="https://secondwallet-stag.onrender.com/api/customer/profile-information"
          btnText={
            <div className="flex gap-1 items-center p-1">
              <AiOutlinePlus size={15} />
              <p className="hidden lg:block">create customer</p>
            </div>
          }
          btnTextClick={() => {
            router.push("/create-customer");
          }}
        />
      </div>
    </DashboardLayout>
  );
};

export default Customers;
