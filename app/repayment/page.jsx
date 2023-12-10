"use client";
import { useState } from "react";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import ReusableDataTable from "../components/shared/tables/ReusableDataTable";

const Repayment = () => {
  const [currentPage, setCurrentPage] = useState("all-repayment");

  const cardData = [
    { repaymentType: "Total repayments", total: 54, amount: 46093090303 },
    { repaymentType: "Upcoming repayments", total: 51, amount: 46093090303 },
    { repaymentType: "Overdue repayments", total: 53, amount: 46093090303 },
  ];

  const header = [
    { id: "dueDate", label: "Due Date" },
    { id: "amountDue", label: "Due Amount" },
    { id: "amountPaid", label: "Amount Paid" },
    { id: "balanceToPay", label: "Balance To Pay" },
    { id: "status", label: "Status" },
    //   { id: "nin", label: "NIN" },
    //   { id: "status", label: "Status" },
  ];

  const customDataTransformer = (apiData) => {
    return apiData?.map((item) => ({
      id: item._id,
      dueDate: (
        <div className="text-md font-[500] text-gray-700">
          {item.dueDate?.slice(0, 10)}
        </div>
      ),
      amountDue: (
        <div className="text-md font-[500] text-gray-700">
          {item?.amountDue}
        </div>
      ),
      amountPaid: (
        <div className="text-md font-[500] text-gray-700">
          {item?.amountPaid}
        </div>
      ),
      balanceToPay: (
        <div className="text-md font-[500] text-gray-700">
          {item?.balanceToPay}
        </div>
      ),
      status: (
        <div className="text-md font-[500] text-gray-700">{item?.status}</div>
      ),
    }));
  };

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

        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {cardData.map((item, index) => (
            <div
              className={`rounded-lg border p-2 ${
                item.repaymentType === "Total repayments"
                  ? "border-blue-200 text-swBlue"
                  : item.repaymentType === "Upcoming repayments"
                  ? "border-green-200 text-swGreen"
                  : "border-red-100 text-swRed"
              }`}
              key={index}
            >
              <p>{item.repaymentType}</p>
              <div
                className={`flex justify-between items-center font-medium mt-5 ${
                  item.repaymentType === "Total repayments"
                    ? "text-swDarkBlue"
                    : item.repaymentType === "Upcoming repayments"
                    ? "text-swDarkGreen"
                    : "text-swDarkRed"
                }`}
              >
                <p className="text-3xl font-semibold">{item.total}</p>
                <p className="font-medium">
                  &#8358; {item.amount.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full">
          <ReusableDataTable
            onClickRow="/loan-application/view-loan"
            headers={header}
            dataTransformer={customDataTransformer}
            initialData={[]}
            apiEndpoint="https://secondwallet-stag.onrender.com/api/repayment"
            // btnText={
            //   <div className="flex gap-1 items-center p-1">
            //     <AiOutlinePlus size={15} />
            //     <p className="hidden lg:block">create borrower</p>
            //   </div>
            // }
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
