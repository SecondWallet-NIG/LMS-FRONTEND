"use client";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import { dashboardAuthRoles } from "../components/helpers/pageAuthRoles";
import FullyPaidLoanTable from "../components/loans/FullyPaidLoans";

const LoanApplications = () => {
  return (
    <DashboardLayout isBackNav={true} roles={dashboardAuthRoles}>
      <FullyPaidLoanTable />
    </DashboardLayout>
  );
};

export default LoanApplications;
