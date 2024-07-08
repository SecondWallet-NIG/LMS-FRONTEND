"use client";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import DeleteInvesmentProductModal from "@/app/components/investments/DeleteInvesmentProductModal";
import DeleteAssetCategoryModal from "@/app/components/modals/DeleteAssetCategoryModal";
import Button from "@/app/components/shared/buttonComponent/Button";
import { getSingleInvestmentProduct } from "@/redux/slices/investmentSlice";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ViewInvestmentProducts() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [deleteModal, setDeleteModal] = useState(false);
  const btnClass = "rounded-md flex justify-center items-center py-2 px-3 font-medium text-swTextColor border hover:shadow-md";
  const { data } = useSelector((state) => state.investment);

  // console.log(data?.data)

  useEffect(() => {
    dispatch(getSingleInvestmentProduct(id));
  }, []);

  // console.log("invdata", data);
  const productName = 'Product Name'; const productTimeframe = 'Product Timeframe';
  const minInRate = 'Minimum Interest rate'; const maxInRate = 'Maximum Interest rate'
  const minInAm = 'Minimum investment amount'; const maxInAm = 'Maximum investment amount'
  const interestRange = data?.data?.interestRateRanges
  const investmentRanges = data?.data?.investmentAmountRanges


  const dailyProductData = [
    { name: productName, value: `${data?.data.name}` },
    { name: productTimeframe, value: `Daily` },
    { name: minInRate, value: `${interestRange?.daily?.min}% per annum` },
    { name: maxInRate, value: `${interestRange?.daily?.max}% per annum` },
    { name: minInAm, value: `${investmentRanges?.daily?.min?.toLocaleString()}` },
    { name: maxInAm, value: `${investmentRanges?.daily?.max?.toLocaleString()}` },
  ]

  const monthlyProductData = [
    { name: productTimeframe, value: `Monthly` },
    { name: minInRate, value: `${interestRange?.monthly?.min}% per annum` },
    { name: maxInRate, value: `${interestRange?.monthly?.max}% per annum` },
    { name: minInAm, value: `${investmentRanges?.monthly?.min?.toLocaleString()}` },
    { name: maxInAm, value: `${investmentRanges?.monthly?.max?.toLocaleString()}` },
  ]

  const annualProductData = [
    { name: productTimeframe, value: `Anually` },
    { name: minInRate, value: `${interestRange?.annually?.min}% per annum` },
    { name: maxInRate, value: `${interestRange?.annually?.max}% per annum` },
    { name: minInAm, value: `${investmentRanges?.annually?.min?.toLocaleString()}` },
    { name: maxInAm, value: `${investmentRanges?.annually?.max?.toLocaleString()}` },
  ]


  return (
    <DashboardLayout
      isBackNav={true}
      paths={["Investors", "View investment products"]}
    >
      <div className="mx-auto max-w-4xl py-10 px-5">
        <div className="flex gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-end mb-10">
          <Link
            href="/investors/create-investment-product"
            className={`${btnClass}`}
          >
            New investment
          </Link>
          <button
            className={`${btnClass}`}
            onClick={() => setDeleteModal(true)}
          >
            Delete investment product
          </button>
          <Link
            href={`/investors/view-investment-product/edit-product/${id}`}
            className={`${btnClass}`}
          >
            Edit
          </Link>
        </div>

        {/* Investment product details */}
        <div className="px-5 lg:px-0 mb-20">
          <div className="flex justify-between border-b pb-5 mb-5">
            <h1 className="font-semibold text-2xl leading-8 text-black">
              Investment Product Details
            </h1>
          </div>

          {/* Daily */}
          <div className="flex flex-col gap-5 mb-5">
            {dailyProductData.map((product, index) => {
              return (
                <div key={index} className="flex py-1">
                  <p className="min-w-[15rem] text-sm leading-5 font-medium text-swGrey400">{product?.name}</p>
                  <p className="text-swGrey500 text-sm">{product?.value}</p>
                </div>
              )
            })}
          </div>

          {/* Monthly */}
          <div className="flex flex-col gap-5 border-t py-5">
            {interestRange?.monthly && <>
              {monthlyProductData.map((product, index) => {
                return (
                  <div key={index} className="flex py-1">
                    <p className="min-w-[15rem] text-sm leading-5 font-medium text-swGrey400">{product?.name}</p>
                    <p className="text-swGrey500 text-sm">{product?.value}</p>
                  </div>
                )
              })}
            </>}
          </div>

          {/* Anually */}
          <div className="flex flex-col gap-5 border-t py-5">
            {interestRange?.annually && <>
              {annualProductData.map((product, index) => {
                return (
                  <div key={index} className="flex py-1">
                    <p className="min-w-[15rem] text-sm leading-5 font-medium text-swGrey400">{product?.name}</p>
                    <p className="text-swGrey500 text-sm">{product?.value}</p>
                  </div>
                )
              })}
            </>}
          </div>
        </div>
      </div>

      <DeleteInvesmentProductModal
        open={deleteModal}
        onClose={setDeleteModal}
      />
    </DashboardLayout>
  );
}
