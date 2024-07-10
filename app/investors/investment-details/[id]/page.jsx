"use client"
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout"
import Button from "@/app/components/shared/buttonComponent/Button"
import ReusableDataTable from "@/app/components/shared/tables/ReusableDataTable"
import React, { useState, useEffect } from "react"
import { FiCopy, FiPlus } from "react-icons/fi"


export default function InvestmentDetails() {
    const headClass = 'text-lg font-semibold leading-7 text-swBlack mb-5'
    
    return (
        <DashboardLayout
            isBackNav={true}
            paths={["Investors", "Investment details"]}
        >
            <div>
                {/* Header */}
                <div className="border-b-2 pb-5 mb-5">
                    <div className="flex justify-between mt-10 px-5">
                        <div className="flex w-2/5 gap-4 relative">
                            <div className="rounded-full border-2 border-swYellow600 overflow-hidden h-[3.5rem] w-[3.5rem]">
                                <img
                                    src={"/images/inv-pfp.png"}
                                    alt="profile"
                                    className="cursor-pointer"
                                />
                            </div>
                            <div className="">
                                <p className="font-semibold text-xl text-swGold leading-7">Melondez Verz</p>
                                <p className="text-sm leading-5 text-swGray">INV-1837993</p>

                                <div className="flex justify-between gap-4 mt-5 text-sm">
                                    <Button className="rounded-md flex gap-2">
                                        <FiPlus size={20} />
                                        View profile
                                    </Button>
                                    <span className="rounded-md py-2 px-3 font-medium text-swBlue border border-sky-500 hover:shadow-lg cursor-pointer">
                                        Close investment
                                    </span>
                                </div>
                            </div>
                            <span className={`bg-swLightBlue text-xs text-white leading-4 h-5 rounded-full 
                        py-0.5 px-3 absolute left-64 top-4`
                            }>
                                Inprogress
                            </span>
                        </div>

                        <div className="flex justify-between w-3/5 gap-6 text-swTextColor pl-10">
                            <div className="bg-swGrey25 rounded-lg p-2 w-2/5 h-fit">
                                <p className="mb-3 text-base font-medium leading-6">Investment ID:</p>
                                <h2 className="font-bold leading-8 text-2xl">GCL389281</h2>
                            </div>
                            <div className="bg-swGrey25 w-3/5 p-2 rounded-lg h-fit">
                                <p className="mb-3 text-base font-medium leading-6">Investment amount:</p>
                                <div className="flex justify-between">
                                    <h2 className="font-bold leading-8 text-2xl">150,000,000.56</h2>
                                    <span className="flex gap-2 border text-sm px-3 py-2 font-semibold rounded-md cursor-pointer">
                                        <FiCopy className="" size={16} />
                                        <p className="-mt-0.5 ">Top up</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Investment details */}
                <div className="px-5">
                    <h1 className={`${headClass}`}>Investment Details</h1>
                </div>

                {/* ROI Breakdown */}
                <div className="px-5">
                    <h1 className={`${headClass}`}>ROI Breakdown</h1>
                </div>
            </div>
        </DashboardLayout>
    )
}