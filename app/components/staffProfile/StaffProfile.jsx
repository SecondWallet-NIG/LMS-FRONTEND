"use client";
import { getRoles } from "@/redux/slices/roleSlice";
import { getUserById } from "@/redux/slices/userSlice";
import { getStaffTasks } from "@/redux/slices/userTaskSlice";
import { Inter } from "next/font/google";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import EmployeeBenefitsLogCard from "../cards/Activity logs card/EmployeeBenefitLogCard";
import DashboardLayout from "../dashboardLayout/DashboardLayout";
import { employeeDashboardAuthRoles } from "../helpers/pageAuthRoles";
import Attendance from "./Attendance";
import ClockInDetails from "./ClockInDetails";
import StaffDeptInfo from "./DepartmentInformation";
import LeaveApprovalRequests from "./LeaveApprovalRequests";
import StaffLeaveDetails from "./LeaveDetails";
import LeaveRequests from "./LeaveRequests";
import StaffPersonalDetails from "./PersonalDetails";

const inter = Inter({ subsets: ["latin"] });

const StaffData = ({ path, isDashboard }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [leaveState, setLeaveState] = useState("attendance");
  const [data, setData] = useState(null);

  const btnCls = "px-3 border-b-2 font-medium";
  const activeBtn = "border-swBlue text-swBlue font-semibold";

  useEffect(() => {
    dispatch(getUserById(id))
      .unwrap()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(getRoles());
    dispatch(getStaffTasks(id));
  }, []);
  return (
    <DashboardLayout
      isBackNav={true}
      paths={path}
      roles={employeeDashboardAuthRoles}
    >
      <main className={inter.className}>
        <div className="p-5 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <StaffPersonalDetails data={data?.data} />
            <StaffLeaveDetails
              data={data?.data}
              id={id}
              isDashboard={isDashboard}
            />

            {/* Department information */}
            <StaffDeptInfo data={data?.data} isDashboard={isDashboard} />
            <ClockInDetails data={data?.data} isDashboard={isDashboard} />
          </div>
          <div className="mt-10 mb-5">
            <button
              className={`${btnCls} ${
                leaveState === "attendance" ? activeBtn : "border-transparent"
              }`}
              onClick={() => setLeaveState("attendance")}
            >
              Attendance
            </button>
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
            <button
              className={`${btnCls} ${
                leaveState === "logs" ? activeBtn : "border-transparent"
              }`}
              onClick={() => setLeaveState("logs")}
            >
              Employee Benefits Logs
            </button>
          </div>
          {leaveState === "attendance" && (
            <Attendance isDashboard={isDashboard} />
          )}
          {leaveState === "requests" && <LeaveRequests />}
          {leaveState === "approvals" && <LeaveApprovalRequests />}
          {leaveState === "logs" && <EmployeeBenefitsLogCard />}
        </div>
      </main>
    </DashboardLayout>
  );
};

export default StaffData;
