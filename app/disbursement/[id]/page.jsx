"use client";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import { handleFileExtention } from "@/app/components/helpers/utils";
import { formatDate } from "@/helpers";
import { getDisbursementById } from "@/redux/slices/loanApplicationSlice";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Viewer from "react-viewer";

const Disbursement = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [openReceipt, setOpenReceipt] = useState(false);
  const [openOfferLetter, setOpenOfferLetter] = useState(false);
  const repaymentData = null;
  const { loading, error, data } = useSelector(
    (state) => state.loanApplication
  );
  const roles = [
    "LO",
    "CFO",
    "CEO",
    "CAO",
    "ICO",
    "HRM",
    "COF",
    "LR0",
    "CT0",
    "Dir",
    "System Admin",
  ];

  useEffect(() => {
    dispatch(getDisbursementById(id));
  }, []);

  return (
    <DashboardLayout
      isBackNav={true}
      paths={["Disbursements", "Disbursement"]}
      roles={roles}
    >
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
              href={`/loan-applications/view-loan/${data?.data?._id}`}
              className="text-swBlue"
            >
              SWL-{data?.data?.loanId}
            </Link>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Logged by</p>
            <p>
              {data?.data?.createdBy?.firstName}{" "}
              {data?.data?.createdBy?.lastName}
            </p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Borrower name</p>
            <p>
              {data?.data?.customerId?.firstName}{" "}
              {data?.data?.customerId?.lastName}
            </p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Payment method</p>
            <p>{data?.data?.paymentMethod}</p>
          </div>
          {data?.data?.offerLetter ? (
            <div className="flex">
              <p className="min-w-[15rem]">Offer Letter</p>
              <p
                className="text-swBlue cursor-pointer"
                onClick={() => setOpenOfferLetter(true)}
              >
                View Offer Letter
              </p>
              {handleFileExtention(data?.data?.offerLetter) === "pdf" ? (
                // <p>It's a pdf</p>
                <div
                  className={`h-full w-full fixed top-0 left-0 bg-black bg-opacity-25 ${
                    openOfferLetter ? "flex" : "hidden"
                  } justify-center items-center text-white z-[110]`}
                >
                  <div className="max-w-3xl w-full h-[70%] m-5 p-5 bg-white">
                    <div className="flex justify-end">
                      <IoMdClose
                        size={20}
                        className="cursor-pointer text-swBlack"
                        onClick={() => setOpenOfferLetter(false)}
                      />
                    </div>
                    <iframe
                      src={data?.data?.offerLetter}
                      className="h-full w-full"
                    ></iframe>
                  </div>
                </div>
              ) : (
                <>
                  {typeof window !== "undefined" ? (
                    <>
                      <Viewer
                        visible={openOfferLetter}
                        onClose={() => {
                          setOpenOfferLetter(false);
                        }}
                        images={[data?.data?.offerLetter].map((item) => ({
                          src: item,
                          key: item,
                        }))}
                      />
                    </>
                  ) : null}
                </>
              )}
            </div>
          ) : (
            <div className="flex">
              <p className="min-w-[15rem]">Offer Letter</p>
              <p>No offer letter to show</p>
            </div>
          )}
          {data?.data?.disbursementReceipt ? (
            <div className="flex">
              <p className="min-w-[15rem]">Receipt</p>
              <p
                className="text-swBlue cursor-pointer"
                onClick={() => setOpenReceipt(true)}
              >
                View receipt
              </p>
              {handleFileExtention(data?.data?.disbursementReceipt) ===
              "pdf" ? (
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
                      src={data?.data?.disbursementReceipt}
                      className="h-full w-full"
                    ></iframe>
                  </div>
                </div>
              ) : (
                <>
                  {typeof window !== "undefined" ? (
                    <>
                      <Viewer
                        visible={openReceipt}
                        onClose={() => {
                          setOpenReceipt(false);
                        }}
                        images={[data?.data?.disbursementReceipt].map(
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
