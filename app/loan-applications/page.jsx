"use client";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import LoanTable from "../components/loans/LoanTable";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { loanApplicationAuthRoles } from "../components/helpers/pageAuthRoles";

const LoanApplications = () => {
  const [showParagraph, setShowParagraph] = useState(true);

  const handleCloseClick = () => {
    setShowParagraph(false);
  };

  return (
    <DashboardLayout
      isBackNav={true}
      paths={["Loan Applications"]}
      roles={loanApplicationAuthRoles}
    >
      {showParagraph && (
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
      )}
      <LoanTable />
    </DashboardLayout>
  );
};

export default LoanApplications;
