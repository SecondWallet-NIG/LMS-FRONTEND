"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import Button from "@/app/components/shared/buttonComponent/Button";
import EmploymentDetailsModal from "@/app/components/modals/EmploymentDetailsModal";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineMail, AiOutlinePlus } from "react-icons/ai";
import { FiDatabase, FiEdit2, FiPhone, FiSearch } from "react-icons/fi";
import { LuCalendar } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerById } from "@/redux/slices/customerSlice";
import { useParams } from "next/navigation";
import InputField from "@/app/components/shared/input/InputField";
import { IoIosClose } from "react-icons/io";
import CustomerActivityLogs from "@/app/components/customers/CustomerActivityLogs";
import CustomerSummary from "@/app/components/customers/CustomerSummary";
import CustomerLoanTable from "@/app/components/loans/CustomerLoanTable";
import UploadDocumentsModal from "@/app/components/modals/UploadDocumentsModal";
import CustomerProfileDocs from "@/app/components/customers/CustomerProfileDocs";
const CustomerProfile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = useParams();
  const paths = ["Borrowers", "Borrowers Profile"];
  const [roleTag, setRoleTag] = useState("");

  const { loading, error, data } = useSelector((state) => state.customer);

  const [isEmploymentDetailsModalOpen, setIsEmploymentDetailsModalOpen] =
    useState(false);
  const [isUploadDocumentsModalOpen, setIsUploadDocumentsModalOpen] =
    useState(false);
  const [activeButton, setActiveButton] = useState("bio-data");
  const [activityButton, setActivityButton] = useState("summary");
  const [infoHover, setInfoHover] = useState("");
  const [logSearch, setLogSearch] = useState(false);
  const [borrowerOptions, setBorrowerOptions] = useState(false);
  const buttonRef = useRef(null);
  console.log({ roleTag });

  const handleInfoToggle = (buttonId) => {
    setActiveButton(buttonId);
  };

  const handleActivityToggle = (buttonId) => {
    setActivityButton(buttonId);
  };

  const handleInfoHoverIn = (infoId) => {
    if (infoId === "close") setInfoHover("");
    setInfoHover(infoId);
  };

  const openModal = (id) => {
    id === "employmentDetails" && setIsEmploymentDetailsModalOpen(true);
    id === "uploadDocuments" && setIsUploadDocumentsModalOpen(true);
  };

  const closeModal = (id) => {
    id === "employmentDetails" && setIsEmploymentDetailsModalOpen(false);
    id === "uploadDocuments" && setIsUploadDocumentsModalOpen(false);
  };

  const handleLogSearch = (state) => {
    state === "open" ? setLogSearch(true) : setLogSearch(false);
  };

  const [user, setUser] = useState(null);
  const [openedMessages, setOpenedMessages] = useState("unread");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      // console.log({ storedUser });
      console.log({ localStorage });

      setUser(storedUser?.data?.user);
      setRoleTag(storedUser?.data?.user?.role?.tag);
    }
    dispatch(getCustomerById(id));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setBorrowerOptions(!borrowerOptions);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [borrowerOptions]);

  return (
    <DashboardLayout isBackNav={true} paths={paths}>
      <div className="overflow-x-hidden">
        <div className="flex gap-2 border-b border-gray-300 items-end py-4 px-8">
          <div className="w-1/2">
            <div className="flex ">
              <div className="rounded-full border-2 border-swBlue overflow-hidden h-[4.7rem] w-[4.7rem] relative">
                <img
                  src={
                    data?.profileInfo?.profilePicture
                      ? data?.profileInfo?.profilePicture
                      : "https://cdn-icons-png.flaticon.com/512/4128/4128349.png"
                  }
                  alt="user"
                />
              </div>
              <div className="ml-4 h-fit">
                <p className="text-xl font-semibold text-swBlue mb-1">
                  {data?.profileInfo?.firstName} {data?.profileInfo?.middleName}{" "}
                  {data?.profileInfo?.lastName}
                </p>
                <p className="text-xs"> {data?.profileInfo?.customerId}</p>

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
                      href={`/borrowers/profile/${id}/edit-borrower-profile`}
                      className="bg-white border border-gray-300 w-fit p-2 rounded-md"
                    >
                      <FiEdit2 size={15} />
                      {/* <FiPhone size={15} /> */}
                    </Link>
                  </div>
                  {/* <div className="p-[0.1rem] bg-transparent hover:bg-gray-200 w-fit h-fit m-auto rounded-md flex">
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
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 text-end">
            <div className="ml-4 flex flex-col justify-between items-end ">
              <p className="text-sm mb-2">
                Customer onboarded by: <br />
                <span className="font-semibold text-swGreen">
                  {" "}
                  {user?.firstName} {user?.lastName}{" "}
                </span>
              </p>
              <div className="flex gap-2 items-center">
                <div className="relative">
                  <div
                    className="border-2 border-transparent hover:border-swLightGray w-fit h-fit rounded-md cursor-pointer"
                    onClick={() => setBorrowerOptions(!borrowerOptions)}
                    // onClick={() => }
                  >
                    <div className="bg-white border border-gray-300 w-fit p-2 rounded-md ">
                      <BsThreeDotsVertical size={20} />
                    </div>
                  </div>
                  {borrowerOptions && (
                    <div
                      ref={buttonRef}
                      className="absolute right-0 border text-swBrown rounded-lg mt-2 p-2 w-60 bg-white z-30"
                    >
                      <p
                        className="hover:bg-swLightGray rounded-lg p-2 text-left cursor-pointer"
                        onClick={() => setBorrowerOptions(false)}
                      >
                        Blacklist borrower
                      </p>
                      <p
                        className="hover:bg-swLightGray rounded-lg p-2 text-left cursor-pointer"
                        onClick={() => setBorrowerOptions(false)}
                      >
                        Restrict borrower
                      </p>
                      <p
                        className="hover:bg-swLightGray rounded-lg p-2 text-left cursor-pointer"
                        onClick={() => setBorrowerOptions(false)}
                      >
                        Reassign borrower
                      </p>
                    </div>
                  )}
                </div>
                <Link
                  href={"/create-loan"}
                  // variant={"primary"}
                  className="text-center rounded-md py-[0.4rem] px-3 bg-swBlue text-white border-2 border-white hover:border-blue-100"
                  onClick={() => {
                    localStorage.setItem("borrower", JSON.stringify(data));
                    // router.push("/create-loan");
                    roleTag !== "LO"
                      ? router.push("/unauthorized")
                      : router.push("/create-loan");
                  }}
                >
                  Create loan
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-[30%] h-full p-2 md:p-4">
            <div className="flex gap-2 text-xs lg:text-sm  items-center flex-wrap">
              <button
                onClick={() => handleInfoToggle("bio-data")}
                className={`${
                  activeButton === "bio-data" &&
                  "font-semibold text-swBlue bg-blue-50"
                } p-2 rounded-md cursor-pointer whitespace-nowrap`}
              >
                Personal Info
              </button>
              <button
                onClick={() => handleInfoToggle("work")}
                className={`${
                  activeButton === "work" &&
                  "font-semibold text-swBlue bg-blue-50"
                } p-2 rounded-md cursor-pointer`}
              >
                Work
              </button>
              <button
                onClick={() => handleInfoToggle("document")}
                className={`${
                  activeButton === "document" &&
                  "font-semibold text-swBlue bg-blue-50"
                } p-2 rounded-md cursor-pointer`}
              >
                Documents
              </button>
            </div>
            {activeButton == "bio-data" && (
              <div>
                <div className="p-2">
                  <div
                    className="text-sm font-semibold flex justify-between"
                    onMouseEnter={() => handleInfoHoverIn("bio-data")}
                    onMouseLeave={() => handleInfoHoverIn("close")}
                  >
                    <p>Bio Data</p>
                    {infoHover === "bio-data" && (
                      <FiEdit2
                        size={15}
                        className="text-swGray hover:text-black"
                      />
                    )}
                  </div>

                  <div className=" text-xs  text-swGray">
                    <div className="flex justify-between">
                      <p className="pt-3">D.O.B: </p>
                      <p className="pt-3 font-semibold">
                        {data?.profileInfo?.dateOfBirth}
                      </p>
                    </div>
                    <div className="flex gap-1 justify-between">
                      <p className="pt-3">Gender: </p>
                      <p className="pt-3 font-semibold">
                        {data?.profileInfo?.gender}
                      </p>
                    </div>
                    <div className="flex gap-1 justify-between">
                      <p className="pt-3">NIN/SSN: </p>
                      <p className="pt-3 font-semibold">
                        {data?.profileInfo?.nin}
                      </p>
                    </div>
                    <div className="flex gap-1 justify-between">
                      <p className="pt-3">Phone: </p>
                      <p className="pt-3 font-semibold">
                        {data?.profileInfo?.phoneNumber}
                      </p>
                    </div>
                    <div className="flex gap-1 justify-between">
                      <p className="pt-3">Email: </p>
                      <p className="pt-3 font-semibold cursor-copy">
                        {data?.profileInfo?.email}
                      </p>
                    </div>

                    {/* <Button
                      onClick={() => {
                        handleActivityToggle("activity-log");
                      }}
                      variant={"secondary"}
                      size={"normal"}
                      className="py-1.5 text-sm rounded-md items-center flex gap-1 justify-between border mt-2"
                    >
                      <AiOutlinePlus size={20} />
                      <p className="whitespace-nowrap">Add details</p>
                    </Button> */}
                  </div>
                </div>
                <div className="p-2 border-t border-text-300">
                  <div
                    className="text-sm font-semibold flex justify-between "
                    onMouseEnter={() => handleInfoHoverIn("address")}
                    onMouseLeave={() => handleInfoHoverIn("close")}
                  >
                    <p>Address</p>
                    {infoHover === "address" && (
                      <FiEdit2
                        size={15}
                        className="text-swGray hover:text-black"
                      />
                    )}
                  </div>
                  <div className="mt-2 text-xs text-swGray">
                    <div className="flex gap-1 justify-between">
                      <p className="pt-3">Country: </p>
                      <p className="pt-3 font-semibold">Nigeria</p>
                    </div>
                    <div className="flex gap-1 justify-between">
                      <p className="pt-3">State: </p>
                      <p className="pt-3 font-semibold">Ekiti state</p>
                    </div>
                    <div className="flex gap-1 justify-between">
                      <p className="pt-3">Lga: </p>
                      <p className="pt-3 font-semibold">Ijero LGA/LCDA</p>
                    </div>
                    <div className="flex gap-1 justify-between">
                      <p className="pt-3 ">Address: </p>

                      <p className="pt-3 font-semibold">
                        {data?.profileInfo?.address}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-2 border-t border-gray-300">
                  <div
                    className="text-sm font-semibold flex justify-between"
                    onMouseEnter={() => handleInfoHoverIn("bank")}
                    onMouseLeave={() => handleInfoHoverIn("close")}
                  >
                    <p>Bank Details</p>
                    {infoHover === "bank" && (
                      <FiEdit2
                        size={15}
                        className="text-swGray hover:text-black"
                      />
                    )}
                  </div>
                  <div className="text-xs text-swGray">
                    <div className="flex gap-1 justify-between">
                      <p className="pt-3">Bank Name: </p>
                      <p className="pt-3 font-semibold">
                        {data?.profileInfo?.bankAccount?.bankName}
                      </p>
                    </div>
                    <div className="flex gap-1 justify-between">
                      <p className="pt-3">Account Number: </p>
                      <p className="pt-3 font-semibold">
                        {data?.profileInfo?.bankAccount?.accountNumber}
                      </p>
                    </div>
                    <div className="flex gap-1 justify-between">
                      <p className="pt-3">Account Name: </p>
                      <p className="pt-3 font-semibold">
                        {data?.profileInfo?.bankAccount?.accountName}
                      </p>
                    </div>
                    <div className="flex gap-1 justify-between">
                      <p className="pt-3">Bvn: </p>
                      <p className="pt-3 font-semibold">
                        {data?.profileInfo?.bvn}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeButton == "work" && (
              <div className="">
                <div className="text-center mr-auto ml-auto mt-4">
                  {data?.employmentInformation === null ? (
                    <div className="pt-20 pb-24">
                      <p> No work experience provided</p>
                      <Button
                        onClick={() => openModal("employmentDetails")}
                        variant="primary"
                        className="py-1.5 px-3 rounded-md mx-auto flex gap-2 border w-fit mt-5"
                      >
                        update work details
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <div className="p-2">
                        <div
                          className="text-sm font-semibold flex justify-between"
                          onMouseEnter={() => handleInfoHoverIn("bio-data")}
                          onMouseLeave={() => handleInfoHoverIn("close")}
                        >
                          <p>Employment details</p>
                          {infoHover === "bio-data" && (
                            <FiEdit2
                              size={15}
                              className="text-swGray hover:text-black"
                            />
                          )}
                        </div>

                        <div className=" text-xs  text-swGray">
                          <div className="flex justify-between">
                            <p className="pt-3">Status: </p>
                            <p className="pt-3 font-semibold">
                              {
                                data?.employmentInformation
                                  ?.currentEmploymentStatus
                              }
                            </p>
                          </div>
                          <div className="flex gap-1 justify-between">
                            <p className="pt-3">Employer Name: </p>
                            <p className="pt-3 font-semibold">
                              {
                                data?.employmentInformation?.employerInformation
                                  ?.name
                              }
                            </p>
                          </div>
                          <div className="flex gap-1 justify-between">
                            <p className="pt-3">Employer Phone: </p>
                            <p className="pt-3 font-semibold">
                              {
                                data?.employmentInformation?.employerInformation
                                  ?.contact
                              }
                            </p>
                          </div>
                          <div className="flex gap-1 justify-between">
                            <p className="pt-3">Job Title: </p>
                            <p className="pt-3 font-semibold">
                              {data?.employmentInformation?.jobTitle}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 border-t border-text-300">
                        <div
                          className="text-sm font-semibold flex justify-between "
                          onMouseEnter={() => handleInfoHoverIn("address")}
                          onMouseLeave={() => handleInfoHoverIn("close")}
                        >
                          <p>Income details</p>
                          {infoHover === "address" && (
                            <FiEdit2
                              size={15}
                              className="text-swGray hover:text-black"
                            />
                          )}
                        </div>
                        <div className="mt-2 text-xs text-swGray">
                          <div className="flex gap-1 justify-between">
                            <p className="pt-3">Income Period: </p>
                            <p className="pt-3 font-semibold">
                              {" "}
                              {data?.employmentInformation?.incomeSource}
                            </p>
                          </div>
                          <div className="flex gap-1 justify-between">
                            <p className="pt-3">Amount Earned: </p>
                            <p className="pt-3 font-semibold">
                              {" "}
                              {data?.employmentInformation?.monthlyIncome}
                            </p>
                          </div>
                          <div className="flex gap-1 justify-between">
                            <p className="pt-3">Annual Income: </p>
                            <p className="pt-3 font-semibold">
                              {" "}
                              {data?.employmentInformation?.monthlyIncome}
                            </p>
                          </div>
                          <div className="flex gap-1 justify-between">
                            <p className="pt-3 ">Income Source: </p>

                            <p className="pt-3 font-semibold">
                              {data?.employmentInformation?.incomeSource}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {activeButton == "document" && (
              <div className="pt-20 pb-24">
                {data?.identityVerification === null ? (
                  <div className="pt-8 text-center mr-auto ml-auto mt-4">
                    <p> No document uploaded yet</p>
                    <div className="flex justify-center">
                      <Button
                        onClick={() => openModal("uploadDocuments")}
                        variant="primary"
                        className="py-1.5 px-3 rounded-md flex gap-2 border w-fit mt-5"
                      >
                        Upload documents
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="-mt-20">
                    <div className="pt-4 font-semibold text-md text-swBlue pl-4">
                      Identification verification/Document
                    </div>
                    <CustomerProfileDocs data={data} />
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="w-[70%] border-l h-screen border-gray-300 relative">
            <div className="py-2 px-4 flex items-center justify-between border-b border-gray-300 flex-wrap bg-white">
              <div className="flex gap-2 text-xs lg:text-sm">
                {/* <button
                  onClick={() => handleActivityToggle("activity-logs")}
                  className={`${
                    activityButton === "activity-logs" &&
                    "font-semibold text-swBlue bg-blue-50"
                  } p-2 rounded-md cursor-pointer whitespace-nowrap`}
                >
                  Activity logs
                </button> */}
                <button
                  onClick={() => handleActivityToggle("summary")}
                  className={`${
                    activityButton === "summary" &&
                    "font-semibold text-swBlue bg-blue-50"
                  } p-2 rounded-md cursor-pointer`}
                >
                  Summary
                </button>
                <button
                  onClick={() => handleActivityToggle("loans")}
                  className={`${
                    activityButton === "loans" &&
                    "font-semibold text-swBlue bg-blue-50"
                  } p-2 rounded-md cursor-pointer`}
                >
                  Loans
                </button>
                {/* <button
                  onClick={() => handleActivityToggle("disbursement")}
                  className={`${
                    activityButton === "disbursement" &&
                    "font-semibold text-swBlue bg-blue-50"
                  } p-2 rounded-md cursor-pointer`}
                >
                  Disbursment
                </button>
                <button
                  onClick={() => handleActivityToggle("repayment")}
                  className={`${
                    activityButton === "repayment" &&
                    "font-semibold text-swBlue bg-blue-50"
                  } p-2 rounded-md cursor-pointer`}
                >
                  Repayments
                </button> */}
              </div>

              <div className="flex justify-center items-center gap-2 relative ml-auto">
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
                  <div
                    className="bg-white border border-gray-300 w-fit p-2 rounded-md cursor-pointer"
                    onClick={() => {
                      handleLogSearch("open");
                    }}
                  >
                    <FiSearch size={20} />
                  </div>
                </div>
                {/* <div className="p-[0.1rem] bg-transparent hover:bg-gray-200 w-fit h-fit m-auto rounded-md flex cursor-pointer">
                  <div className="bg-white border border-gray-300 w-fit p-2 rounded-md ">
                    <BsThreeDotsVertical size={20} />
                  </div>
                </div> */}
              </div>
            </div>
            <div className="p-2">
              {activityButton === "summary" && <CustomerSummary />}
              {activityButton === "loans" && (
                <CustomerLoanTable id={data?.profileInfo?._id} />
              )}
            </div>
          </div>
        </div>
        {/*  */}
      </div>
      <div>
        <EmploymentDetailsModal
          isOpen={isEmploymentDetailsModalOpen}
          onClose={closeModal}
          getCustomer={getCustomerById}
        />
        <UploadDocumentsModal
          isOpen={isUploadDocumentsModalOpen}
          onClose={closeModal}
          customerID={id}
        />
      </div>
    </DashboardLayout>
  );
};

export default CustomerProfile;
