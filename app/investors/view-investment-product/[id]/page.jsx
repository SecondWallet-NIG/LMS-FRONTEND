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
  const [investmentTypes, setInvestmentTypes] = useState([]);
  const btnClass =
    "rounded-md flex justify-center items-center py-2 px-3 font-medium text-swTextColor border hover:shadow-md";
  const { data } = useSelector((state) => state.investment);

  useEffect(() => {
    dispatch(getSingleInvestmentProduct(id));
  }, []);

  useEffect(() => {
    if (data?.data?.interestRateRanges) {
      const investmentTypes = Object.keys(data?.data?.interestRateRanges);
      setInvestmentTypes(investmentTypes);
    }
  }, [data]);

  return (
    <DashboardLayout
      isBackNav={true}
      paths={["Investors", "View investment products"]}
    >
      <div className="mx-auto max-w-4xl py-10 px-5">
        <div className="flex gap-4 justify-end mb-10">
          {/* <Link
            href="/investors/create-investment-product"
            className={`${btnClass}`}
          >
            New investment
          </Link> */}
          <Link
            href={`/investors/view-investment-product/edit-product/${id}`}
            className={`${btnClass}`}
          >
            Edit
          </Link>
          {/* <button
            className={`rounded-md flex justify-center items-center py-2 px-3 font-medium text-swTextColor border hover:shadow-md hover:shadow-red-100`}
            onClick={() => setDeleteModal(true)}
          >
            Delete
          </button> */}
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
            {investmentTypes.length > 0 &&
              investmentTypes
                .sort((a, b) => {
                  if (a === "daily") return -1; // 'daily' comes before everything else
                  if (b === "daily") return 1; // 'daily' comes before everything else
                  if (a === "annually") return 1; // 'annually' comes after everything else
                  if (b === "annually") return -1; // 'annually' comes after everything else
                  return 0; // maintain original order for other elements
                })
                .map((type, i) => (
                  <div
                    key={type}
                    className={`${
                      i === 0 ? "" : "border-t"
                    } flex flex-col gap-5 pt-5`}
                  >
                    {i === 0 && (
                      <div className="flex py-1 gap-10">
                        <p className="min-w-[15rem] leading-5 font-medium text-swGrey400">
                          Product Name
                        </p>
                        <p className="text-swGrey500 font-medium text-sm capitalize">
                          {data?.data?.name}
                        </p>
                      </div>
                    )}
                    <div className="flex py-1 gap-10">
                      <p className="min-w-[15rem] leading-5 font-medium text-swGrey400">
                        Product Timeframe
                      </p>
                      <p className="text-swGrey500 font-medium text-sm capitalize">
                        {type}
                      </p>
                    </div>
                    <div className="flex py-1 gap-10">
                      <p className="min-w-[15rem] leading-5 font-medium text-swGrey400">
                        Minimum Interest rate
                      </p>
                      <p className="text-swGrey500 font-medium text-sm">
                        {data?.data?.interestRateRanges[type]?.min}%{" "}
                        {type === "daily"
                          ? "per day"
                          : type === "monthly"
                          ? "per month"
                          : "per annum"}
                      </p>
                    </div>
                    <div className="flex py-1 gap-10">
                      <p className="min-w-[15rem] leading-5 font-medium text-swGrey400">
                        Maximum Interest rate
                      </p>
                      <p className="text-swGrey500 font-medium text-sm">
                        {data?.data?.interestRateRanges[type]?.max}%{" "}
                        {type === "daily"
                          ? "per day"
                          : type === "monthly"
                          ? "per month"
                          : "per annum"}
                      </p>
                    </div>
                    <div className="flex py-1 gap-10">
                      <p className="min-w-[15rem] leading-5 font-medium text-swGrey400">
                        Minimum Investment amount
                      </p>
                      <p className="text-swGrey500 font-medium text-sm">
                        N{" "}
                        {data?.data?.investmentAmountRanges[
                          type
                        ]?.min.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex py-1 gap-10">
                      <p className="min-w-[15rem] leading-5 font-medium text-swGrey400">
                        Maximum Investment amount
                      </p>
                      <p className="text-swGrey500 font-medium text-sm">
                        N{" "}
                        {data?.data?.investmentAmountRanges[
                          type
                        ]?.max.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
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
