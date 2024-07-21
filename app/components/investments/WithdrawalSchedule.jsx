"use client"
import React, { useState, useEffect } from "react"
import InvestmentsCards from "../cards/InvestmentsCard/InvestmentsCards"
import ReusableDataTable from "../shared/tables/ReusableDataTable";
import { useImmer } from "use-immer";
import SharedInvestmentModal from "../modals/Investments/SharedInvestmentModal";
import InputField from "../shared/input/InputField";
import SelectField from "../shared/input/SelectField";
import Button from "../shared/buttonComponent/Button";
import { format } from "date-fns";
import { bankArr } from "@/constant";
import { useDispatch, useSelector } from "react-redux";
import { disburseROI } from "@/redux/slices/investmentSlice";
import { toast, ToastContainer } from "react-toastify";


export default function WithdrawalSchedule() {
    const tableDataClass = 'text-[12px] md:text-[15px] font-light whitespace-nowrap text-gray-700'
    const mtHeadClass = 'flex justify-between gap-12 mb-1'
    const mHeadClass = 'text-swTextColor leading-5 text-sm'
    const mClass = 'text-swBlack leading-5 text-sm font-medium'
    const lightBtn = `py-2 px-3 text-swTextColor rounded-md outline outline-1 
    outline-gray-100 flex gap-2 border w-fit cursor-pointer text-sm hover:shadow-xl`
    const dispatch = useDispatch()
    const [isModalOpen, setModal] = useState(false  )
    const [loading, setLoading] = useState(false)
    const [state, setState] = useImmer({
        bankDetails: {
            name: "",
            accNumber: "",
            beneficiary: "",
            bvn: "",
        },
        investmentId: "",
        amountDue: "",
        paymentMethod: ""
    })


    const handleDisburseROI = () => {
        setLoading(true);
        dispatch(disburseROI(
            {
                id: investmentId,
                payload: {
                    withdrawalAmount: Number(state.amountDue),
                    paymentMethod: state.paymentMethod
                }
            })
        )
            .unwrap()
            .then((res) => {
                toast.success(res?.message);
                setState(draft => {
                    draft.amountDue = ""
                    draft.paymentMethod = ""
                });
                setModal(false);
                setLoading(false);
            })
            .catch((err) => {
                toast.success(err?.message);
                setLoading(false);
            });
    };

    const paymentMethod = [
        { value: "Cash", label: "Cash" },
        { value: "Bank Transfer", label: "Bank Transfer" },
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
                placeholder={state.amountDue}
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
                onChange={e => {
                    setState(draft => {
                        draft.paymentMethod = e.value
                    })
                }}
            />
        </div>

        <div className="flex justify-end gap-4">
            <div onClick={() => {
                setModal(false) 
                setState(draft => {
                    draft.paymentMethod = ''
                })
            }} 
            className={`${lightBtn}`}>
                Cancel
                </div>
            <Button onClick={handleDisburseROI}
                disabled={state.amountDue === '' || state.paymentMethod === '' || loading ? true : false}
                className="rounded-md text-sm">
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
        return apiData?.withdrawalRequests?.map((item, i) => ({
            id: item._id,
            dateLogged: (
                <div className={`${tableDataClass}`}>
                    {format(new Date(item?.createdAt), 'dd/MM/yyyy')}
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
                        <p className="text-[12px] md:text-[15px] mb-2">
                            {item?.investment?.investorProfile?.firstName} {" "}
                            {item?.investment?.investorProfile?.middleName} {""}
                            {item?.investment?.investorProfile?.lastName}
                        </p>
                        <p className={`${tableDataClass}`}>
                            {item?.investment?.investmentId}
                        </p>
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
                    <p className="text-[12px] md:text-[15px] mb-1"> {item?.withdrawalAmount}</p>
                    <p className={`${tableDataClass}`}>
                        {item?.investment?.interestRate?.value}% (
                        {item?.investment?.interestRate?.metric})
                    </p>
                </div>
            ),
            disbursedBy: (
                <div className={`${tableDataClass}`}>
                    {item?.approvedBy && (
                        <>
                            {item?.approvedBy?.firstName} {" "}
                            {item?.approvedBy?.middleName} {" "}
                            {item?.approvedBy?.lastName}
                        </>
                    )}
                    {item?.approvedBy ? '' : 'Nil'}
                </div>
            ),
            status: (
                <button
                    className={`${item.status === "Pending"
                        ? "bg-[#E7F1FE] text-swBlue text-xs font-normal px-2 py-1 rounded-full"
                        : item.status === "Paid"
                            ? "bg-green-50 text-swGreen"
                            : "text-red-400 bg-red-100"
                        } px-2 py-1 rounded-full`}
                >
                    {item?.status}
                </button>
            ),
            action: (
                <button onClick={() => {
                    setState(draft => {
                        draft.bankDetails.name = bankArr.find(
                            (option) =>
                                option.value ===
                                item?.investment?.investorProfile?.bankAccount?.bankName
                        )?.label
                        draft.investmentId = item?.investment?.investmentId
                        draft.bankDetails.accNumber = item?.investment?.investorProfile?.bankAccount?.accountNumber
                        draft.bankDetails.beneficiary = item?.investment?.investorProfile?.bankAccount?.accountName
                        draft.bankDetails.bvn = "00000000"
                        draft.amountDue = item?.withdrawalAmount

                    })
                    setModal(true)
                }}
                    className={`${lightBtn} ${item?.status === 'Paid' ? 'hover:shadow-none outline-none text-gray-300 bg-gray-100' : ''} `}
                    disabled={item?.status === 'Paid' ? true : false}>
                    Disburse ROI
                </button>
            )
        }));
    };

    return (
        <div className="flex flex-col gap-5">
            <ToastContainer />
            <InvestmentsCards cards={cards} hasIcon={true} />
            <ReusableDataTable
                dataTransformer={customDataTransformer}
                headers={header}
                initialData={[]}
                apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/investment/withdrawal-request/all`}
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