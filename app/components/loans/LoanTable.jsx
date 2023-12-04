"use client";

import ReusableDataTable from "../shared/tables/ReusableDataTable";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const  LoanTable = () => {
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
    return apiData?.map((item) => ({
      id: item._id,
      createdAt: (
        <div className="text-md font-[500] text-gray-700">
          {item.createdAt?.slice(0, 10)}
        </div>
      ),
      name: (
        <div>
          <div className="text-md font-[500] text-gray-700">{`${item?.customer?.firstName} ${item?.customer?.lastName}`}</div>
          <div className="text-xs text-gray-500">Borrower&apos;s ID</div>
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
            ₦ {`${item?.loanAmount}`}
          </div>
        </div>
      ),
      status: (
        <button
          className={`${
            item.status === "Pending"
              ? "bg-[#E7F1FE] text-swBlue text-xs font-normal px-2 py-1 rounded-full"
              : "bg-[#F8A9A3] text-white text-xs font-normal px-2 py-1 rounded-full"
          } px-2 py-1 rounded`}
        >
          {item.status}
        </button>
      ),
    }));
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if localStorage is available
        if (typeof window !== "undefined") {
          const storedUser = JSON.parse(localStorage.getItem("user"));
          console.log("Stored User:", storedUser); // Add this line
          setUserId(storedUser?.data?.user?._id || "");
          setRole(storedUser?.data?.user?.role?.name || "");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Call the async function
    fetchUserData();
  }, [router.pathname]);

  return (
    <div>
      {userId && (
        <ReusableDataTable
          filterParams={[
            { name: "Pending" },
            { name: "Approved" },
            { name: "Declined" },
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
