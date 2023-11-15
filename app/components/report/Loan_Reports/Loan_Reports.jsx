import { useState } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import BorrowersReport from "./Borrowers_Report";
import LoanReport from "./Loan_Report";
import LoanArrearsAgingReport from "./Loan_Arrears_Report";
import RepaymentReport from "./Repayment_Report";
import CollectorReport from "./Collector_Report";
import DisbursementReport from "./Disbursement_Report";

const LoanReports = () => {
  const [loanToggle, setLoanToggle] = useState("borrowers");

  const handleLoanToggle = (state) => {
    setLoanToggle(state);
  };
  return (
    <main className="flex gap-5 text-swTextColor">
      <section className="w-[23rem] flex flex-col gap-2">
        <p
          className={`${
            loanToggle === "borrowers" && "text-swBlue font-semibold"
          } p-2 w-full rounded-md cursor-pointer hover:bg-swLightGray flex justify-between items-center`}
          onClick={() => {
            handleLoanToggle("borrowers");
          }}
        >
          Borrowers Report
          {loanToggle === "borrowers" && (
            <IoMdArrowDropright className="text-swGray" size={20} />
          )}
        </p>
        <p
          className={`${
            loanToggle === "loan" && "text-swBlue font-semibold"
          } p-2 w-full rounded-md cursor-pointer hover:bg-swLightGray flex justify-between items-center`}
          onClick={() => {
            handleLoanToggle("loan");
          }}
        >
          Loan Report
          {loanToggle === "loan" && (
            <IoMdArrowDropright className="text-swGray" size={20} />
          )}
        </p>
        <p
          className={`${
            loanToggle === "loan arrears" && "text-swBlue font-semibold"
          } p-2 w-full rounded-md cursor-pointer hover:bg-swLightGray flex justify-between items-center whitespace-nowrap`}
          onClick={() => {
            handleLoanToggle("loan arrears");
          }}
        >
          Loan Arrears Aging Report
          {loanToggle === "loan arrears" && (
            <IoMdArrowDropright className="text-swGray" size={20} />
          )}
        </p>
        <p
          className={`${
            loanToggle === "repayment" && "text-swBlue font-semibold"
          } p-2 w-full rounded-md cursor-pointer hover:bg-swLightGray flex justify-between items-center`}
          onClick={() => {
            handleLoanToggle("repayment");
          }}
        >
          Repayment Report
          {loanToggle === "repayment" && (
            <IoMdArrowDropright className="text-swGray" size={20} />
          )}
        </p>
        <p
          className={`${
            loanToggle === "collector" && "text-swBlue font-semibold"
          } p-2 w-full rounded-md cursor-pointer hover:bg-swLightGray flex justify-between items-center`}
          onClick={() => {
            handleLoanToggle("collector");
          }}
        >
          Collector Report
          {loanToggle === "collector" && (
            <IoMdArrowDropright className="text-swGray" size={20} />
          )}
        </p>
        <p
          className={`${
            loanToggle === "disbursement" && "text-swBlue font-semibold"
          } p-2 w-full rounded-md cursor-pointer hover:bg-swLightGray flex justify-between items-center`}
          onClick={() => {
            handleLoanToggle("disbursement");
          }}
        >
          Disbursement Report
          {loanToggle === "disbursement" && (
            <IoMdArrowDropright className="text-swGray" size={20} />
          )}
        </p>
      </section>
      <section className="w-full">
        {loanToggle === "borrowers" && <BorrowersReport />}
        {loanToggle === "loan" && <LoanReport />}
        {loanToggle === "loan arrears" && <LoanArrearsAgingReport />}
        {loanToggle === "repayment" && <RepaymentReport />}
        {loanToggle === "collector" && <CollectorReport />}
        {loanToggle === "disbursement" && <DisbursementReport />}
      </section>
    </main>
  );
};

export default LoanReports;
