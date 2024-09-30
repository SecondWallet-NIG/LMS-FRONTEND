"use client";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import { dashboardAuthRoles } from "../components/helpers/pageAuthRoles";
import ActiveLoanTable from "../components/loans/ActiveLoanTable";

const LoanApplications = () => {
  return (
    <DashboardLayout isBackNav={true} roles={dashboardAuthRoles}>
      <ActiveLoanTable />
    </DashboardLayout>
  );
};

export default LoanApplications;
