"use client";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import LoanTable from "../components/loans/LoanTable";

const LoanApplications = () => {
  return (
    <DashboardLayout>
      <LoanTable />
    </DashboardLayout>
  );
};

export default LoanApplications;
