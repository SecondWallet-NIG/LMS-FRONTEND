import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import ReusableDataTable from "../shared/tables/ReusableDataTable";
import { convertDateToISOWithAddedHour, leaveTypes } from "../helpers/utils";
import {
  adminLeaveAction,
  approveLeaveRequest,
  declineLeaveRequest,
} from "@/redux/slices/hrmsSlice";

const LeaveApprovalRequests = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentUser, setCurrentUser] = useState({ id: "", role: "" });
  const canExecutiveManageLeave = ["CEO", "CTO", "Dir", "MD"].includes(
    currentUser?.role
  );

  const headers = [
    { id: "createdAt", label: "Date Requested" },
    { id: "staff", label: "Staff" },
    { id: "leaveType", label: "Leave Type" },
    { id: "startDate", label: "Start Date" },
    { id: "endDate", label: "endDate" },
    { id: "leaveDuration", label: "Duration" },
    { id: "reliever", label: "Reliever" },
    { id: "status", label: "Status" },
    { id: "actions", label: "Actions" },
  ];

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setCurrentUser({
        id: storedUser?.data?.user?._id || "",
        role: storedUser?.data?.user?.role?.tag || "",
      });
    }
  }, []);

  const refreshTable = () => setRefreshKey((prev) => prev + 1);

  const handleApprove = async (leaveId, approvalLevel, event) => {
    event.stopPropagation();
    try {
      await dispatch(
        approveLeaveRequest({
          leaveId,
          approverId: currentUser.id,
          approvalLevel,
        })
      ).unwrap();
      refreshTable();
    } catch (error) {
      window.alert(error?.message || "Failed to approve leave request");
    }
  };

  const handleDecline = async (leaveId, approvalLevel, event) => {
    event.stopPropagation();
    const declineReason = window.prompt("Enter reason for declining this leave:");
    if (!declineReason) return;

    try {
      await dispatch(
        declineLeaveRequest({
          leaveId,
          approverId: currentUser.id,
          approvalLevel,
          declineReason,
        })
      ).unwrap();
      refreshTable();
    } catch (error) {
      window.alert(error?.message || "Failed to decline leave request");
    }
  };

  const handleAdminAction = async (leaveId, action, event) => {
    event.stopPropagation();
    const note = window.prompt(`Add an optional note for ${action}:`, "");
    if (note === null) return;

    try {
      await dispatch(
        adminLeaveAction({
          leaveId,
          payload: { action, note },
        })
      ).unwrap();
      refreshTable();
    } catch (error) {
      window.alert(error?.message || `Failed to ${action} leave request`);
    }
  };

  const customDataTransformer = (apiData) => {
    const groupedRequests = new Map();

    (apiData?.leaveRequests || []).forEach((item) => {
      const leaveId = item?.leaveDetails?._id;
      if (!leaveId) return;

      const existing = groupedRequests.get(leaveId) || {
        leaveDetails: item?.leaveDetails,
        approvals: {},
      };

      existing.approvals[item?.approvalLevel] = item;
      groupedRequests.set(leaveId, existing);
    });

    return Array.from(groupedRequests.values()).map(
      ({ leaveDetails, approvals }) => {
        const firstApproval = approvals[1];
        const secondApproval = approvals[2];
        const activeApproval =
          leaveDetails?.status !== "Pending"
            ? null
            : firstApproval?.status === "Pending"
            ? firstApproval
            : secondApproval?.status === "Pending"
            ? secondApproval
            : null;
        const canApproveOrDecline =
          !!activeApproval &&
          (activeApproval?.userId === currentUser?.id || canExecutiveManageLeave);

        return {
          id: leaveDetails?._id,
      createdAt: (
        <div className="text-[15px] font-light text-gray-700">
          {leaveDetails?.createdAt &&
            convertDateToISOWithAddedHour(leaveDetails?.createdAt)?.slice(
              0,
              10
            )}
        </div>
      ),
      staff: (
        <div>
          <div className="text-[15px] font-light text-gray-700">
            <div className="text-[15px] font-light text-gray-700">
              {leaveDetails?.userDetails?.lastName}{" "}
              {leaveDetails?.userDetails?.firstName}
            </div>
            <div className="text-[15px] font-light text-gray-700">
              {leaveDetails?.userDetails?.email}
            </div>
          </div>
        </div>
      ),
      leaveType: (
        <div>
          <div className="text-[15px] font-light text-gray-700">
            {
              leaveTypes?.find((e) => e?.id === leaveDetails?.leaveType)
                ?.label
            }
          </div>
        </div>
      ),
      startDate: (
        <div>
          <div className="text-[15px] font-light text-gray-700">
            {leaveDetails?.startDate &&
              convertDateToISOWithAddedHour(
                leaveDetails?.startDate
              )?.slice(0, 10)}
          </div>
        </div>
      ),
      endDate: (
        <div>
          <div className="text-[15px] font-light text-gray-700">
            {leaveDetails?.endDate &&
              convertDateToISOWithAddedHour(leaveDetails?.endDate)?.slice(
                0,
                10
              )}
          </div>
        </div>
      ),
      leaveDuration: (
        <div>
          <div className="text-[15px] font-light text-gray-700 whitespace-nowrap">
            {leaveDetails?.leaveDuration} working day(s)
          </div>
        </div>
      ),
      reliever: (
        <div>
          <div className="text-[15px] font-light text-gray-700">
            {leaveDetails?.reliever?.lastName} {leaveDetails?.reliever?.firstName}
          </div>
          <div className="text-[15px] font-light text-gray-700">
            {leaveDetails?.reliever?.email}
          </div>
        </div>
      ),
      status: (
        <div>
          <div
            className={`border p-1 text-xs rounded-md flex gap-1 items-center justify-center w-fit ${
              leaveDetails?.status === "Pending"
                ? "border-swBlue bg-blue-100"
                : leaveDetails?.status === "Approved"
                ? "border-green-500 bg-green-100"
                : "border-red-500 bg-red-100"
            }`}
          >
            <div
              className={` ${
                leaveDetails?.status === "Pending"
                  ? "h-1 w-1 rounded-full bg-swBlue"
                  : leaveDetails?.status === "Approved"
                  ? "h-1 w-1 rounded-full bg-green-500"
                  : "h-1 w-1 rounded-full bg-red-500"
              }`}
            />
            {leaveDetails?.status}
          </div>
        </div>
      ),
      actions: (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={(event) => {
              event.stopPropagation();
              router.push(`/employee-dashboard/view-leave/${leaveDetails?._id}`);
            }}
            className="rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-700"
          >
            View
          </button>
          {canApproveOrDecline ? (
            <>
              <button
                onClick={(event) =>
                  handleApprove(leaveDetails?._id, activeApproval?.approvalLevel, event)
                }
                className="rounded-md bg-swBlue px-2 py-1 text-xs text-white"
              >
                Approve
              </button>
              <button
                onClick={(event) =>
                  handleDecline(leaveDetails?._id, activeApproval?.approvalLevel, event)
                }
                className="rounded-md bg-red-50 px-2 py-1 text-xs text-red-600"
              >
                Decline
              </button>
            </>
          ) : null}
          {canExecutiveManageLeave && leaveDetails?.status === "Pending" ? (
            <>
              <button
                onClick={(event) =>
                  handleAdminAction(leaveDetails?._id, "cancel", event)
                }
                className="rounded-md border border-gray-400 px-2 py-1 text-xs text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={(event) =>
                  handleAdminAction(leaveDetails?._id, "terminate", event)
                }
                className="rounded-md bg-black px-2 py-1 text-xs text-white"
              >
                Terminate
              </button>
            </>
          ) : null}
        </div>
      ),
        };
      }
    );
  };

  return (
    <div className="flex justify-between items-center">
      <ReusableDataTable
        key={refreshKey}
        dataTransformer={customDataTransformer}
        apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/leave/approval/request/${id}`}
        onClickRow={"/employee-dashboard/view-leave/"}
        initialData={[]}
        headers={headers}
        filters={true}
        pagination={true}
        // btnText={
        //   <div
        //     className="flex gap-1 items-center p-1"
        //     onClick={() => {
        //       router.push("/team-management/staff/add-new");
        //     }}
        //   >
        //     <AiOutlinePlus size={15} />
        //     <p className="hidden lg:block">Add New Staff</p>
        //   </div>
        // }
      />
    </div>
  );
};

export default LeaveApprovalRequests;
