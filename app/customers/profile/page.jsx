"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import Button from "@/app/components/shared/buttonComponent/Button";
import EmploymentDetailsModal from "@/app/components/modals/EmploymentDetailsModal";
import Image from "next/image";



const CustomerProfile = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("bio-data");

  const handleInfoToggle = (buttonId) => {
    setActiveButton(buttonId);
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
        <div className="flex gap-2 border-b border-gray-300 pb-3">
          <div className="w-1/2 ">
            <div className="flex">
              <div>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4128/4128349.png"
                  width={50}
                  height={50}
                />
              </div>
              <div className="ml-4">
                <p className="text-sm mb-2">Adebisi Tolani Obaje</p>
                <p className="text-xs">SW-456789</p>
              </div>
            </div>
          </div>
          <div className="w-1/2 text-end">
            <div className="ml-4">
              <p className="text-sm mb-2">Customer onboarded by: John Deo</p>
              <Button
                variant={"primary"}
                className="py-1.5 px-3 text-center rounded-md  gap-2 border w-[180px] mt-2"
              >
                Create loan
              </Button>
            </div>
          </div>
        </div>
        <div className="flex gap-2 border-b border-gray-300 pb-3">
          <div className="w-[30%]">
            <div className="flex gap-2 border-r border-gray-300">
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
                <div className="pt-4">
                  <p className="text-sm font-semibold ">Bio Data</p>
                  <div className="flex gap-2">
                    <div className="w-2/5">
                      <p className="pt-3 text-sm text-swGray">D.O.B: </p>
                      <p className="pt-3 text-sm text-swGray">Gender: </p>
                      <p className="pt-3 text-sm text-swGray">NIN/SSN: </p>
                      <p className="pt-3 text-sm text-swGray">Phone: </p>
                      <p className="pt-3 text-sm text-swGray">Email: </p>
                    </div>
                    <div className="w-3/5 ">
                      <p className="pt-3 text-sm text-swGray font-semibold ">
                        D.O.B
                      </p>
                      <p className="pt-3 text-sm text-swGray font-semibold ">
                        Gender
                      </p>
                      <p className="pt-3 text-sm text-swGray font-semibold ">
                        NIN/SSN
                      </p>
                      <p className="pt-3 text-sm text-swGray font-semibold ">
                        Phone
                      </p>
                      <p className="pt-3 text-sm text-swGray font-semibold ">
                        Email
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <p className="text-sm font-semibold ">Address Details</p>
                  <div className="flex gap-2">
                    <div className="w-2/5">
                      <p className="pt-3 text-sm text-swGray">D.O.B: </p>
                      <p className="pt-3 text-sm text-swGray">Gender: </p>
                      <p className="pt-3 text-sm text-swGray">NIN/SSN: </p>
                      <p className="pt-3 text-sm text-swGray">Phone: </p>
                      <p className="pt-3 text-sm text-swGray">Email: </p>
                    </div>
                    <div className="w-3/5 ">
                      <p className="pt-3 text-sm text-swGray font-semibold ">
                        D.O.B
                      </p>
                      <p className="pt-3 text-sm text-swGray font-semibold ">
                        Gender
                      </p>
                      <p className="pt-3 text-sm text-swGray font-semibold ">
                        NIN/SSN
                      </p>
                      <p className="pt-3 text-sm text-swGray font-semibold ">
                        Phone
                      </p>
                      <p className="pt-3 text-sm text-swGray font-semibold ">
                        Email
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <p className="text-sm font-semibold ">Bank Details</p>
                  <div className="flex gap-2">
                    <div className="w-2/5">
                      <p className="pt-3 text-sm text-swGray">D.O.B: </p>
                      <p className="pt-3 text-sm text-swGray">Gender: </p>
                      <p className="pt-3 text-sm text-swGray">NIN/SSN: </p>
                      <p className="pt-3 text-sm text-swGray">Phone: </p>
                      <p className="pt-3 text-sm text-swGray">Email: </p>
                    </div>
                    <div className="w-3/5 ">
                      <p className="pt-3 text-sm text-swGray font-semibold ">
                        D.O.B
                      </p>
                      <p className="pt-3 text-sm text-swGray font-semibold ">
                        Gender
                      </p>
                      <p className="pt-3 text-sm text-swGray font-semibold ">
                        NIN/SSN
                      </p>
                      <p className="pt-3 text-sm text-swGray font-semibold ">
                        Phone
                      </p>
                      <p className="pt-3 text-sm text-swGray font-semibold ">
                        Email
                      </p>
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
            <div className="ml-4">
            <div className="flex gap-2 border-r border-gray-300">
              <Button
                onClick={() => handleInfoToggle("bio-data")}
                variant={"secondary"}
                className="py-1.5 px-2 text-center text-sm rounded-md  gap-2 border mt-2"
              >
                Activity logs
              </Button>
              <Button
                onClick={() => handleInfoToggle("work")}
                variant={"secondary"}
                className="py-1.5 px-2 text-center text-sm rounded-md  gap-2 border mt-2"
              >
               Loans
              </Button>
              <Button
                onClick={() => handleInfoToggle("document")}
                variant={"secondary"}
                className="py-1.5 px-2 text-center text-sm rounded-md  gap-2 border mt-2"
              >
               Disbursement
              </Button>
              <Button
                onClick={() => handleInfoToggle("work")}
                variant={"secondary"}
                className="py-1.5 px-2 text-center text-sm rounded-md  gap-2 border mt-2"
              >
                Repayment
              </Button>
        
            </div>
            </div>
          </div>
        </div>
        {/* <div className="mt-8">
          <p className="text-md font-semibold">Personal Information</p>
          <div className="bg-swLightGray p-8 text-center w-3/5 mr-auto ml-auto mt-4">
            <p> Customer Information details </p>
            <p> Customer Information details </p>
            <p> Customer Information details </p>
          </div>
        </div>
        <div className="mt-8">
          <p className="text-md font-semibold mb-4">
            Employment and Income Details
          </p>
          <div className="bg-swLightGray p-8 text-center w-3/5 mr-auto ml-auto mt-4">
            <p> Employment and Income information not provided yet!</p>
            <div className="flex justify-center">
              <Button
                onClick={openModal}
                variant="secondary"
                className="py-2 px-9 rounded-md flex gap-2 border w-fit mt-10"
              >
                + Add Details
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <p className="text-md font-semibold mb-4">Documents Section</p>
          <div className="bg-swLightGray p-8 text-center w-3/5 mr-auto ml-auto mt-4">
            <p> No document uploaded yet</p>
            <div className="flex justify-center">
              <Button
                variant="secondary"
                className="py-2 px-9 rounded-md flex gap-2 border w-fit mt-10"
              >
                + Upload
              </Button>
            </div>
          </div>
        </div> */}
      </div>
      <div>
        <EmploymentDetailsModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </DashboardLayout>
  );
};

export default CustomerProfile;
