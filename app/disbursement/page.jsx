"use client";
import DisbursementCard from "@/app/components/cards/DisbursmentCard/DisbursementCard";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import DisbursedLoans from "../components/loans/DisbursedLoans";
import { disbursementAuthRoles } from "../components/helpers/pageAuthRoles";

const AllDisburments = () => {

  return (
    <DashboardLayout  roles={disbursementAuthRoles}>
      <DisbursementCard />
      <DisbursedLoans />
    </DashboardLayout>
  );
};

export default AllDisburments;
