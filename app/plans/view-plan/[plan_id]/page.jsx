"use client";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FiEdit2, FiTrash } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getSingleLoanPackage } from "@/redux/slices/loanPackageSlice";
import { useEffect, useRef, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { LuTrash } from "react-icons/lu";
import { plansAuthRoles } from "@/app/components/helpers/pageAuthRoles";

const ViewPlan = () => {
  const { plan_id } = useParams();
  const [userRole, setUserRole] = useState(false);
  const [showEditBtn, setShowEditBtn] = useState(false);
  const dispatch = useDispatch();
  const loanPackage =
    useSelector((state) => {
      return state?.loanPackage?.data?.data;
    }) || [];

  useEffect(() => {
    const _user = JSON.parse(localStorage.getItem("user"));
    if (_user) {
      setUserRole(_user?.data?.user?.role?.tag);
    }
    dispatch(getSingleLoanPackage(plan_id));
  }, []);

  useEffect(() => {
    if (
      userRole === "CEO" ||
      userRole === "CTO" ||
      userRole === "CFO" ||
      userRole === "Dir" ||
      userRole === "System Admin"
    ) {
      setShowEditBtn(true);
    }
  }, [userRole]);

  return (
    <DashboardLayout
      isBackNav={true}
      paths={["Loan Plans and Packages", "View Plan"]}
      roles={plansAuthRoles}
    >
      <main className="mx-auto max-w-4xl py-10 px-5">
        <div className="ml-auto flex gap-2 justify-end font-semibold">
          {showEditBtn && (
            <Link
              href={`/plans/view-plan/${plan_id}/edit-plan`}
              className="border py-2 px-3 flex gap-2 items-center rounded-lg"
            >
              <FiEdit2 size={20} />
              Edit
            </Link>
          )}
        </div>

        <div className="flex justify-between mt-5 p-5 border-b">
          <p className="font-semibold text-xl">{loanPackage?.name}</p>
        </div>

        <div className="p-5 flex flex-col gap-5 font-500">
          <p className="text-lg font-semibold">Loan details</p>
          <div className="flex">
            <p className="min-w-[15rem]">Interest type</p>
            <p>{loanPackage?.interestRate?.rateType}</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Minimum interest rate</p>
            <p>{loanPackage?.interestRate?.min}% per month</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Maximum interest rate</p>
            <p>{loanPackage?.interestRate?.max}% per month</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Minimum loan</p>
            <p>&#8358; {loanPackage?.loanAmountRange?.min.toLocaleString()}</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Maximum loan</p>
            <p>&#8358; {loanPackage?.loanAmountRange?.max.toLocaleString()}</p>
          </div>
          {/* <div className="flex">
            <p className="min-w-[15rem]">Active loans</p>
            <p>100</p>
          </div> */}
        </div>
      </main>
    </DashboardLayout>
  );
};

export default ViewPlan;
