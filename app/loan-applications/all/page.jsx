"use client";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import LoanTable from "@/app/components/loans/LoanTable";


const AllLoans = () => {

  return (
    <DashboardLayout>
     <LoanTable />
    </DashboardLayout>
  );
};

export default AllLoans;
