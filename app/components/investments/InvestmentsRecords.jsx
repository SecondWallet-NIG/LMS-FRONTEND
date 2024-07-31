"use client";
import React, { useEffect, useState } from "react";
import InvestmentsCards from "../cards/InvestmentsCard/InvestmentsCards";
import ReusableDataTable from "../shared/tables/ReusableDataTable";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllInvestments,
  getAllInvestors,
} from "@/redux/slices/investmentSlice";

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
      <div className="text-[15px] font-light  whitespace-nowrap text-gray-700">
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
      <div className="text-[15px] font-light">
        <div
          className={`py-1 px-2 border rounded-md flex w-fit text-xs items-center gap-1 ${
            item?.status === "Pending"
              ? "bg-blue-50 text-blue-500 border-blue-500"
              : item?.status === "In Progress"
              ? "bg-green-50 text-green-500 border-green-500"
              : "bg-red-50 text-red-500 border-red-500"
          }`}
        >
          <div
            className={`h-1 w-1 rounded-full ${
              item?.status === "Pending"
                ? "bg-blue-500"
                : item?.status === "In Progress"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          />
          {item?.status}
        </div>
      </div>
    ),
  }));
};

export default function InvestmentsRecords() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.investment);
  const [investorsData, setInvestorsData] = useState({
    total: 0,
    invested: 0,
    returns: 0,
  });
  const cards = [
    { title: "Number of investors", value: investorsData.total || 0 },
    { title: "Amount invested", value: investorsData.invested || 0 },
    { title: "Returns earned", value: investorsData.returns || 0 },
  ];

  useEffect(() => {
    dispatch(getAllInvestments());
    // dispatch(getAllInvestors());
  }, []);

  useEffect(() => {
    const calculateTotal = () => {
      const uniqueInvestorProfiles = new Set();
      data?.data?.investments?.forEach((investment) => {
        const investorId = investment?.investorProfile?._id;
        if (investorId) {
          uniqueInvestorProfiles.add(investorId);
        }
      });
      return uniqueInvestorProfiles.size;
    };

    setInvestorsData({
      ...investorsData,
      total: calculateTotal(),
      invested: data?.data?.investments?.reduce(
        (acc, item) => acc + item?.currentInvestmentPrincipal,
        0
      ),
      returns: data?.data?.investments?.reduce(
        (acc, item) => acc + item?.withdrawableBalance,
        0
      ),
    });
  }, [data?.data?.investments]);
  // useEffect(() => {
  //   setInvestorsData({
  //     ...investorsData,
  //     total: data?.data?.investors?.length,
  //   });
  // }, [data?.data?.investors]);

  console.log("apiInvestment", data);

  return (
    <div className="flex flex-col gap-5">
      <InvestmentsCards cards={cards} />
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
    </div>
  );
}
