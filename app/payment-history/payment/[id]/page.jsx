"use client";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import { PdfViewer, handleFileExtention } from "@/app/components/helpers/utils";
import CenterModal from "@/app/components/modals/CenterModal";
import EditableButton from "@/app/components/shared/editableButtonComponent/EditableButton";
import { formatDate } from "@/helpers";
import {
  approveLoggedPayment,
  declineLoggedPayment,
  getApprovalJobStatus,
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
import { paymentHystoryAuthRoles } from "@/app/components/helpers/pageAuthRoles";

// import Viewer from "react-viewer";
const Viewer = dynamic(
  () => import("react-viewer"),
  { ssr: false } // This line is important
);

const PaymentPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [repaymentData, setRepaymentData] = useState(null);
  const [openReceipt, setOpenReceipt] = useState(false);
  // const { data: repaymentData } = useSelector(
  //   (state) => state?.repaymentHistory
  // );
  console.log({ repaymentData });
  const [showApprovalBtns, setShowApprovalBtns] = useState(false);
  const [disableApprovalBtn, setDisableApprovalBtn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [approvalJob, setApprovalJob] = useState(null);
  const [approvalJobPollId, setApprovalJobPollId] = useState(null);

  const getRepayment = () => {
    dispatch(getSingleRepayment(id))
      .unwrap()
      .then((res) => {
        setRepaymentData(res);
      })
      .catch((err) => console.log(err));
  };

  const approvePayment = async (loanId, repaymentId) => {
    setDisableApprovalBtn(true);
    dispatch(approveLoggedPayment({ loanId, repaymentId }))
      .unwrap()
      .then((res) => {
        if (res?.async && res?.jobId) {
          toast.info("Rebuilding ledger for backdated approval...");
          setApprovalJob({ jobId: res.jobId, status: "queued", progress: { percent: 0 } });

          const pollId = setInterval(() => {
            dispatch(getApprovalJobStatus({ jobId: res.jobId }))
              .unwrap()
              .then((jobRes) => {
                setApprovalJob(jobRes);
                const status = jobRes?.status;
                if (status === "completed") {
                  clearInterval(pollId);
                  setApprovalJobPollId(null);
                  setDisableApprovalBtn(false);
                  toast.success("Payment approved and ledger rebuilt");
                  setApprovalJob(null);
                  getRepayment();
                }
                if (status === "failed") {
                  clearInterval(pollId);
                  setApprovalJobPollId(null);
                  setDisableApprovalBtn(false);
                  toast.error(jobRes?.error || "Ledger rebuild failed");
                }
              })
              .catch((err) => {
                clearInterval(pollId);
                setApprovalJobPollId(null);
                setDisableApprovalBtn(false);
                toast.error(err?.message || "Failed to track approval job");
              });
          }, 1500);

          setApprovalJobPollId(pollId);
          return;
        }

        toast.success("Payment approved");
        setDisableApprovalBtn(false);
        getRepayment();
      })
      .catch((err) => {
        dispatch(getAllRepaymentHistory());
        toast.error(err?.message);
        setDisableApprovalBtn(false);
        console.log(err);
      });
  };

  const declinePayment = (loanId, repaymentId) => {
    setDisableApprovalBtn(true);
    dispatch(declineLoggedPayment({ loanId, repaymentId }))
      .unwrap()
      .then(() => {
        toast.success("Payment declined successfully");
        // dispatch(getSingleRepayment(id));
        // setTimeout(() => {
        //   window.location.reload();
        // }, 3000);
        getRepayment();
      })
      .catch((error) => {
        toast.error("An error occured");
      });
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
      userRole === "FO" ||
      userRole === "System Admin"
    ) {
      setShowApprovalBtns(true);
    }
  }, [userRole]);

  useEffect(() => {
    const _user = JSON.parse(localStorage.getItem("user"));
    if (_user) {
      setUserRole(_user?.data?.user?.role?.tag);
    }
    getRepayment();
  }, []);

  useEffect(() => {
    return () => {
      if (approvalJobPollId) {
        clearInterval(approvalJobPollId);
      }
    };
  }, [approvalJobPollId]);

  return (
    <DashboardLayout
      isBackNav={true}
      paths={["Payment History", "Payment"]}
      roles={paymentHystoryAuthRoles}
    >
      <ToastContainer />
      {approvalJob?.jobId ? (
        <CenterModal open={true} setOpen={() => {}}>
          <div className="w-full max-w-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-lg font-semibold text-swBlue">Approving backdated payment</p>
                <p className="mt-1 text-sm text-gray-600">
                  Rebuilding loan ledger. This can take a moment for older loans.
                </p>
              </div>
              <button
                type="button"
                className="text-gray-400 cursor-not-allowed"
                aria-label="Close disabled while processing"
                disabled
              >
                <IoMdClose size={18} />
              </button>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Status: {approvalJob?.status || "running"}</span>
                <span>{approvalJob?.progress?.percent ?? 0}%</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                <div
                  className="h-2 rounded-full bg-swBlue transition-all"
                  style={{ width: `${approvalJob?.progress?.percent ?? 0}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-gray-500">
                {approvalJob?.progress?.stage ? `Stage: ${approvalJob.progress.stage}` : null}
              </p>
            </div>
          </div>
        </CenterModal>
      ) : null}
      <main className="mx-auto max-w-4xl py-10 px-5">
        <div className="ml-auto flex gap-2 text-sm justify-end font-semibold">
          <div className="flex items-center whitespace-nowrap gap-5">
            <p>Log Status: </p>
            <p
              className={`${
                repaymentData?.result?.status === "New"
                  ? "bg-[#E7F1FE] text-swBlue"
                  : repaymentData?.result?.status === "Approved"
                  ? "bg-green-50 text-swGreen"
                  : "text-red-400 bg-red-100"
              } px-2 py-1 rounded-full  `}
            >
              {repaymentData?.result?.status}
            </p>
          </div>
        </div>

        <div className="flex justify-between mt-5 p-5 border-b">
          <p className="font-semibold text-xl">Payment Details</p>
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
                  repaymentData?.result?.status !== "New"
                    ? true
                    : disableApprovalBtn
                    ? true
                    : false
                }
                onClick={() =>
                  approvePayment(
                    repaymentData?.result?.loanApplication?._id,
                    id
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
                  repaymentData?.result?.status !== "New"
                    ? true
                    : disableApprovalBtn
                    ? true
                    : false
                }
                onClick={() =>
                  declinePayment(repaymentData?.result?.loanApplication._id, id)
                }
              />
            </div>
          ) : null}
        </div>

        <div className="p-5 flex flex-col gap-5 font-500">
          {/* <p className="text-lg font-semibold text-swBlue">payment details</p> */}
          <div className="flex">
            <p className="min-w-[15rem]  text-swBlue">Borrower name</p>
            <p className="capitalize">
              {repaymentData?.result?.customer?.firstName}{" "}
              {repaymentData?.result?.customer?.lastName}
            </p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]  text-swBlue">Amount Logged</p>
            <p>₦ {repaymentData?.result?.amountLogged?.toLocaleString()}</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem] text-swBlue">Date Logged</p>
            <p>{formatDate(repaymentData?.result?.createdAt?.slice(0, 10))}</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]  text-swBlue">Customer Payment Date</p>
            <p>
              {formatDate(repaymentData?.result?.dateCollected?.slice(0, 10))}
            </p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]  text-swBlue">Loan ID</p>
            <Link
              href={`/loan-applications/view-loan/${repaymentData?.result?.loanApplication?._id}`}
              className="text-swBlue"
            >
              SWL-{repaymentData?.result?.loanApplication?.loanId}
            </Link>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]  text-swBlue">Logged by</p>
            <p>
              {repaymentData?.result?.loggedBy?.firstName}{" "}
              {repaymentData?.result?.loggedBy?.lastName}
            </p>
          </div>

          <div className="flex">
            <p className="min-w-[15rem]  text-swBlue ">Payment method</p>
            <p>{repaymentData?.result?.repaymentMethod}</p>
          </div>
          {repaymentData?.result?.repaymentReceipts?.length > 0 &&
          repaymentData?.result?.repaymentReceipts?.[0] !== "null" ? (
            <div className="flex">
              <p className="min-w-[15rem] text-swBlue">Receipt</p>
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
              <p className="min-w-[15rem] text-swBlue">Receipt</p>
              <p>No receipt to show</p>
            </div>
          )}
          <div className="flex">
            <p className="min-w-[15rem]  text-swBlue ">Clear Balance</p>
            <p className="capitalize">
              {repaymentData?.result?.clearBalance === true ? "true" : "false"}
            </p>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default PaymentPage;
