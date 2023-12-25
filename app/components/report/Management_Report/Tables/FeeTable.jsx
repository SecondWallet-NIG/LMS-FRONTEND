"use client";
import ReusableDataTable from "@/app/components/shared/tables/ReusableDataTable";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FeeTable = () => {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  const headers = [
    { id: "Fee type", label: "Fee type" },
    { id: "Rate/amount", label: "Rate/amount" },
    { id: "Revenue generated", label: "Revenue generated" },
    { id: "Percentage", label: "Percentage" },
    // { id: "status", label: "Loan Status" },
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
    <div>FEE TABLE</div>
    // <ReusableDataTable
    //   // filterParams={[
    //   //   { name: "Pending" },
    //   //   { name: "Ready for Disbursal" },
    //   //   { name: "In Progress" },
    //   //   { name: "Declined" },
    //   //   { name: "Disbursed" },
    //   //   { name: "Cancelled Disbursement" },
    //   // ]}
    //   // dataTransformer={customDataTransformer}
    //   // onClickRow="/loan-applications/view-loan"
    //   headers={headers}
    //   initialData={[]}
    //   // apiEndpoint="https://secondwallet-stag.onrender.com/api/loan-application/all"
    //   // btnText={
    //   //   <div className="flex gap-1 items-center p-1">
    //   //     <p className="hidden lg:block">create loan</p>
    //   //   </div>
    //   // }
    //   // btnTextClick={() => {
    //   //   router.push("/create-loan");
    //   // }}
    //   filters={true}
    //   pagination={true}
    //   userId={userId}
    //   role={role}
    // />
  );
};

export default FeeTable;
