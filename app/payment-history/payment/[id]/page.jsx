"use client";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import { PdfViewer, handleFileExtention } from "@/app/components/helpers/utils";
import CenterModal from "@/app/components/modals/CenterModal";
import EditableButton from "@/app/components/shared/editableButtonComponent/EditableButton";
import { formatDate } from "@/helpers";
import {
  approveLoggedPayment,
  declineLoggedPayment,
} from "@/redux/slices/loanRepaymentSlice";
// import { getAllRepayments } from "@/redux/slices/loanRepaymentSlice";
import {
  getAllRepaymentHistory,
  getSingleRepayment,
} from "@/redux/slices/repaymentHistorySlice";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";

// import Viewer from "react-viewer";
const Viewer = dynamic(
  () => import("react-viewer"),
  { ssr: false } // This line is important
);

const PaymentPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // const [repaymentData, setRepaymentData] = useState({});
  const [openReceipt, setOpenReceipt] = useState(false);
  const { data: repaymentData } = useSelector(
    (state) => state?.repaymentHistory
  );
  const [showApprovalBtns, setShowApprovalBtns] = useState(false);
  const [disableApprovalBtn, setDisableApprovalBtn] = useState(false);
  const [userRole, setUserRole] = useState("");

  // console.log({ repaymentData: data });
  console.log({ repaymentData });

  // console.log(
  //   handleFileExtention(
  //     "https://res.cloudinary.com/drzkozm7j/image/upload/v1705177607/staging/jm2ykhblngemsjt7txdk.pdf"
  //   )
  // );

  const approvePayment = (loanId, repaymentId) => {
    setDisableApprovalBtn(true);
    dispatch(approveLoggedPayment({ loanId, repaymentId }))
      .unwrap()
      .then(() => {
        toast.success("Payment approved");
        dispatch(getAllRepaymentHistory());
        setDisableApprovalBtn(false);
        // window.location.reload();
      })
      .catch(() => {
        dispatch(getAllRepaymentHistory());
        toast.error("An error occured");
        setDisableApprovalBtn(false);
      });
  };

  const declinePayment = (loanId, repaymentId) => {
    setDisableApprovalBtn(true);
    dispatch(declineLoggedPayment({ loanId, repaymentId }))
      .unwrap()
      .then(() => {
        toast.success("Payment declined successfully");
        window.location.reload();
      })
      .catch((error) => toast.error("An error occured"));
  };

  // useEffect(() => {
  //   setRepaymentData(data?.results.find((option) => option._id === id));
  // }, [data]);

  useEffect(() => {
    if (
      userRole === "CEO" ||
      userRole === "CTO" ||
      userRole === "CFO" ||
      userRole === "Dir" ||
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
    dispatch(getSingleRepayment(id));
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
                repaymentData?.result.status === "New"
                  ? "bg-[#E7F1FE] text-swBlue"
                  : repaymentData?.result.status === "Approved"
                  ? "bg-green-50 text-swGreen"
                  : "text-red-400 bg-red-100"
              } px-2 py-1 rounded-full  `}
            >
              {repaymentData?.result.status}
            </p>
          </div>
        </div>

        <div className="flex justify-between mt-5 p-5 border-b">
          <p className="font-semibold text-xl">Payment</p>
          {showApprovalBtns ? (
            <div className="flex gap-5">
              {/* <Button
                disabled={repaymentData?.result.status == "New" ? false : true}
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
                disabled={
                  repaymentData?.result.status !== "New"
                    ? true
                    : disableApprovalBtn
                    ? true
                    : false
                }
                onClick={() =>
                  approvePayment(
                    repaymentData?.result.loanApplication._id,
                    repaymentData._id
                  )
                }
              />
              {/* <Button
                variant="danger"
                disabled={repaymentData?.result.status === "New" ? false : true}
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
                disabled={
                  repaymentData?.result.status !== "New"
                    ? true
                    : disableApprovalBtn
                    ? true
                    : false
                }
                onClick={() =>
                  declinePayment(
                    repaymentData?.result.loanApplication._id,
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
            <p>{formatDate(repaymentData?.result.createdAt?.slice(0, 10))}</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Loan ID</p>
            <Link
              href={`/loan-applications/view-loan/${repaymentData?.result.loanApplication?._id}`}
              className="text-swBlue"
            >
              SWL-{repaymentData?.result.loanApplication?.loanId}
            </Link>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Logged by</p>
            <p>
              {repaymentData?.result.loggedBy?.firstName}{" "}
              {repaymentData?.result.loggedBy?.lastName}
            </p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Borrower name</p>
            <p>
              {repaymentData?.result?.customer.firstName}{" "}
              {repaymentData?.result?.customer.lastName}
            </p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Payment method</p>
            <p>{repaymentData?.result.repaymentMethod}</p>
          </div>
          {repaymentData?.result.repaymentReceipts?.length > 0 &&
          repaymentData?.result.repaymentReceipts?.[0] !== "null" ? (
            <div className="flex">
              <p className="min-w-[15rem]">Receipt</p>
              <p
                className="text-swBlue cursor-pointer"
                onClick={() => setOpenReceipt(true)}
              >
                View receipt
              </p>
              {handleFileExtention(
                repaymentData?.result?.repaymentReceipts?.[0]
              ) === "pdf" ? (
                // <p>It's a pdf</p>
                <div
                  className={`h-full w-full fixed top-0 left-0 bg-black bg-opacity-25 ${
                    openReceipt ? "flex" : "hidden"
                  } justify-center items-center text-white z-[110]`}
                >
                  <div className="max-w-3xl w-full h-[70%] m-5 p-5 bg-white">
                    <div className="flex justify-end">
                      <IoMdClose
                        size={20}
                        className="cursor-pointer text-swBlack"
                        onClick={() => setOpenReceipt(false)}
                      />
                    </div>
                    <iframe
                      src={repaymentData?.result?.repaymentReceipts?.[0]}
                      className="h-full w-full"
                    ></iframe>
                  </div>
                </div>
              ) : (
                <>
                  <div
                    className={`h-full w-full fixed top-0 left-0 bg-black bg-opacity-25 ${
                      openReceipt ? "flex" : "hidden"
                    } justify-center items-center text-white z-[110]`}
                  >
                    <div className="max-w-3xl w-full h-[70%] m-5 p-5 bg-white">
                      <div className="flex justify-end">
                        <IoMdClose
                          size={20}
                          className="cursor-pointer text-swBlack"
                          onClick={() => setOpenReceipt(false)}
                        />
                      </div>
                      <iframe
                        src={repaymentData?.result?.repaymentReceipts?.[0]}
                        className="h-full w-full"
                      ></iframe>
                    </div>
                  </div>
                  {typeof window !== "undefined" ? (
                    <>
                      <Viewer
                        visible={openReceipt}
                        onClose={() => {
                          setOpenReceipt(false);
                        }}
                        images={repaymentData?.result?.repaymentReceipts.map(
                          (item) => ({
                            src: item,
                            key: item,
                          })
                        )}
                      />
                    </>
                  ) : null}
                </>
              )}
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
