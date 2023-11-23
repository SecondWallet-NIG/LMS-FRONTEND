"use client";
import Link from "next/link";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import { RiArrowRightSLine } from "react-icons/ri";
import { IoIosClose } from "react-icons/io";
import InputField from "../components/shared/input/InputField";
import { FiEdit2, FiFilter, FiSearch } from "react-icons/fi";
import { useState } from "react";
import EditableButton from "../components/shared/editableButtonComponent/EditableButton";
import { useDispatch, useSelector } from "react-redux";
import { getLoanPackage } from "@/redux/slices/loanPackageSlice";
import { useEffect } from "react";
import Loader from "../components/shared/Loader";

const LoanPackages = () => {
  const dispatch = useDispatch();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);

  const loanPackage =
    useSelector((state) => {
      return state?.loanPackage?.data?.data;
    }) || [];

  console.log(loanPackage);
  const handleSearch = (state) => {
    setSearchOpen(state);
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  console.log(searchTerm);

  const loanPlans = [
    {
      type: "Student Loan",
      status: "active",
      interest_rate: "20%",
      repayment_type: "Bullet",
      minimum_loan: 50000,
      maximum_loan: 500000,
      active_loan: 50,
    },
  ];

  useEffect(() => {
    dispatch(getLoanPackage());
  }, []);

  return (
    <DashboardLayout>
      <main className="mx-auto max-w-7xl p-5 overflow-hidden text-black">
        <Link
          href="/plans/create-plan"
          className="bg-swBlue py-3 px-6 font-medium rounded-lg flex items-center gap-2 text-white w-fit ml-auto"
        >
          Create plan
          <RiArrowRightSLine size={20} />
        </Link>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-3xl">Available loan plans</p>
          <div className="flex gap-2 mt-5">
            <div className="flex items-center">
              <InputField
                startIcon={<FiSearch size={20} />}
                endIcon={
                  <IoIosClose
                    size={20}
                    className="cursor-pointer"
                    onClick={() => {
                      handleSearch(false);
                    }}
                  />
                }
                placeholder={"Search..."}
                css={`
                  ${searchOpen
                    ? "translate-x-[3rem] opacity-1 z-10"
                    : "translate-x-[17rem] -z-10 opacity-0"} transition-all ease-in-out
                `}
                borderColor="bg-gray-200 "
                value={searchTerm}
                onChange={handleSearchChange}
              />

              <div
                className={`${
                  searchOpen ? "opacity-0" : "opacity-1"
                } bg-white w-fit p-2 h-full rounded-md cursor-pointer  hover:border-2 border hover:border-gray-200 transition-all ease-in-out`}
              >
                <FiSearch
                  size={20}
                  onClick={() => {
                    handleSearch(true);
                  }}
                />
              </div>
            </div>
            <div className="bg-white w-fit p-2 rounded-md cursor-pointer  hover:border-2 border hover:border-gray-200 flex items-center gap-2">
              <FiFilter size={20} />
              Filter
            </div>
          </div>
        </div>

        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-5">
          {loanPackage.length > 0 ? (
            loanPackage?.map((item, index) => (
              <div
                key={index}
                className="bg-swLightGray rounded-xl p-4 flex flex-col gap-1"
              >
                <div className="flex justify-between items-center mb-3">
                  <p className="font-semibold text-xl">{item?.name}</p>
                  <p
                    className={`${
                      item?.status?.toLocaleLowerCase() === "active"
                        ? "border-green-500 bg-green-100 text-green-500"
                        : item?.status?.toLocaleLowerCase() === "under review"
                        ? "border-purple-500 bg-purple-100 text-purple-500"
                        : "border-orange-500 bg-orange-100 text-orange-500"
                    } border py-1 px-3 rounded-full text-xs flex items-center capitalize whitespace-nowrap h-fit`}
                  >
                    {item?.status}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-lg">Interest rate</p>
                  <p className="text-lg font-bold">
                    {item?.interestRate?.rate}%
                  </p>
                </div>
                <div className="flex justify-between">
                  <p>Interest type</p>
                  <p className="text-lg font-bold whitespace-nowrap">
                    {item?.interestRate?.rateType}
                  </p>
                </div>
                {/* <div className="flex justify-between">
                  <p>Repayment type</p>
                  <p className="font-semibold">{item.repayment_type}</p>
                </div> */}
                <div className="flex justify-between">
                  <p>Minimum loan</p>
                  <p className="font-bold">{item?.loanAmountRange?.min}</p>
                </div>
                <div className="flex justify-between">
                  <p>Maximum loan</p>
                  <p className="font-bold">{item?.loanAmountRange?.max}</p>
                </div>
                {/* <div className="flex justify-between">
                  <p>Active loans</p>
                  <p className="font-semibold">{item.active_loan}</p>
                </div> */}

                <Link
                  href={`plans/view-plan/${item?._id}`}
                  className="active:bg-gray-300 mt-2 w-full p-3 font-semibold text-gray-600 border-2 border-transparent hover:border-gray-300 hover:bg-white rounded-lg flex gap-2 justify-center"
                >
                  Edit plan
                  <FiEdit2 size={20} />
                </Link>
              </div>
            ))
          ) : (
            <Loader isOpen={loanPackage < 1} />
          )}
        </div>
      </main>
    </DashboardLayout>
  );
};

export default LoanPackages;
