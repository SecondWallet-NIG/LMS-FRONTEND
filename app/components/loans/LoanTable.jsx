"use client";

import ReusableDataTable from "../shared/tables/ReusableDataTable";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/helpers";
import { formatTimeToAMPM } from "@/helpers";
import Link from "next/link";

const LoanTable = () => {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const [roleTag, setRoleTag] = useState("");
  const router = useRouter();
  const headers = [
    { id: "createdAt", label: "Date Created" },
    { id: "name", label: "Borrower's Name & ID" },
    { id: "loanPackageId", label: "Loan ID & package" },
    { id: "loanAmount", label: "Loan Amount" },
    { id: "status", label: "Status" },
    { id: "createdBy", label: "Initiated By" },
  ];

  const customDataTransformer = (apiData) => {
    const timestamp = "2023-12-19T21:16:33.883Z";
    const date = new Date(timestamp);

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
          <div className="text-xs text-gray-500 pt-2">
            SWL-{`${item?.loanId}`}
          </div>
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
      createdBy: (
        <div>
          <div className="text-md font-[500] text-swDarkGreen">
            {item?.createdBy?.firstName} {item?.createdBy?.lastName}
          </div>
          <div className="text-md font-[500] text-gray-700">
            <Link
              className="underline"
              href={`/team-management/staff/${item?.createdBy?._id}`}
            >
              {item?.createdBy?.email}
            </Link>
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
          setUserId(storedUser?.data?.user?._id || "");
          setRole(storedUser?.data?.user?.role?.name || "");
          setRoleTag(storedUser?.data?.user?.role?.tag || "");
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
            { name: "Fully Paid" },
            { name: "Cancelled Disbursement" },
          ]}
          dataTransformer={customDataTransformer}
          onClickRow="/loan-applications/view-loan"
          headers={headers}
          initialData={[]}
          apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/loan-application/all`}
          btnText={
            <div className="flex gap-1 items-center p-1">
              <p className="hidden lg:block">create loan</p>
            </div>
          }
          btnTextClick={() => {
            roleTag === "LO"
              ? router.push("/create-loan")
              : router.push("/unauthorized");
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
