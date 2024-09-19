"use client";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import LoanTable from "../components/loans/LoanTable";
import PendingLoanTable from "../components/loans/PendingLoanTable";

const LoanApplications = () => {
  const roles = [
    "LO",
    "CFO",
    "CEO",
    "CAO",
    "ICO",
    "COF",
    "LR0",
    "CT0",
    "HRM",
    "Dir",
    "System Admin",
  ];

  return (
    <DashboardLayout isBackNav={true} roles={roles}>
      <PendingLoanTable />
    </DashboardLayout>
  );
};

export default LoanApplications;
