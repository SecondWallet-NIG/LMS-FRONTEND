"use client";
import DashboardLayout from "../dashboardLayout/DashboardLayout";
import { getRoles } from "@/redux/slices/roleSlice";
import { getUserById } from "@/redux/slices/userSlice";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getStaffTasks } from "@/redux/slices/userTaskSlice";
import dynamic from "next/dynamic";
import StaffPersonalDetails from "./PersonalDetails";
import StaffLeaveDetails from "./LeaveDetails";
import StaffDeptInfo from "./DepartmentInformation";
import LeaveRequests from "./LeaveRequests";
import LeaveApprovalRequests from "./LeaveApprovalRequests";

// import Viewer from "react-viewer";
const Viewer = dynamic(() => import("react-viewer"), { ssr: false });

const StaffData = ({ path, isDashboard }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [profileImg, setProfileImg] = useState(null);
  const [leaveState, setLeaveState] = useState("requests");
  const { data, loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    profilePicture: null,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "",
    tag: null,
    status: "",
    isRoleAdmin: false,
  });

  const btnCls = "px-3 border-b-2 font-medium";
  const activeBtn = "border-swBlue text-swBlue";

  useEffect(() => {
    setFormData({
      profilePicture: null,
      firstName: data?.data?.user?.firstName,
      lastName: data?.data?.user?.lastName,
      email: data?.data?.user?.email,
      phoneNumber: data?.data?.user?.phoneNumber,
      role: data?.data?.user?.role?._id,
      tag: data?.data?.user?.role?.tag,
      status: data?.data?.user?.status,
      isRoleAdmin: false,
      profilePicture: data?.data?.user?.profilePicture,
    });
  }, [data]);

  useEffect(() => {
    if (
      formData?.profilePicture !== null &&
      formData?.profilePicture &&
      (formData?.profilePicture instanceof Blob ||
        formData?.profilePicture instanceof File)
    ) {
      try {
        setProfileImg(URL.createObjectURL(formData.profilePicture));
      } catch (error) {
        console.error("Error creating object URL:", error);
      }
    } else {
      // Handle cases where the selected file is not a Blob or File
      console.error("Invalid file type selected.");
    }
  }, [formData?.profilePicture]);

    useEffect(() => {
        dispatch(getUserById(id));
        dispatch(getRoles());
        dispatch(getStaffTasks(id));
    }, []);
    return (
        <DashboardLayout
            isBackNav={true}
            paths={path}
        >
            <ToastContainer />
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
            <StaffDeptInfo />
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
