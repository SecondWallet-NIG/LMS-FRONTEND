"use client";
import DisbursementCard from "@/app/components/cards/DisbursmentCard/DisbursementCard";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import DisbursedLoans from "../components/loans/DisbursedLoans";

const AllDisburments = () => {
  return (
    <DashboardLayout>
      <DisbursementCard />
      <DisbursedLoans />
    </DashboardLayout>
  );
};

export default AllDisburments;
