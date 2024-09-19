"use client";
import DisbursementCard from "@/app/components/cards/DisbursmentCard/DisbursementCard";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import DisbursedLoans from "../components/loans/DisbursedLoans";

const AllDisburments = () => {
  const roles = [
    "LO",
    "CFO",
    "CEO",
    "CAO",
    "ICO",
    "HRM",
    "COF",
    "LR0",
    "CT0",
    "Dir",
    "System Admin",
  ];
  return (
    <DashboardLayout roles={roles}>
      <DisbursementCard />
      <DisbursedLoans />
    </DashboardLayout>
  );
};

export default AllDisburments;
