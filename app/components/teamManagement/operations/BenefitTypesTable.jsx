import { AiOutlinePlus } from "react-icons/ai";
import ReusableDataTable from "../../shared/tables/ReusableDataTable";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

const BenefitTypesTable = () => {
  const router = useRouter();

  const headers = [
    { id: "dateCreated", label: "Date Created" },
    { id: "level", label: "Level" },
    { id: "annualLeave", label: "Annual Leave" },
    { id: "maternityLeave", label: "Maternity Leave" },
    { id: "paternityLeave", label: "Paternity Leave" },
    { id: "personalLeave", label: "Personal Leave" },
    { id: "sickLeave", label: "Sick Leave" },
    { id: "unpaidLeave", label: "Unpaid Leave" },
  ];

  const customDataTransformer = (apiData) => {
    console.log({ apiData });
    return apiData?.map((item, i) => ({
      id: item?._id,
      dateCreated: (
        <div className="text-[15px] font-light text-gray-700">
          {item?.createdAt && format(new Date(item?.createdAt), "PPP")}
        </div>
      ),
      level: (
        <div className="text-[15px] font-light text-gray-700">
          {item?.level}
        </div>
      ),
      annualLeave: (
        <div className="text-[15px] font-light text-gray-700">
          {item?.leaveTypes?.annualLeave}
        </div>
      ),
      maternityLeave: (
        <div className="text-[15px] font-light text-gray-700">
          {item?.leaveTypes?.maternityLeave}
        </div>
      ),
      paternityLeave: (
        <div className="text-[15px] font-light text-gray-700">
          {item?.leaveTypes?.paternityLeave}
        </div>
      ),
      personalLeave: (
        <div className="text-[15px] font-light text-gray-700">
          {item?.leaveTypes?.personalLeave}
        </div>
      ),
      sickLeave: (
        <div className="text-[15px] font-light text-gray-700">
          {item?.leaveTypes?.sickLeave}
        </div>
      ),
      unpaidLeave: (
        <div className="text-[15px] font-light text-gray-700">
          {item?.leaveTypes?.unpaidLeave}
        </div>
      ),
    }));
  };

  return (
    <div>
      <ReusableDataTable
        dataTransformer={customDataTransformer}
        apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/benefit-type`}
        initialData={[]}
        headers={headers}
        filters={true}
        pagination={true}
        btnText={
          <div
            className="flex gap-1 items-center p-1"
            onClick={() => {
              router.push("/team-management/operations/benefit-types/add-new");
            }}
          >
            <AiOutlinePlus size={15} />
            <p className="block">Add Benefit Type</p>
          </div>
        }
      />
    </div>
  );
};

export default BenefitTypesTable;
