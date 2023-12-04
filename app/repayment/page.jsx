"use client";
import { useState } from "react";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";

const Repayment = () => {
  const [currentPage, setCurrentPage] = useState("all-repayment");

  const cardData = [
    { repaymentType: "Total repayments", total: 54, amount: 46093090303 },
    { repaymentType: "Upcoming repayments", total: 51, amount: 46093090303 },
    { repaymentType: "Overdue repayments", total: 53, amount: 46093090303 },
  ];
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
      </main>
    </DashboardLayout>
  );
};

export default Repayment;
