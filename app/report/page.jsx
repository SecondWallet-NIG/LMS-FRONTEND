"use client";
import { useState } from "react";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import InputField from "../components/shared/input/InputField";
import { FiSearch } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import LoanReports from "../components/report/Loan_Reports/Loan_Reports";
import SummaryReport from "../components/report/Summary_Report/SummaryReport";
import { Poppins } from "next/font/google";
import ManagementReport from "../components/report/Management_Report/MangementReport";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const Report = () => {
  const [reportToggle, setReportToggle] = useState("loan");
  const [searchBtn, setSearchBtn] = useState(false);

  const handleSearch = (state) => [
    state === "open" ? setSearchBtn(true) : setSearchBtn(false),
  ];

  const handleReports = (id) => {
    setReportToggle(id);
  };
  return (
    <DashboardLayout>
      <main className="p-5">
        <section
          aria-label="Report toggles"
          className={`flex justify-between items-center font-medium ${poppins.className}`}
        >
          <div className="flex">
            <div
              className={`cursor-pointer py-1 px-4 border-b-2 border-transparent ${
                reportToggle === "loan"
                  ? "text-swBlue border-b-swBlue font-semibold"
                  : "text-swGray"
              }`}
              onClick={() => {
                handleReports("loan");
              }}
            >
              Loan Reports
            </div>
            <div
              className={`cursor-pointer py-1 px-4 border-b-2 border-transparent ${
                reportToggle === "summary"
                  ? "text-swBlue border-b-swBlue font-semibold"
                  : "text-swGray"
              }`}
              onClick={() => {
                handleReports("summary");
              }}
            >
              Summary Reports
            </div>
            <div
              className={`cursor-pointer py-1 px-4 border-b-2 border-transparent ${
                reportToggle === "management"
                  ? "text-swBlue border-b-swBlue font-semibold"
                  : "text-swGray"
              }`}
              onClick={() => {
                handleReports("management");
              }}
            >
              Management Reports
            </div>
          </div>
        </section>

        <section className="my-8">
          {reportToggle === "loan" && <LoanReports />}
          {reportToggle === "summary" && <SummaryReport />}
          {reportToggle === "management" && <ManagementReport />}
        </section>
      </main>
    </DashboardLayout>
  );
};

export default Report;
