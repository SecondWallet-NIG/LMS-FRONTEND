"use client";

import React, { useState } from "react";
import ReusableDataTable from "../shared/tables/ReusableDataTable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../shared/buttonComponent/Button";
import CenterModal from "../modals/CenterModal";
import InputField from "../shared/input/InputField";
import SelectField from "../shared/input/SelectField";
import { AiOutlinePaperClip } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import {
  logRepaymentFunc,
  reapplyInstallmentAllocations,
  getApprovalJobStatus,
} from "@/redux/slices/loanRepaymentSlice";
import { useDispatch } from "react-redux";
import { format, isValid } from "date-fns";
import { FaRegCalendar } from "react-icons/fa";
import { DayPicker } from "react-day-picker";
import { checkDecimal } from "../helpers/utils";

import ConfirmationModal from "../shared/warningModal/WarningModal";

const LOG_AMOUNT_EPS = 0.01;

const parseRepaymentAmountInput = (value) => {
  const normalized = String(value ?? "")
    .replace(/,/g, "")
    .trim();
  const amount = parseFloat(normalized);
  return Number.isFinite(amount) ? amount : NaN;
};

const CustomerRepayment = ({ loanId, status, repaymentType, data }) => {
  const outstandingBalance =
    Number(data?.loanApplication?.outstandingBalance) || 0;
  const dispatch = useDispatch();
  const [logRepayment, setLogRepayment] = useState(false);
  const [enableLogRepaymentBtn, setEnableLogRepaymentBtn] = useState(true);
  const [enableLogRepayment, setEnableLogRepayment] = useState(true);
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState("");
  const [openDateCollected, setOpenDateCollected] = useState(false);
  const [formData, setFormData] = useState({
    repaymentMethod: "",
    repaymentAmount: "",
    clearBalance: false,
    dateCollected: new Date(),
    repaymentReceipts: null,
  });

  const isEquated = repaymentType === "equatedRepayment";
  const usesAccrualFieldsForType =
    repaymentType === "installmentPayment" || isEquated;

  const parsedLogAmount = parseRepaymentAmountInput(formData?.repaymentAmount);
  const exceedsOutstandingBalance =
    Number.isFinite(parsedLogAmount) &&
    parsedLogAmount > outstandingBalance + LOG_AMOUNT_EPS;

  const handleFileChange = (e) => {
    setFileError("");
    let { name, files } = e.target;
    const file = files[0];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    const allowedExtensions = ["jpg", "jpeg", "png", "pdf"];
    if (!allowedExtensions.includes(fileExtension)) {
      setFileError(
        "Invalid file type. Please select an image (.jpg, .jpeg, .png) or PDF (.pdf).",
      );
      return;
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: file,
    }));
  };

  const deleteFile = (name) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: null,
    }));
  };

  const setInputState = async (e) => {
    let { name, value } = e.target;
    const ariaLabel = e.target.getAttribute("aria-label");

    if (ariaLabel === "Number input") {
      const num = Number(value.replace(/\D/g, ""));
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: num,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = async (selectedOption, name) => {
    setFormData({
      ...formData,
      [name]: selectedOption.value,
    });
  };

  const paymentMethodTypes = [
    { value: "Card", label: "Card" },
    { value: "Bank transfer", label: "Bank Transfer" },
  ];

  const headers = [
    { id: "createdAt", label: "Due Date" },
    { id: "amountDue", label: "Amount Due" },
    ...(isEquated
      ? [{ id: "scheduledAmountDue", label: "Scheduled Repayment" }]
      : []),
    { id: "loggedBy", label: "Collected By" },
    { id: "repaymentMethod", label: "Payment Method" },
    { id: "amountPaid", label: "Amount Paid" },
    { id: "balanceToPay", label: "Balance To Pay" },
    { id: "status", label: "Loan Status" },
  ];

  const customDataTransformer = (apiData) => {
    if (apiData?.length > 0) {
      setEnableLogRepayment(false);
    }
    return apiData?.map((item) => {
      const principal = Number(item?.repaymentPrincipal) ?? 0;
      const overdueForInstallment = Number(item?.amountAccruedForOverdue) || 0;
      const rawAmountDue = Number(item?.amountDue) || 0;
      // Interest from API = sum of Loan Interest transactions for this repayment's cycle; else schedule remainder
      const computedInterest =
        item?.computedInterest != null && item?.computedInterest !== ""
          ? Number(item.computedInterest)
          : Math.max(0, rawAmountDue - principal);

      const usesAccrualFields = usesAccrualFieldsForType;

      // Installment: amount due = principal + accrued interest (ledger) + penalty — not projected amountDue.
      // Equated: same shape, but "accrued interest" is real-time (uncapped by the original schedule),
      // matching accruedAmountDue/accruedInterestRemaining returned by the backend.
      let actualAmountDue;
      let displayInterest;
      if (usesAccrualFields) {
        if (isEquated) {
          displayInterest =
            item?.accruedInterestRemaining != null &&
            item?.accruedInterestRemaining !== ""
              ? Number(item.accruedInterestRemaining)
              : computedInterest;
          actualAmountDue =
            item?.accruedAmountDue != null && item?.accruedAmountDue !== ""
              ? Number(item.accruedAmountDue)
              : principal + displayInterest + overdueForInstallment;
        } else {
          const maxScheduleInterest = Math.max(0, rawAmountDue - principal);
          if (
            item?.interestRemaining != null &&
            item?.interestRemaining !== ""
          ) {
            displayInterest = Number(item.interestRemaining);
          } else if (maxScheduleInterest <= 0 && computedInterest > 0) {
            displayInterest = 0;
          } else {
            displayInterest = Math.min(computedInterest, maxScheduleInterest);
          }
          actualAmountDue =
            item?.accruedAmountDue != null && item?.accruedAmountDue !== ""
              ? Number(item.accruedAmountDue)
              : principal + displayInterest + overdueForInstallment;
        }
      } else {
        actualAmountDue = principal + computedInterest + overdueForInstallment;
        displayInterest = computedInterest;
      }

      // Scheduled (original-plan) figures — equated only.
      const scheduledAmountDue =
        item?.fixedSchedule?.amountDue != null
          ? Number(item.fixedSchedule.amountDue)
          : 0;
      const scheduledPrincipal =
        item?.fixedSchedule?.repaymentPrincipal != null
          ? Number(item.fixedSchedule.repaymentPrincipal)
          : 0;
      const scheduledInterest =
        item?.fixedSchedule?.repaymentInterest != null
          ? Number(item.fixedSchedule.repaymentInterest)
          : 0;

      const amountPaid = Number(item?.amountPaid) || 0;
      const paidFromInterest = Number(item?.amountPaidFromInterest) || 0;
      const paidFromPrincipal = Number(item?.amountPaidFromPrincipal) || 0;

      // Balance to pay: for equated, trust the backend's accrued-based balanceToPay
      // directly (do not recompute from scheduled interestRemaining — that's a
      // different, capped number now and would understate/overstate what's owed).
      let balanceToPay;
      if (isEquated) {
        balanceToPay =
          item?.balanceToPay != null && item?.balanceToPay !== ""
            ? Number(item.balanceToPay)
            : Math.max(0, actualAmountDue - amountPaid);
      } else {
        const balanceFromBuckets =
          item?.principalRemaining != null && item?.interestRemaining != null
            ? Number(item.principalRemaining) +
              Number(item.interestRemaining) +
              overdueForInstallment
            : null;
        balanceToPay =
          usesAccrualFields && balanceFromBuckets != null
            ? balanceFromBuckets
            : usesAccrualFields &&
                item?.balanceToPay != null &&
                item?.balanceToPay !== ""
              ? Number(item.balanceToPay)
              : Math.max(0, actualAmountDue - amountPaid);
      }

      const originalPrincipal =
        item?.fixedSchedule?.repaymentPrincipal != null
          ? Number(item.fixedSchedule.repaymentPrincipal)
          : null;
      const principalAdjusted =
        usesAccrualFields &&
        originalPrincipal != null &&
        Math.abs(originalPrincipal - principal) > 0.5;

      const row = {
        id: item._id,
        createdAt: (
          <div className="text-md font-[500] text-gray-700">
            {item?.dueDate?.slice(0, 10)}
          </div>
        ),

        amountDue: (
          <div>
            <div className="text-md font-[500] text-gray-700">
              ₦ {actualAmountDue.toLocaleString()}
            </div>
            {(principal > 0 ||
              displayInterest > 0 ||
              overdueForInstallment > 0) && (
              <div className="text-xs text-gray-500 mt-0.5">
                {principal > 0 && `Principal: ₦${principal.toLocaleString()}`}
                {displayInterest > 0 &&
                  ` · Interest (due): ₦${displayInterest.toLocaleString()}`}
                {overdueForInstallment > 0 &&
                  ` · Penalty: ₦${overdueForInstallment.toLocaleString()}`}
              </div>
            )}
          </div>
        ),
        loggedBy: (
          <div>
            <div className="text-md font-[500] text-gray-700">
              {item?.loggedBy === null ? "NIL" : item?.loggedBy?.firstName}
            </div>
          </div>
        ),
        repaymentMethod: (
          <div>
            <div className="text-md font-[500] text-gray-700">
              {item?.repaymentMethod === null ? "NIL" : item?.repaymentMethod}
            </div>
          </div>
        ),
        amountPaid: (
          <div>
            <div className="text-md font-[500] text-gray-700">
              ₦{" "}
              {item?.amountPaid === null
                ? "0"
                : item?.amountPaid.toLocaleString()}
            </div>
            {usesAccrualFields &&
              amountPaid > 0 &&
              (paidFromInterest > 0 || paidFromPrincipal > 0) && (
                <div className="text-xs text-gray-500 mt-0.5">
                  {paidFromInterest > 0 &&
                    `Interest: ₦${paidFromInterest.toLocaleString()}`}
                  {paidFromPrincipal > 0 &&
                    ` · Principal: ₦${paidFromPrincipal.toLocaleString()}`}
                </div>
              )}
          </div>
        ),
        balanceToPay: (
          <div>
            <div className="text-md font-[500] text-gray-700">
              ₦ {balanceToPay.toLocaleString()}
            </div>
          </div>
        ),
        status: (
          <button
            className={`${
              item.status === "Unpaid"
                ? "bg-[#E7F1FE] text-swBlue"
                : item.status === "Fully paid"
                  ? "bg-swLightGreenIndcatorBg text-swGreen"
                  : item.status === "Due"
                    ? "bg-swLightPinkIndcatorBg text-swIndicatorLightRed"
                    : item.status === "Overdue"
                      ? "text-red-400 bg-red-100"
                      : "bg-[#F8A9A3] text-white"
            } px-2 py-1 text-xs font-normal rounded-full`}
          >
            {Number(balanceToPay) > 0.1 && item.status === "Fully paid"
              ? "Installment"
              : item.status === "Fully paid"
                ? "Paid"
                : item.status}
          </button>
        ),
      };

      if (isEquated) {
        row.scheduledAmountDue = (
          <div>
            <div className="text-md font-[500] text-gray-700">
              ₦ {scheduledAmountDue.toLocaleString()}
            </div>
            {(scheduledPrincipal > 0 || scheduledInterest > 0) && (
              <div className="text-xs text-gray-500 mt-0.5">
                {scheduledPrincipal > 0 &&
                  `Principal: ₦${scheduledPrincipal.toLocaleString()}`}
                {scheduledInterest > 0 &&
                  ` · Interest: ₦${scheduledInterest.toLocaleString()}`}
              </div>
            )}
          </div>
        );
      }

      return row;
    });
  };

  const resetFormData = () => {
    setFormData({
      repaymentMethod: "",
      repaymentAmount: "",
      clearBalance: false,
      dateCollected: new Date(),
      repaymentReceipts: null,
    });
  };

  const handleInputChangeWithComma = (e) => {
    const value = e.target.value.replace(/,/g, "");
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: value,
    }));
  };

  const preventMinus = (e) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
      ".",
    ];

    if (allowedKeys.includes(e.key)) {
      return;
    }

    if (
      !/^[0-9.]$/.test(e.key) ||
      (e.key === "." && e.target.value.includes("."))
    ) {
      e.preventDefault();
    }
  };

  const logRepaymentFunction = (e) => {
    e.preventDefault();
    const amountToLog = parseRepaymentAmountInput(formData?.repaymentAmount);

    if (!Number.isFinite(amountToLog) || amountToLog <= 0) {
      toast.error("Enter a valid repayment amount greater than zero");
      return;
    }

    if (amountToLog > outstandingBalance + LOG_AMOUNT_EPS) {
      toast.error(
        `Amount cannot exceed outstanding balance (₦${outstandingBalance.toLocaleString()})`,
      );
      return;
    }

    setLoading(true);
    setEnableLogRepaymentBtn(false);
    const payload = new FormData();
    payload.append("repaymentMethod", formData?.repaymentMethod);
    payload.append("repaymentAmount", String(amountToLog));
    payload.append("repaymentReceipts", formData?.repaymentReceipts);
    payload.append("clearBalance", formData?.clearBalance);
    payload.append(
      "dateCollected",
      format(formData?.dateCollected, "yyyy-MM-dd"),
    );
    dispatch(logRepaymentFunc({ loanId, payload }))
      .unwrap()
      .then(() => {
        resetFormData();
        setLogRepayment(!logRepayment);
        toast("Payment logged successfully");
        setEnableLogRepaymentBtn(true);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(`${error?.message}`);
        setLogRepayment(!logRepayment);
        setEnableLogRepaymentBtn(true);
        setLoading(false);
      });
  };

  const [showClearBalanceConfirm, setShowClearBalanceConfirm] = useState(false);
  const [showReapplyConfirm, setShowReapplyConfirm] = useState(false);
  const [reapplyLoading, setReapplyLoading] = useState(false);
  const [tableRefreshKey, setTableRefreshKey] = useState(0);
  const [reapplyJob, setReapplyJob] = useState(null);

  const handleReapplyAllocations = () => {
    setReapplyLoading(true);
    dispatch(reapplyInstallmentAllocations({ loanId }))
      .unwrap()
      .then((res) => {
        setShowReapplyConfirm(false);
        if (!res?.jobId) {
          toast.success(res?.message || "Payment allocation reapplied");
          setTableRefreshKey((k) => k + 1);
          setReapplyLoading(false);
          return;
        }
        toast.info(
          "Rebuilding ledger and reapplying payments (interest before principal)...",
        );
        setReapplyJob({ jobId: res.jobId, status: "queued" });
        const pollId = setInterval(() => {
          dispatch(getApprovalJobStatus({ jobId: res.jobId }))
            .unwrap()
            .then((jobRes) => {
              setReapplyJob(jobRes);
              if (jobRes?.status === "completed") {
                clearInterval(pollId);
                setReapplyJob(null);
                setReapplyLoading(false);
                toast.success("Payment allocation reapplied successfully");
                setTableRefreshKey((k) => k + 1);
              }
              if (jobRes?.status === "failed") {
                clearInterval(pollId);
                setReapplyJob(null);
                setReapplyLoading(false);
                toast.error(jobRes?.error || "Reapply failed");
              }
            })
            .catch((err) => {
              clearInterval(pollId);
              setReapplyJob(null);
              setReapplyLoading(false);
              toast.error(err?.message || "Failed to track reapply job");
            });
        }, 1500);
      })
      .catch((err) => {
        setReapplyLoading(false);
        toast.error(err?.message || "Could not reapply payment allocation");
      });
  };

  const handleClearBalanceChange = (e) => {
    if (e.target.checked) {
      setShowClearBalanceConfirm(true);
    } else {
      setFormData((prev) => ({ ...prev, clearBalance: false }));
    }
  };

  return (
    <div className="w-full">
      <ToastContainer />
      <div>
        {enableLogRepaymentBtn == true ? (
          <ReusableDataTable
            key={tableRefreshKey}
            dataTransformer={customDataTransformer}
            headers={headers}
            initialData={[]}
            apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/repayment/loan-application/${loanId}`}
            filters={false}
            pagination={false}
          />
        ) : null}
      </div>
      {reapplyJob?.progress?.percent != null && (
        <p className="mt-3 text-sm text-swGray text-center">
          Reapplying allocations… {reapplyJob.progress.percent}%
        </p>
      )}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        {repaymentType === "installmentPayment" &&
          status !== "Closed Off" &&
          status !== "Declined" && (
            <Button
              variant="secondary"
              disabled={reapplyLoading}
              onClick={() => setShowReapplyConfirm(true)}
            >
              {reapplyLoading ? "Reapplying…" : "Reapply payment allocation"}
            </Button>
          )}
        {!(
          status === "Fully Paid" ||
          status === "Cleared Balance" ||
          status === "Closed Off" ||
          status === "Declined"
        ) && (
          <Button
            disabled={enableLogRepayment === false ? false : true}
            variant="secondary"
            onClick={() => {
              setLogRepayment(!logRepayment);
            }}
          >
            Log Repayment
          </Button>
        )}
      </div>
      <ConfirmationModal
        isOpen={showReapplyConfirm}
        onClose={() => setShowReapplyConfirm(false)}
        onConfirm={handleReapplyAllocations}
        title="Reapply payment allocation?"
        message="This replays the loan ledger from disbursement and reapplies every approved payment in date order (interest before principal on each installment). Use this to fix loans that were allocated incorrectly. This may take a minute."
        confirmText="Reapply"
        cancelText="Cancel"
      />
      <CenterModal isOpen={logRepayment} width={"40%"}>
        <div className="p-4">
          <div className="flex justify-between items-center text-white">
            <div>
              <p className="text-base font-semibold text-black">
                Log Repayment
              </p>
            </div>
          </div>
          <div className="text-sm text-swGray pt-4">
            Provide payment information
          </div>
          <div className="pt-4">
            <div className="pt-4">
              <InputField
                name="repaymentAmount"
                label="Amount received"
                required={true}
                placeholder="Enter amount"
                onWheel={() => {
                  const activeElement = document.activeElement;
                  if (activeElement) {
                    activeElement.blur();
                  }
                }}
                value={
                  !formData.repaymentAmount.includes(".")
                    ? Number(formData.repaymentAmount).toLocaleString("en-US")
                    : checkDecimal(formData.repaymentAmount)
                      ? Number(formData.repaymentAmount).toLocaleString("en-US")
                      : formData.repaymentAmount
                }
                onKeyPress={preventMinus}
                onChange={(e) => {
                  handleInputChangeWithComma(e);
                }}
                hintText={
                  outstandingBalance > 0
                    ? `Maximum loggable amount: ₦${outstandingBalance.toLocaleString()} (total outstanding balance). Excess applies to upcoming installments on approval.`
                    : "Amount paid that received the current repayment amount will spill into the next repayment cycle"
                }
              />
            </div>
            <div className="pt-4">
              <SelectField
                optionValue={paymentMethodTypes}
                name="repaymentMethod"
                label="Repayment Method"
                required={true}
                placeholder="Select repayment method"
                onChange={(selectedOption) => {
                  handleSelectChange(selectedOption, "repaymentMethod");
                }}
              />
            </div>
            <div className="relative pt-4 flex justify-between items-center">
              <p>
                Date Collected:{" "}
                {format(
                  formData && isValid(new Date(formData?.dateCollected))
                    ? new Date(formData?.dateCollected)
                    : new Date(),
                  "PPP",
                )}
              </p>
              <div
                className="w-fit p-2 rounded-full border border-jsPrimary100 text-jsPrimary100 cursor-pointer"
                onClick={() => setOpenDateCollected(!openDateCollected)}
              >
                <FaRegCalendar size={20} />
              </div>
              {openDateCollected && (
                <div className="absolute w-fit -right-5  bg-white border rounded-md z-10">
                  <DayPicker
                    styles={{
                      caption: { color: "#2769b3" },
                    }}
                    modifiers={{
                      selected: formData.dateCollected,
                    }}
                    modifiersClassNames={{
                      selected: "my-selected",
                    }}
                    onDayClick={(value) => {
                      setFormData((prev) => ({
                        ...prev,
                        dateCollected: value > new Date() ? new Date() : value,
                      }));
                    }}
                    className="w-full"
                  />
                  <p
                    className="w-fit ml-auto mr-2 mb-2 -mt-2 p-2 text-[#2769b3] hover:text-white hover:bg-[#2769b3] cursor-pointer"
                    onClick={() => setOpenDateCollected(false)}
                  >
                    OK
                  </p>
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="clearBalance"
                className="flex gap-2 items-center mt-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="clearBalance"
                  id="clearBalance"
                  className="h-5 w-5"
                  checked={formData.clearBalance}
                  onChange={handleClearBalanceChange}
                />
                Clear Balance
              </label>
            </div>
            <div className="pt-4">
              <p className="font-semibold pt-2 text-sm">
                Upload payment receipt
              </p>
              <p className="text-xs pt-2">
                Document types uploaded should be JPEGS, PNG or PDF and should
                not exceed 4mb
              </p>
              {fileError && <p className="text-red-500 text-sm">{fileError}</p>}
              <div className="relative">
                <input
                  name="repaymentReceipts"
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
                  <span className="py-2 px-6 rounded-md flex gap-2 border w-fit">
                    <AiOutlinePaperClip color="black" size={20} />
                    <p className="font-semibold text-black">
                      {formData?.repaymentReceipts
                        ? "Change file"
                        : "Select file"}
                    </p>
                  </span>
                </label>
                {formData?.repaymentReceipts != null ? (
                  <div
                    id="fileLabel"
                    className="bg-swLightGray p-2 flex justify-between"
                  >
                    <div className="text-xs">
                      {formData?.repaymentReceipts?.name}
                    </div>
                    <div
                      onClick={() => {
                        deleteFile("repaymentReceipts");
                      }}
                    >
                      <AiOutlineDelete color="red" size={20} />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex pt-4 mb-4 items-end gap-2 justify-end">
              <Button
                variant="secondary"
                onClick={() => {
                  resetFormData();
                  setLogRepayment(!logRepayment);
                }}
              >
                Cancel
              </Button>
              <Button
                disabled={loading || exceedsOutstandingBalance}
                variant="secondary"
                onClick={logRepaymentFunction}
              >
                Log Repayment
              </Button>
            </div>
          </div>
          <ConfirmationModal
            isOpen={showClearBalanceConfirm}
            onClose={() => {
              setShowClearBalanceConfirm(false);
              setFormData((prev) => ({ ...prev, clearBalance: false }));
            }}
            onConfirm={() => {
              setFormData((prev) => ({ ...prev, clearBalance: true }));
              setShowClearBalanceConfirm(false);
            }}
            title="Clear Balance Confirmation"
            message="Are you sure you want to clear the entire balance? This action will mark the loan as fully paid."
            confirmText="Yes, Clear Balance"
            cancelText="Cancel"
          />
        </div>
      </CenterModal>
    </div>
  );
};

export default CustomerRepayment;
