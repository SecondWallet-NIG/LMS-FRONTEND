"use client";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import EditableButton from "@/app/components/shared/editableButtonComponent/EditableButton";
import { formatDate } from "@/helpers";
import { getDisbursementById } from "@/redux/slices/loanApplicationSlice";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

const Disbursement = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const repaymentData = null;
  const { loading, error, data } = useSelector(
    (state) => state.loanApplication
  );
  console.log({ data: data?.data   });

  useEffect(() => {
    dispatch(getDisbursementById(id));
  }, []);

  return (
    <DashboardLayout isBackNav={true} paths={["Disbursements", "Disbursement"]}>
      <ToastContainer />
      <main className="mx-auto max-w-4xl py-10 px-5">
        <div className="ml-auto flex gap-2 text-sm justify-end font-semibold">
          <div className="flex items-center whitespace-nowrap gap-5">
            <p>Log Status: </p>
            <p
              className={`${
                data?.data?.status === "New"
                  ? "bg-[#E7F1FE] text-swBlue"
                  : data?.data?.status === "Approved"
                  ? "bg-green-50 text-swGreen"
                  : data?.data?.status === "Disbursed"
                  ? "bg-swBlue text-white"
                  : "text-red-400 bg-red-100"
              } px-2 py-1 rounded-full  `}
            >
              {data?.data?.status}
            </p>
          </div>
        </div>

        <div className="flex justify-between mt-5 p-5 border-b">
          <p className="font-semibold text-xl">Disbursement</p>
        </div>

        <div className="p-5 flex flex-col gap-5 font-500">
          <p className="text-lg font-semibold">Disbursement details</p>
          <div className="flex">
            <p className="min-w-[15rem]">Disbursement Date</p>
            <p>{formatDate(data?.data?.createdAt?.slice(0, 10))}</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Loan ID</p>
            <Link
              href={`/loan-applications/view-loan/${data?.data?.loanId}`}
              className="text-swBlue"
            >
              SWL-{data?.data?.loanId}
            </Link>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Logged by</p>
            <p>
              {repaymentData?.result?.loggedBy?.firstName}{" "}
              {repaymentData?.result?.loggedBy?.lastName}
            </p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Borrower name</p>
            <p>
              {repaymentData?.result?.customer?.firstName}{" "}
              {repaymentData?.result?.customer?.lastName}
            </p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Payment method</p>
            <p>{repaymentData?.result.repaymentMethod}</p>
          </div>
          {repaymentData?.result?.repaymentReceipts?.length > 0 &&
          repaymentData?.result?.repaymentReceipts?.[0] !== "null" ? (
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

export default Disbursement;
