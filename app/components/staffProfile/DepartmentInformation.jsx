"use client";

import { useRouter } from "next/navigation";
import Button from "../shared/buttonComponent/Button";
import { AiOutlinePlus } from "react-icons/ai";
import Image from "next/image";

export default function StaffDeptInfo({ data, isDashboard }) {
  const router = useRouter();
  console.log("depttt",data?.user);
  const returnCardDetails = (name, value) => {
    return (
      <div>
        <div className="font-medium text-swGrey400">{name}</div>
        <div className="text-lg font-semibold text-swBlack">{value}</div>
      </div>
    );
  };

  return (
    <div className="rounded-xl overflow-hidden h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start p-5 bg-swGrey25 border-b flex-wrap gap-5">
        <div>
          <p className="text-lg font-semibold text-swBlue">
            Department Information
          </p>
          <p className="text-sm text-swGray400">
            Important details about your department
          </p>
        </div>
        {!data?.user?.role?.department && !isDashboard ? (
          <Button
            className="border border-swBlue text-swBlue hover:bg-swDarkBlue text-sm p-3 rounded-md whitespace-nowrap flex gap-1"
            onClick={() =>
              router.push(
                `/team-management/role/department/update/${data?.user?.role?._id}`
              )
            }
          >
            {!isDashboard && <AiOutlinePlus size={15} />}
            <p className="">Add Department</p>
          </Button>
        ) : (
          <div>
            {returnCardDetails(
              "Salary",
              <div className="flex items-center">
                <Image
                  src="/images/money.png"
                  alt="money"
                  height={30}
                  width={30}
                />
                {`₦${
                  data?.employeeBenefit?.salary?.toLocaleString() || 0
                }/month`}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="p-5 bg-swGrey25 h-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 rounded-xl bg-white h-full p-5">
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
        </div>
      </div>
    </div>
  );
}
