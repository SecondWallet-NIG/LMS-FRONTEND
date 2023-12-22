"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import ReusableDataTable from "../components/shared/tables/ReusableDataTable";
import { getRepaymentSummary } from "@/redux/slices/loanRepaymentSlice";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "@/helpers";

const Repayment = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState("all-repayment");
  const { loading, error, data } = useSelector((state) => state.loanRepayment);


  const header = [
    { id: "loanId", label: "Loan ID" },
    { id: "dueDate", label: "Due Date" },
    { id: "repaymentNumber", label: "Loan Repayment No" },
    { id: "amountDue", label: "Due Amount" },
    { id: "amountPaid", label: "Amount Paid" },
    { id: "balanceToPay", label: "Balance To Pay" },
    { id: "status", label: "Status" },
  ];

  const customDataTransformer = (apiData) => {
    return apiData?.map((item) => ({
      id: item._id,
      loanId: (
        <div className="text-md font-[500] text-gray-700">
          {item?.loanApplication?.loanId}
        </div>
      ),
      repaymentNumber: (
        <div className="text-md font-[500] text-gray-700">
          {item?.repaymentNumber}
        </div>
      ),
      dueDate: (
        <div className="text-md font-[500] text-gray-700">
          {formatDate(item.dueDate?.slice(0, 10))}
        </div>
      ),
      amountDue: (
        <div className="text-md font-[500] text-gray-700">
         ₦ {item?.amountDue.toLocaleString()|| 0} 
        </div>
      ),
      amountPaid: (
        <div className="text-md font-[500] text-gray-700">
         ₦ {item?.amountPaid?.toLocaleString() || 0} 
        </div>
      ),
      balanceToPay: (
        <div className="text-md font-[500] text-gray-700">
         ₦ {item?.balanceToPay?.toLocaleString() || 0} 
        </div>
      ),
      status: (
        <button
          className={`${
            item.status === "Unpaid"
              ? "bg-[#E7F1FE] text-swBlue text-xs font-normal px-2 py-1 rounded-full"
              : "bg-[#F8A9A3] text-white"
          } px-2 py-1 rounded-full`}
        >
          {item.status}
        </button>
      ),
    }));
  };
  useEffect(() => {
    dispatch(getRepaymentSummary());
  }, []);

  return (
    <DashboardLayout>
      <main>
        <div className="flex">
          <p
            className={`border-b-2 px-6 py-2 cursor-pointer ${
              currentPage === "all-repayment"
                ? "text-swBlue border-swBlue font-medium"
                : "border-transparent"
            } `}
            onClick={() => setCurrentPage("all-repayment")}
          >
            All repayment
          </p>
          <p
            className={` border-b-2  px-6 py-2 cursor-pointer ${
              currentPage === "overdue-repayment"
                ? "text-swBlue border-b-swBlue font-medium"
                : "border-transparent"
            }`}
            onClick={() => setCurrentPage("overdue-repayment")}
          >
            Overdue repayment
          </p>
        </div>

        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {data && data?.data?.map((item, index) => (
            <div
              className={`rounded-lg border p-2 ${
                item?.loanTypeTitle === "Total Repayments"
                  ? "border-blue-200 text-swBlue"
                  : item?.loanTypeTitle === "Upcoming Repayments"
                  ? "border-green-200 text-swGreen"
                  : "border-red-100 text-swIndicatorLightRed"
              }`}
              key={index}
            >
              <p>{item.loanTypeTitle}</p>
              <div
                className={`flex justify-between items-center font-medium mt-5 ${
                  item?.loanTypeTitle === "Total Repayments"
                    ? "text-swDarkBlue"
                    : item?.loanTypeTitle === "Upcoming Repayments"
                    ? "text-swDarkGreen"
                    : "text-swDarkRed"
                }`}
              >
                <p className="text-3xl font-semibold">{item?.countLast24hr}</p>
                <p className="font-medium">
                  &#8358; {item?.amount?.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full">
          <ReusableDataTable
            headers={header}
            dataTransformer={customDataTransformer}
            initialData={[]}
            apiEndpoint="https://secondwallet-stag.onrender.com/api/repayment"
            btnTextClick={() => {
              router.push("/create-borrower");
            }}
            filters={true}
            pagination={true}
          />
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Repayment;
