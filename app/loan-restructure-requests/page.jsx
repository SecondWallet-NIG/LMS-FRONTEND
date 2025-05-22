"use client";
import { useState } from "react";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import { loanApplicationAuthRoles } from "../components/helpers/pageAuthRoles";
import LoanRestructureTable from "../components/loans/LoanRestructureTable";

export default function LoanRestructureRequest() {
  const [showParagraph, setShowParagraph] = useState(true);

  const handleCloseClick = () => {
    setShowParagraph(false);
  };
  return (
    <DashboardLayout
      isBackNav={true}
      paths={["Loan Restructure Requests"]}
      roles={loanApplicationAuthRoles}
    >
      {/* {showParagraph && (
        <div className="flex justify-between rounded bg-swLightBlueIndcatorBg p-3 m-5">
          <p className="italic text-sm text-swBlue">
            Loan applications are loans that has been disbursed, overdue and
            fully paid
          </p>
          <AiOutlineClose
            className="cursor-pointer"
            onClick={handleCloseClick}
            color="red"
          />
        </div>
      )} */}

      <LoanRestructureTable />
    </DashboardLayout>
  );
}
