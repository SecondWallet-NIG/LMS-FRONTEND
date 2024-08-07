"use client";

import ReusableDataTable from "../shared/tables/ReusableDataTable";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatDate, formatTimeToAMPM } from "@/helpers";
const DisbursedLoans = () => {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();
  const headers = [
    { id: "disbursedAt", label: "Date Disbursed" },
    { id: "name", label: "Borrower's Name & ID" },
    { id: "loanPackageId", label: "Loan ID & package" },
    { id: "loanAmount", label: "Loan Amount" },
    { id: "status", label: "Loan Status" },
  ];

  const customDataTransformer = (apiData) => {
    return apiData?.map((item) => ({
      id: item._id,
      disbursedAt: (
        <div>
          <div className="text-[13px] font-[500] text-gray-700">
            {formatDate(item.createdAt?.slice(0, 10))}
          </div>
          <div className="text-[13px] font-light text-gray-500 pt-2">
            {formatTimeToAMPM(item.createdAt)}
          </div>
        </div>
      ),
      name: (
        <div>
          <div className="text-md font-[500] text-gray-700">{`${item?.customerId?.firstName} ${item?.customerId?.lastName}`}</div>
          <div className="text-xs text-gray-500">
            {item?.customerId?.customerId}
          </div>
        </div>
      ),
      loanPackageId: (
        <div>
          <div className="text-md font-[500] text-gray-700">{`${item?.loanPackage?.name}`}</div>
          <div className="text-xs text-gray-500">SWL-{`${item?.loanId}`}</div>
        </div>
      ),
      loanAmount: (
        <div>
          <div className="text-md font-[500] text-gray-700">
            ₦ {item?.loanAmount.toLocaleString()}
          </div>
        </div>
      ),
      status: (
        <button
          className={`${
            item.status === "Pending"
              ? "bg-swIndicatorLightRed"
              : item.status === "In Progress"
              ? "bg-swIndicatorYellow"
              : item.status === "Ready for Disbursal"
              ? "bg-swIndicatorPurple"
              : item.status === "Disbursed"
              ? "bg-swBlue"
              : item.status === "Overdue"
              ? "bg-swIndicatorLightRed "
              : "bg-swGreen"
          } px-2 py-1 rounded-full text-xs font-normal text-white`}
        >
          {item.status}
        </button>
      ),
    }));
  };
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
    <div>
      {userId && (
        <ReusableDataTable
          dataTransformer={customDataTransformer}
          onClickRow="/disbursement/"
          headers={headers}
          initialData={[]}
          apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/disbursement`}
          filters={true}
          pagination={true}
          //  userId={userId}
          role="report"
        />
      )}
    </div>
  );
};

export default DisbursedLoans;
