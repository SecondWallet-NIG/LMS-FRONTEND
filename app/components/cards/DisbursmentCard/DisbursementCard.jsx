"use client"
import { FiArrowUpRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getDisbursementSummary } from "@/redux/slices/loanRepaymentSlice";
import { useEffect } from "react";

const DisbursementCard = ({ _data }) => {
  const dispatch = useDispatch();

  const { loading, error, data } = useSelector((state) => state.loanRepayment);
  useEffect(() => {
    dispatch(getDisbursementSummary());
  }, []);
  return (
    <main className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2 text-sm mt-12 mr-4 ml-4">
 {data && Array.isArray(data?.data) && data?.data?.map((item, index) => (
        <div
          key={index}
          className={`${
            item?.disbursement_type?.includes("Approved")
              ? "border-swBlue text-swBlue"
              : item?.disbursement_type?.includes("Total")
              ? "border-green-600 text-green-600"
              : item?.disbursement_type?.includes("Disbursed")
              ? "border-swGray text-black "
              : "border-red-500 text-red-500"
          } border rounded-lg p-2 w-full`}
        >
          <p className="font-semibold">{item?.disbursement_type}</p>
          <div className="flex justify-between items-center my-5">
            <p className="text-2xl font-semibold">{item?.count}</p>
            <p className="font-semibold">
              &#8358;{" "}
              {item?.amount?.toLocaleString("en-US")}
            </p>
          </div>
          <p
            className={`${
              item?.disbursement_type?.includes("Approved")
                ? "bg-blue-200"
                : item?.disbursement_type?.includes("Total")
                ? "bg-green-100"
                : item?.disbursement_type?.includes("Pending")
                ? "bg-red-100"
                : "bg-swLightGray"
            } w-full flex justify-between items-center text-[0.65rem] px-2 rounded-full`}
          >
            <span>
              {" "}
              {item?.disbursement_no}{" "}
              {item?.disbursement_type?.includes("Approved")
                ? "approvals"
                : item?.disbursement_type?.includes("Total")
                ? "payouts"
                : item?.disbursement_type?.includes("Pending")
                ? "pending payouts"
                : "payouts cancelled"}{" "}
              in 24 hours
            </span>

            <FiArrowUpRight size={13} />
          </p>
        </div>
      ))}
    </main>
  );
};

export default DisbursementCard;
