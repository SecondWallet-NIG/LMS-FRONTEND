"use client";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import FullyPaidLoanTable from "../components/loans/FullyPaidLoans";


const LoanApplications = () => {
  return (
    <DashboardLayout isBackNav={true}>
      <FullyPaidLoanTable />
    </DashboardLayout>
  );
};

export default LoanApplications;
