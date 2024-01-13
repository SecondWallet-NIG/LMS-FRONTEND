"use client";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import UnpaidRepaymentTable from "../components/repayment/UnpaidRepaymentTable";

const LoanApplications = () => {
  return (
    <DashboardLayout isBackNav={true}>
      <UnpaidRepaymentTable />
    </DashboardLayout>
  );
};

export default LoanApplications;
