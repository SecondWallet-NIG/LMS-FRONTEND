"use client";

import { useRouter } from "next/navigation";
import Button from "../shared/buttonComponent/Button";
import { AiOutlinePlus } from "react-icons/ai";

export default function StaffDeptInfo({ data, isDashboard }) {
  const router = useRouter();
  console.log({ data });
  const returnCardDetails = (name, value) => {
    return (
      <div>
        <p className="text-xs font-medium text-swGrey400">{name}</p>
        <p className="text-sm font-medium text-swBlack">{value}</p>
      </div>
    );
  };

  return (
    <div className="p-2 border-2 rounded-lg h-full">
      <div className="flex items-center justify-between">
        <p className="text-swBlue font-medium text-md">
          Department Information
        </p>
        {!data?.user?.role?.department && !isDashboard && (
          <Button
            className="border border-swBlue text-swBlue hover:bg-swDarkBlue text-xs md:p-[0.37rem] rounded-md ml-2 whitespace-nowrap flex gap-1"
            onClick={() =>
              router.push(
                `/team-management/role/department/update/${data?.user?.role?._id}`
              )
            }
          >
            {!isDashboard && <AiOutlinePlus size={15} />}
            <p className="">Add Department</p>
          </Button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-5 mt-2">
        {returnCardDetails(
          "Department Name",
          data?.user?.role?.department?.departmentName || "None"
        )}
        {returnCardDetails(
          "Department Code",
          data?.user?.role?.department?.departmentCode || "None"
        )}
        {returnCardDetails(
          "Department Head",
          data?.user?.role?.department?.departmentHead || "None"
        )}
        {returnCardDetails("Role", data?.user?.role?.name || "None")}
        {returnCardDetails(
          "Salary",
          `₦ ${data?.employeeBenefit?.salary?.toLocaleString() || 0}`
        )}
      </div>
    </div>
  );
}
