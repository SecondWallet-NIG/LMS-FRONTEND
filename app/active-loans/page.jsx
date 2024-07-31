"use client";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import ActiveLoanTable from "../components/loans/ActiveLoanTable";

const LoanApplications = () => {
  return (
    <DashboardLayout isBackNav={true}>
      <ActiveLoanTable />
    </DashboardLayout>
  );
};

export default LoanApplications;
