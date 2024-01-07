"use client";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import ActiveLoanTable from "../components/loans/ActiveLoanTable";
import LoanTable from "../components/loans/LoanTable";

const LoanApplications = () => {
  return (
    <DashboardLayout isBackNav={true}>
      <ActiveLoanTable />
    </DashboardLayout>
  );
};

export default LoanApplications;
