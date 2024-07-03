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
  const btnClass =
    "rounded-md flex justify-center items-center py-2 px-3 font-medium text-swTextColor border hover:shadow-md";

  const { data } = useSelector((state) => state.investment);

  useEffect(() => {
    dispatch(getSingleInvestmentProduct(id));
  }, []);

  console.log("invdata", data);
  return (
    <DashboardLayout
      isBackNav={true}
      paths={["Investors", "View investment products"]}
    >
      <div className="mx-auto max-w-4xl py-10 px-5">
        <div className="flex gap-4 justify-end mb-10">
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

        <div className="flex justify-between border-b pb-5 mb-5">
          <h1 className="font-semibold text-2xl leading-8 text-black">
            Investment Product Details
          </h1>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex">
            <p className="min-w-[15rem] font-medium">Product name</p>
            <p>{data?.data?.name}</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem] font-medium">Product Timeframe</p>
            <p>Daily</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem] font-medium">Minimum interest rate</p>
            <p>{data?.data?.interestRateRanges?.daily?.min}% per day</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem] font-medium">Maximum interest rate</p>
            <p>{data?.data?.interestRateRanges?.daily?.max}% per day</p>
          </div>
          {/* <div className="flex">
            <p className="min-w-[15rem] font-medium">Interest method</p>
            <p>{data?.data?.interestMethod?.name}</p>
          </div> */}
          <div className="flex">
            <p className="min-w-[15rem] font-medium">
              Minimum investment amount
            </p>
            <p>
              {data?.data?.investmentAmountRange?.daily?.min?.toLocaleString()}
            </p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem] font-medium">Maximum interest amount</p>
            <p>
              {data?.data?.investmentAmountRange?.daily?.min?.toLocaleString()}
            </p>
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
