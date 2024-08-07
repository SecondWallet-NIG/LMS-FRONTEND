"use client";
import { useState } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import LoanOfficerReport from "./LoanOfficerReport";
import LoanProductsReport from "./LoanProductsReport";
import FeeReport from "./FeeReport";

const ManagementReport = () => {
  const [dateFilterOpen, setDateFilterOpen] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  const fetchSummaryByDate = () => {
    if (dateRange && dateRange.length > 0) {
      if (
        dateRange[0].startDate instanceof Date &&
        dateRange[0].endDate instanceof Date
      ) {
        const startDate = dateRange[0].startDate.toISOString();
        const endDate = dateRange[0].endDate.toISOString();
        const data = {
          startDate,
          endDate,
        };
        dispatch(getLoanApplicationSummary(data));
        setDateFilterOpen(false);
      }
    }
  };

  const toggleDateFilter = () => {
    setDateFilterOpen(!dateFilterOpen);
  };
  const [reportToggle, setReportToggle] = useState("loan-officer");

  const handleLoanToggle = (state) => {
    setReportToggle(state);
  };

  return (
    <main className="flex flex-col sm:flex-row gap-5 text-swTextColor">
      <section className="md:w-1/5 flex flex-row sm:flex-col gap-2 overflow-auto text-xs sm:text-base p-5">
        <p
          className={`${
            reportToggle === "loan-officer" && "text-swBlue font-semibold"
          } p-2 w-full rounded-md cursor-pointer hover:bg-swLightGray flex justify-between items-center`}
          onClick={() => {
            handleLoanToggle("loan-officer");
          }}
        >
          Loan Officer Report
          {reportToggle === "loan-officer" && (
            <IoMdArrowDropright className="text-swGray" size={20} />
          )}
        </p>
        <p
          className={`${
            reportToggle === "loan-products" && "text-swBlue font-semibold"
          } p-2 w-full rounded-md cursor-pointer hover:bg-swLightGray flex justify-between items-center`}
          onClick={() => {
            handleLoanToggle("loan-products");
          }}
        >
          Loan Products Report
          {reportToggle === "loan-products" && (
            <IoMdArrowDropright className="text-swGray" size={20} />
          )}
        </p>
        <p
          className={`${
            reportToggle === "fee" && "text-swBlue font-semibold"
          } p-2 w-full rounded-md cursor-pointer hover:bg-swLightGray flex justify-between items-center whitespace-nowrap`}
          onClick={() => {
            handleLoanToggle("fee");
          }}
        >
          Fee Report
          {reportToggle === "fee" && (
            <IoMdArrowDropright className="text-swGray" size={20} />
          )}
        </p>
      </section>

      <section className="md:w-4/5">
        {reportToggle === "loan-officer" && <LoanOfficerReport />}
        {reportToggle === "loan-products" && <LoanProductsReport />}
        {reportToggle === "fee" && <FeeReport />}
      </section>
    </main>
  );
};

export default ManagementReport;
