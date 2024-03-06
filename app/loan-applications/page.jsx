"use client";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import LoanTable from "../components/loans/LoanTable";

const LoanApplications = () => {
  return (
    <DashboardLayout isBackNav={true} paths={["Loan Applications"]}>
      <p className="italic pl-5 mt-5 text-sm text-swBlue">Loan applications are loans that are disbursed, fully paid and overdue.</p>
      <LoanTable />
    </DashboardLayout>
  );
};

export default LoanApplications;
