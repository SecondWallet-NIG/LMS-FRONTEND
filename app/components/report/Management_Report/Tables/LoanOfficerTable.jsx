"use client";
import ReusableDataTable from "@/app/components/shared/tables/ReusableDataTable";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoanOfficerTable = () => {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  const headers = [
    { id: "S/n", label: "S/n" },
    { id: "Loan Officer", label: "Loan Officer" },
    { id: "Officer ID", label: "Officer ID" },
    { id: "Date added", label: "Date added" },
    { id: "Loans originated", label: "Loans originated" },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (typeof window !== "undefined") {
          const storedUser = JSON.parse(localStorage.getItem("user"));
          console.log("Stored User:", storedUser);
          setUserId(storedUser?.data?.user?._id || "");
          setRole(storedUser?.data?.user?.role?.name || "");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [router.pathname]);
  return (
    <ReusableDataTable
      // filterParams={[
      //   { name: "Pending" },
      //   { name: "Ready for Disbursal" },
      //   { name: "In Progress" },
      //   { name: "Declined" },
      //   { name: "Disbursed" },
      //   { name: "Cancelled Disbursement" },
      // ]}
      // dataTransformer={customDataTransformer}
      // onClickRow="/loan-applications/view-loan"
      headers={headers}
      initialData={[]}
      // apiEndpoint="https://secondwallet-stag.onrender.com/api/loan-application/all"
      // btnText={
      //   <div className="flex gap-1 items-center p-1">
      //     <p className="hidden lg:block">create loan</p>
      //   </div>
      // }
      // btnTextClick={() => {
      //   router.push("/create-loan");
      // }}
      filters={true}
      pagination={true}
      userId={userId}
      role={role}
    />
  );
};

export default LoanOfficerTable;
