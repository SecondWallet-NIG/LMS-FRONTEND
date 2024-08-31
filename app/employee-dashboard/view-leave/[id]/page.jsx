"use client";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  approveLeaveRequest,
  declineLeaveRequest,
  getSingleLeaveRequest,
} from "@/redux/slices/hrmsSlice";
import SharedInvestmentModal from "@/app/components/modals/Investments/SharedInvestmentModal";
import SuccessModal from "@/app/components/modals/SuccessModal";
import CancelModal from "@/app/components/modals/CancelModal";
import { leaveTypes } from "@/app/components/helpers/utils";
import EditableButton from "@/app/components/shared/editableButtonComponent/EditableButton";

const ViewSingleLeaveRequest = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [user, setUser] = useState({ role: "", id: "" });
  const [showEditBtn, setShowEditBtn] = useState(false);
  const [approvalModal, setApprovalModal] = useState(false);
  const [successModal, setSuccessModal] = useState({
    state: false,
    title: "",
    description: "",
  });
  const [declineModal, setDeclineModal] = useState({
    state: false,
    reason: "",
  });
  const [errorModal, setErrorModal] = useState({
    state: false,
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const { data } = useSelector((state) => state.hrms) || [];
  const level_1_id =
    data?.data?.approvalDetails?.firstApproval?.approverDetails?._id;
  const level_2_id =
    data?.data?.approvalDetails?.secondApproval?.approverDetails?._id;

  useEffect(() => {
    const _user = JSON.parse(localStorage.getItem("user"));
    if (_user) {
      setUser({
        role: _user?.data?.user?.role?.tag,
        id: _user?.data?.user?._id,
      });
    }
    dispatch(getSingleLeaveRequest(id));
  }, []);

  useEffect(() => {
    if (
      user.role === "CEO" ||
      user.role === "CTO" ||
      user.role === "CFO" ||
      user.role === "Dir" ||
      user.role === "System Admin"
    ) {
      setShowEditBtn(true);
    }
  }, [user.role]);

  const handleApprove = () => {
    setLoading(true);
    const payload = {
      leaveId: id,
      approverId: user.id,
      approvalLevel:
        user.id === level_1_id &&
        user.id === level_2_id &&
        data?.data?.approvalDetails?.firstApproval?.status === "Approved"
          ? 2
          : user.id === level_1_id
          ? 1
          : 2,
    };
    dispatch(approveLeaveRequest(payload))
      .unwrap()
      .then((res) => {
        setApprovalModal(false);
        dispatch(getSingleLeaveRequest(id));
        setSuccessModal({
          title: "Leave Approval Successful",
          description: "Leave has been approved successfully",
          state: true,
        });
        setLoading(false);
      })
      .catch((err) => {
        setErrorModal({
          title: "Leave Approval Failed",
          description: err?.message,
          state: true,
        });
        setApprovalModal(false);
        setLoading(false);
      });
  };

  const handleDecline = () => {
    setLoading(true);
    const payload = {
      leaveId: id,
      approverId: user.id,
      approvalLevel:
        user.id === level_1_id &&
        user.id === level_2_id &&
        (data?.data?.approvalDetails?.firstApproval?.status === "Declined" ||
          data?.data?.approvalDetails?.firstApproval?.status === "Approved")
          ? 2
          : user.id === level_1_id
          ? 1
          : 2,
      declineReason: declineModal.reason,
    };
    dispatch(declineLeaveRequest(payload))
      .unwrap()
      .then((res) => {
        setDeclineModal({ state: false, reason: "" });
        dispatch(getSingleLeaveRequest(id));
        setSuccessModal({
          title: "Leave Decline Successful",
          description: "Leave has been declined successfully",
          state: true,
        });
        setLoading(false);
      })
      .catch((err) => {
        setDeclineModal({ state: false, reason: "" });
        setErrorModal({
          title: "Leave Decline Failed",
          description: err?.message,
          state: true,
        });
        setLoading(false);
      });
  };

  const approveHtml = (
    <div className="p-5">
      <p className="text-center py-5 text-lg font-medium">
        Are You sure You Want To Approve?
      </p>
      <div className="flex gap-5 mt-10">
        <EditableButton
          redBtn={true}
          label={"No, Cancel"}
          className={"w-full"}
          onClick={() => setApprovalModal(false)}
        />
        <EditableButton
          blueBtn={true}
          label={"Yes, Approve"}
          onClick={handleApprove}
          className={"w-full"}
          disabled={loading}
        />
      </div>
    </div>
  );

  const declineHtml = (
    <div className="p-5">
      <div className="">
        <p className="text-sm">
          Reason <span className="text-red-500">*</span>
        </p>
        <textarea
          placeholder={"Enter reason for declining"}
          value={declineModal.reason}
          onChange={(e) =>
            setDeclineModal({ ...declineModal, reason: e.target.value })
          }
          rows={3}
          className="w-full focus:outline-none border border-gray-300 rounded-md p-3"
        ></textarea>
      </div>
      <div className="flex gap-5 mt-10">
        <EditableButton
          redBtn={true}
          label={"Cancel"}
          className={"w-full"}
          onClick={() => setDeclineModal({ state: false, reason: "" })}
        />
        <EditableButton
          blueBtn={true}
          label={"Decline"}
          onClick={handleDecline}
          className={"w-full"}
          disabled={loading}
        />
      </div>
    </div>
  );

  const renderStatus = (status) => {
    let classNames =
      "border p-1 text-xs rounded-md flex gap-1 items-center justify-center ";
    let dotClass = "h-1 w-1 rounded-full ";
    switch (status) {
      case "Pending":
        classNames += "border-swBlue text-swBlue bg-blue-100";
        dotClass += "bg-swBlue";
        break;
      case "Approved":
        classNames += "border-green-500 bg-green-100";
        dotClass += "bg-green-500";
        break;
      default:
        classNames += "border-red-500 bg-red-100";
        dotClass += "bg-red-500";
        break;
    }
    return (
      <div className={classNames}>
        <div className={dotClass} />
        {status}
      </div>
    );
  };

  console.log({ data });

  return (
    <DashboardLayout
      isBackNav={true}
      paths={["Loan Plans and Packages", "View Plan"]}
    >
      <main className="mx-auto max-w-4xl py-10 px-5">
        {((level_1_id === user?.id &&
          data?.data?.approvalDetails?.firstApproval?.status === "Pending") ||
          (level_2_id === user?.id &&
            data?.data?.approvalDetails?.secondApproval?.status ===
              "Pending")) && (
          <div className="ml-auto flex gap-2 justify-end font-semibold pr-5">
            <button
              disabled={loading}
              className={`border border-green-500 text-green-500 hover:bg-green-50 rounded-lg p-2 text-xs ${
                loading && "cursor-not-allowed"
              }`}
              onClick={() => setApprovalModal(true)}
            >
              Approve
            </button>
            <button
              disabled={loading}
              className={`border border-red-500 text-red-500 hover:bg-red-50 rounded-lg p-2 text-xs ${
                loading && "cursor-not-allowed"
              }`}
              onClick={() => setDeclineModal({ state: true, reason: "" })}
            >
              Decline
            </button>
          </div>
        )}

        <div className="flex justify-between mt-5 p-5 border-b">
          <p className="font-semibold text-xl">
            {
              leaveTypes?.find(
                (e) => e?.id === data?.data?.leaveRequest?.leaveType
              )?.label
            }
          </p>
          {renderStatus(data?.data?.leaveRequest?.status)}
        </div>

        <div className="p-5 flex flex-col gap-5 font-500">
          <p className="text-lg font-semibold">Leave details</p>
          <div className="flex">
            <p className="min-w-[15rem]">Staff</p>
            <div>
              <p>
                {data?.data?.leaveRequest?.userDetails?.lastName}{" "}
                {data?.data?.leaveRequest?.userDetails?.firstName}
              </p>
              <p className="text-swBlue">
                {data?.data?.leaveRequest?.userDetails?.email}
              </p>
            </div>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">First Approval</p>
            <div>
              <p>
                {
                  data?.data?.approvalDetails?.firstApproval?.approverDetails
                    ?.lastName
                }{" "}
                {
                  data?.data?.approvalDetails?.firstApproval?.approverDetails
                    ?.firstName
                }
              </p>
              <p className="text-swBlue">
                {
                  data?.data?.approvalDetails?.firstApproval?.approverDetails
                    ?.email
                }
              </p>
              <div className="flex items-center gap-2">
                Status:
                {renderStatus(
                  data?.data?.approvalDetails?.firstApproval?.status
                )}
              </div>
            </div>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Second Approval</p>
            <div>
              <p>
                {
                  data?.data?.approvalDetails?.secondApproval?.approverDetails
                    ?.lastName
                }{" "}
                {
                  data?.data?.approvalDetails?.secondApproval?.approverDetails
                    ?.firstName
                }
              </p>
              <p className="text-swBlue">
                {
                  data?.data?.approvalDetails?.secondApproval?.approverDetails
                    ?.email
                }
              </p>
              <div className="flex items-center gap-2">
                Status:
                {renderStatus(
                  data?.data?.approvalDetails?.secondApproval?.status
                )}
              </div>
            </div>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Date Requested</p>
            <p>{data?.data?.leaveRequest?.createdAt?.slice(0, 10)}</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Start Date</p>
            <p>{data?.data?.leaveRequest?.startDate?.slice(0, 10)}</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">End Date</p>
            <p>{data?.data?.leaveRequest?.endDate?.slice(0, 10)}</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Duration</p>
            <p>{data?.data?.leaveRequest?.leaveDuration} days(s)</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Reliever</p>
            <div>
              <p>
                {data?.data?.leaveRequest?.reliever?.lastName}{" "}
                {data?.data?.leaveRequest?.reliever?.firstName}
              </p>
              <p className="text-swBlue">
                {data?.data?.leaveRequest?.reliever?.email}
              </p>
            </div>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Description</p>
            <p>{data?.data?.leaveRequest?.description}</p>
          </div>

          {data?.data?.approvalDetails?.firstApproval?.status ===
            "Declined" && (
            <div className="flex">
              <p className="min-w-[15rem]">Decline Reason</p>
              <p>{data?.data?.leaveRequest?.declineReason}</p>
            </div>
          )}
        </div>
      </main>
      <SharedInvestmentModal
        isOpen={approvalModal}
        css={"max-w-lg"}
        header={"Approve"}
        onClose={() => setApprovalModal(false)}
        children={approveHtml}
      />
      <SharedInvestmentModal
        isOpen={declineModal.state}
        css={"max-w-lg"}
        header={"Decline"}
        onClose={() => setDeclineModal({ state: false, reason: "" })}
        children={declineHtml}
      />
      <SuccessModal
        title={successModal.title}
        description={successModal.description}
        isOpen={successModal.state}
        onClose={() =>
          setSuccessModal({ state: false, title: "", description: "" })
        }
        noButtons={true}
      />
      <CancelModal
        isOpen={errorModal.state}
        description={errorModal.description}
        title={errorModal.title}
        noButtons={true}
        onClose={() =>
          setErrorModal({ state: false, title: "", description: "" })
        }
      />
    </DashboardLayout>
  );
};

export default ViewSingleLeaveRequest;
