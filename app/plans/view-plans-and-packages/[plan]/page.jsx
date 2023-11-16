"use client";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import EditableButton from "@/app/components/shared/editableButtonComponent/EditableButton";
import { useParams } from "next/navigation";
import { FiEdit2, FiTrash } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";

const PlansAndPackages_Plan = () => {
  const { plan } = useParams();
  console.log(plan);
  return (
    <DashboardLayout>
      <main className="mx-auto max-w-4xl py-10 px-5">
        <div className="ml-auto flex gap-2 justify-end font-semibold">
          <EditableButton className="border py-2 px-3 flex gap-2 items-center rounded-lg">
            <FiTrash size={20} color={"red"} />
            Delete loan plan
          </EditableButton>
          <EditableButton className="border py-2 px-3 flex gap-2 items-center rounded-lg">
            <FiEdit2 size={20} />
            Edit
          </EditableButton>
        </div>

        <div className="flex justify-between mt-5 p-5 border-b">
          <p className="font-semibold text-xl">Student loan</p>
          <div className="flex gap-2 items-center">
            {/* <p
              className={`${
                item.status === "active"
                  ? "border-green-500 bg-green-100 text-green-500"
                  : item.status === "under review"
                  ? "border-purple-500 bg-purple-100 text-purple-500"
                  : "border-orange-500 bg-orange-100 text-orange-500"
              } border px-3 rounded-full text-xs flex items-center capitalize`}
            >
              {item.status}
            </p> */}
            <MdKeyboardArrowDown size={20} className="text-swGray" />
          </div>
        </div>

        <div className="p-5 flex flex-col gap-5 font-medium">
          <p className="text-lg font-semibold">Loan details</p>
          <div className="flex">
            <p className="w-60">Intrest type</p>
            <p>Flat intrest</p>
          </div>
          <div className="flex">
            <p className="w-60">Intrest rate</p>
            <p>30% per month</p>
          </div>
          <div className="flex">
            <p className="w-60">Loan amount</p>
            <p>50,000 - 500,000</p>
          </div>
          <div className="flex">
            <p className="w-60">Eligibility criteria</p>
            <div className="">
              <div className="flex gap-1">
                <input type="checkbox" name="" />
                Older than 18 years
              </div>
              <div className="flex gap-1">
                <input type="checkbox" name="" />
                Employed
              </div>
              <div className="flex gap-1">
                <input type="checkbox" name="" />
                Earns at least 1,000,000 per annum
              </div>
            </div>
          </div>
          <div className="flex">
            <p className="w-60">Minimum collateral amount</p>
            <p>500,000</p>
          </div>
          <div className="flex">
            <p className="w-60">Minimum collateral amount</p>
            <p>500,000</p>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default PlansAndPackages_Plan;
