"use client"
import React, { useState, useEffect } from "react"
import Button from "../shared/buttonComponent/Button";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";

export default function StaffLeaveDetails({
    data, id, isDashboard
}) {
    let btnLink, btnText;
    const returnCardDetails = (name, value) => {
        return (
            <div>
                <p className="text-sm font-semibold">{name}</p>
                <p className="text-sm font-light">{value}</p>
            </div>
        );
    };

    if (isDashboard) {
        btnLink = ""
        btnText = "Request Leave"
    } else {
        btnLink = `/team-management/operations/employee-benefit/add-new/${id}`
        btnText = "Add Employee Benefit"
    }



    return (
        <div>
            <div className="p-5 border-2 shadow-lg rounded-lg h-full">
                <div className="flex justify-between">
                    <p className="text-xl font-medium text-swBlue">Leave Details</p>
                    {(!data?.employeeBenefit || isDashboard) && (
                        <Button className="bg-swBlue hover:bg-swBlue500 text-sm text-white md:p-[0.37rem] rounded-md ml-2 whitespace-nowrap">
                            <Link href={btnLink}
                                className="flex gap-1 items-center p-1"
                            >
                                {!isDashboard && <AiOutlinePlus size={15} />}
                                <p className="block">{btnText}</p>
                            </Link>
                        </Button>
                    )}
                </div>
                <div className="grid grid-cols-2 gap-5 mt-10">
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
        </div>
    )
}