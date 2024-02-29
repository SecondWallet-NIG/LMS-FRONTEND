"use client";
import ReusableDataTable from "@/app/components/shared/tables/ReusableDataTable";
import { formatDate } from "@/helpers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoanOfficerTable = () => {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  const headers = [
    { id: "staffId", label: "Officer ID" },
    // { id: "S/n", label: "S/n" },
    { id: "firstName", label: "Loan Officer" },
    { id: "createdAt", label: "Date added" },
    { id: "loanCount", label: "Loans originated" },
  ];

  const customDataTransformer = (apiData) => {
    return apiData?.map((item) => ({
      staffId: (
        <div>
          <div className="text-md font-[500] text-swBlue">
            SWL-{item?.staffId}
          </div>
        </div>
      ),
      firstName: (
        <div>
          <div className="text-md font-[500] text-swBlue">
            {item?.firstName} {item?.lastName}
          </div>
        </div>
      ),
      loanCount: (
        <div>
          <div className="text-md font-[500] text-swBlue">
            {item?.loanCount}
          </div>
        </div>
      ),
      createdAt: (
        <div>
          <div className="text-md font-[500] text-swBlue">
            {formatDate(item?.createdAt.slice(0, 10))}
          </div>
        </div>
      ),
    }));
  };

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
      dataTransformer={customDataTransformer}
      onClickRow="/loan-applications/view-loan"
      headers={headers}
      initialData={[]}
      apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/report/loan-officer/table-data`}
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
