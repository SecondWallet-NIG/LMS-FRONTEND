"use client";
import { Inter } from "next/font/google";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import { teamManagementAuthRoles } from "@/app/components/helpers/pageAuthRoles";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FiEdit2 } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBenefitTypes } from "@/redux/slices/hrmsSlice";
import { format } from "date-fns";

const inter = Inter({ subsets: ["latin"] });

const ViewBenefitType = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [benefit, setBenefit] = useState(null);

  const { benData: data } = useSelector((state) => state?.hrms);

  const [workDays, setWorkDays] = useState([
    { day: "Monday", checked: false },
    { day: "Tuesday", checked: false },
    { day: "Wednesday", checked: false },
    { day: "Thursday", checked: false },
    { day: "Friday", checked: false },
    { day: "Saturday", checked: false },
    { day: "Sunday", checked: false },
  ]);


  useEffect(() => {
    data?.data?.find((benefitType) => {
      if (benefitType._id === id) {
        setBenefit(benefitType);
        const selectedDays = benefitType?.workingDays;
        if (selectedDays) {
          const selectedDaysArr = Object.keys(selectedDays);
          setWorkDays((prevWorkDays) =>
            prevWorkDays.map((workDay) =>
              selectedDaysArr.includes(workDay.day.toLowerCase())
                ? {
                    ...workDay,
                    checked: selectedDays[workDay.day.toLowerCase()],
                  }
                : workDay
            )
          );
        }
      }
    });
  }, [data]);

  useEffect(() => {
    dispatch(getAllBenefitTypes());
  }, []);

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
          <p className="text-md font-medium">Leave Section</p>
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
          <p className="font-semibold text-md">Leave Details</p>
          <div className="flex">
            <p className="min-w-[15rem]">Staff Level</p>
            <p>{benefit?.level}</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Annual Leave</p>
            <p>
              {benefit?.leaveTypes?.annualLeave}{" "}
              {benefit?.leaveTypes?.annualLeave === 1 ? "day" : "days"}
            </p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Sick Leave</p>
            <p>
              {benefit?.leaveTypes?.sickLeave}{" "}
              {benefit?.leaveTypes?.sickLeave === 1 ? "day" : "days"}
            </p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Casual Leave</p>
            <p>
              {benefit?.leaveTypes?.personalLeave}{" "}
              {benefit?.leaveTypes?.personalLeave === 1 ? "day" : "days"}
            </p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Maternity Leave</p>
            <p>
              {benefit?.leaveTypes?.maternityLeave}{" "}
              {benefit?.leaveTypes?.maternityLeave === 1 ? "day" : "days"}
            </p>
          </div>
          {/* <div className="flex">
            <p className="min-w-[15rem]">Paternity Leave</p>
            <p>
              {benefit?.leaveTypes?.paternityLeave}{" "}
              {benefit?.leaveTypes?.paternityLeave === 1
                ? "day"
                : "days"}
            </p>
          </div> */}
          <div className="flex">
            <p className="min-w-[15rem]">Unpaid Leave</p>
            <p>
              {benefit?.leaveTypes?.unpaidLeave}{" "}
              {benefit?.leaveTypes?.unpaidLeave === 1 ? "day" : "days"}
            </p>
          </div>
        </div>

        <div className="flex justify-between mt-5 p-5 border-b">
          <p className="font-semibold text-md">
            Resumption Time & Days Details
          </p>
        </div>
        <div className="p-5 flex flex-col gap-5 font-500">
          <p className="font-medium text-md">Selected Work Days</p>

          <div className="flex items-center gap-5 flex-wrap">
            {workDays.map((item) => (
              <label
                key={item.day}
                htmlFor={item.day}
                className="flex items-center gap-1"
              >
                <input
                  type="checkbox"
                  className="checkbox-blue h-4 w-4"
                  checked={item.checked}
                  name={item.day}
                />
                {item.day}
              </label>
            ))}
          </div>

          <div className="flex mt-5">
            <p className="min-w-[15rem]">Clock In Time</p>
            <p>
              {benefit?.clockInAndOutTime?.clockIn &&
                format(
                  new Date(`2024-1-1 ${benefit?.clockInAndOutTime?.clockIn}`),
                  "hh:mm a"
                )}
            </p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Clock Out Time</p>
            <p>
              {benefit?.clockInAndOutTime?.clockIn &&
                format(
                  new Date(`2024-1-1 ${benefit?.clockInAndOutTime?.clockOut}`),
                  "hh:mm a"
                )}
            </p>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default ViewBenefitType;
