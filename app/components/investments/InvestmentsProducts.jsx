"use client";
import React, { useEffect } from "react";
import ReusableDataTable from "../shared/tables/ReusableDataTable";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { getInvestmentProductsCards } from "@/redux/slices/investmentSlice";
import InvestmentsCards from "../cards/InvestmentsCard/InvestmentsCards";

const header = [
  { id: "productName", label: "Product Name" },
  { id: "totalInvestments", label: "Total Investments Count" },
  { id: "totalInvestmentAmount", label: "Total Investment Amount" },
  { id: "dateCreated", label: "Date created" },
];

const customDataTransformer = (apiData) => {
  return apiData?.investmentProducts?.map((item, i) => ({
    id: item?._id,
    productName: (
      <div className="text-[15px] font-light text-gray-700">{item?.name}</div>
    ),
    totalInvestments: (
      <div className="text-[15px] font-light text-gray-700">
        {item?.totalInvestments.toLocaleString()}
      </div>
    ),
    totalInvestmentAmount: (
      <div className="text-[15px] font-light text-gray-700 whitespace-nowrap">
        ₦ {item?.totalInvestmentsAmount.toLocaleString()}
      </div>
    ),
    dateCreated: (
      <div className="text-[15px] font-light text-gray-700">
        {format(new Date(item?.createdAt), "PPP")}
      </div>
    ),
  }));
};

export default function InvestmentProducts() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { investmentProductCards } = useSelector((state) => state.investment);

  const cards = [
    {
      title: "Total Investment Products",
      value: investmentProductCards?.data?.numberOfInvestmentProducts || 0,
    },
    {
      title: "Total Amount Investment ",
      value: investmentProductCards?.data?.totalAmountInvested || 0,
    },
    {
      title: "Total Accrued Interest",
      value: investmentProductCards?.data?.totalAccruedInterest || 0,
    },
  ];

  console.log(investmentProductCards);

  useEffect(() => {
    dispatch(getInvestmentProductsCards());
  }, []);
  return (
    <div className="flex flex-col gap-5">
      <InvestmentsCards cards={cards} />
      <ReusableDataTable
        dataTransformer={customDataTransformer}
        onClickRow="/investors/view-investment-product/"
        headers={header}
        initialData={[]}
        apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/investment/product/all`}
        btnText={
          <div className="flex gap-1 items-center p-1">
            <p className="">Create Investment Product</p>
          </div>
        }
        btnTextClick={() => {
          router.push("investors/create-investment-product");
        }}
        filters={true}
        pagination={true}
      />
    </div>
  );
}
