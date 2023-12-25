"use client";
import { useRouter } from "next/navigation";
import ReusableDataTable from "../../shared/tables/ReusableDataTable";
import { useEffect, useState } from "react";

const SummaryTable = () => {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  const headers = [
    { id: "Period", label: "Period" },
    { id: "Total borrowed/disbursed", label: "Total borrowed/disbursed" },
    { id: "Total repaid", label: "Total repaid" },
    { id: "Profit/loss", label: "Profit/loss" },
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
    <div>
      SUMMARY TABLE
    </div>
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
    //   onClickRow="/loan-applications/view-loan"
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

export default SummaryTable;
