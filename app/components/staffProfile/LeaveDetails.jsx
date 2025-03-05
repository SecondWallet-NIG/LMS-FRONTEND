"use client";
import React, { useState } from "react";
import Button from "../shared/buttonComponent/Button";
import { AiOutlinePlus } from "react-icons/ai";
import RequestLeaveModal from "../leaveRequest/RequestLeaveModal";
import RightModal from "../modals/RightModal";
import { useRouter } from "next/navigation";
import { FiEdit } from "react-icons/fi";

export default function StaffLeaveDetails({ data, id, isDashboard }) {
  const router = useRouter();
  const [openLeaveRequestModal, setOpenLeaveRequestModal] = useState(false);
  console.log({data});
  
  let btnLink, btnText;

  const returnCardDetails = (name, value) => {
    return (
      <div>
        <div className="font-medium text-swGrey400 text-sm">{name}</div>
        <div className="text-sm font-light text-swBlack">{value}</div>
      </div>
    );
  };

  if (isDashboard) {
    btnLink = "";
    btnText = "Request Leave";
  } else {
    btnLink = `/team-management/operations/employee-benefit/add-new/${id}`;
    btnText = data?.employeeBenefit ? "Update Employee Benefit" : "Assign Employee Benefit"; // Update text if benefit is assigned
  }

  return (
    <div>
      <div className="rounded-xl overflow-hidden h-full flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-start p-5 bg-[#f7f7f7] border-b flex-wrap gap-5">
          <div>
            <p className=" text-lg font-semibold text-swBlue">Leave Details</p>
      
              <p className="text-sm text-swGray400">
                Important details concerning your leave request.
              </p>
             
        
          </div>
      
            <Button
              className="border border-swBlue text-swBlue hover:bg-swDarkBlue text-sm p-3 rounded-md whitespace-nowrap flex gap-1"
              onClick={() =>
                isDashboard
                  ? setOpenLeaveRequestModal(true)
                  : router.push(btnLink)
              }
            >
              {!isDashboard && <AiOutlinePlus size={15} />}
              <p className="">{btnText}</p>
            </Button>
          
        </div>

        <div className="p-5 bg-[#f7f7f7] h-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-5 rounded-xl bg-white p-5 h-full">
            {returnCardDetails(
              "Annual Leave",
              `${data?.employeeBenefit?.leaveTypes?.annualLeave || 0} working ${
                data?.employeeBenefit?.leaveTypes?.annualLeave === 1
                  ? "day"
                  : "days"
              }`
            )}
            {returnCardDetails(
              "Sick Leave",
              `${data?.employeeBenefit?.leaveTypes?.sickLeave || 0} working ${
                data?.employeeBenefit?.leaveTypes?.sickLeave === 1
                  ? "day"
                  : "days"
              }`
            )}
            {returnCardDetails(
              "Maternity Leave",
              `${
                data?.employeeBenefit?.leaveTypes?.maternityLeave || 0
              } working ${
                data?.employeeBenefit?.leaveTypes?.maternityLeave === 1
                  ? "day"
                  : "days"
              }`
            )}
            {/* {returnCardDetails(
              "Paternity Leave",
              `${
                data?.employeeBenefit?.benefitType?.leaveTypes
                  ?.paternityLeave || 0
              } working ${
                data?.employeeBenefit?.benefitType?.leaveTypes
                  ?.paternityLeave === 1
                  ? "day"
                  : "days"
              }`
            )} */}
            {returnCardDetails(
              "Unpaid Leave",
              `${
                data?.employeeBenefit?.benefitType?.leaveTypes?.unpaidLeave || 0
              } working ${
                data?.employeeBenefit?.benefitType?.leaveTypes?.unpaidLeave ===
                1
                  ? "day"
                  : "days"
              }`
            )}
            {returnCardDetails(
              "Casual Leave",
              `${
                data?.employeeBenefit?.benefitType?.leaveTypes?.personalLeave ||
                0
              } working ${
                data?.employeeBenefit?.benefitType?.leaveTypes
                  ?.personalLeave === 1
                  ? "day"
                  : "days"
              }`
            )}
          </div>
        </div>
      </div>
      <RightModal
        isOpen={openLeaveRequestModal}
        onClose={() => setOpenLeaveRequestModal(false)}
        className="mt-8"
      >
        <RequestLeaveModal onClose={setOpenLeaveRequestModal} />
      </RightModal>
    </div>
  );
}
