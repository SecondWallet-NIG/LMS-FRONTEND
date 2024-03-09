"use client";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import LoanTable from "../components/loans/LoanTable";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

const LoanApplications = () => {
  const [showParagraph, setShowParagraph] = useState(true);

  const handleCloseClick = () => {
    setShowParagraph(false);
  };
  return (
    <DashboardLayout isBackNav={true} paths={["Loan Applications"]}>
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
      <LoanTable />
    </DashboardLayout>
  );
};

export default LoanApplications;
