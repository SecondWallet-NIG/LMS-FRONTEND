"use client";
import { useState } from "react";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import InputField from "../components/shared/input/InputField";
import { FiSearch } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import LoanReports from "../components/report/Loan_Reports/Loan_Reports";

const Report = () => {
  const [reportToggle, setReportToggle] = useState("loan");
  const [searchBtn, setSearchBtn] = useState(false);

  const handleSearch = (state) => [
    state === "open" ? setSearchBtn(true) : setSearchBtn(false),
  ];

  const handleReports = (id) => {
    setReportToggle(id);
  };
  return (
    <DashboardLayout>
      <main className="p-5">
        <section
          aria-label="Report toggles"
          className="flex justify-between items-center"
        >
          <div className="flex">
            <div
              className={`cursor-pointer py-1 px-4 border-b-2 border-transparent ${
                reportToggle === "loan"
                  ? "text-swBlue border-b-swBlue font-bold"
                  : "text-swGray"
              }`}
              onClick={() => {
                handleReports("loan");
              }}
            >
              Loan Reports
            </div>
            <div
              className={`cursor-pointer py-1 px-4 border-b-2 border-transparent ${
                reportToggle === "summary"
                  ? "text-swBlue border-b-swBlue font-bold"
                  : "text-swGray"
              }`}
              onClick={() => {
                handleReports("summary");
              }}
            >
              Summary Reports
            </div>
            <div
              className={`cursor-pointer py-1 px-4 border-b-2 border-transparent ${
                reportToggle === "management"
                  ? "text-swBlue border-b-swBlue font-bold"
                  : "text-swGray"
              }`}
              onClick={() => {
                handleReports("management");
              }}
            >
              Management Reports
            </div>
          </div>

          <div className="flex justify-center items-center gap-2 ml-auto">
            <InputField
              startIcon={<FiSearch size={20} />}
              endIcon={
                <IoIosClose
                  size={20}
                  className="cursor-pointer"
                  onClick={() => {
                    handleSearch("close");
                  }}
                />
              }
              placeholder={"Search..."}
              css={`
                ${searchBtn
                  ? "translate-x-[3rem] opacity-1 z-10"
                  : "translate-x-[17rem] -z-10 opacity-0"} transition-all ease-in-out
              `}
              borderColor="bg-gray-200 "
            />

            <div
              className={`${
                searchBtn ? "opacity-0" : "opacity-1"
              } bg-white w-fit p-2 transition-all ease-in-out rounded-md border-2 border-transparent hover:border-gray-200 cursor-pointer`}
            >
              <FiSearch
                size={20}
                onClick={() => {
                  handleSearch("open");
                }}
              />
            </div>
            <div className="bg-white w-fit p-2 rounded-md border-2 border-transparent hover:border-gray-200 cursor-pointer">
              <BsThreeDotsVertical size={20} />
            </div>
          </div>
        </section>

        <section className="my-8">
          {reportToggle === "loan" && <LoanReports />}
        </section>
      </main>
    </DashboardLayout>
  );
};

export default Report;
