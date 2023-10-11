"use client";
import { useState } from "react";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import Staffs from "../components/team management comps/Staffs";
import Roles from "../components/team management comps/Roles";
import CenterModal from "../components/modals/CenterModal";

const TeamManagement = () => {
  const [staffsPage, setStaffsPage] = useState(true);

  const handleStaffsPageToggle = () => {
    setStaffsPage(true);
  };
  const handleRolesPageToggle = () => {
    setStaffsPage(false);
  };

  return (
    <DashboardLayout>
      <main>
        <div className="p-2">
          <span
            className={`border-b p-3 cursor-pointer ${
              staffsPage
                ? "border-b-swBlue font-semibold text-swBlue"
                : "border-b-transparent"
            }`}
            onClick={handleStaffsPageToggle}
          >
            Staffs
          </span>
          <span
            className={`border-b p-3 cursor-pointer ${
              !staffsPage
                ? "border-b-swBlue font-semibold text-swBlue"
                : "border-b-transparent"
            }`}
            onClick={handleRolesPageToggle}
          >
            Roles
          </span>
        </div>

        {/* Staffs page */}
        {staffsPage && <Staffs />}

        {/* Roles page */}
        {!staffsPage && <Roles />}
      </main>
    </DashboardLayout>
  );
};

export default TeamManagement;
