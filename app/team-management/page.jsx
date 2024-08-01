"use client";
import { useState } from "react";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import TeamManagementCard from "../components/cards/Team management card/TeamManagementCard";

const TeamManagement = () => {
  return (
    <DashboardLayout>
      <div className="mx-5">
        <TeamManagementCard />
        <div className="mt-10 flex justify-between">
          <p className="text-xl font-semibold text-swBlue">Analytics</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeamManagement;
