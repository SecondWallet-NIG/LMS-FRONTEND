import { useParams, useRouter } from "next/navigation";
import ReusableDataTable from "../shared/tables/ReusableDataTable";
import { format } from "date-fns";

const AllStaffsAttendanceTable = () => {
  const router = useRouter();
  const { id } = useParams();

  const headers = [
    { id: "staff", label: "Staff" },
    { id: "date", label: "Date" },
    { id: "timeIn", label: "Time In" },
    { id: "timeOut", label: "Time Out" },
    { id: "totalHours", label: "Total Hours" },
    { id: "status", label: "Status" },
  ];

  const customDataTransformer = (apiData) => {
    return apiData?.attendances?.map((item) => ({
      id: item?.user?._id,

      staff: (
        <div className="text-[15px] font-light text-gray-700">
          <p>
            {item?.user?.lastName} {item?.user?.firstName}{" "}
            {item?.user?.middleName}
          </p>
          <p className="text-sm text-swBlue">{item?.user?.email}</p>
        </div>
      ),

      date: (
        <div className="text-[15px] font-light text-gray-700">
          <p>{item?.date && format(new Date(item?.date), "PPP")}</p>
        </div>
      ),
      timeIn: (
        <div className="text-[15px] font-light text-gray-700">
          <p>{item?.clockIn && format(new Date(item?.clockIn), "hh:mm a")}</p>
        </div>
      ),
      timeOut: (
        <div className="text-[15px] font-light text-gray-700">
          <p>{item?.clockOut && format(new Date(item?.clockOut), "hh:mm a")}</p>
        </div>
      ),
      totalHours: (
        <div className="text-[15px] font-light text-gray-700">
          <p>{Math.floor(item?.totalHours)}</p>
        </div>
      ),

      status: (
        <div>
          <div
            className={`border p-1 text-xs rounded-md flex gap-1 items-center justify-center w-fit ${
              item?.status === "Punctual"
                ? "border-swBlue bg-blue-100"
                : item?.status === "Late"
                ? "border-orange-500 bg-orange-100"
                : "border-red-500 bg-red-100"
            }`}
          >
            <div
              className={` ${
                item?.status === "Punctual"
                  ? "h-1 w-1 rounded-full bg-swBlue"
                  : item?.status === "Late"
                  ? "h-1 w-1 rounded-full bg-orange-500"
                  : "h-1 w-1 rounded-full bg-red-500"
              }`}
            />
            {item?.status}
          </div>
        </div>
      ),
    }));
  };
  return (
    <div className="flex justify-between items-center">
      <ReusableDataTable
        dataTransformer={customDataTransformer}
        apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/attendance/all`}
        onClickRow={"/team-management/staff/"}
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

export default AllStaffsAttendanceTable;
