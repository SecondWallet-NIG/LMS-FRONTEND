"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import ReusableDataTable from "../components/shared/tables/ReusableDataTable";
import { AiOutlinePlus } from "react-icons/ai";
import CustomerLoan from "../components/customers/CustomerLoan";
import { format } from "date-fns";
import BorrowerOptions from "../components/customers/BorrowerOptions";

const BlackListedCustomers = () => {
  const router = useRouter();
  const [openWhitelistModal, setOpenWhitelistModal] = useState(false);
  const [borrowerId, setBorrowerId] = useState("");

  const header = [
    { id: "sn", label: "S/N" },
    { id: "blacklistedAt", label: "Date added" },
    { id: "borrowerName", label: "Borrower name and ID" },
    { id: "reasonForBlacklisting", label: "Reason for blacklisting" },
    // { id: "status", label: "Status" },
    { id: "action", label: "Action" },
  ];

  const customDataTransformer = (apiData) => {
    return apiData?.map((item, i) => ({
      id: item._id,
      sn: <div className="text-md font-[500] text-gray-700">{i + 1}</div>,
      blacklistedAt: (
        <div className="text-md font-[500] text-gray-700">
          {item?.blacklistedAt && format(new Date(item?.blacklistedAt), "PPP")}
        </div>
      ),
      borrowerName: (
        <div className="flex flex-col">
          <p className="text-md font-[500] text-gray-700">
            {item?.customerProfileInformation?.firstName}{" "}
            {item?.customerProfileInformation?.lastName}
          </p>
          <p className="text-[0.6rem] text-gray-500">
            SW-{item?.customerProfileInformation?.customerId}
          </p>
        </div>
      ),
      reasonForBlacklisting: (
        <div>
          <div className="text-md font-[500] text-gray-700">
            {item?.blacklistReason}
          </div>
        </div>
      ),
      action: (
        <div>
          <div
            className="text-md font-[500] text-white bg-swBlue w-fit py-2 px-4 rounded-lg"
            onClick={() => {
              setOpenWhitelistModal(true);
              setBorrowerId(item?.customerProfileInformation?._id);
            }}
          >
            Whitelist
          </div>
        </div>
      ),
    }));
  };

  return (
    <DashboardLayout paths={["Blacklisted Borrowers"]}>
      <ReusableDataTable
        dataTransformer={customDataTransformer}
        // onClickRow="/borrowers/profile"
        headers={header}
        initialData={[]}
        apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/customer/profile-information/blacklist/all`}
        btnText={
          <div className="flex gap-1 items-center p-1">
            <AiOutlinePlus size={15} />
            <p className="">create borrower</p>
          </div>
        }
        btnTextClick={() => {
          router.push("/create-borrower");
        }}
        filters={true}
        pagination={true}
      />
      <BorrowerOptions
        open={openWhitelistModal}
        onClose={setOpenWhitelistModal}
        whiteList={true}
        borrowerId={borrowerId}
      />
    </DashboardLayout>
  );
};

export default BlackListedCustomers;
