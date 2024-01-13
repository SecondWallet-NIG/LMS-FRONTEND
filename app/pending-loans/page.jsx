"use client";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import LoanTable from "../components/loans/LoanTable";
import PendingLoanTable from "../components/loans/PendingLoanTable";

const LoanApplications = () => {
  return (
    <DashboardLayout isBackNav={true}>
      <PendingLoanTable />
    </DashboardLayout>
  );
};

export default LoanApplications;
