"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import Link from "next/link";
import { AiOutlineMail } from "react-icons/ai";
import { FiEdit2, FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import InputField from "@/app/components/shared/input/InputField";
import { IoIosClose } from "react-icons/io";
import CustomerLoanTable from "@/app/components/loans/CustomerLoanTable";
import UploadDocumentsModal from "@/app/components/modals/UploadDocumentsModal";
import dynamic from "next/dynamic";
import BorrowerOptions from "@/app/components/customers/BorrowerOptions";
import { getSingleInvestor } from "@/redux/slices/investmentSlice";
import InvestorSummary from "@/app/components/investments/InvestorSummary";
import InvestorProfileDocs from "@/app/components/investor-profile/InvestorProfileDocs";
import InvestorBioData from "@/app/components/investor-profile/InvestorBioData";
import InvestorWorkData from "@/app/components/investor-profile/InvestorWorkData";

// import Viewer from "react-viewer";
const Viewer = dynamic(
  () => import("react-viewer"),
  { ssr: false } // This line is important
);

const InvestorProfile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = useParams();
  const paths = ["Investors", "Investor profile"];
  const [roleTag, setRoleTag] = useState("");
  const { loading, error, data } = useSelector((state) => state.investment);
  const [isEmploymentDetailsModalOpen, setIsEmploymentDetailsModalOpen] = useState(false);
  const [isUploadDocumentsModalOpen, setIsUploadDocumentsModalOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("bio-data");
  const [activityButton, setActivityButton] = useState("summary");
  const [infoHover, setInfoHover] = useState("");
  const [logSearch, setLogSearch] = useState(false);
  const [borrowerOptions, setBorrowerOptions] = useState(false);
  const [openProfilePic, setOpenProfilePic] = useState(false);
  const [user, setUser] = useState(null);
  const [openedMessages, setOpenedMessages] = useState("unread");
  const buttonRef = useRef(null);
  const activeIcon = <div className="bg-swGreen p-0.5 rounded-full -mr-2 ml-2"></div>
  const dataClass = 'pt-3 grid grid-cols-2'
  const labelClass = 'text-sm text-swGray leading-5 flex gap-2'
  const valueClass = 'font-medium text-sm leading-5 text-swBlack -ml-8 w-fit'
  const detailsHeader = 'text-swBlack text-lg leading-7 my-1 font-semibold'
  const editButton = <div className="p-[0.1rem] bg-transparent hover:bg-gray-200 w-fit h-fit rounded-md flex">
    <Link
      href={"#"}
      className="bg-white w-fit p-2 rounded-md"
    >
      {infoHover === "bio-data" && (
        <FiEdit2
          size={16}
          className="text-swGray hover:text-black"
        />
      )}
    </Link>
  </div>

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser?.data?.user);
      setRoleTag(storedUser?.data?.user?.role?.tag);
    }
    dispatch(getSingleInvestor(id));
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
        <div className="flex flex-col justify-between lg:flex-row gap-2 border-b border-gray-300 items-end py-4 px-8">
          {/* Profile header */}
          <div className="w-full lg:w-1/2">
            <div className="flex items-start">
              <div className="rounded-full border-2 border-swGold overflow-hidden h-[58px] w-[58px] relative">
                <img
                  src={
                    data?.data?.profilePicture
                      ? data?.data?.profilePicture
                      : "https://cdn-icons-png.flaticon.com/512/4128/4128349.png"
                  }
                  alt="user"
                  width={58}
                  height={58}
                  className="cursor-pointer"
                  onClick={() =>
                    data?.data?.profilePicture && setOpenProfilePic(true)
                  }
                />
                {typeof window !== "undefined" ? (
                  <>
                    <Viewer
                      visible={openProfilePic}
                      onClose={() => {
                        setOpenProfilePic(false);
                      }}
                      images={[data?.data?.profilePicture].map((item) => ({
                        src: item,
                        key: item,
                      }))}
                    />
                  </>
                ) : null}
              </div>
              <div className="ml-4 h-fit">
                <div className="flex items-center gap-5">
                  <p className="text-xl font-semibold mb-1 text-swGold">
                    {data?.data?.firstName} {data?.data?.middleName}{" "}
                    {data?.data?.lastName}
                  </p>
                  {/* <div
                    className={`${data?.data?.investorStatus === "Active"
                      ? "bg-blue-50 text-swBlue"
                      : "bg-red-50 text-red-500"
                      } text-xs font-normal px-2 py-1 rounded-full`}
                  >
                    {data?.data?.investorStatus}
                  </div> */}
                </div>
                <p className="text-xs"> {data?.data?.investorId}</p>

                <div className="flex gap-2 items-center h-fit w-fit mt-4">
                  <div className="p-[0.1rem] bg-transparent hover:bg-gray-200 w-fit h-fit m-auto rounded-md flex">
                    <Link
                      href={`mailto:${data?.data?.email}`}
                      className="bg-white border border-gray-300 w-fit p-2 rounded-md"
                    >
                      <AiOutlineMail size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="w-full lg:w-1/2 sm:text-end">
            <div className="sm:ml-4 flex flex-col justify-between  sm:items-end">
              <p className="text-sm mb-5">
                Investor Onboarded By: <br />
                <span className="font-medium text-swTextColor leading-6">
                  {data?.data?.createdBy?.firstName}{" "}
                  {data?.data?.createdBy?.lastName}
                </span>
              </p>
              <div className="flex items-center">
                <div className="flex gap-5">
                  <Link
                    href={"/investors/create-investment"}
                    className="text-center rounded-md py-[0.4rem] px-3 bg-swBlue text-white border-2 border-white hover:border-blue-100"
                  >
                    Create Investment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="flex flex-col lg:flex-row px-2 lg:px-0">
          <div className="w-full lg:w-[30%] h-full p-2 lg:p-4">
            <div className="flex gap-2 text-xs lg:text-sm  items-center flex-wrap">
              {activeButton !== "bio-data" ? activeIcon : ""}
              <button
                onClick={() => handleInfoToggle("bio-data")}
                className={`${activeButton === "bio-data" &&
                  "font-semibold text-swBlue bg-blue-50"
                  } p-2 rounded-md cursor-pointer whitespace-nowrap`}
              >
                Personal Information
              </button>
        
              {activeButton !== "document" ? activeIcon : ""}
              <button
                onClick={() => handleInfoToggle("document")}
                className={`${activeButton === "document" &&
                  "font-semibold text-swBlue bg-blue-50"
                  } p-2 rounded-md cursor-pointer`}
              >
                Documents
              </button>
            </div>
            {activeButton == "bio-data" && (
              <InvestorBioData
                handleInfoHoverIn={handleInfoHoverIn}
                data={data}
                editButton={editButton}
                dataClass={dataClass}
                labelClass={labelClass}
                valueClass={valueClass}
                detailsHeader={detailsHeader}
              />
            )}
       
            {activeButton == "document" && (
              <InvestorProfileDocs
                data={data} openModal={openModal}
                labelClass={labelClass} handleInfoHoverIn={handleInfoHoverIn}
                detailsHeader={detailsHeader} editButton={editButton}
              />
            )}
          </div>

          <div className="w-full mt-10 md:mt-0 lg:w-[70%] md:border-l-2 border-gray-300 relative pb-20">
            <div className="py-2 px-4 flex items-center justify-between border-b border-gray-300 flex-wrap bg-white">
              <div className="flex gap-2 text-xs lg:text-sm">
                <button
                  onClick={() => handleActivityToggle("summary")}
                  className={`${activityButton === "summary" &&
                    "font-semibold text-swBlue bg-blue-50"
                    } p-2 rounded-md cursor-pointer`}
                >
                  Summary
                </button>
                <button
                  onClick={() => handleActivityToggle("investments")}
                  className={`${activityButton === "investments" &&
                    "font-semibold text-swBlue bg-blue-50"
                    } p-2 rounded-md cursor-pointer`}
                >
                  Investment
                </button>
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
        
              </div>
            </div>
            <div className="p-2">
              {activityButton === "summary" && <InvestorSummary />}
              {activityButton === "investments" && <CustomerLoanTable id={data?.data?._id} />}
            </div>
          </div>
        </div>
      </div>
      <div>
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

export default InvestorProfile;
