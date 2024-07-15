"use client";
import ReusableDataTable from "@/app/components/shared/tables/ReusableDataTable";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoanProductsTable = () => {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  const headers = [
    { id: "Loan Products", label: "Loan Products" },
    { id: "Date created", label: "Date created" },
    { id: "Interest rate/annum", label: "Interest rate/annum" },
    { id: "No. of loans created", label: "No. of loans created" },
    // { id: "Loans originated", label: "Loans originated" },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (typeof window !== "undefined") {
          const storedUser = JSON.parse(localStorage.getItem("user"));

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
    <div>Content</div>
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
    //   // apiEndpoint="${process.env.NEXT_PUBLIC_API_URL}/api/loan-application/all"
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

export default LoanProductsTable;
