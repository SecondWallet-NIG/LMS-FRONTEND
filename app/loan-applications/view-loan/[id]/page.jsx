"use client";
import LoanProcessCard from "@/app/components/cards/loanProcessCard/LoanProcessCard";
import CustomerActivityLogs from "@/app/components/customers/CustomerActivityLogs";
import ActivityLogs from "@/app/components/customers/CustomerActivityLogs";
import Summary from "@/app/components/customers/CustomerSummary";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import EditableButton from "@/app/components/shared/editableBuutonComponent/EditableButton";
import InputField from "@/app/components/shared/input/InputField";
import ReusableDataTable from "@/app/components/shared/tables/ReusableDataTable";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiDatabase, FiPhone, FiSearch } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import { IoCopyOutline } from "react-icons/io5";
import { LuCalendar } from "react-icons/lu";

const ViewLoan = () => {
  const { id } = useParams();
  const [activityButton, setActivityButton] = useState("activity-logs");
  const [logSearch, setLogSearch] = useState(false);

  const loan_details_header = [
    {
      loan_type: "Loan_type",
      loan_purpose: "Purpose",
      maturity_amount: "Maturity amount",
      loan_period: "Loan period",
      maturity_date: "Maturity date",
      status: "Status",
    },
  ];

  const handleActivityToggle = (buttonId) => {
    setActivityButton(buttonId);
  };

  const handleLogSearch = (state) => {
    state === "open" ? setLogSearch(true) : setLogSearch(false);
  };

  return (
    <DashboardLayout>
      <main className="flex h-full">
        <section className="w-full">
          <section
            id="customer_details"
            className="flex gap-2 border-b border-gray-300 items-end py-4 px-8"
          >
            <div className="w-1/2">
              <div className="flex ">
                <div>
                  <Image
                    src={
                      "https://cdn-icons-png.flaticon.com/512/4128/4128349.png"
                    }
                    alt="user image"
                    width={60}
                    height={60}
                  />
                </div>
                <div className="ml-4 h-fit">
                  <p className="text-xl font-semibold text-swBlue mb-1">
                    Gerald Cole
                  </p>
                  <p className="text-xs">SW-456789</p>

                  <div className="flex gap-2 items-center h-fit w-fit mt-4">
                    <div className="p-[0.1rem] bg-transparent hover:bg-gray-200 w-fit h-fit m-auto rounded-md flex">
                      <Link
                        href="mailto: helloyt@gmail.com"
                        className="bg-white border border-gray-300 w-fit p-2 rounded-md"
                      >
                        <AiOutlineMail size={15} />
                      </Link>
                    </div>
                    <div className="p-[0.1rem] bg-transparent hover:bg-gray-200 w-fit h-fit m-auto rounded-md flex">
                      <Link
                        href="mailto: helloyt@gmail.com"
                        className="bg-white border border-gray-300 w-fit p-2 rounded-md"
                      >
                        <FiPhone size={15} />
                      </Link>
                    </div>
                    <div className="p-[0.1rem] bg-transparent hover:bg-gray-200 w-fit h-fit m-auto rounded-md flex">
                      <Link
                        href="mailto: helloyt@gmail.com"
                        className="bg-white border border-gray-300 w-fit p-2 rounded-md"
                      >
                        <LuCalendar size={15} />
                      </Link>
                    </div>
                    <div className="p-[0.1rem] bg-transparent hover:bg-gray-200 w-fit h-fit m-auto rounded-md flex">
                      <Link
                        href="mailto: helloyt@gmail.com"
                        className="bg-white border border-gray-300 w-fit p-2 rounded-md"
                      >
                        <FiDatabase size={15} />
                      </Link>
                    </div>
                    <EditableButton
                      className={
                        "text-white text-sm bg-swBlue px-5 py-2 ml-3 rounded-lg font-medium"
                      }
                    >
                      View profile
                    </EditableButton>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <div className="flex justify-between items-center gap-5">
                <div className="w-full bg-gray-100 rounded-xl p-2">
                  <p className="text-base font-medium">Loan ID:</p>
                  <div className="flex justify-between items-center">
                    <p className="text-2xl font-bold mt-4">GCL389281</p>
                    <div className="p-2 rounded-md hover:bg-white hover:border-2 hover:border-gray-200 mt-2">
                      <IoCopyOutline size={20} />
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-xl p-2">
                  <p className="text-base font-medium">Loan Amount:</p>
                  <p className="text-2xl font-bold mt-4">300,000.00</p>
                </div>
              </div>
            </div>
          </section>

          <div className="p-5">
            <section id="loan-details">{/* <ReusableDataTables/> */}</section>
            <section></section>
            <section
              id="activities"
              className="border border-gray-300 rounded-2xl"
            >
              {/* <div className="p-3 flex justify-between items-center"></div> */}
              <div className="flex items-center justify-between overflow-x-hidden border-b border-gray-300 py-2 px-4 flex-wrap">
                <div className="flex gap-2 text-xs lg:text-sm">
                  <EditableButton
                    onClick={() => handleActivityToggle("activity-logs")}
                    className={`${
                      activityButton === "activity-logs" &&
                      "font-semibold text-swBlue bg-blue-50"
                    } p-2 rounded-md cursor-pointer whitespace-nowrap`}
                  >
                    Activity logs
                  </EditableButton>
                  <EditableButton
                    onClick={() => handleActivityToggle("summary")}
                    className={`${
                      activityButton === "summary" &&
                      "font-semibold text-swBlue bg-blue-50"
                    } p-2 rounded-md cursor-pointer`}
                  >
                    Summary
                  </EditableButton>
                  <EditableButton
                    onClick={() => handleActivityToggle("loans")}
                    className={`${
                      activityButton === "loans" &&
                      "font-semibold text-swBlue bg-blue-50"
                    } p-2 rounded-md cursor-pointer`}
                  >
                    Loans
                  </EditableButton>
                  <EditableButton
                    onClick={() => handleActivityToggle("disbursement")}
                    className={`${
                      activityButton === "disbursement" &&
                      "font-semibold text-swBlue bg-blue-50"
                    } p-2 rounded-md cursor-pointer`}
                  >
                    Disbursment
                  </EditableButton>
                  <EditableButton
                    onClick={() => handleActivityToggle("repayment")}
                    className={`${
                      activityButton === "repayment" &&
                      "font-semibold text-swBlue bg-blue-50"
                    } p-2 rounded-md cursor-pointer`}
                  >
                    Repayments
                  </EditableButton>
                </div>

                <div className="flex justify-center items-center gap-2 ml-auto">
                  <InputField
                    startIcon={<FiSearch size={20} />}
                    endIcon={
                      <IoIosClose
                        size={20}
                        className="cursor-pointer"
                        onClick={() => {
                          handleLogSearch("close");
                        }}
                      />
                    }
                    placeholder={"Search..."}
                    css={`
                      ${logSearch
                        ? "translate-x-[3rem] opacity-1 z-10"
                        : "translate-x-[17rem] -z-10 opacity-0"} transition-all ease-in-out
                    `}
                    borderColor="bg-gray-200 "
                  />

                  <div
                    className={`${
                      logSearch ? "opacity-0" : "opacity-1"
                    } transition-all ease-in-out p-[0.1rem] bg-transparent hover:bg-gray-200 w-fit h-fit m-auto rounded-md flex`}
                  >
                    <div className="bg-white w-fit p-2 rounded-md cursor-pointer">
                      <FiSearch
                        size={20}
                        onClick={() => {
                          handleLogSearch("open");
                        }}
                      />
                    </div>
                  </div>
                  <div className="p-[0.1rem] bg-transparent hover:bg-gray-200 w-fit h-fit m-auto rounded-md flex cursor-pointer">
                    <div className="bg-white w-fit p-2 rounded-md ">
                      <BsThreeDotsVertical size={20} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-2">
                {activityButton === "activity-logs" && <CustomerActivityLogs />}
                {activityButton === "summary" && <Summary />}
              </div>
            </section>
          </div>
        </section>
        <section
          id="loan_process"
          className="w-[30%] border-l border-gray-300 h-full"
        >
          <p className="border-b border-gray-300 p-4 font-semibold  ">
            Loan Processes
          </p>
          <div className="p-2">
            <LoanProcessCard />
          </div>
        </section>
      </main>
    </DashboardLayout>
  );
};

export default ViewLoan;
