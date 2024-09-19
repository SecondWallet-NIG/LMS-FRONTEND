"use client";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import FullyPaidLoanTable from "../components/loans/FullyPaidLoans";

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
      <FullyPaidLoanTable />
    </DashboardLayout>
  );
};

export default LoanApplications;
