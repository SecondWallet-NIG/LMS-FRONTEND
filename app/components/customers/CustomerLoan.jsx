"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ReusableDataTable from "../shared/tables/ReusableDataTable";
import { AiOutlinePlus } from "react-icons/ai";

const header = [
  { id: "firstName", label: "First Name" },
  { id: "lastName", label: "Last Name" },
  { id: "middleName", label: "Middle Name" },
  { id: "dateOfBirth", label: "Date of Birth" },
  { id: "gender", label: "Gender" },
  { id: "nin", label: "NIN" },
  { id: "status", label: "Status" },
];

const CustomerLoan = () => {
  const router = useRouter();
  return (
<<<<<<< Updated upstream
    <div className="w-full">
      <ReusableDataTable
        onClickRow="/borrowers/profile"
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
        filters={true}
        pagination={true}
      />
    </div>
=======
      <div className="w-full">
        <ReusableDataTable
          onClickRow="/customers/profile"
          headers={header}
          initialData={[]}
          apiEndpoint="http://localhost:8000/api/customer/profile-information"
          btnText={
            <div className="flex gap-1 items-center p-1">
              <AiOutlinePlus size={15} />
              <p className="hidden lg:block">create customer</p>
            </div>
          }
          btnTextClick={() => {
            router.push("/create-customer");
          }}
          filters={true}
          pagination={true}
        />
      </div>
>>>>>>> Stashed changes
  );
};

export default CustomerLoan;
