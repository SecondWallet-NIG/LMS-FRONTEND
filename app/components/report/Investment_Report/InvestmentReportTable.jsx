"use client";
import React from "react";
import ReusableDataTable from "../../shared/tables/ReusableDataTable";

const header = [
  { id: "investorName", label: "Investor Name" },
  { id: "investmentId", label: "Investment ID" },
  { id: "packageName", label: "Investment Type" },
  { id: "roi", label: "ROI" },
  { id: "startDate", label: "Start Date" },
  { id: "endDate", label: "End Date" },
  { id: "amountInvested", label: "Amount Invested" },
  { id: "duration", label: "Investment Duration" },
  { id: "status", label: "Investment Status" },
];

const customDataTransformer = (apiData) => {
  console.log({ apiData });
  return apiData?.investments?.map((item, i) => ({
    id: item._id,
    investmentId: (
      <div className="text-[15px] font-light text-gray-700">
        {item.investmentId}
      </div>
    ),
    packageName: (
      <div className="text-[15px] font-light text-gray-700">
        {item.investmentProduct.name}
      </div>
    ),
    investorName: (
      <div className="text-[15px] font-light text-gray-700">
        {item.investorProfile.firstName} {item.investorProfile.lastName}
      </div>
    ),
    amountInvested: (
      <div className="text-[15px] font-light text-gray-700 whitespace-nowrap">
        ₦ {item?.initialInvestmentPrincipal?.toLocaleString()}
      </div>
    ),
    roi: (
      <div className="text-[15px] font-light text-gray-700 whitespace-nowrap">
        ₦ {item?.expectedInterest?.toLocaleString()}
      </div>
    ),
    duration: (
      <div className="text-[15px] font-light text-gray-700">
        {item?.duration?.value}{" "}
        {item?.duration?.metric === "Month"
          ? "Months"
          : data?.data?.duration?.metric === "Quarter"
          ? "Quarters"
          : "Years"}
      </div>
    ),
    status: (
      <button
        className={`${
          item.status === "Pending"
            ? "bg-[#E7F1FE] text-swBlue text-xs font-normal px-2 py-1 rounded-full"
            : item.status === "Approved"
            ? "bg-green-50 text-swGreen"
            : "text-red-400 bg-red-100"
        } px-2 py-1 rounded-full whitespace-nowrap`}
      >
        {item?.status}
      </button>
    ),
  }));
};

export default function InvestmentReportTable() {
  return (
    <>
      <ReusableDataTable
        dataTransformer={customDataTransformer}
        onClickRow="/investors/investment-details"
        headers={header}
        initialData={[]}
        apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/investment/all`}
        btnText={
          <div className="flex gap-1 items-center p-1">
            <p className="">Create Investment</p>
          </div>
        }
        btnTextClick={() => {
          router.push("/investors/create-investment");
        }}
        filters={true}
        pagination={true}
      />
    </>
  );
}
