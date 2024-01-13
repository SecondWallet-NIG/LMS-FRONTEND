"use client";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import CenterModal from "@/app/components/modals/CenterModal";
import EditableButton from "@/app/components/shared/editableButtonComponent/EditableButton";
import { formatDate } from "@/helpers";
import {
  approveLoggedPayment,
  declineLoggedPayment,
} from "@/redux/slices/loanRepaymentSlice";
// import { getAllRepayments } from "@/redux/slices/loanRepaymentSlice";
import { getAllRepaymentHistory } from "@/redux/slices/repaymentHistorySlice";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [repaymentData, setRepaymentData] = useState({});
  const [openReceipt, setOpenReceipt] = useState(false);
  const { data } = useSelector((state) => state?.repaymentHistory);
  const [showApprovalBtns, setShowApprovalBtns] = useState(false);
  const [userRole, setUserRole] = useState("");

  // console.log({ repaymentData: data });
  console.log({ repaymentData });

  const approvePayment = (loanId, repaymentId) => {
    dispatch(approveLoggedPayment({ loanId, repaymentId }))
      .unwrap()
      .then(() => {
        toast.success("Payment approved");
        dispatch(getAllRepaymentHistory());
        // window.location.reload();
      })
      .catch(() => {
        dispatch(getAllRepaymentHistory());
        toast.error("An error occured");
      });
  };

  const declinePayment = (loanId, repaymentId) => {
    dispatch(declineLoggedPayment({ loanId, repaymentId }))
      .unwrap()
      .then(() => {
        toast.success("Payment declined successfully");
        window.location.reload();
      })
      .catch((error) => toast.error("An error occured"));
  };

  useEffect(() => {
    setRepaymentData(data?.results.find((option) => option._id === id));
  }, [data]);

  useEffect(() => {
    if (
      userRole === "CEO" ||
      userRole === "CTO" ||
      userRole === "CFO" ||
      userRole === "DIR" ||
      userRole === "SYSTEM ADMIN"
    ) {
      setShowApprovalBtns(true);
    }
  }, [userRole]);

  useEffect(() => {
    const _user = JSON.parse(localStorage.getItem("user"));
    if (_user) {
      setUserRole(_user?.data?.user?.role?.tag);
    }
    dispatch(getAllRepaymentHistory());
  }, []);

  return (
    <DashboardLayout isBackNav={true} paths={["Payment History", "Payment"]}>
      <ToastContainer />
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
          {showApprovalBtns ? (
            <div className="flex gap-5">
              {/* <Button
                disabled={repaymentData?.status == "New" ? false : true}
                onClick={() => {
                  approvePayment(item?.loanApplication._id, item._id);
                }}
                className="bg-swBlue text-white text-xs font-normal px-2 py-1  px-2 py-1 rounded rounded-md"
              >
                Approve
              </Button> */}
              <EditableButton
                blueBtn={true}
                label={"Approve"}
                disabled={repaymentData?.status === "New" ? false : true}
                onClick={() =>
                  approvePayment(
                    repaymentData?.loanApplication._id,
                    repaymentData._id
                  )
                }
              />
              {/* <Button
                variant="danger"
                disabled={repaymentData?.status === "New" ? false : true}
                onClick={() => {
                  declinePayment(item?.loanApplication._id, item._id);
                }}
                className="bg-red-400 text-white text-xs font-normal px-2 py-1  px-2 py-1 rounded rounded-md"
              >
                Decline
              </Button> */}
              <EditableButton
                redBtn={true}
                label={"Decline"}
                disabled={repaymentData?.status === "New" ? false : true}
                onClick={() =>
                  declinePayment(
                    repaymentData?.loanApplication._id,
                    repaymentData._id
                  )
                }
              />
            </div>
          ) : null}
        </div>

        <div className="p-5 flex flex-col gap-5 font-500">
          <p className="text-lg font-semibold">payment details</p>
          <div className="flex">
            <p className="min-w-[15rem]">Date Logged</p>
            <p>{formatDate(repaymentData?.createdAt?.slice(0, 10))}</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Loan ID</p>
            <Link
              href={`/loan-applications/view-loan/${repaymentData?.loanApplication?._id}`}
              className="text-swBlue"
            >
              SWL-{repaymentData?.loanApplication?.loanId}
            </Link>
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
          {repaymentData?.repaymentReceipts?.length > 0 &&
          repaymentData?.repaymentReceipts?.[0] !== "null" ? (
            <div className="flex">
              <p className="min-w-[15rem]">Receipt</p>
              <p
                className="text-swBlue cursor-pointer"
                onClick={() => setOpenReceipt(true)}
              >
                View receipt
              </p>
              <div
                className={`fixed top-0 left-0 ${
                  openReceipt ? "flex" : "hidden"
                } items-center justify-center w-screen h-screen bg-black bg-opacity-50 z-[110]`}
              >
                <div className="h-[60%] max-w-xl">
                  <div
                    className="flex justify-end"
                    onClick={() => setOpenReceipt(false)}
                  >
                    <IoMdClose size={20} className="cursor-pointer" />
                  </div>
                  <div className="h-full w-fit relative">
                    {/* <iframe
                    src={repaymentData?.repaymentReceipts}
                    className="h-full w-full"
                    title="Iframe Example"
                  ></iframe> */}
                    <Image
                      src={repaymentData?.repaymentReceipts?.[0]}
                      fill
                      alt="receipt"
                    />
                  </div>
                </div>
              </div>
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
