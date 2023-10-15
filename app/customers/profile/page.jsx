"use client";

import React, { useState } from "react";
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
import ActivityLogs from "@/app/components/customers/ActivityLogs";

const CustomerProfile = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("bio-data");
  const [activityButton, setActivityButton] = useState("activity-logs");
  const [infoHover, setInfoHover] = useState("");

  const handleInfoToggle = (buttonId) => {
    setActiveButton(buttonId);
  };

  const handleActivityToggle = (buttonId) => {
    setActivityButton(buttonId);
    console.log(buttonId);
  };

  const handleInfoHoverIn = (infoId) => {
    if (infoId === "close") setInfoHover("");
    setInfoHover(infoId);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex gap-2 border-b border-swGray pb-3">
          <div className="w-1/2">
            <div className="flex ">
              <div>
                <Image
                  src={
                    "https://cdn-icons-png.flaticon.com/512/4128/4128349.png"
                  }
                  alt="user image"
                  width={50}
                  height={50}
                />
              </div>
              <div className="ml-4 h-fit">
                <p className="text-sm mb-2">Adebisi Tolani Obaje</p>
                <p className="text-xs">SW-456789</p>

                <div className="flex gap-2 items-center h-fit w-fit mt-4">
                  <div className="p-[0.1rem] bg-transparent hover:bg-gray-300 w-fit h-fit m-auto rounded-md flex">
                    <Link
                      href="mailto: helloyt@gmail.com"
                      className="bg-white border border-gray-300 w-fit p-2 rounded-md"
                    >
                      <AiOutlineMail size={15} />
                    </Link>
                  </div>
                  <div className="p-[0.1rem] bg-transparent hover:bg-gray-300 w-fit h-fit m-auto rounded-md flex">
                    <Link
                      href="mailto: helloyt@gmail.com"
                      className="bg-white border border-gray-300 w-fit p-2 rounded-md"
                    >
                      <FiPhone size={15} />
                    </Link>
                  </div>
                  <div className="p-[0.1rem] bg-transparent hover:bg-gray-300 w-fit h-fit m-auto rounded-md flex">
                    <Link
                      href="mailto: helloyt@gmail.com"
                      className="bg-white border border-gray-300 w-fit p-2 rounded-md"
                    >
                      <LuCalendar size={15} />
                    </Link>
                  </div>
                  <div className="p-[0.1rem] bg-transparent hover:bg-gray-300 w-fit h-fit m-auto rounded-md flex">
                    <Link
                      href="mailto: helloyt@gmail.com"
                      className="bg-white border border-gray-300 w-fit p-2 rounded-md"
                    >
                      <FiDatabase size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 text-end">
            <div className="ml-4 flex flex-col justify-between items-end ">
              <p className="text-sm mb-2">
                Customer onboarded by: <br />
                <span className="font-semibold"> John Deo</span>
              </p>
              <div className="flex gap-2 items-center">
                <div className="p-[0.1rem] bg-transparent hover:bg-gray-300 w-fit h-fit m-auto rounded-md flex -mb-[0.05rem]">
                  <div className="bg-white border border-gray-300 w-fit p-2 rounded-md ">
                    <BsThreeDotsVertical size={20} />
                  </div>
                </div>
                <Button
                  variant={"primary"}
                  className="text-center rounded-md  gap-2 border w-[180px] mt-2"
                >
                  Create loan
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-[30%] border-r border-swGray">
            <div className="flex gap-2">
              <Button
                onClick={() => handleInfoToggle("bio-data")}
                variant={"secondary"}
                className="py-1.5 px-2 text-center text-sm rounded-md  gap-2 border mt-2"
              >
                Personal Info
              </Button>
              <Button
                onClick={() => handleInfoToggle("work")}
                variant={"secondary"}
                className="py-1.5 px-2 text-center text-sm rounded-md  gap-2 border mt-2"
              >
                Work
              </Button>
              <Button
                onClick={() => handleInfoToggle("document")}
                variant={"secondary"}
                className="py-1.5 px-2 text-center text-sm rounded-md  gap-2 border mt-2"
              >
                Documents
              </Button>
            </div>
            {activeButton == "bio-data" && (
              <div>
                <div className="p-4">
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
                  <div className="flex gap-2">
                    <div className="w-2/5 text-sm text-swGray">
                      <p className="pt-3">D.O.B: </p>
                      <p className="pt-3">Gender: </p>
                      <p className="pt-3">NIN/SSN: </p>
                      <p className="pt-3">Phone: </p>
                      <p className="pt-3">Email: </p>
                      <Button
                        onClick={() => handleActivityToggle("activity-log")}
                        variant={"secondary"}
                        size={"normal"}
                        className="py-1.5 text-sm rounded-md items-center flex gap-1 border mt-2"
                      >
                        <AiOutlinePlus size={20} />{" "}
                        <p className="whitespace-nowrap">Add details</p>
                      </Button>
                    </div>
                    <div className="w-3/5 text-sm text-swGray font-semibold">
                      <p className="pt-3">D.O.B</p>
                      <p className="pt-3">Gender</p>
                      <p className="pt-3">NIN/SSN</p>
                      <p className="pt-3">Phone</p>
                      <p className="pt-3">Email</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-swGray">
                  <div
                    className="text-sm font-semibold flex justify-between"
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
                  <div className="flex gap-2">
                    <div className="w-2/5 text-sm text-swGray">
                      <p className="pt-3">Country: </p>
                      <p className="pt-3">State: </p>
                      <p className="pt-3">Lga: </p>
                      <p className="pt-3">House no: </p>
                      <p className="pt-3">Address: </p>
                    </div>
                    <div className="w-3/5 text-sm text-swGray font-semibold">
                      <p className="pt-3">D.O.B</p>
                      <p className="pt-3">Gender</p>
                      <p className="pt-3">NIN/SSN</p>
                      <p className="pt-3">Phone</p>
                      <p className="pt-3">Email</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-swGray">
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
                  <div className="flex gap-2">
                    <div className="w-2/5 text-sm text-swGray">
                      <p className="pt-3">Bank Name: </p>
                      <p className="pt-3">Acct Number: </p>
                      <p className="pt-3">Beneficiary: </p>
                      <p className="pt-3">Bvn: </p>
                    </div>
                    <div className="w-3/5 text-sm text-swGray font-semibold">
                      <p className="pt-3">D.O.B</p>
                      <p className="pt-3">Gender</p>
                      <p className="pt-3">NIN/SSN</p>
                      <p className="pt-3">Phone</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeButton == "work" && (
              <div className="pt-20 pb-24">
                <div className="pt-8 text-center mr-auto ml-auto mt-4">
                  <p> No work experience provided</p>
                  <div className="flex justify-center">
                    <Button
                      onClick={openModal}
                      variant="primary"
                      className="py-1.5 px-3 rounded-md flex gap-2 border w-fit mt-5"
                    >
                      update work details
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {activeButton == "document" && (
              <div className="pt-20 pb-24">
                <div className="pt-8 text-center mr-auto ml-auto mt-4">
                  <p> No document uploaded yet</p>
                  <div className="flex justify-center">
                    <Button
                      onClick={openModal}
                      variant="primary"
                      className="py-1.5 px-3 rounded-md flex gap-2 border w-fit mt-5"
                    >
                      Upload documents
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="w-[70%]">
            <div className="border-b border-swGray pb-2">
              <div className="flex ml-4 gap-2">
                <Button
                  onClick={() => handleActivityToggle("activity-logs")}
                  variant={"secondary"}
                  className="py-1.5 px-2 text-center text-sm rounded-md  gap-2 border mt-2"
                >
                  Activity logs
                </Button>
                <Button
                  onClick={() => handleActivityToggle("summary")}
                  variant={"secondary"}
                  className="py-1.5 px-2 text-center text-sm rounded-md  gap-2 border mt-2"
                >
                  Summary
                </Button>
                <Button
                  onClick={() => handleActivityToggle("loans")}
                  variant={"secondary"}
                  className="py-1.5 px-2 text-center text-sm rounded-md  gap-2 border mt-2"
                >
                  Loans
                </Button>
                <Button
                  onClick={() => handleActivityToggle("disbursement")}
                  variant={"secondary"}
                  className="py-1.5 px-2 text-center text-sm rounded-md  gap-2 border mt-2"
                >
                  Disbursements
                </Button>
                <Button
                  onClick={() => handleActivityToggle("repayment")}
                  variant={"secondary"}
                  className="py-1.5 px-2 text-center text-sm rounded-md  gap-2 border mt-2"
                >
                  Repayments
                </Button>
              </div>
              <div className="w-full mt-4 flex">
                <div className="ml-auto flex gap-2">
                  <div className="p-[0.1rem] bg-transparent hover:bg-gray-300 w-fit h-fit m-auto rounded-md flex -mb-[0.05rem]">
                    <div className="bg-white border border-gray-300 w-fit p-2 rounded-md ">
                      <FiSearch size={20} />
                    </div>
                  </div>
                  <div className="p-[0.1rem] bg-transparent hover:bg-gray-300 w-fit h-fit m-auto rounded-md flex -mb-[0.05rem]">
                    <div className="bg-white border border-gray-300 w-fit p-2 rounded-md ">
                      <BsThreeDotsVertical size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-2">
              {activityButton === "activity-logs" && <ActivityLogs />}
            </div>
          </div>
        </div>
        {/*  */}
      </div>
      <div>
        <EmploymentDetailsModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </DashboardLayout>
  );
};

export default CustomerProfile;
