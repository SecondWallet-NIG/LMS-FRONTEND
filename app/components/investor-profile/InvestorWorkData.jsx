"use client"
import React, { useState, useEffect } from "react"
import Button from "../shared/buttonComponent/Button"
import Link from "next/link"

export default function InvestorWorkData({
    handleInfoHoverIn, data, openModal, valueClass,
    editButton, detailsHeader, labelClass, dataClass
}) {
    const pageData = [
        { label: 'Status', value: data?.data?.workStatus },
        { label: 'Employer Name', value: data?.data?.employmentInformation?.employerInformation?.name },
        { label: 'Employer Phone', value: data?.data?.employmentInformation?.employerInformation?.contact },
        { label: 'Job Title', value: data?.data?.employmentInformation?.jobTitle },
        { label: 'Position/Rank', value: data?.data?.employmentInformation?.position }
    ]

    const renderPageData = (label, value) => {
        return (
            <div className={`${dataClass}`}>
                <p className={`${labelClass}`}>{label}</p>
                <p className={`${valueClass}`}>
                    {value}
                </p>
            </div>
        )
    }

    return (
        <div className="">
            <div className="text-center mr-auto ml-auto mt-4">
                {data?.data?.employmentInformation === null ? (
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
                        <div className="p-2 border-b-2">
                            <div
                                className="flex justify-between"
                                onMouseEnter={() => handleInfoHoverIn("bio-data")}
                                onMouseLeave={() => handleInfoHoverIn("close")}
                            >
                                <p className={`${detailsHeader}`}>Employment details</p>
                                {editButton}
                            </div>

                            <div className="">
                                {pageData.map((d, index) => {
                                    return <div key={index}>{renderPageData(d.label, d.value)}</div>
                                })}
                            </div>

                            <Link
                                href={'/investors/create-investor'}
                                className={`py-1 px-2 text-swTextColor mt-4 mb-2 font-semibold rounded-md outline outline-1 
                                outline-gray-100 flex gap-2 border w-fit cursor-pointer text-sm
                            `}>
                                Add details
                            </Link>
                        </div>

                        {/* <div className="p-2 border-t border-text-300">
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
                                <div className={`${dataClass}`}>
                                    <p className={`${labelClass}`}hitespace-nowrap">Income Period: </p>
                                    <p className={`${valueClass}`}>
                                        {" "}
                                        {data?.data?.employmentInformation?.incomePeriod}
                                    </p>
                                </div>
                                <div className={`${dataClass}`}>
                                    <p className={`${labelClass}`}hitespace-nowrap">Amount Earned: </p>
                                    <p className={`${valueClass}`}>
                                        {" "}
                              ₦{" "}
                              {Number(
                                data?.data?.employmentInformation?.monthlyIncome
                              ).toLocaleString()}
                                    </p>
                                </div>
                                <div className={`${dataClass}`}>
                                    <p className={`${labelClass}`}hitespace-nowrap">Annual Income: </p>
                                    <p className={`${valueClass}`}>
                                        ₦{" "}
                                        {Number(
                                            data?.data?.data?.data?.annualIncome
                                        ).toLocaleString()}
                                    </p>
                                </div>
                                <div className={`${dataClass}`}>
                                    <p className={`${labelClass}`}hitespace-nowrap">Income Source: </p>
                                    <p className={`${valueClass}`}>
                                        {data?.data?.employmentInformation?.incomeSource}
                                    </p>
                                </div>
                            </div>
                        </div> */}
                    </div>
                )}
            </div>
        </div>
    )
}