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

const ViewPlan = () => {
  const { plan_id } = useParams();
  const [userRole, setUserRole] = useState(false);
  const [showEditBtn, setShowEditBtn] = useState(false);
  // console.log({ plan_id });
  const dispatch = useDispatch();
  const loanPackage =
    useSelector((state) => {
      return state?.loanPackage?.data?.data;
    }) || [];
  // console.log({ loanPackage });

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
            <p>0% per month</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Maximum interest rate</p>
            <p>{loanPackage?.interestRate?.rate}% per month</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Minimum loan</p>
            <p>&#8358; {loanPackage?.loanAmountRange?.min.toLocaleString()}</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Maximum loan</p>
            <p>&#8358; {loanPackage?.loanAmountRange?.max.toLocaleString()}</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Active loans</p>
            <p>100</p>
          </div>
          {/* <div className="flex">
            <p className="min-w-[15rem]">Loan amount</p>
            <p>
              {" "}
              ₦ {loanPackage?.loanAmountRange?.min} - ₦{" "}
              {loanPackage?.loanAmountRange?.max}
            </p>
          </div> */}
          {/* <div className="flex">
            <p className="min-w-[15rem]">Eligibility criteria</p>
            <div className="">
              <div className="flex gap-1">
                <input type="checkbox" name="above 18 years" />
                Older than 18 years
              </div>
              <div className="flex gap-1">
                <input type="checkbox" name="employed" />
                Employed
              </div>
              <div className="flex gap-1">
                <input type="checkbox" name="earn atleast 1m" />
                Earns at least 1,000,000 per annum
              </div>
            </div>
          </div> */}
          {/* <div className="flex">
            <p className="min-w-[15rem]">Minimum collateral amount</p>
            <p>500,000</p>
          </div> */}
          {/* <div className="flex">
            <p className="min-w-[15rem]">Fees and Charges </p>
            <div>
              <p>Commitment fee: 1%</p>
              <p>Management fee: 1%</p>
              <p>Insurance: 1% </p>
            </div>
          </div> */}
          {/* <div className="flex">
            <p className="min-w-[15rem]">Loan duration</p>
            <div className="">
              <div className="flex gap-1">
                <input type="checkbox" name="3 months" />3 months
              </div>
              <div className="flex gap-1">
                <input type="checkbox" name="6 months" />6 months
              </div>
              <div className="flex gap-1">
                <input type="checkbox" name="1 year" />1 year
              </div>
              <div className="flex gap-1">
                <input type="checkbox" name="3 years" />3 years
              </div>
            </div>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Loan description</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus eaque culpa omnis consequuntur numquam eum nesciunt
              ipsam eius consectetur ullam.
            </p>
          </div> */}
        </div>
      </main>
    </DashboardLayout>
  );
};

export default ViewPlan;
