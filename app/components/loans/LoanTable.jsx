"use client";

import ReusableDataTable from "../shared/tables/ReusableDataTable";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/helpers";
import { formatTimeToAMPM } from "@/helpers";
const LoanTable = () => {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();
  const headers = [
    { id: "createdAt", label: "Date Created" },
    { id: "name", label: "Borrower's Name & ID" },
    { id: "loanPackageId", label: "Loan ID & package" },
    { id: "loanAmount", label: "Loan Amount" },
    { id: "status", label: "Loan Status" },
  ];

  const customDataTransformer = (apiData) => {
    const timestamp = "2023-12-19T21:16:33.883Z";
    const date = new Date(timestamp);

    const options = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      timeZone: "UTC", // Assuming the input timestamp is in UTC
    };

    const formattedTime = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    console.log(formattedTime);

    return apiData?.map((item) => ({
      id: item._id,
      createdAt: (
        <div>
          <div className="text-md font-[500] text-gray-700">
            {formatDate(item.createdAt?.slice(0, 10))}
          </div>
          <div className="text-xs font-light text-gray-500 pt-2">
            {formatTimeToAMPM(item.createdAt)}
          </div>
        </div>
      ),
      name: (
        <div>
          <div className="text-md font-[500] text-gray-700">{`${item?.customer?.firstName} ${item?.customer?.lastName}`}</div>
          <div className="text-xs text-gray-500 font-light pt-2">
            {item?.customer?.customerId}
          </div>
        </div>
      ),
      loanPackageId: (
        <div>
          <div className="text-md font-[500] text-gray-700">{`${item?.loanPackage?.name}`}</div>
          <div className="text-xs text-gray-500 pt-2">{`${item?.loanId}`}</div>
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
              : item.status === "Fully Paid"
              ? "bg-swGreen"
              : "bg-swIndicatorDarkRed"
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
      {userId && (
        <ReusableDataTable
          filterParams={[
            { name: "Pending" },
            { name: "Ready for Disbursal" },
            { name: "In Progress" },
            { name: "Declined" },
            { name: "Disbursed" },
            { name: "Cancelled Disbursement" },
          ]}
          dataTransformer={customDataTransformer}
          onClickRow="/loan-applications/view-loan"
          headers={headers}
          initialData={[]}
          apiEndpoint="https://secondwallet-stag.onrender.com/api/loan-application/all"
          btnText={
            <div className="flex gap-1 items-center p-1">
              <p className="hidden lg:block">create loan</p>
            </div>
          }
          btnTextClick={() => {
            router.push("/create-loan");
          }}
          filters={true}
          pagination={true}
          userId={userId}
          role={role}
        />
      )}
    </div>
  );
};

export default LoanTable;
