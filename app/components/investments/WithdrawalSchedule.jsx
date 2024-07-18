"use client"
import React, { useState, useEffect } from "react"
import InvestmentsCards from "../cards/InvestmentsCard/InvestmentsCards"
import ReusableDataTable from "../shared/tables/ReusableDataTable";
import { useImmer } from "use-immer";
import SharedInvestmentModal from "../modals/Investments/SharedInvestmentModal";
import InputField from "../shared/input/InputField";
import SelectField from "../shared/input/SelectField";
import Button from "../shared/buttonComponent/Button";

export default function WithdrawalSchedule() {
    const tableDataClass = 'text-[15px] font-light whitespace-nowrap text-gray-700'
    const mtHeadClass = 'flex justify-between gap-12 mb-1'
    const mHeadClass = 'text-swTextColor leading-5 text-sm'
    const mClass = 'text-swBlack leading-5 text-sm font-medium item-center'
    const lightBtn = `py-2 px-3 text-swTextColor rounded-md outline outline-1 
    outline-gray-100 flex gap-2 border w-fit cursor-pointer text-sm hover:shadow-xl`
    const [isModalOpen, setModal] = useState(false)
    const [state, setState] = useImmer({
        bankDetails: {
            name: "",
            accNumber: "",
            beneficiary: "",
            bvn: ""
        }
    })
    const paymentMethod = [
        { value: "cash", label: "Cash" },
        { value: "bankTransfer", label: "Bank Transfer" },
    ]

    const cards = [
        { title: 'Total Number of Withdrawal Request', value: '22', extraVal: "35837828.93" },
        { title: 'Number of Paid Withdrawals', value: '12', extraVal: "35837828.93" },
        { title: 'Total Number of Unpaid Requests', value: '10', extraVal: "35837828.93" }
    ]

    const modalChildren = <div className="px-6 pb-10">
        <div className="flex gap-10 my-5">
            <h6 className="font-medium text-base leading-6 text-swBlack">Bank details</h6>
            <div>
                <div className={`${mtHeadClass}`}>
                    <p className={`${mHeadClass}`}>Name</p>
                    <p className={`${mClass}`}>{state.bankDetails.name}</p>
                </div>
                <div className={`${mtHeadClass}`}>
                    <p className={`${mHeadClass}`}>Acc number</p>
                    <p className={`${mClass}`}>{state.bankDetails.accNumber}</p>
                </div>
                <div className=" flex justify-between gap-8 mb-1">
                    <p className={`${mHeadClass}`}>Beneficiary</p>
                    <p className={`${mClass}`}>{state.bankDetails.beneficiary}</p>
                </div>
                <div className={`${mtHeadClass}`}>
                    <p className={`${mHeadClass}`}>BVN</p>
                    <p className={`${mClass}`}>{state.bankDetails.bvn}</p>
                </div>
            </div>
        </div>
        <div className="mb-5">
            <InputField
                disabled={true}
                name={"amountDue"}
                label={"Amount Due"}
                placeholder={"50,000"}
                required={true}
            />
        </div>
        <div className="mb-10">
            <SelectField
                name={"paymentMethod"}
                label={"Payment method"}
                required={true}
                placeholder={"Enter amount"}
                optionValue={paymentMethod}
            />
        </div>

        <div onClick={() => setModal(false)} className="flex justify-end gap-4">
            <div className={`${lightBtn}`}>
                Cancel
            </div>
            <Button className="rounded-md text-sm">
                Confirm
            </Button>
        </div>
    </div>

    const header = [
        { id: "dateLogged", label: "Date Logged" },
        { id: "investmentId", label: "Investor Name & ID" },
        { id: "datePaid", label: "Date Paid" },
        { id: "amountRequested", label: "Amount Requested" },
        { id: "disbursedBy", label: "Disbursed By" },
        { id: "status", label: "Status" },
        { id: "action", label: "Action" }
    ];

    const customDataTransformer = (apiData) => {
        return apiData?.investments?.map((item, i) => ({
            id: item._id,
            dateLogged: (
                <div className={`${tableDataClass}`}>
                    13/07/2024
                </div>
            ),
            investmentId: (
                <div className="flex gap-3">
                    <div>
                        <img
                            src={
                                item?.profilePicture ? item?.profilePicture
                                    : "https://cdn-icons-png.flaticon.com/512/4128/4128349.png"
                            }
                            alt="user"
                            width={32}
                            height={32} x
                            className="cursor-pointer border-2 border-swGold rounded-full"
                        />
                    </div>
                    <div>
                        <p className="text-[15px] mb-1">Melondez Verx</p>
                        <p className={`${tableDataClass}`}>INVPROFILE-183799</p>
                    </div>
                </div>
            ),
            datePaid: (
                <div className={`${tableDataClass}`}>
                    Nil
                </div>
            ),
            amountRequested: (
                <div>
                    <p className="text-[15px] mb-1">50,000</p>
                    <p className={`${tableDataClass}`}>10% Monthly</p>
                </div>
            ),
            disbursedBy: (
                <div className={`${tableDataClass}`}>
                    Adekunle Shina
                </div>
            ),
            status: (
                <button
                    className={`${item.status === "Pending"
                        ? "bg-[#E7F1FE] text-swBlue text-xs font-normal px-2 py-1 rounded-full"
                        : item.status === "Approved"
                            ? "bg-green-50 text-swGreen"
                            : "text-red-400 bg-red-100"
                        } px-2 py-1 rounded-full`}
                >
                    {item?.status}
                </button>
            ),
            action: (
                <div onClick={() => {
                    setState(draft => {
                        draft.bankDetails.name = item?.status
                        draft.bankDetails.accNumber = item?.status
                        draft.bankDetails.beneficiary = item?.status
                        draft.bankDetails.bvn = item?.status
                    })
                    setModal(true)
                }}
                    className={`${lightBtn}`}>
                    Disburse ROI
                </div>
            )
        }));
    };

    return (
        <div className="flex flex-col gap-5">
            <InvestmentsCards cards={cards} hasIcon={true} />
            <ReusableDataTable
                dataTransformer={customDataTransformer}
                headers={header}
                initialData={[]}
                apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/investment/all`}
                filters={true}
                pagination={true}
            />

            <SharedInvestmentModal
                css={"max-w-xl"}
                header={"Disburse ROI"}
                children={modalChildren}
                isOpen={isModalOpen}
                onClose={setModal}
            />
        </div>
    )
}