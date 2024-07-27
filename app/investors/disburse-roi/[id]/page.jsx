"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import InputField from "@/app/components/shared/input/InputField";
import { useDispatch, useSelector } from "react-redux";
import { useImmer } from "use-immer";
import {
    disburseROI,
    getSingleWithdrawalRequest,
} from "@/redux/slices/investmentSlice";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import Button from "@/app/components/shared/buttonComponent/Button";
import { AiOutlineDelete, AiOutlinePaperClip } from "react-icons/ai";
import { bankArr } from "@/constant";
import SuccessModal from "@/app/components/modals/SuccessModal";
import CancelModal from "@/app/components/modals/CancelModal";
import { useRouter } from "next/navigation";

export default function DisburseROI() {
    //   const mtHeadClass = "flex justify-between gap-32 mb-1";
    const mtHeadClass = "flex gap-1";
    const mHeadClass = "text-swTextColor leading-5 text-sm";
    const mClass = "text-swBlack leading-5 text-sm font-medium";
    const { id } = useParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.investment);
    const bankDetails = data?.data?.investment?.investorProfile;
    const [fileError, setFileError] = useState("");
    const [loading, setLoading] = useState(false);
    const [disburseRoiBtn, setDisburseRoiBtn] = useState(false);
    const [state, setState] = useImmer({
        bankDetails: {
            name: "",
            accNumber: "",
            beneficiary: "",
            bvn: "",
        },
        paymentReceipt: null,
        successModal: false,
        successMessage: "",
        failedModal: false,
        failedMessage: "",
    });
    const bankName = bankArr.find(
        (option) => option.value === bankDetails?.bankAccount?.bankName
    )?.label;

    useEffect(() => {
        if (typeof window !== "undefined") {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user?.data?.user?.role?.tag === "CFO") {
                setDisburseRoiBtn(true);
            }
        }
        dispatch(getSingleWithdrawalRequest(id));
    }, []);

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
        setState((draft) => {
            draft.paymentReceipt = file;
        });
    };

    const handleDisburseROI = () => {
        setLoading(true);
        const payload = new FormData();
        payload.append("paymentReceipt", state.paymentReceipt);

        dispatch(disburseROI({ id, payload }))
            .unwrap()
            .then((res) => {
                setState((draft) => {
                    draft.paymentReceipt = null;
                    draft.successModal = true;
                    draft.successMessage = res?.messsage;
                });
                dispatch(getSingleWithdrawalRequest(id));
                setLoading(false);
            })
            .catch((err) => {
                setState((draft) => {
                    draft.failedModal = true;
                    draft.failedMessage = err?.message;
                });
                setLoading(false);
            });
    };

  return (
    <DashboardLayout isBackNav={true} paths={["Investors", "Withdrawal"]}>
      <div className="px-6 lg:w-1/2 mx-auto mt-20 pb-10">
        <h1 className="font-semibold text-2xl leading-8 text-black mb-16">
          Withdrawal
        </h1>
        <div className="gap-44 my-5">
          <h6 className="font-medium text-base leading-6 text-swBlack">
            Bank details
          </h6>
          <div className="mt-5 max-w-xs flex flex-col gap-1">
            <div className={`${mtHeadClass}`}>
              <p className={`${mHeadClass} whitespace-nowrap`}>Name:</p>
              {/* <div className="border-b border-dashed w-full" /> */}
              <p className={`${mClass} whitespace-nowrap`}>
                {bankName ? bankName : bankDetails?.bankAccount?.bankName}
              </p>
            </div>
            <div className={`${mtHeadClass}`}>
              <p className={`${mHeadClass} whitespace-nowrap`}>Acc number:</p>
              {/* <div className="border-b border-dashed w-full" /> */}
              <p className={`${mClass} whitespace-nowrap`}>
                {bankDetails?.bankAccount?.accountNumber}
              </p>
            </div>
            <div className={`${mtHeadClass}`}>
              <p className={`${mHeadClass} whitespace-nowrap`}>Beneficiary:</p>
              {/* <div className="border-b border-dashed w-full" /> */}
              <p className={`${mClass} whitespace-nowrap`}>
                {bankDetails?.bankAccount?.accountName}
              </p>
            </div>
            <div className={`${mtHeadClass}`}>
              <p className={`${mHeadClass} whitespace-nowrap`}>BVN:</p>
              {/* <div className="border-b border-dashed w-full" /> */}
              <p className={`${mClass} whitespace-nowrap`}>
                {bankDetails?.bvn}
              </p>
            </div>
          </div>
        </div>
        <div className="lg:pr-20">
          <div className="mb-5">
            <InputField
              disabled={true}
              name={"amountDue"}
              label={"Amount Due"}
              placeholder={data?.data?.withdrawalAmount}
            />
          </div>
          <div className="mb-5">
            <InputField
              disabled={true}
              name={"paymentMethod"}
              label={"Payment Method"}
              placeholder={data?.data?.paymentMethod}
            />
          </div>

                    {/* Requesting receipt if it is transfer */}
                    {data?.data?.paymentMethod === "Bank Transfer" && (
                        <div className="pt-4">
                            <p className="font-medium pt-2 text-sm">Upload Payment Receipt</p>
                            <p className="text-xs pt-2">
                                Document types uploaded should be JPEGS, PNG or PDF and should
                                not exceed 4mb
                            </p>
                            {fileError && <p className="text-red-500 text-sm">{fileError}</p>}
                            <div className="relative w-full">
                                <input
                                    disabled={!disburseRoiBtn}
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
                                        <div className="text-xs">{state?.paymentReceipt?.name}</div>
                                        <div
                                            onClick={() => {
                                                setState((draft) => {
                                                    draft.paymentReceipt = null;
                                                });
                                            }}
                                        >
                                            <AiOutlineDelete color="red" size={20} />
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    )}

                    {disburseRoiBtn && (
                        <div className="flex justify-end gap-4">
                            <Button onClick={handleDisburseROI}
                                disabled={loading ? true : false || data?.data?.status === "Paid"
                                    || !state.paymentReceipt && data?.data?.paymentMethod === "Bank Transfer"}
                                className="rounded-md text-md">
                                {data?.data?.status === "Paid" ? "Already Disbursed" : "Confirm"}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <SuccessModal
                isOpen={state.successModal}
                description={state.successMessage}
                title={"Disburse Successful"}
                btnLeft={"Investment products"}
                btnLeftFunc={() => router.push("/investors")}
                btnRight={"Done"}
                btnRightFunc={() => setState(draft => {
                    draft.successModal = false
                })}
                onClose={() => setState(draft => {
                    draft.successModal = false
                })}
            />
            <CancelModal
                isOpen={state.failedModal}
                description={state.failedMessage}
                title={"Disburse Failed"}
                noButtons={true}
                onClose={() => setState(draft => {
                    draft.failedModal = false
                })}
            />
        </DashboardLayout>
    )
}
