"use client";
import DisbursementCard from "@/app/components/cards/DisbursmentCard/DisbursementCard";
import ReusableDataTable from "@/app/components/shared/tables/ReusableDataTable.jsx";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import DisbursedLoans from "../components/loans/DisbursedLoans";

const AllDisburments = () => {

  return (
    <DashboardLayout>
    <DisbursedLoans />
    </DashboardLayout>
  );
};

export default AllDisburments;
