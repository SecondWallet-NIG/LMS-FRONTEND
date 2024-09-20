"use client";

import "react-toastify/dist/ReactToastify.css";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import AllStaffsTable from "@/app/components/team management comps/AllStaffsTable";
import { useState } from "react";
import AllStaffsAttendanceTable from "@/app/components/team management comps/AllStaffsAttendanceTable";

const StaffDataPage = () => {
  const [pageState, setPageState] = useState("all staffs");

  const btnCls = "px-3 border-b-2 font-medium";
  const activeBtn = "border-swBlue text-swBlue";

  return (
    <DashboardLayout isBackNav={true} paths={["Team Management", "Staff"]}>
      <div className="">
        <div className="p-5">
          <button
            className={`${btnCls} ${
              pageState === "all staffs" ? activeBtn : "border-transparent"
            }`}
            onClick={() => setPageState("all staffs")}
          >
            All Staffs
          </button>
          <button
            className={`${btnCls} ${
              pageState === "attendance" ? activeBtn : "border-transparent"
            }`}
            onClick={() => setPageState("attendance")}
          >
            Staff Attendance
          </button>
        </div>
        {pageState === "all staffs" && <AllStaffsTable />}
        {pageState === "attendance" && <AllStaffsAttendanceTable />}
      </div>
    </DashboardLayout>
  );
};

export default StaffDataPage;
