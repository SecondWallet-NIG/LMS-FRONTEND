import { useParams, useRouter } from "next/navigation";
import ReusableDataTable from "../shared/tables/ReusableDataTable";
import { AiOutlinePlus } from "react-icons/ai";
import { leaveTypes } from "../helpers/utils";

const LeaveApprovalRequests = () => {
  const router = useRouter();
  const { id } = useParams();

  const headers = [
    { id: "createdAt", label: "Date Requested" },
    { id: "staff", label: "Staff" },
    { id: "leaveType", label: "Leave Type" },
    { id: "leaveType", label: "Leave Type" },
    { id: "startDate", label: "Start Date" },
    { id: "endDate", label: "endDate" },
    { id: "leaveDuration", label: "Duration" },
    { id: "reliever", label: "Reliever" },
    { id: "status", label: "Status" },
  ];

  const customDataTransformer = (apiData) => {
    return apiData?.leaveRequests?.map((item) => ({
      id: item._id,
      createdAt: (
        <div className="text-[15px] font-light text-gray-700">
          {item?.leaveDetails?.createdAt?.slice(0, 10)}
        </div>
      ),
      staff: (
        <div>
          <div className="text-[15px] font-light text-gray-700">
            <div className="text-[15px] font-light text-gray-700">
              {item?.userDetails?.lastName} {item?.userDetails?.firstName}
            </div>
            <div className="text-[15px] font-light text-gray-700">
              {item?.userDetails?.email}
            </div>
          </div>
        </div>
      ),
      leaveType: (
        <div>
          <div className="text-[15px] font-light text-gray-700">
            {
              leaveTypes?.find((e) => e?.id === item?.leaveDetails?.leaveType)
                ?.label
            }
          </div>
        </div>
      ),
      startDate: (
        <div>
          <div className="text-[15px] font-light text-gray-700">
            {item?.leaveDetails?.startDate?.slice(0, 10)}
          </div>
        </div>
      ),
      endDate: (
        <div>
          <div className="text-[15px] font-light text-gray-700">
            {item?.leaveDetails?.endDate?.slice(0, 10)}
          </div>
        </div>
      ),
      leaveDuration: (
        <div>
          <div className="text-[15px] font-light text-gray-700">
            {item?.leaveDetails?.leaveDuration} day(s)
          </div>
        </div>
      ),
      reliever: (
        <div>
          <div className="text-[15px] font-light text-gray-700">
            {item?.leaveDetails?.reliever?.lastName}{" "}
            {item?.leaveDetails?.reliever?.firstName}
          </div>
          <div className="text-[15px] font-light text-gray-700">
            {item?.leaveDetails?.reliever?.email}
          </div>
        </div>
      ),
      status: (
        <div>
          <div
            className={`border p-1 text-xs rounded-md flex gap-1 items-center justify-center w-fit ${
              item?.leaveDetails?.status === "Pending"
                ? "border-swBlue bg-blue-100"
                : item?.leaveDetails?.status === "Approved"
                ? "border-green-500 bg-green-100"
                : "border-red-500 bg-red-100"
            }`}
          >
            <div
              className={` ${
                item?.leaveDetails?.status === "Pending"
                  ? "h-1 w-1 rounded-full bg-swBlue"
                  : item?.leaveDetails?.status === "Approved"
                  ? "h-1 w-1 rounded-full bg-green-500"
                  : "h-1 w-1 rounded-full bg-red-500"
              }`}
            />
            {item?.leaveDetails?.status}
          </div>
        </div>
      ),
    }));
  };

  return (
    <div className="flex justify-between items-center">
      <ReusableDataTable
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
