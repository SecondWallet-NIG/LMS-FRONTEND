"use client";
import { useState } from "react";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import LoanReports from "../components/report/Loan_Reports/Loan_Reports";
import SummaryReport from "../components/report/Summary_Report/SummaryReport";
import { Poppins } from "next/font/google";
import ManagementReport from "../components/report/Management_Report/MangementReport";
import ExpenseReport from "../components/report/Expense_Report/ExpenseReport";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const Report = () => {
  const [reportToggle, setReportToggle] = useState("loan");
  const [searchBtn, setSearchBtn] = useState(false);
  const selected = 'text-swBlue border-b-swBlue font-semibold'
  const navs = [
    { name: 'Loan Reports', selOption: 'loan' },
    { name: 'Summary Reports', selOption: 'summary' },
    { name: 'Management Reports', selOption: 'management' },
    { name: 'Expense Reports', selOption: 'expense' }
  ]

  const handleReports = (id) => {
    setReportToggle(id);
  };

  return (
    <DashboardLayout>
      <main className="">
        <section
          aria-label="Report toggles"
          className={`text-xs sm:text-base flex justify-between items-center font-medium ${poppins.className}`}
        >
          <div className="flex px-5">
            {navs.map(nav => {
              return (
                <div key={nav.selOption}
                  className={`cursor-pointer py-1 px-4 border-b-2 border-transparent ${reportToggle === nav.selOption
                    ? selected
                    : "text-swGray"
                    }`}
                  onClick={() => {
                    handleReports(nav.selOption);
                  }}
                >
                  {nav.name}
                </div>
              )
            })}
          </div>
        </section>

        <section className="my-8 md:mx-5">
          {reportToggle === "loan" && <LoanReports />}
          {reportToggle === "summary" && <SummaryReport />}
          {reportToggle === "management" && <ManagementReport />}
          {reportToggle === "expense" && <ExpenseReport />}
        </section>
      </main>
    </DashboardLayout>
  );
};

export default Report;