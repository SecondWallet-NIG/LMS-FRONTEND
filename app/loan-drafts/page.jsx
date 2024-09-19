"use client";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import LoanDraftTable from "../components/loans/LoanDraftTable";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

const LoanDraftApplications = () => {
  const [showParagraph, setShowParagraph] = useState(true);
  const roles = [
    "LO",
    "CFO",
    "CEO",
    "CAO",
    "ICO",
    "COF",
    "HRM",
    "LR0",
    "CT0",
    "Dir",
    "System Admin",
  ];

  const handleCloseClick = () => {
    setShowParagraph(false);
  };
  return (
    <DashboardLayout isBackNav={true} paths={["Loan Drafts"]} roles={roles}>
      {showParagraph && (
        <div className="flex justify-between rounded bg-swLightBlueIndcatorBg p-3 m-5">
          <p className="italic text-sm text-swBlue">
            Draft Loans are loans that are Pending, In progress, Declined and
            Ready for disbursal.
          </p>
          <AiOutlineClose
            className="cursor-pointer"
            onClick={handleCloseClick}
            color="red"
          />
        </div>
      )}
      <LoanDraftTable />
    </DashboardLayout>
  );
};

export default LoanDraftApplications;
