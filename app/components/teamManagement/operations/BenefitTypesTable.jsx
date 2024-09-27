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
    { id: "personalLeave", label: "Casual Leave" },
    { id: "sickLeave", label: "Sick Leave" },
    { id: "unpaidLeave", label: "Unpaid Leave" },
  ];

  const customDataTransformer = (apiData) => {
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
          {item?.leaveTypes?.annualLeave} working days
        </div>
      ),
      maternityLeave: (
        <div className="text-[15px] font-light text-gray-700">
          {item?.leaveTypes?.maternityLeave} working days
        </div>
      ),
      paternityLeave: (
        <div className="text-[15px] font-light text-gray-700">
          {item?.leaveTypes?.paternityLeave} working days
        </div>
      ),
      personalLeave: (
        <div className="text-[15px] font-light text-gray-700">
          {item?.leaveTypes?.personalLeave} working days
        </div>
      ),
      sickLeave: (
        <div className="text-[15px] font-light text-gray-700">
          {item?.leaveTypes?.sickLeave} working days
        </div>
      ),
      unpaidLeave: (
        <div className="text-[15px] font-light text-gray-700">
          {item?.leaveTypes?.unpaidLeave} working days
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
        onClickRow={"/team-management/operations/benefit-types/view"}
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
