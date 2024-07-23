"use client";
import React, { useEffect, useState } from "react";
import InvestmentsCards from "../cards/InvestmentsCard/InvestmentsCards";
import ReusableDataTable from "../shared/tables/ReusableDataTable";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { getAllInvestments, getAllInvestors } from "@/redux/slices/investmentSlice";

const header = [
  { id: "investorName", label: "Investor name" },
  { id: "investorId", label: "ID" },
  { id: "dateOfBirth", label: "Date of birth" },
  { id: "gender", label: "Gender" },
  { id: "state", label: "state" },
  { id: "phone", label: "Phone no" },
  { id: "annualIncome", label: "Annual income" },
  { id: "workStatus", label: "Work status" },
  { id: "status", label: "Investor status" },
];

const customDataTransformer = (apiData) => {
  return apiData?.investorProfiles?.map((item) => ({
    id: item?._id,
    investorName: (
      <div className="text-[15px] font-light text-gray-700">
        {item?.firstName} {item?.lastName}
      </div>
    ),
    investorId: (
      <div className="text-[15px] font-light text-gray-700">
        {item?.investorId}
      </div>
    ),
    dateOfBirth: (
      <div className="text-[15px] font-light text-gray-700">
        {item?.dateOfBirth && format(new Date(item?.dateOfBirth), "PPP")}
      </div>
    ),
    gender: (
      <div className="text-[15px] font-light text-gray-700">{item?.gender}</div>
    ),
    state: (
      <div className="text-[15px] font-light text-gray-700">{item?.state}</div>
    ),
    phone: (
      <div className="text-[15px] font-light text-gray-700">
        {item?.phoneNumber}
      </div>
    ),
    annualIncome: (
      <div className="text-[15px] font-light text-gray-700 whitespace-nowrap">
        ₦ {item?.annualIncome.toLocaleString()}
      </div>
    ),
    workStatus: (
      <div className="text-[15px] font-light text-gray-700">
        {item?.workStatus}
      </div>
    ),
    status: (
      <div className="text-[15px] font-light">
        <div
          className={`py-1 px-2 border rounded-md flex w-fit text-xs items-center gap-1 ${
            item?.status === "Active"
              ? "bg-green-50 text-green-500 border-green-500"
              : "bg-gray-50 text-gray-500 border-gray-500"
          }`}
        >
          <div
            className={`h-1 w-1 rounded-full ${
              item?.status === "Active" ? "bg-green-500" : "bg-gray-500"
            }`}
          />
          {item?.status}
        </div>
      </div>
    ),
  }));
};

export default function InvestorsRecords() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.investment);
  const [investorsData, setInvestorsData] = useState({
    total: 0,
    active: 0,
    returns: 0,
  });
  const cards = [
    { title: "Total Number of Investors", value: investorsData.total || 0 },
    { title: "Active investors", value: investorsData.active || 0 },
    { title: "Returns earned", value: investorsData.returns || 0 },
  ];

  useEffect(() => {
    dispatch(getAllInvestors());
  }, []);

  useEffect(() => {
    setInvestorsData({
      ...investorsData,
      total: data?.data?.investorProfiles?.length,
      active: data?.data?.investorProfiles?.filter(
        (item) => item.status === "Active"
      ).length,
      returns: data?.data?.investorProfiles?.reduce(
        (acc, item) => acc + item?.returnsEarned,
        0
      ),
    });
  }, [data?.data?.investorProfiles]);

  

  return (
    <div className="flex flex-col gap-5">
      <InvestmentsCards cards={cards} />
      <ReusableDataTable
        dataTransformer={customDataTransformer}
        onClickRow="/investors/investor-profile/"
        headers={header}
        initialData={[]}
        apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/investment/investor/all`}
        btnText={
          <div className="flex gap-1 items-center p-1">
            <p className="">Create Investor</p>
          </div>
        }
        btnTextClick={() => {
          router.push("/investors/create-investor");
        }}
        filters={true}
        pagination={true}
      />
    </div>
  );
}
