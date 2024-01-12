"use client";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import CenterModal from "@/app/components/modals/CenterModal";
import { formatDate } from "@/helpers";
// import { getAllRepayments } from "@/redux/slices/loanRepaymentSlice";
import { getAllRepaymentHistory } from "@/redux/slices/repaymentHistorySlice";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const PaymentPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [repaymentData, setRepaymentData] = useState({});
  const [openReceipt, setOpenReceipt] = useState(false);
  const { data } = useSelector((state) => state?.repaymentHistory);

  // console.log({ repaymentData: data });
  console.log({ repaymentData });

  useEffect(() => {
    setRepaymentData(data?.results.find((option) => option._id === id));
  }, [data]);

  useEffect(() => {
    dispatch(getAllRepaymentHistory());
  }, []);

  return (
    <DashboardLayout isBackNav={true} paths={["Payment History", "Payment"]}>
      <main className="mx-auto max-w-4xl py-10 px-5">
        <div className="ml-auto flex gap-2 text-sm justify-end font-semibold">
          <div className="flex items-center whitespace-nowrap gap-5">
            <p>Log Status: </p>
            <p
              className={`${
                repaymentData?.status === "New"
                  ? "bg-[#E7F1FE] text-swBlue"
                  : repaymentData?.status === "Approved"
                  ? "bg-green-50 text-swGreen"
                  : "text-red-400 bg-red-100"
              } px-2 py-1 rounded-full  `}
            >
              {repaymentData?.status}
            </p>
          </div>
        </div>

        <div className="flex justify-between mt-5 p-5 border-b">
          <p className="font-semibold text-xl">Payment</p>
        </div>

        <div className="p-5 flex flex-col gap-5 font-500">
          <p className="text-lg font-semibold">payment details</p>
          <div className="flex">
            <p className="min-w-[15rem]">Date Logged</p>
            <p>{formatDate(repaymentData?.createdAt?.slice(0, 10))}</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Loan ID</p>
            <p>SWL-{repaymentData?.loanApplication?.loanId}</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Logged by</p>
            <p>
              {repaymentData?.loggedBy?.firstName}{" "}
              {repaymentData?.loggedBy?.lastName}
            </p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Borrower name</p>
            <p>
              {repaymentData?.loanApplication?.customerId?.firstName}{" "}
              {repaymentData?.loanApplication?.customerId?.lastName}
            </p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Payment method</p>
            <p>{repaymentData?.repaymentMethod}</p>
          </div>
          {repaymentData?.repaymentReceipts?.length > 0 ? (
            <div className="flex">
              <p className="min-w-[15rem]">Receipt</p>
              <p
                className="text-swBlue cursor-pointer"
                onClick={() => setOpenReceipt(true)}
              >
                View receipt
              </p>
              <CenterModal
                isOpen={openReceipt}
                height={"h-[60%]"}
                onClose={() => setOpenReceipt(false)}
              >
                <div className="h-full">
                  <div
                    className="flex justify-end"
                    onClick={() => setOpenReceipt(false)}
                  >
                    <IoMdClose size={20} className="cursor-pointer" />
                  </div>
                  <iframe
                    src={repaymentData?.repaymentReceipts}
                    className="h-full w-full"
                    title="Iframe Example"
                  ></iframe>
                </div>
              </CenterModal>
            </div>
          ) : (
            <div className="flex">
              <p className="min-w-[15rem]">Receipt</p>
              <p>No receipt to show</p>
            </div>
          )}
        </div>
      </main>
    </DashboardLayout>
  );
};

export default PaymentPage;
