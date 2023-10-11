"use client";

import React from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";

const CustomerProfile = () => {
  const router = useRouter()
  return (
    <DashboardLayout>
     customer profile
    </DashboardLayout>
  );
};

export default CustomerProfile;
