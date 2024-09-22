"use client";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import { dashboardAuthRoles } from "../components/helpers/pageAuthRoles";
import LoanTable from "../components/loans/LoanTable";
import PendingLoanTable from "../components/loans/PendingLoanTable";

const LoanApplications = () => {

  return (
    <DashboardLayout isBackNav={true} roles={dashboardAuthRoles}>
      <PendingLoanTable />
    </DashboardLayout>
  );
};

export default LoanApplications;
