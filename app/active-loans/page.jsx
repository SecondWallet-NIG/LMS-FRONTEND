"use client";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import ActiveLoanTable from "../components/loans/ActiveLoanTable";

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
      <ActiveLoanTable />
    </DashboardLayout>
  );
};

export default LoanApplications;
