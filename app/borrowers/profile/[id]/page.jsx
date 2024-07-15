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
import dynamic from "next/dynamic";
import { bankArr } from "@/constant";
import { formatDate } from "@/helpers";
import BorrowerOptions from "@/app/components/customers/BorrowerOptions";

// import Viewer from "react-viewer";
const Viewer = dynamic(
  () => import("react-viewer"),
  { ssr: false } // This line is important
);

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
  const [openProfilePic, setOpenProfilePic] = useState(false);
  const buttonRef = useRef(null);


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
        <div className="flex flex-col sm:flex-row gap-2 border-b border-gray-300 items-end py-4 px-8">
          <div className="w-full sm:w-1/2">
            <div className="flex items-start">
              <div className="rounded-full border-2 border-swBlue overflow-hidden h-[4.7rem] w-[4.7rem] relative">
                <img
                  src={
                    data?.profileInfo?.profilePicture
                      ? data?.profileInfo?.profilePicture
                      : "https://cdn-icons-png.flaticon.com/512/4128/4128349.png"
                  }
                  alt="user"
                  className="cursor-pointer"
                  onClick={() =>
                    data?.profileInfo?.profilePicture && setOpenProfilePic(true)
                  }
                />
                {typeof window !== "undefined" ? (
                  <>
                    <Viewer
                      visible={openProfilePic}
                      onClose={() => {
                        setOpenProfilePic(false);
                      }}
                      images={[data?.profileInfo?.profilePicture].map(
                        (item) => ({
                          src: item,
                          key: item,
                        })
                      )}
                    />
                  </>
                ) : null}
              </div>
              <div className="ml-4 h-fit">
                <div className="flex items-center gap-5">
                  <p className="text-xl font-semibold text-swBlue mb-1">
                    {data?.profileInfo?.firstName}{" "}
                    {data?.profileInfo?.middleName}{" "}
                    {data?.profileInfo?.lastName}
                  </p>
                  <div
                    className={`${
                      data?.profileInfo?.status === "Active"
                        ? "bg-blue-50 text-swBlue"
                        : "bg-red-50 text-red-500"
                    } text-xs font-normal px-2 py-1 rounded-full`}
                  >
                    {data?.profileInfo?.status}
                  </div>
                </div>
                <p className="text-xs"> {data?.profileInfo?.customerId}</p>

                <div className="flex gap-2 items-center h-fit w-fit mt-4">
                  <div className="p-[0.1rem] bg-transparent hover:bg-gray-200 w-fit h-fit m-auto rounded-md flex">
                    <Link
                      href={`mailto:${data?.profileInfo?.email}`}
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
                </div>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-1/2 sm:text-end">
            <div className="sm:ml-4 flex flex-col justify-between  sm:items-end">
              <p className="text-sm mb-2">
                Customer onboarded by: <br />
                <span className="font-semibold text-swGreen">
                  {data?.profileInfo?.createdBy?.email} on{" "}
                  {formatDate(data?.profileInfo?.createdAt.slice(0, 10))}
                </span>
              </p>
              <div className="flex items-center">
                {/* <div className="relative">
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
                </div> */}

                <div className="flex gap-5">
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
                    Create Loan
                  </Link>
                  <div className="relative">
                    <div
                      className={`p-2 px-4 border-2 rounded-md ${
                        data?.profileInfo?.status === "Blacklisted"
                          ? "pointer-events-none cursor-not-allowed bg-gray-200 text-gray-400"
                          : "cursor-pointer hover:border-blue-100 text-swBlue"
                      } `}
                      onClick={() => setBorrowerOptions(!borrowerOptions)}
                    >
                      Blacklist
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-[30%] h-full p-2 md:p-4">
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
                  </div>

                  <div className=" text-xs  text-swGray">
                    <div className="pt-3 flex items-center gap-1">
                      <p className="">D.O.B: </p>
                      <div className="w-full border-t border-dashed" />
                      <p className="font-semibold text-swBlue whitespace-nowrap">
                        {data?.profileInfo?.dateOfBirth}
                      </p>
                    </div>
                    <div className="pt-3 flex gap-1 items-center">
                      <p className="">Gender: </p>
                      <div className="w-full border-t border-dashed" />
                      <p className="font-semibold text-swBlue">
                        {data?.profileInfo?.gender}
                      </p>
                    </div>
                    <div className="pt-3 flex gap-1 items-center">
                      <p className="">NIN/SSN: </p>
                      <div className="w-full border-t border-dashed" />
                      <p className="font-semibold text-swBlue">
                        {data?.profileInfo?.nin}
                      </p>
                    </div>
                    <div className="pt-3 flex gap-1 items-center">
                      <p className="">Phone: </p>
                      <div className="w-full border-t border-dashed" />
                      <p className="font-semibold text-swBlue">
                        {data?.profileInfo?.phoneNumber}
                      </p>
                    </div>
                    <div className="pt-3 flex gap-1 items-center">
                      <p className="">Email: </p>
                      <div className="w-full border-t border-dashed" />
                      <p className="font-semibold cursor-copy text-swBlue">
                        {data?.profileInfo?.email}
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
                    <p>Address</p>
                  </div>
                  <div className="mt-2 text-xs text-swGray">
                    <div className="pt-3 flex gap-1 items-center">
                      <p className="">Country: </p>
                      <div className="w-full border-t border-dashed" />
                      <p className=" font-semibold text-swBlue"> Nigeria</p>
                    </div>
                    <div className="pt-3 flex gap-1 items-center">
                      <p className="">State: </p>
                      <div className="w-full border-t border-dashed" />
                      <p className=" font-semibold text-swBlue">
                        {data?.profileInfo?.state}
                      </p>
                    </div>
                    <div className="pt-3 flex gap-1 items-center">
                      <p className="">Lga: </p>
                      <div className="w-full border-t border-dashed" />
                      <p className="font-semibold text-swBlue">
                        {data?.profileInfo?.lga}
                      </p>
                    </div>
                    <div className="pt-3 flex gap-1 items-center">
                      <p className="">Address: </p>
                      <div className="w-full border-t border-dashed" />
                      <p className="font-semibold text-swBlue">
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
                  </div>
                  <div className="text-xs text-swGray">
                    <div className="pt-3 flex gap-1 items-center">
                      <p className="whitespace-nowrap">Bank Name: </p>
                      <div className="w-full border-t border-dashed" />
                      <p className="whitespace-nowrap font-semibold text-swBlue">
                        {
                          bankArr.find(
                            (option) =>
                              option.value ===
                              data?.profileInfo?.bankAccount?.bankName
                          )?.label
                        }
                      </p>
                    </div>
                    <div className="pt-3 flex gap-1 items-center">
                      <p className="whitespace-nowrap">Account Number: </p>
                      <div className="w-full border-t border-dashed" />
                      <p className="font-semibold text-swBlue">
                        {data?.profileInfo?.bankAccount?.accountNumber}
                      </p>
                    </div>
                    <div className="pt-3 flex gap-1 items-center">
                      <p className="whitespace-nowrap">Account Name: </p>
                      <div className="w-full border-t border-dashed" />
                      <p className="whitespace-nowrap font-semibold text-swBlue">
                        {data?.profileInfo?.bankAccount?.accountName}
                      </p>
                    </div>
                    <div className="pt-3 flex gap-1 items-center">
                      <p className="">Bvn: </p>
                      <div className="w-full border-t border-dashed" />
                      <p className="font-semibold text-swBlue">
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
                          <div className="pt-3 flex items-center">
                            <p className="">Status: </p>
                            <div className="w-full border-t border-dashed" />
                            <p className="font-semibold text-swBlue">
                              {
                                data?.employmentInformation
                                  ?.currentEmploymentStatus
                              }
                            </p>
                          </div>
                          <div className="pt-3 flex gap-1 items-center">
                            <p className="whitespace-nowrap ">
                              Employer Name:{" "}
                            </p>
                            <div className="w-full border-t border-dashed" />
                            <p className="whitespace-nowrap font-semibold text-swBlue">
                              {
                                data?.employmentInformation?.employerInformation
                                  ?.name
                              }
                            </p>
                          </div>
                          <div className="pt-3 flex gap-1 items-center">
                            <p className="whitespace-nowrap ">
                              Employer Phone:{" "}
                            </p>
                            <div className="w-full border-t border-dashed" />
                            <p className="font-semibold text-swBlue">
                              {
                                data?.employmentInformation?.employerInformation
                                  ?.contact
                              }
                            </p>
                          </div>
                          <div className="pt-3 flex gap-1 items-center">
                            <p className="whitespace-nowrap ">Job Title: </p>
                            <div className="w-full border-t border-dashed" />
                            <p className="whitespace-nowrap font-semibold text-swBlue">
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
                          <div className="pt-3 flex gap-1 items-center">
                            <p className="whitespace-nowrap">Income Period: </p>
                            <div className="w-full border-t border-dashed" />
                            <p className="whitespace-nowrap font-semibold text-swBlue">
                              {" "}
                              {data?.employmentInformation?.incomePeriod}
                            </p>
                          </div>
                          <div className="pt-3 flex gap-1 items-center">
                            <p className="whitespace-nowrap">Amount Earned: </p>
                            <div className="w-full border-t border-dashed" />
                            <p className="whitespace-nowrap font-semibold text-swBlue">
                              {" "}
                              ₦{" "}
                              {Number(
                                data?.employmentInformation?.monthlyIncome
                              ).toLocaleString()}
                            </p>
                          </div>
                          <div className="pt-3 flex gap-1 items-center">
                            <p className="whitespace-nowrap">Annual Income: </p>
                            <div className="w-full border-t border-dashed" />
                            <p className="whitespace-nowrap font-semibold text-swBlue">
                              ₦{" "}
                              {Number(
                                data?.employmentInformation?.monthlyIncome * 12
                              ).toLocaleString()}
                            </p>
                          </div>
                          <div className="pt-3 flex gap-1 items-center">
                            <p className="whitespace-nowrap">Income Source: </p>
                            <div className="w-full border-t border-dashed" />
                            <p className="whitespace-nowrap font-semibold text-swBlue">
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
          <div className="w-full mt-10 md:mt-0 md:w-[70%] md:border-l h-screen border-gray-300 relative">
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
        <BorrowerOptions open={borrowerOptions} onClose={setBorrowerOptions} />
      </div>
    </DashboardLayout>
  );
};

export default CustomerProfile;
