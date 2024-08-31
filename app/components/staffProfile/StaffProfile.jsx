"use client";
import DashboardLayout from "../dashboardLayout/DashboardLayout";
import { getRoles } from "@/redux/slices/roleSlice";
import { getUserById } from "@/redux/slices/userSlice";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { getStaffTasks } from "@/redux/slices/userTaskSlice";
import StaffPersonalDetails from "./PersonalDetails";
import StaffLeaveDetails from "./LeaveDetails";
import StaffDeptInfo from "./DepartmentInformation";
import LeaveRequests from "./LeaveRequests";
import LeaveApprovalRequests from "./LeaveApprovalRequests";


const StaffData = ({ path, isDashboard }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [leaveState, setLeaveState] = useState("requests");
  const { data, loading } = useSelector((state) => state.user);

  const btnCls = "px-3 border-b-2 font-medium";
  const activeBtn = "border-swBlue text-swBlue";


  useEffect(() => {
    dispatch(getUserById(id));
    dispatch(getRoles());
    dispatch(getStaffTasks(id));
  }, []);
  return (
    <DashboardLayout isBackNav={true} paths={path}>
      <main>
        <div className="p-2.5 sm:p-2.5">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 lg gap-5">
            {/* Personal details */}
            <StaffPersonalDetails data={data?.data} />

            {/*Leave details */}
            <StaffLeaveDetails
              data={data?.data}
              id={id}
              isDashboard={isDashboard}
            />

            {/* Department information */}
            <StaffDeptInfo data={data?.data} />
          </div>
          <div className="mt-10 mb-5">
            <button
              className={`${btnCls} ${
                leaveState === "requests" ? activeBtn : "border-transparent"
              }`}
              onClick={() => setLeaveState("requests")}
            >
              Leave Requests
            </button>
            <button
              className={`${btnCls} ${
                leaveState === "approvals" ? activeBtn : "border-transparent"
              }`}
              onClick={() => setLeaveState("approvals")}
            >
              Leave Approval Requests
            </button>
          </div>
          {leaveState === "requests" && <LeaveRequests />}
          {leaveState === "approvals" && <LeaveApprovalRequests />}
        </div>
      </main>
    </DashboardLayout>
  );
};

export default StaffData;
