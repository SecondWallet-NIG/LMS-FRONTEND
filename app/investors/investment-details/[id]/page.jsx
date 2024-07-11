"use client"
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout"
import SharedInvestmentModal from "@/app/components/modals/Investments/SharedInvestmentModal"
import Button from "@/app/components/shared/buttonComponent/Button"
import InputField from "@/app/components/shared/input/InputField"
import ReusableDataTable from "@/app/components/shared/tables/ReusableDataTable"
import Image from "next/image"
import React, { useState, useEffect } from "react"
import { FiCalendar, FiCopy, FiPlus } from "react-icons/fi"


export default function InvestmentDetails() {
    const [isModalOpen, setModal] = useState(false)
    const headClass = 'text-lg font-semibold leading-7 text-swBlack mb-5'
    const tableDataClass = ' py-3 text-sm leading-6 text-swBlack -ml-1'
    const tableOneHeader = [
        { label: 'Start Date' },
        { label: 'Investment Product ID & Package' },
        { label: 'Investment Amount & ROI' },
        { label: 'Investment Status' }
    ]

    const tableTwoHeader = [
        { label: 'Interest on investment' },
        { label: 'Duration' },
        { label: 'Maturity Amount' },
        { label: 'Maturity Date' }
    ]
    const modalChildren = <>
        <div>
            <div className="mx-auto w-fit p-6">
                <Image src={'/images/warning_sign.svg'} width={42} height={42} />
            </div>
            <p className="text-sm leading-5 text-center text-swBlack gap-2 p-6">
                You are trying to close this investment for this customer. Kindly input the date
            </p>
            <div className="gap-2 px-6">
                <InputField
                    name={"date"}
                    label={"Date"}
                    placeholder={"mm/dd/yyyy"}
                    required={true}
                    endIcon={<FiCalendar />}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-10 px-6">
                <span onClick={() => setModal(false)}
                    className={`py-2 px-12 flex justify-center text-swTextColor font-semibold rounded-md outline outline-1 
                     outline-gray-200 flex gap-2 border w-full cursor-pointer hover:shadow-lg
                    `}>
                    Cancel
                </span>

                <Button className="rounded-md font-semibold w-full">
                    Close Investment
                </Button>
            </div>
        </div>
    </>

    const renderTable = ({ tableHeader, tableContent }) => (
        <div className="border rounded-2xl overflow-x-auto">
            <div className="grid grid-cols-4 border-b py-2 bg-swLightGray rounded-t-2xl">
                {tableHeader.map((header, index) => {
                    return (
                        <h6 key={index} className={`${index !== 0 ? 'flex justify-between' : 'pl-10'}
                            leading-6 font-medium text-sm text-swBlack
                        `}>
                            {header.label}
                        </h6>
                    )
                })}
            </div>

            <div className="grid grid-cols-4 gap-4">
                {tableContent}
            </div>
        </div>
    );


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
                                    <span onClick={() => setModal(true)}
                                        className="rounded-md py-2 px-3 font-medium text-swBlue border border-sky-500 hover:shadow-lg cursor-pointer">
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

                <div className="gap-8">
                    {/* Investment details */}
                    <div className="px-5 gap-4 py-3">
                        <h1 className={`${headClass}`}>Investment Details</h1>
                        {renderTable({
                            tableHeader: tableOneHeader,
                            tableContent: <>
                                <p className={`pl-10 py-3`}>15th Aug, 2023</p>
                                <p>
                                    <p className={`${tableDataClass}`}>INVPRODUCT-1837993</p>
                                    <p className="text-swGray text-sm leading-5 -mt-3 -ml-1 mb-2">Package 1</p>
                                </p>
                                <p>
                                    <p className={`${tableDataClass}`}>5,000,000</p>
                                    <p className="text-swGray text-sm leading-5 -mt-3 -ml-1 mb-2">10% (Monthly)</p>
                                </p>
                                <p className={`-ml-1 mt-2 p-1 bg-swGreen200 text-xs text-swGreen700 leading-4 h-6 rounded-full w-fit`}>
                                    Payout Completed
                                </p>
                            </>,
                        })}
                    </div>

                    {/* Table 2 */}
                    <div className="px-5 py-5">
                        {renderTable({
                            tableHeader: tableTwoHeader,
                            tableContent: <>
                                <p className={`pl-10 py-3`}>300,000.00</p>
                                <p className={`${tableDataClass}`}>3 months</p>
                                <p className={`${tableDataClass}`}>3,300,000</p>
                                <p className={`${tableDataClass}`}>16/10/2023</p>
                            </>,
                        })}
                    </div>

                    {/* Transaction History */}
                    <div className="px-5 py-5">
                        <h1 className={`${headClass}`}>Transaction History</h1>
                    </div>
                </div>
            </div>

            <SharedInvestmentModal
                css={'max-w-lg'}
                header={'Close Investment'}
                isOpen={isModalOpen}
                onClose={setModal}
                children={modalChildren}
            />
        </DashboardLayout>
    )
}