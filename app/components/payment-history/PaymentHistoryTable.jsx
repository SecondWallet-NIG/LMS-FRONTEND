"use client";
import { useState, useEffect } from "react";
import ReusableDataTable from "../shared/tables/ReusableDataTable";
import { formatDate } from "@/helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  approveLoggedPayment,
  declineLoggedPayment,
} from "@/redux/slices/loanRepaymentSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../shared/buttonComponent/Button";
import { useRouter } from "next/navigation";

const PaymentHistoryTable = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState("");

  useEffect(() => {
    const userRoleTag = JSON.parse(localStorage.getItem("user"))?.data?.user
      ?.role?.tag;
    console.log({ userRoleTag });
    if (userRoleTag) {
      console.log("hello");
      setUser(userRoleTag);
    }
  }, []);

  const userRoleTag = JSON.parse(localStorage.getItem("user"))?.data?.user?.role
    ?.tag;
  console.log({ userRoleTag });
  if (userRoleTag) {
    console.log("hello");
  }

  const router = useRouter();
  const approvePayment = (loanId, repaymentId) => {
    dispatch(approveLoggedPayment({ loanId, repaymentId }))
      .unwrap()
      .then(() => {
        toast.success("Payment approved");
        window.location.reload();
      })
      .catch(() => toast.error("An error occured"));
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

  const header = [
    { id: "createdAt", label: "Date Logged" },
    { id: "loggedBy", label: "Logged By" },
    { id: "customerInfo", label: "Customer Info & Amount" },
    { id: "repaymentMethod", label: "Repayment Method & Loan ID" },
    { id: "status", label: "Log Status" },
    { id: "approvalBtn", label: "" },
  ];

  const customDataTransformer = (apiData) => {
    return apiData?.map((item) => ({
      id: item._id,
      createdAt: (
        <div className="text-md font-[500] text-gray-700">
          {formatDate(item?.createdAt?.slice(0, 10))}
        </div>
      ),
      loggedBy: (
        <div>
          <div className="text-md font-[500] text-gray-700">
            {item?.loggedBy === null ? "NIL" : item?.loggedBy?.firstName}{" "}
            {item?.loggedBy === null ? "NIL" : item?.loggedBy?.lastName}
          </div>
          <div className="text-sm font-[500] text-gray-700">
            {" "}
            {item?.loggedBy === null ? "NIL" : item?.loggedBy?.email}
          </div>
        </div>
      ),
      customerInfo: (
        <div className="">
          <div className="text-md font-[500] text-gray-700">
            {item?.loanApplication.customerId.firstName}{" "}
            {item?.loanApplication.customerId.lastName}
          </div>
          <div className="text-md font-[500] text-gray-700">
            ₦ {item?.amountLogged.toLocaleString()}
          </div>
        </div>
      ),
      amountLogged: (
        <div className="text-md font-[500] text-gray-700">
          ₦ {item?.amountLogged.toLocaleString() || 0}
        </div>
      ),
      repaymentMethod: (
        <div>
          <div className="text-md font-[500] text-gray-700">
            {item?.repaymentMethod}
          </div>
          <div
            className="text-md font-[500] text-swBlue underline"
            onClick={() => {
              router.push(
                `/loan-applications/view-loan/${item?.loanApplication._id}`
              );
            }}
          >
            SWL - {item?.loanApplication.loanId}
          </div>
        </div>
      ),
      status: (
        <button
          className={`${
            item.status === "New"
              ? "bg-[#E7F1FE] text-swBlue text-xs font-normal px-2 py-1 rounded-full"
              : item.status === "Approved"
              ? "bg-green-50 text-swGreen"
              : "text-red-400 bg-red-100"
          } px-2 py-1 rounded-full`}
        >
          {item?.status}
        </button>
      ),

      approvalBtn: (
        <div>
          {userRoleTag && userRoleTag === "CFO" ? (
            <div className="flex gap-5">
              <Button
                disabled={item.status == "New" ? false : true}
                onClick={() => {
                  approvePayment(item?.loanApplication._id, item._id);
                }}
                className="bg-swBlue text-white text-xs font-normal px-2 py-1  px-2 py-1 rounded rounded-md"
              >
                Approve
              </Button>
              <Button
                variant="danger"
                disabled={item.status === "New" ? false : true}
                onClick={() => {
                  declinePayment(item?.loanApplication._id, item._id);
                }}
                className="bg-red-400 text-white text-xs font-normal px-2 py-1  px-2 py-1 rounded rounded-md"
              >
                Decline
              </Button>
            </div>
          ) : null}
        </div>
      ),
    }));
  };

  return (
    <main>
      <div className="w-full">
        <ReusableDataTable
          filterParams={[
            { name: "New" },
            { name: "Approved" },
            { name: "Declined" },
          ]}
          headers={header}
          dataTransformer={customDataTransformer}
          onClickRow={"/payment-history/payment/"}
          initialData={[]}
          apiEndpoint="https://secondwallet-stag.onrender.com/api/repayment/payment-history-all"
          filters={true}
          pagination={true}
        />
      </div>
    </main>
  );
};

export default PaymentHistoryTable;
