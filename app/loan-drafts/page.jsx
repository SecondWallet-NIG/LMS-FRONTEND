"use client";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import LoanDraftTable from "../components/loans/LoanDraftTable";

const LoanDraftApplications = () => {
  return (
    <DashboardLayout isBackNav={true} paths={["Loan Drafts"]}>
      <p className="italic pl-5 mt-5 text-sm text-swBlue">Draft Loans are loans that are Pending ,In progress ,Declined and Ready for disbursal.</p>
      <LoanDraftTable />
    </DashboardLayout>
  );
};

export default LoanDraftApplications;
