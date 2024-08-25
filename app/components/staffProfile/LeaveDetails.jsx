"use client";
import React, { useState, useEffect } from "react";
import Button from "../shared/buttonComponent/Button";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import CenterModal from "../modals/CenterModal";
import RequestLeaveModal from "../leaveRequest/RequestLeaveModal";
import RightModal from "../modals/RightModal";
import RequestLeaveModal from "../leaveRequest/RequestLeaveModal";

export default function StaffLeaveDetails({ data, id, isDashboard }) {
  const [openLeaveRequestModal, setOpenLeaveRequestModal] = useState(false);
  let btnLink, btnText;
  const returnCardDetails = (name, value) => {
    return (
      <div>
        <p className="text-xs font-medium text-swGrey400">{name}</p>
        <p className="text-sm font-medium text-swBlack">{value}</p>
      </div>
    );
  };

  if (isDashboard) {
    btnLink = "";
    btnText = "Request Leave";
  } else {
    btnLink = `/team-management/operations/employee-benefit/add-new/${id}`;
    btnText = "Add Employee Benefit";
  }

  if (isDashboard) {
    btnLink = `/employee-dashboard/request-leave/${id}`;
    btnText = "Request Leave";
  } else {
    btnLink = `/team-management/operations/employee-benefit/add-new/${id}`;
    btnText = "Add Employee Benefit";
  }
    return (
        <div>
            <div className="p-2 border-2 rounded-lg h-full">
                <div className="flex justify-between">
                    <p className="text-md font-medium text-swBlue">Leave Details</p>
                    {(!data?.employeeBenefit || isDashboard) && (
                        <Button className="bg-white border border-swBlue text-swBlue hover:text-white hover:bg-swDarkBlue text-xs md:p-[0.37rem] rounded-md ml-2 whitespace-nowrap" onClick={() => setOpenLeaveRequestModal(true) }>
                          
                                {!isDashboard && <AiOutlinePlus size={15} />}
                                <p className="block text-swBlue hover:text-white">{btnText}</p>
                           
                        </Button>
                    )}
                </div>
                <div className="grid grid-cols-2 gap-5 mt-2">
                    {returnCardDetails(
                        "Annual Leave",
                        `${data?.employeeBenefit?.benefitType?.leaveTypes
                            ?.annualLeave || 0
                        } days`
                    )}
                    {returnCardDetails(
                        "Sick Leave",
                        `${data?.employeeBenefit?.benefitType?.leaveTypes
                            ?.sickLeave || 0
                        } days`
                    )}
                    {returnCardDetails(
                        "Maternity Leave",
                        `${data?.employeeBenefit?.benefitType?.leaveTypes
                            ?.maternityLeave || 0
                        } days`
                    )}
                    {returnCardDetails(
                        "Paternity Leave",
                        `${data?.employeeBenefit?.benefitType?.leaveTypes
                            ?.paternityLeave || 0
                        } days`
                    )}
                    {returnCardDetails(
                        "Unpaid Leave",
                        `${data?.employeeBenefit?.benefitType?.leaveTypes
                            ?.unpaidLeave || 0
                        } days`
                    )}
                </div>
            </div>
            <RightModal isOpen={openLeaveRequestModal} onClose={() => setOpenLeaveRequestModal(false)} className="mt-8">
                <RequestLeaveModal />
            </RightModal>

        </div>
    
 
  );
}
