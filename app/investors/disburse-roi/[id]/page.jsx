"use client"
import React, { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import InputField from "@/app/components/shared/input/InputField"
import { useDispatch, useSelector } from "react-redux"
import { useImmer } from "use-immer"
import SelectField from "@/app/components/shared/input/SelectField"
import { disburseROI, getSingleWithdrawalRequest } from "@/redux/slices/investmentSlice"
import { toast } from "react-toastify"
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout"
import Button from "@/app/components/shared/buttonComponent/Button"
import { AiOutlineDelete, AiOutlinePaperClip } from "react-icons/ai"

export default function DisburseROI() {
    const mtHeadClass = 'flex justify-between gap-12 mb-1'
    const mHeadClass = 'text-swTextColor leading-5 text-sm'
    const mClass = 'text-swBlack leading-5 text-sm font-medium'
    const { id } = useParams()
    const dispatch = useDispatch()
    const { data } = useSelector((state) => state.investment);
    const bankDetails = data?.data?.investment?.investorProfile
    const [fileError, setFileError] = useState("");
    const [isModalOpen, setModal] = useState(false)
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
        paymentReceipt: null,
        paymentMethod: ""
    })

    useEffect(() => {
        dispatch(getSingleWithdrawalRequest(id))
    }, [])


    const handleFileChange = (e) => {
        setFileError("");
        let { files } = e.target;
        const file = files[0];
        const fileExtension = file.name.split(".").pop().toLowerCase();

        const allowedExtensions = ["jpg", "jpeg", "png", "pdf"];
        if (!allowedExtensions.includes(fileExtension)) {
            setFileError(
                "Invalid file type. Please select an image (.jpg, .jpeg, .png) or PDF (.pdf)."
            );
            return;
        }
        setState(draft => {
            draft.paymentReceipt = file
        })
    };

    const paymentMethod = [
        { value: "Cash", label: "Cash" },
        { value: "Bank Transfer", label: "Bank Transfer" },
    ]

    
    const handleDisburseROI = () => {
        setLoading(true);
        const payload = new FormData();

        payload.append("withdrawalAmount", Number(data?.data?.withdrawalAmount));
        payload.append("paymentReceipt", state.paymentReceipt);
        payload.append("paymentMethod", state.paymentMethod);
        dispatch(disburseROI({ id, payload }))
            .unwrap()
            .then((res) => {
                toast.success(res?.message);
                setState(draft => {
                    draft.paymentMethod = ""
                    draft.paymentReceipt = null
                });
                setLoading(false);
            })
            .catch((err) => {
                toast.success(err?.message);
                setLoading(false);
            });
    };


    return (
        <DashboardLayout
            isBackNav={true}
            paths={["Investors", "Disburse ROI"]}
        >
            <div className="px-6 lg:w-1/2 mx-auto mt-20 pb-10">
                <h1 className="font-semibold text-2xl leading-8 text-black mb-16">
                    Disburse ROI
                </h1>
                <div className="flex gap-10 my-5">
                    <h6 className="font-medium text-base leading-6 text-swBlack">Bank details</h6>
                    <div>
                        <div className={`${mtHeadClass}`}>
                            <p className={`${mHeadClass}`}>Name</p>
                            <p className={`${mClass}`}>{bankDetails?.bankAccount?.bankName}</p>
                        </div>
                        <div className={`${mtHeadClass}`}>
                            <p className={`${mHeadClass}`}>Acc number</p>
                            <p className={`${mClass}`}>{bankDetails?.bankAccount?.accountNumber}</p>
                        </div>
                        <div className=" flex justify-between gap-8 mb-1">
                            <p className={`${mHeadClass}`}>Beneficiary</p>
                            <p className={`${mClass}`}>{bankDetails?.bankAccount?.accountName}</p>
                        </div>
                        <div className={`${mtHeadClass}`}>
                            <p className={`${mHeadClass}`}>BVN</p>
                            <p className={`${mClass}`}>{bankDetails?.bvn}</p>
                        </div>
                    </div>
                </div>
                <div className="mb-5">
                    <InputField
                        disabled={true}
                        name={"amountDue"}
                        label={"Amount Due"}
                        placeholder={data?.data?.withdrawalAmount}
                        required={true}
                        value={data?.data?.withdrawalAmount}
                        inputType={'number'}
                    />
                </div>
                <div className="mb-10">
                    <SelectField
                        name={"paymentMethod"}
                        label={"Payment method"}
                        required={true}
                        placeholder={"Select"}
                        optionValue={paymentMethod}
                        onChange={e => {
                            setState(draft => {
                                draft.paymentMethod = e.value
                            })
                        }}
                    />
                </div>

                <div className="pt-4">
                    <p className="font-medium pt-2 text-sm">Upload Payment Receipt</p>
                    <p className="text-xs pt-2">
                        Document types uploaded should be JPEGS, PNG or PDF and should not
                        exceed 4mb
                    </p>
                    {fileError && <p className="text-red-500 text-sm">{fileError}</p>}
                    <div className="relative w-full">
                        <input
                            name="paymentReceipt"
                            type="file"
                            id="fileInput"
                            className="absolute w-0 h-0 opacity-0"
                            onChange={handleFileChange}
                            onClick={(e) => (e.target.value = null)}
                        />
                        <label
                            htmlFor="fileInput"
                            className="px-4 py-2 text-white rounded-md cursor-pointer"
                        >
                            <span className="py-2 px-6 rounded-md flex gap-2 border w-full justify-center">
                                <AiOutlinePaperClip color="black" size={20} />
                                <p className="font-semibold text-black">
                                    {state?.paymentReceipt ? "Change file" : "Select file"}
                                </p>
                            </span>
                        </label>
                        {state?.paymentReceipt != null ? (
                            <div
                                id="fileLabel"
                                className="bg-swLightGray p-2 flex justify-between mb-4"
                            >
                                <div className="text-xs">
                                    {state?.paymentReceipt?.name}
                                </div>
                                <div
                                    onClick={() => {
                                        setState(draft => {
                                            draft.paymentReceipt = null
                                        })
                                    }}
                                >
                                    <AiOutlineDelete color="red" size={20} />
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Button onClick={handleDisburseROI}
                        disabled={state.amountDue === '' || state.paymentMethod === '' || loading ? true : false || data?.data?.status === "Paid"}
                        className="rounded-md text-md">
                        {data?.data?.status === "Paid" ? "Already Disbursed" : "Confirm"}
                    </Button>
                </div>
            </div>
        </DashboardLayout>
    )
}