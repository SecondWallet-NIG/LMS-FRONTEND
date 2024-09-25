"use client";
import { Inter } from "next/font/google";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import { teamManagementAuthRoles } from "@/app/components/helpers/pageAuthRoles";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FiEdit2 } from "react-icons/fi";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const ViewBenefitType = () => {
  const { id } = useParams();

  const [workDays, setWorkDays] = useState([
    { day: "Monday", checked: false },
    { day: "Tuesday", checked: false },
    { day: "Wednesday", checked: false },
    { day: "Thursday", checked: false },
    { day: "Friday", checked: false },
    { day: "Saturday", checked: false },
    { day: "Sunday", checked: false },
  ]);

  const toggleDay = (day) => {
    setWorkDays((prevWorkDays) =>
      prevWorkDays.map((workDay) =>
        workDay.day === day
          ? { ...workDay, checked: !workDay.checked }
          : workDay
      )
    );
  };

  return (
    <DashboardLayout
      isBackNav={true}
      paths={["Team Management", "Benefit Types", "View"]}
      roles={teamManagementAuthRoles}
    >
      <main
        className={`${inter.className} mx-auto max-w-4xl py-10 px-5 text-swBlack`}
      >
        {/* <div className="flex gap-5 justify-between items-center font-semibold">
          <p className="text-2xl">Leave Section</p>
          <Link
            href={`/team-management/operations/benefit-types/update/${id}`}
            className="border py-2 px-3 flex gap-2 items-center rounded-lg"
          >
            <FiEdit2 size={20} />
            Edit
          </Link>
        </div> */}

        <div className="flex justify-between mt-5 p-5 border-b">
          <p className="text-2xl font-semibold">Leave Section</p>
          {/* {showEditBtn && ( */}
          <Link
            href={`/team-management/operations/benefit-types/update/${id}`}
            className="border py-2 px-3 flex gap-2 items-center rounded-lg"
          >
            <FiEdit2 size={20} />
            Edit
            {/* )} */}
          </Link>
        </div>

        <div className="p-5 flex flex-col gap-5 font-500">
          <p className="font-semibold text-xl">Leave Details</p>
          <div className="flex">
            <p className="min-w-[15rem]">Staff Level</p>
            <p>Senior Manager</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Annual Leave</p>
            <p>15 Days</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Sick Leave</p>
            <p>5days</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Personal Leave</p>
            <p>4 Days</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Maternity Leave</p>
            <p>90 Days</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Maternity Leave</p>
            <p>40 Days</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Unpaid Leave</p>
            <p>10 Days</p>
          </div>
        </div>

        <div className="flex justify-between mt-5 p-5 border-b">
          <p className="font-semibold text-2xl">
            Resumption Time & Days Details
          </p>
        </div>
        <div className="p-5 flex flex-col gap-5 font-500">
          <p className="font-semibold text-xl">Selected Work Days</p>

          <div className="flex items-center gap-5 flex-wrap">
            {workDays.map((item) => (
              <label
                key={item.day}
                htmlFor={item.day}
                className="flex items-center gap-1"
              >
                <input
                  type="checkbox"
                  checked={item.checked}
                  className="h-5 w-5"
                  name={item.day}
                  onClick={() => toggleDay(item.day)}
                />
                {item.day}
              </label>
            ))}
          </div>

          <div className="flex mt-5">
            <p className="min-w-[15rem]">Clock In Time</p>
            <p>9:00 AM</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Clock Out Time</p>
            <p>5:00 AM</p>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default ViewBenefitType;
