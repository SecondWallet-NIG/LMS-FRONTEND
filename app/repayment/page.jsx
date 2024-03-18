"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import ReusableDataTable from "../components/shared/tables/ReusableDataTable";
import { getRepaymentSummary } from "@/redux/slices/loanRepaymentSlice";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "@/helpers";
import RepaymentOverdueTable from "../components/repayment/OverdueTable";

const Repayment = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState("overdue-repayment");
  const { loading, error, data } = useSelector((state) => state.loanRepayment);

  const header = [
    { id: "loanId", label: "Loan ID" },
    { id: "dueDate", label: "Due Date" },
    { id: "borrower", label: "Borrower's Name" },
    { id: "repaymentNumber", label: "Loan Repayment No" },
    { id: "amountDue", label: "Due Amount" },
    { id: "amountPaid", label: "Amount Paid" },
    { id: "balanceToPay", label: "Balance To Pay" },
    { id: "status", label: "Status" },
  ];

  const customDataTransformer = (apiData) => {
    return apiData?.map((item) => ({
      id: item?.loanApplication?._id,
      loanId: (
        <div className="text-md font-[500] text-gray-700">
          SWL - {item?.loanApplication?.loanId}
        </div>
      ),
      borrower: (
        <div className="text-md font-[500] text-gray-700">
          {item?.loanApplication?.customerId?.firstName}{" "}
          {item?.loanApplication?.customerId?.lastName}
        </div>
      ),
      repaymentNumber: (
        <div className="text-md font-[500] text-gray-700">
          {item?.repaymentNumber}
        </div>
      ),
      dueDate: (
        <div className="text-md font-[500] text-gray-700">
          {formatDate(item?.dueDate?.slice(0, 10))}
        </div>
      ),
      amountDue: (
        <div className="text-md font-[500] text-gray-700">
          ₦ {item?.amountDue?.toLocaleString() || 0}
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
              : item.status === "Overdue"
              ? "bg-swIndicatorLightRed text-white text-xs font-normal px-2 py-1 rounded-full"
              : item.status === "Fully paid"
              ? "bg-swGreen text-white text-xs font-normal px-2 py-1 rounded-full"
              : "bg-[#F8A9A3] text-white"
          } px-2 py-1 rounded-full`}
        >
          {item?.status === "Fully paid" ? "Paid" : item?.status}
        </button>
      ),
    }));
  };
  useEffect(() => {
    setCurrentPage("overdue-repayment");
    dispatch(getRepaymentSummary());
  }, []);

  return (
    <DashboardLayout>
      <main>
        {/* <div className="flex">
          <p
            className={` border-b-2  px-6 py-2 cursor-pointer ${
              currentPage === "overdue-repayment"
                ? "text-swBlue border-b-swBlue font-medium"
                : "border-transparent"
            }`}
            onClick={() => setCurrentPage("overdue-repayment")}
          >
            This Month Repayment
          </p>
          <p
            className={`border-b-2 px-6 py-2 cursor-pointer ${
              currentPage === "all-repayment"
                ? "text-swBlue border-swBlue font-medium"
                : "border-transparent"
            } `}
            onClick={() => setCurrentPage("all-repayment")}
          >
            All Repayment
          </p>
        </div> */}

        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {data &&
            data?.data?.map((item, index) => (
              <div
                onClick={() => {
                  item?.loanTypeTitle === "Total Repayments"
                    ? setCurrentPage("all-repayment")
                    : item?.loanTypeTitle === "Upcoming Repayments"
                    ? setCurrentPage("overdue-repayment")
                    : item?.loanTypeTitle === "Fully Paid Repayments"
                    ? setCurrentPage("fully-paid-repayment")
                    : item?.loanTypeTitle === "Overdue Repayments"
                    ? setCurrentPage("overdue")
                    : null;

                    
                }}
                className={`rounded-lg border p-2  hover:bg-swLightGray cursor-pointer ${
                  item?.loanTypeTitle === "Total Repayments"
                    ? "border-blue-200 text-swBlue"
                    : item?.loanTypeTitle === "Fully Paid Repayments"
                    ? "border-green-200 text-swGreen"
                    : "border-red-100 text-swIndicatorLightRed"
                } ${currentPage === item.loanTypeTitle ? "bg-gray-200" : ""}`}
                key={index}
              >
                <p>{item.loanTypeTitle}</p>
                <div
                  className={`flex justify-between items-center font-medium mt-5 ${
                    item?.loanTypeTitle === "Total Repayments"
                      ? "text-swDarkBlue"
                      : item?.loanTypeTitle === "Fully Paid Repayments"
                      ? "text-swDarkGreen"
                      : "text-swDarkRed"
                  }`}
                >
                  <p className="text-3xl font-semibold">
                    {item?.totalRepayment}
                  </p>
                  <p className="font-medium">
                    &#8358; {item?.amount?.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
        </div>
        <>

        
        </>
        {currentPage === "overdue-repayment" && (
          <div className="w-full">
            <div className="mt-4 mb-4 ml-4 text-swDarkRed">Upcoming Repayments (This Month Repayment)</div>
            {/* <RepaymentOverdueTable /> */}
            <ReusableDataTable
              // filterParams={[
              //   { name: "Unpaid" },
              //   { name: "Fully paid" },
              //   { name: "Overdue" },
              // ]}
              headers={header}
              dataTransformer={customDataTransformer}
              initialData={[]}
              apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/repayment/per-month`}
              btnTextClick={() => {
                router.push("/create-borrower");
              }}
              filters={true}
              pagination={true}
              onClickRow={"/loan-applications/view-loan"}
              // role={"Overdue"}
            />
          </div>
        )}
        {currentPage === "overdue" && (
          <div className="w-full">
            {/* <RepaymentOverdueTable /> */}
            <div className="mt-4 mb-4 ml-4 text-swIndicatorLightRed">Overdue Repayments</div>
            <ReusableDataTable
              headers={header}
              dataTransformer={customDataTransformer}
              initialData={[]}
              apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/repayment`}
              btnTextClick={() => {
                router.push("/create-borrower");
              }}
              filters={true}
              pagination={true}
              onClickRow={"/loan-applications/view-loan"}
              role={"Overdue"}
            />
          </div>
        )}
        {currentPage === "fully-paid-repayment" && (
          
          <div className="w-full">
              <div className="mt-4 mb-4 ml-4 text-swDarkGreen">Fully Paid Repayment</div>
            {/* <RepaymentOverdueTable /> */}
            <ReusableDataTable
              headers={header}
              dataTransformer={customDataTransformer}
              initialData={[]}
              apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/repayment`}
              btnTextClick={() => {
                router.push("/create-borrower");
              }}
              filters={true}
              pagination={true}
              onClickRow={"/loan-applications/view-loan"}
              role={"Fully paid"}
            />
          </div>
        )}

        {currentPage === "all-repayment" && (
          <div className="w-full">
              <div className="mt-4 mb-4 ml-4 text-swBlue">All Repayments</div>
            <ReusableDataTable
              filterParams={[
                { name: "Unpaid" },
                { name: "Fully paid" },
                { name: "Overdue" },
              ]}
              headers={header}
              dataTransformer={customDataTransformer}
              initialData={[]}
              apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/repayment`}
              btnTextClick={() => {
                router.push("/create-borrower");
              }}
              filters={true}
              pagination={true}
              onClickRow={"/loan-applications/view-loan"}
            />
          </div>
        )}
      </main>
    </DashboardLayout>
  );
};

export default Repayment;
