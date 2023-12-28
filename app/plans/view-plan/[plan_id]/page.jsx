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
  // console.log({ plan_id });
  const dispatch = useDispatch();
  const [selectStatusMenu, setSelectStatusMenu] = useState(false);
  const buttonRef = useRef(null);
  const loanPackage =
    useSelector((state) => {
      return state?.loanPackage?.data?.data;
    }) || [];
  // console.log({ loanPackage });

  useEffect(() => {
    dispatch(getSingleLoanPackage(plan_id));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        // Click outside the button, close it
        setSelectStatusMenu(!selectStatusMenu);
      }
    };

    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectStatusMenu]);

  return (
    <DashboardLayout
      isBackNav={true}
      paths={["Loan Plans and Packages", "View Plan"]}
    >
      <main className="mx-auto max-w-4xl py-10 px-5">
        <div className="ml-auto flex gap-2 justify-end font-semibold">
          {/* <button className="bg-[#E8F7F0] text-[#107E4B]  text-xs font-normal px-6 py-1 rounded-md">
            {loanPackage?.status}
          </button> */}
          <div className="border py-2 px-3 flex gap-2 items-center rounded-lg cursor-pointer">
            <LuTrash size={20} className="text-red-500" />
            Delete loan plan
          </div>
          <Link
            href={`/plans/view-plan/${plan_id}/edit-plan`}
            className="border py-2 px-3 flex gap-2 items-center rounded-lg"
          >
            <FiEdit2 size={20} />
            Edit
          </Link>
        </div>

        <div className="flex justify-between mt-5 p-5 border-b">
          <p className="font-semibold text-xl">{loanPackage?.name}</p>
          <div className="relative">
            <div
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => setSelectStatusMenu(!selectStatusMenu)}
            >
              <p
                className={`${
                  loanPackage?.status === "Active"
                    ? "border-green-500 bg-green-100 text-green-500"
                    : loanPackage?.status === "Under review"
                    ? "border-purple-500 bg-purple-100 text-purple-500"
                    : "border-orange-500 bg-orange-100 text-orange-500"
                } border px-3 rounded-full text-xs flex items-center capitalize`}
              >
                {loanPackage?.status}
              </p>
              <MdKeyboardArrowDown size={20} className="text-swGray" />
              {selectStatusMenu && (
                <div
                  ref={buttonRef}
                  className="absolute w-60 p-2 shadow-md rounded-lg mt-44 border bg-white right-0 "
                >
                  <p
                    className={`flex justify-between items-center p-2 rounded-lg hover:bg-swLightGray ${
                      loanPackage.status === "Active" && "text-swBlue"
                    }`}
                  >
                    Active{" "}
                    {loanPackage.status === "Active" && (
                      <IoMdCheckmark size={20} />
                    )}
                  </p>
                  <p
                    className={`flex justify-between items-center p-2 rounded-lg hover:bg-swLightGray ${
                      loanPackage.status === "Inacive" && "text-swBlue"
                    }`}
                  >
                    Inactive{" "}
                    {loanPackage.status === "Inctive" && (
                      <IoMdCheckmark size={20} />
                    )}
                  </p>
                  <p
                    className={`flex justify-between items-center p-2 rounded-lg hover:bg-swLightGray ${
                      loanPackage.status === "Under review" && "text-swBlue"
                    }`}
                  >
                    Under Review{" "}
                    {loanPackage.status === "Under review" && (
                      <IoMdCheckmark size={20} />
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-5 flex flex-col gap-5 font-500">
          <p className="text-lg font-semibold">Loan details</p>
          <div className="flex">
            <p className="min-w-[15rem]">Interest type</p>
            <p>{loanPackage?.interestRate?.rateType}</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Interest rate</p>
            <p>{loanPackage?.interestRate?.rate}% per month</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Loan amount</p>
            <p>
              {" "}
              ₦ {loanPackage?.loanAmountRange?.min} - ₦{" "}
              {loanPackage?.loanAmountRange?.max}
            </p>
          </div>
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
