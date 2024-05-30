"use client";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import { useParams } from "next/navigation";

const SavedLoan = () => {
  const param = useParams();
  return (
    <DashboardLayout>
      <div className="p-5">Loan {param.id}</div>
    </DashboardLayout>
  );
};

export default SavedLoan;
