"use client";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  approveLeaveRequest,
  cancelLeave,
  declineLeaveRequest,
  getSingleLeaveRequest,
} from "@/redux/slices/hrmsSlice";
import SharedInvestmentModal from "@/app/components/modals/Investments/SharedInvestmentModal";
import SuccessModal from "@/app/components/modals/SuccessModal";
import CancelModal from "@/app/components/modals/CancelModal";
import {
  convertDateToISO,
  getPublicHolidays,
  leaveTypes,
} from "@/app/components/helpers/utils";
import EditableButton from "@/app/components/shared/editableButtonComponent/EditableButton";
import { employeeDashboardAuthRoles } from "@/app/components/helpers/pageAuthRoles";
import CustomDatePicker from "@/app/components/shared/date/CustomDatePicker";

const ViewSingleLeaveRequest = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const [user, setUser] = useState({ role: "", id: "" });
  const [approvalModal, setApprovalModal] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [clearDate, setClearDate] = useState(false);
  const [leaveDuration, setLeaveDuration] = useState(0);
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
  const [openCancelLeave, setCancelLeave] = useState(false);
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

  // console.log(user);

  const handleApprove = () => {
    setLoading(true);
    const approvalLevel =
      user.id === level_1_id &&
      user.id === level_2_id &&
      data?.data?.approvalDetails?.firstApproval?.status === "Approved"
        ? 2
        : user.id === level_1_id
        ? 1
        : 2;

    const payload = {
      leaveId: id,
      approverId: user.id,
      approvalLevel: approvalLevel,
      ...(approvalLevel === 1 &&
        startDate !== null && { startDate: convertDateToISO(startDate) }),
      ...(approvalLevel === 1 &&
        endDate !== null && { endDate: convertDateToISO(endDate) }),
      ...(approvalLevel === 1 &&
        startDate !== null &&
        endDate !== null && { leaveDuration: leaveDuration }),
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

  const handleCancelLeave = () => {
    setLoading(true);
    dispatch(cancelLeave({ userId: user.id, leaveId: id }))
      .unwrap()
      .then((res) => {
        setCancelLeave(false);
        setSuccessModal({
          title: "Leave Cancellation Successful",
          description: "Leave has been canclled successfully",
          state: true,
        });
        setLoading(false);
        setTimeout(() => {
          window.location.replace(`/dashboard`);
          // router.push();
        }, 3000);
      })
      .catch((err) => {
        setErrorModal({
          title: "Leave Cancellation Failed",
          description: err?.message,
          state: true,
        });
        setCancelLeave(false);
        setLoading(false);
      });
  };

  const clearDates = () => {
    setStartDate(null);
    setEndDate(null);
    setClearDate(true);
    setLeaveDuration(0);
  };

  const approveHtml = (
    <div className="p-5 pt-0">
      {user.id === level_1_id ? (
        <div className="flex justify-between">
          <div className="w-full flex flex-col gap-5">
            <div>
              <p>
                Current StartDate:{" "}
                {data?.data?.leaveRequest?.startDate?.slice(0, 10)}
              </p>
              <p>
                Current EndDate:{" "}
                {data?.data?.leaveRequest?.endDate?.slice(0, 10)}
              </p>
            </div>
            <p className="text-gray-700 font-medium">
              Update Start and End Date
            </p>
            <div>
              <div className="flex flex-col gap-3 items-end -mt-2">
                <CustomDatePicker
                  label={"Start Date"}
                  value={setStartDate}
                  clear={clearDate}
                />
                <CustomDatePicker
                  label={"End Date"}
                  value={setEndDate}
                  clear={clearDate}
                />
              </div>
              <div className="flex justify-end">
                <button className="text-red-500 text-xs" onClick={clearDates}>
                  Clear dates
                </button>
              </div>
            </div>
            <p className="-mt-6">Duration: {leaveDuration} working day(s)</p>
          </div>
        </div>
      ) : (
        <p className="text-center py-5 text-lg font-medium mt-7">
          Are You sure You Want To Approve?
        </p>
      )}
      <div className="flex gap-5 mt-10">
        <EditableButton
          redBtn={true}
          label={"Cancel"}
          className={"w-full"}
          onClick={() => setApprovalModal(false)}
        />
        <EditableButton
          blueBtn={true}
          label={"Approve"}
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
          blueBtn={true}
          label={"Cancel"}
          className={"w-full"}
          onClick={() => setDeclineModal({ state: false, reason: "" })}
        />
        <EditableButton
          redBtn={true}
          label={"Decline"}
          onClick={handleDecline}
          className={"w-full"}
          disabled={loading}
        />
      </div>
    </div>
  );

  const cancelLeaveRequest = (
    <div className="p-5 pt-0">
      <p className="-mt-5 text-gray-700">This action cannot be undone.</p>
      <div className="flex gap-5 mt-10">
        <EditableButton
          blueBtn={true}
          label={"Close"}
          className={"w-full"}
          onClick={() => setCancelLeave(false)}
        />
        <EditableButton
          redBtn={true}
          label={"Cancel Leave Request"}
          onClick={handleCancelLeave}
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

  // console.log(
  //   "approver",
  //   data?.data?.approvalDetails?.firstApproval,
  //   data?.data?.approvalDetails?.secondApproval
  // );

  const isWeekendOrHoliday = (date) => {
    const currentYear = new Date().getFullYear();
    const day = date.getDay();
    const isWeekend = day === 0 || day === 6; // Sunday or Saturday
    const isHoliday = getPublicHolidays(currentYear).some(
      (holiday) => holiday.toDateString() === date.toDateString()
    );
    return isWeekend || isHoliday;
  };

  useEffect(() => {
    if (startDate && endDate) {
      let currentDate = new Date(startDate);
      const end = new Date(endDate);
      let validDays = 0;
      // console.log("startDate", convertDateToISO(startDate));

      while (currentDate <= end) {
        if (!isWeekendOrHoliday(currentDate)) {
          validDays++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }

      setLeaveDuration(validDays);
      // setClearDate(false);
    } else {
      setLeaveDuration(0);
    }
  }, [startDate, endDate]);


  return (
    <DashboardLayout
      isBackNav={true}
      paths={["Employee dashboard", "View Leave"]}
      roles={employeeDashboardAuthRoles}
    >
      <main className="mx-auto max-w-4xl py-10 px-5">
        <div>
          {((level_1_id === user?.id &&
            data?.data?.approvalDetails?.firstApproval?.status === "Pending" &&
            data?.data?.leaveRequest?.status === "Pending") ||
            (level_2_id === user?.id &&
              data?.data?.approvalDetails?.secondApproval?.status ===
                "Pending" &&
              data?.data?.leaveRequest?.status === "Pending")) && (
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
        </div>

        <div className="flex justify-between mt-5 p-5 border-b">
          <p className="font-semibold text-xl">Leave details</p>

          {renderStatus(data?.data?.leaveRequest?.status)}
        </div>
        <div className="flex justify-end mt-5">
          {data?.data?.leaveRequest?.userDetails?._id === user?.id &&
            data?.data?.approvalDetails?.firstApproval?.status ===
              "Pending" && (
              <button
                onClick={() => setCancelLeave(true)}
                className="border border-red-500 text-red-500 hover:bg-red-50 rounded-lg p-2 text-xs"
              >
                Cancel Leave Request
              </button>
            )}
        </div>
        <div className="mt-5 p-5 flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="w-full">
              <div>
                <p className="font-medium ">Leave Type:</p>
              </div>
              <div className="w-full">
                <div>
                  {
                    leaveTypes?.find(
                      (e) => e?.id === data?.data?.leaveRequest?.leaveType
                    )?.label
                  }
                </div>
              </div>
            </div>
            <div className="w-full">
              <div>
                <p className="font-medium ">Staff:</p>
              </div>
              <div className="w-full">
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
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="w-full">
              <div>
                <p className="font-medium">First Approval:</p>
              </div>
              <div className="w-full">
                <div>
                  <p>
                    {
                      data?.data?.approvalDetails?.firstApproval
                        ?.approverDetails?.lastName
                    }{" "}
                    {
                      data?.data?.approvalDetails?.firstApproval
                        ?.approverDetails?.firstName
                    }
                  </p>
                  <p className="text-swBlue">
                    {
                      data?.data?.approvalDetails?.firstApproval
                        ?.approverDetails?.email
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
            </div>
            <div className="w-full">
              <div>
                <p className="font-medium ">Second Approval:</p>
              </div>
              <div className="w-full">
                <div>
                  <p>
                    {
                      data?.data?.approvalDetails?.secondApproval
                        ?.approverDetails?.lastName
                    }{" "}
                    {
                      data?.data?.approvalDetails?.secondApproval
                        ?.approverDetails?.firstName
                    }
                  </p>
                  <p className="text-swBlue">
                    {
                      data?.data?.approvalDetails?.secondApproval
                        ?.approverDetails?.email
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
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="w-full">
              <div>
                <p className="font-medium ">Date Requested:</p>
              </div>
              <div className="w-full">
                <div>
                  <p>{data?.data?.leaveRequest?.createdAt?.slice(0, 10)}</p>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div>
                <p className="font-medium ">Start Date:</p>
              </div>
              <div className="w-full">
                <div>
                  <p>{data?.data?.leaveRequest?.startDate?.slice(0, 10)}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="w-full">
              <div>
                <p className="font-medium ">End Date:</p>
              </div>
              <div className="w-full">
                <div>
                  <p>{data?.data?.leaveRequest?.endDate?.slice(0, 10)}</p>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div>
                <p className="font-medium ">Duration:</p>
              </div>
              <div className="w-full">
                <div>
                  <p>{data?.data?.leaveRequest?.leaveDuration} day(s)</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="w-full">
              <div>
                <p className="font-medium ">Reliever:</p>
              </div>
              <div className="w-full">
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
            </div>
            {data?.data?.leaveRequest?.status === "Declined" && (
              // <div className="flex">
              //   <p className="font-medium ">Decline Reason</p>
              //   <p>{data?.data?.leaveRequest?.declineReason}</p>
              // </div>
              <div className="w-full">
                <div>
                  <p className="font-medium ">Decline Reason:</p>
                </div>
                <div className="w-full">
                  <div>
                    <p>{data?.data?.leaveRequest?.declineReason}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="w-full">
              <div>
                <p className="font-medium ">Additional Message:</p>
              </div>
              <div className="w-full">
                <div>
                  <p>{data?.data?.leaveRequest?.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SharedInvestmentModal
        isOpen={approvalModal}
        css={"max-w-lg"}
        header={"Approve Leave Request"}
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
      <SharedInvestmentModal
        isOpen={openCancelLeave}
        css={"max-w-lg"}
        header={"Are You Sure?"}
        onClose={() => setCancelLeave(false)}
        children={cancelLeaveRequest}
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
