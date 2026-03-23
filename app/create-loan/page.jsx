"use client";

import { useEffect, useState } from "react";
import {
  LuArrowLeft,
  LuBanknote,
  LuCalculator,
  LuChevronRight,
  LuClipboardList,
  LuFileUp,
  LuPanelRight,
  LuPencil,
  LuSave,
  LuSearch,
  LuSparkles,
  LuUserPlus,
} from "react-icons/lu";
import BorrowerAvatar, {
  getProfilePictureSrc,
} from "../components/loan/BorrowerAvatar";
import InputField from "../components/shared/input/InputField";
import SelectField from "../components/shared/input/SelectField";
import { AiOutlineDelete, AiOutlinePaperClip } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "@/redux/slices/customerSlice";
import { getLoanPackage } from "@/redux/slices/loanPackageSlice";
import { createLoanApplication } from "@/redux/slices/loanApplicationSlice";
import { getInterestType } from "@/redux/slices/interestTypeSlice";
import { calculateInterest } from "@/redux/slices/interestTypeSlice";
import CenterModal from "../components/modals/CenterModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PreviewInterest from "../components/modals/PreviewInterest";
import { useRouter } from "next/navigation";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import Link from "next/link";
import { Rings } from "react-loader-spinner";
import EditableButton from "../components/shared/editableButtonComponent/EditableButton";
import Unauthorized from "../unauthorized/page";
import Loader from "../components/shared/Loader";
import { createLoanAuthRoles } from "../components/helpers/pageAuthRoles";

const CreateLoan = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const loanPackage = useSelector((state) => state.loanPackage);
  const interestType = useSelector((state) => state.interestType);
  const customer = useSelector((state) => state.customer);
  const { interestValue } = useSelector((state) => state.interestType);
  const [filteredData, setFilteredData] = useState(customer?.data);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPreviewInterestOpen, setIsPreviewInterestOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loanPackageText, setLoanPackageText] = useState(null);
  const [loanPackageRate, setLoanPackageRate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [interest, setInterest] = useState(null);
  const [noOfRepayments, setNoOfRepayment] = useState(0);
  const [roleTag, setRoleTag] = useState("");
  const [loanPackageInterestRate, setLoanPackageInterestRate] = useState({});
  const [fileError, setFileError] = useState({
    collaterals: "",
    applicationForm: "",
    loanAffidavit: "",
    guarantorForm: "",
  });

  const [formData, setFormData] = useState({
    loanAmount: "",
    interestRate: null,
    loanPackage: null,
    loanDuration: "",
    commitmentValue: "",
    managementTotal: "",
    managementValue: "",
    commitmentTotal: "",
    numberOfRepayment: "",
    repaymentType: null,
    assetType: null || "null",
    loanDurationMetrics: null,
    loanFrequencyType: null,
    interestType: null,
    applicationForm: null || "null",
    assetImages: null || "null",
    collaterals: [],
    guarantorForm: null,
    loanAffidavit: null,
    offerLetter: null || "null",
    proofOfOwnership: null || "null",
    powerOfAttorney: null || "null",
    statementOfAccounts: null || "null",
    customerId: "",
  });

  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    dispatch(getCustomers());
    dispatch(getLoanPackage());
    dispatch(getInterestType());
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("borrower"));
    setFormData({
      ...formData,
      customerId: data?.profileInfo?._id,
    });
    setSelectedCustomer(data?.profileInfo);
    setFilteredData(customer?.data);
  }, [customer?.data]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setRoleTag(storedUser?.data?.user?.role.tag);
    }
  }, []);

  useEffect(() => {
    const loanpackage = loanPackage?.data?.data.find(
      (item) => item._id === formData.loanPackage
    );
    setLoanPackageInterestRate(loanpackage);
  }, [formData.loanPackage, loanPackage?.data?.data]);

  const assetTypeData = [
    { value: 100, label: "Investment" },
    { value: 200, label: "Building" },
    { value: 300, label: "Construction" },
    { value: 400, label: "Vehicles" },
    { value: 500, label: "Machineries" },
  ];

  const frequencyTypeData = [
    { value: "Monthly", label: "Monthly" },
    { value: "Quarterly", label: "Quarterly" },
  ];

  const repaymentTypeData = [
    { value: "bulletRepayment", label: "Bullet Repayment" },
    { value: "interestServicing", label: "Interest Servicing" },
    { value: "installmentPayment", label: "Installment Payment" },
  ];

  const reducingBalrepaymentTypeData = [
    { value: "installmentPayment", label: "Installment Payment" },
  ];

  const loanDurationMetricsData = [
    { value: "Monthly", label: "Monthly" },
    { value: "Yearly", label: "Yearly" },
  ];

  const validateFormData = (formData) => {
    for (const key in formData) {
      if (formData[key] === null || formData[key] === 0) {
        if (
          key === "applicationForm" ||
          key === "assetImages" ||
          key === "collaterals" ||
          key === "guarantorForm" ||
          key === "loanAffidavit" ||
          key === "offerLetter"
        )
          return true;
        return false; // Return false if any field is null or 0
      }
    }
    return true; // Return true if all fields are valid
  };
  const calcRepaymentsNo = (repaymentType) => {
    let loanDuration = formData.loanDuration;
    if (formData.loanDurationMetrics === "Yearly") {
      loanDuration = formData.loanDuration * 12;
    }
    if (repaymentType === "Monthly") {
      setNoOfRepayment(loanDuration);
      setFormData((prevFormData) => ({
        ...prevFormData,
        numberOfRepayment: loanDuration,
      }));
    }
    if (repaymentType === "Quarterly") {
      setNoOfRepayment(loanDuration / 3);
      setFormData((prevFormData) => ({
        ...prevFormData,
        numberOfRepayment: loanDuration / 3,
      }));
    }
  };

  const modifyLoanPackageData = (arr) => {
    return arr?.map((item) => ({
      label: item.name,
      value: item._id,
      interestRate: item?.interestRate?.rate,
    }));
  };

  const modifyInterestTypeData = (arr) => {
    if (Array.isArray(arr)) {
      return arr.map((item) => ({
        label: item.name,
        value: item._id,
      }));
    } else {
      return [];
    }
  };

  const preventMinus = (e) => {
    if (/[^0-9,]/g.test(e.key)) {
      e.preventDefault();
    }
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

  const formatNumber = (valu) => {
    const value = valu ?? "";
    const stringWithNoCommas = String(value);
    const numberWithNoCommas = stringWithNoCommas.replace(/,/g, "");
    const formattedNumber = numberWithNoCommas.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    );
    return formattedNumber;
  };

  const search = (e) => {
    const filtered = customer?.data.filter((item) => {
      const fullName =
        `${item.firstName} ${item.lastName} ${item.email}`.toLowerCase();
      return fullName.includes(e.toLowerCase());
    });

    setFilteredData(filtered);
  };

  const removeCommasFromNumber = (numberString) => {
    if (typeof numberString !== "string") {
      // Convert to string or handle the case appropriately
      numberString = String(numberString);
    }
    return numberString.replace(/,/g, "");
  };

  const calCommitmentTotal = (e) => {
    let { name, value } = e.target;
    let num = removeCommasFromNumber(formData.loanAmount);
    let total = (value * parseInt(num)) / 100;
    setFormData((prevFormData) => ({
      ...prevFormData,
      commitmentTotal: total,
    }));
  };

  const calManagementTotal = (e) => {
    let { name, value } = e.target;
    let num = removeCommasFromNumber(formData.loanAmount);
    let total = (value * parseInt(num)) / 100;
    setFormData((prevFormData) => ({
      ...prevFormData,
      managementTotal: total,
    }));
  };

  const updateCommitmentTotal = (e) => {
    let { name, value } = e.target;
    let total = (value * formData.commitmentValue) / 100;
    setFormData((prevFormData) => ({
      ...prevFormData,
      commitmentTotal: total,
    }));
  };

  const handleSelectChange = async (selectedOption, name) => {
    setFormData({
      ...formData,
      [name]: selectedOption.value,
    });
  };

  const fetchInterest = (e) => {
    setIsLoading(true);
    const isFormDataValid = validateFormData(formData);
    if (isFormDataValid === true) {
      const payload = {
        loanDurationMetrics: formData.loanDurationMetrics,
        loanDuration: formData.loanDuration,
        loanAmount: parseInt(removeCommasFromNumber(formData.loanAmount)),
        loanPackageId: formData.loanPackage,
        interestTypeId: formData.interestType,
        repaymentType: formData.repaymentType,
        loanFrequencyType: formData.loanFrequencyType,
        interestRate: formData.interestRate,
        startDate: "",
      };
      if (e?.preventDefault) e.preventDefault();
      dispatch(calculateInterest(payload))
        .unwrap()
        .then(() => {
          setIsPreviewInterestOpen(true);
          setCurrentStep(2);
          setIsLoading(false);
        })
        .catch((error) => {
          toast.error(`An error occured`);
          setIsLoading(false);
        });
    } else {
      toast.error("Some required fields are missing");
      setIsLoading(false);
    }
  };

  /** Same as “Preview interest” — used by step nav and primary button */
  const goToReviewStep = () => {
    fetchInterest({ preventDefault: () => {} });
  };

  const handleFileChange = (e) => {
    let { name, files } = e.target;
    setFileError((prev) => ({
      ...prev,
      [name]: "",
    }));

    const file = files[0];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    const allowedExtensions = ["jpg", "jpeg", "png", "pdf"];
    if (!allowedExtensions.includes(fileExtension)) {
      // setFileError(
      //   "Invalid file type. Please select an image (.jpg, .jpeg, .png) or PDF (.pdf)."
      // );
      setFileError((prev) => ({
        ...prev,
        [name]:
          "Invalid file type. Please select an image (.jpg, .jpeg, .png) or PDF (.pdf).",
      }));
      return;
    }

    name === "collaterals"
      ? setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: [...prevFormData.collaterals, files[0]],
        }))
      : setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: files[0],
        }));
  };

  const deleteFile = (name, inputName) => {
    if (inputName === "collaterals") {
      const newFiles = formData.collaterals.filter(
        (file, index) => index !== name
      );
      setFormData((prevFormData) => ({
        ...prevFormData,
        [inputName]: newFiles,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: null,
      }));
    }
  };
  const submitLoan = (e) => {
    if (
      formData.loanAmount < loanPackageInterestRate?.loanAmountRange?.min ||
      formData.loanAmount > loanPackageInterestRate?.loanAmountRange?.max
    ) {
      if (formData.loanAmount < loanPackageInterestRate?.loanAmountRange?.min) {
        toast.error(
          `Loan amount cannot be less than ₦${loanPackageInterestRate?.loanAmountRange?.min.toLocaleString()}`
        );
      } else if (
        formData.loanAmount > loanPackageInterestRate?.loanAmountRange?.max
      ) {
        toast.error(
          `Loan amount cannot be more than ₦${loanPackageInterestRate?.loanAmountRange?.max.toLocaleString()}`
        );
      }
      return;
    }
    if (
      formData.interestRate < loanPackageInterestRate?.interestRate?.min ||
      formData.interestRate > loanPackageInterestRate?.interestRate?.max
    ) {
      if (formData.interestRate < loanPackageInterestRate?.interestRate?.min) {
        toast.error(
          `Interest rate cannot be less than ${loanPackageInterestRate?.interestRate?.min}%`
        );
      } else if (
        formData.interestRate > loanPackageInterestRate?.interestRate?.max
      ) {
        toast.error(
          `Interest rate cannot be more than ${loanPackageInterestRate?.interestRate?.max}%`
        );
      }
      return;
    }
    localStorage.removeItem("borrower");
    let userId;
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      userId = storedUser?.data?.user;
    }
    const payload = new FormData();
    const num = parseInt(removeCommasFromNumber(formData.loanAmount));
    payload.append("loanAmount", num);
    payload.append("loanPackage", formData.loanPackage);
    payload.append("interestRate", formData.interestRate);
    payload.append("loanDuration", formData.loanDuration);
    payload.append("commitmentValue", formData.commitmentValue);
    payload.append("commitmentTotal", formData.commitmentTotal);
    payload.append("managementValue", formData.managementValue);
    payload.append("managementTotal", formData.managementTotal);
    payload.append("numberOfRepayment", formData.numberOfRepayment);
    payload.append("repaymentType", formData.repaymentType);
    payload.append("assetType", formData.assetType);
    payload.append("loanDurationMetrics", formData.loanDurationMetrics);
    payload.append("loanFrequencyType", formData.loanFrequencyType);
    payload.append("interestType", formData.interestType);
    payload.append("applicationForm", formData.applicationForm);
    payload.append("assetImages", formData.assetImages);
    // payload.append("collaterals", formData.collaterals);
    if (formData.collaterals.length > 0) {
      formData.collaterals.forEach((file) => {
        payload.append("collaterals", file);
      });
    } else {
      payload.append("collaterals", null);
    }
    payload.append("guarantorForm", formData.guarantorForm);
    payload.append("loanAffidavit", formData.loanAffidavit);
    payload.append("offerLetter", formData.offerLetter);

    payload.append("statementOfAccounts", formData.statementOfAccounts); // Account statement
    payload.append("powerOfAttorney", formData.powerOfAttorney); // Power of attorney
    payload.append("proofOfOwnership", formData.proofOfOwnership); // Proof of ownership

    payload.append("customerId", selectedCustomer?._id);
    payload.append("createdBy", userId?._id);
    payload.append("tag", userId?.role.tag);

    setLoading(true);
    e.preventDefault();
    dispatch(createLoanApplication(payload))
      .unwrap()
      .then(() => {
        toast("Loan application successful");
        router.push("/loan-drafts");
        setLoading(false);
      })
      .catch((error) => {
        toast.error(`${error?.message}`);
        setLoading(false);
      });
  };

  const savedLoans = () => {
    const savedLoans = localStorage.getItem("savedLoans");
    if (savedLoans) {
      const loans = JSON.parse(savedLoans);
      const loansLength = loans.length;
      // let newFormData = { ...formData };
      let newFormData = {
        formData: {
          ...formData,
        },
        selectedCustomer: selectedCustomer,
        savedAt: new Date(),
        id: loansLength,
      };
      loans.push(newFormData);
      localStorage.setItem("savedLoans", JSON.stringify(loans));
      toast.success("Your partly created loan has been successfully saved");
      router.push("/saved-loans");
    } else {
      let loans = [];
      let newFormData = {
        formData: {
          ...formData,
        },
        selectedCustomer: selectedCustomer,
        savedAt: new Date(),
        id: 0,
      };

      loans.push(newFormData);
      localStorage.setItem("savedLoans", JSON.stringify(loans));
      toast.success("Your partly created loan has been successfully saved");
      router.push("/saved-loans");
    }
  };

  const renderFileInput = (text, name) => {
    return (
      <div className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-gradient-to-b from-white to-gray-50/40 p-4 shadow-sm transition hover:border-swBlue/20 hover:shadow-md">
        <p className="text-center text-xs font-semibold leading-snug text-swGrey500 sm:text-sm">
          {text}
        </p>
        {fileError[name] && (
          <p className="text-center text-sm text-swIndicatorLightRed">
            {fileError[name]}
          </p>
        )}

        {name === "collaterals" &&
          formData[name]?.map((file, index) => (
            <div
              key={index}
              id="fileLabel3"
              className="flex justify-between gap-2 rounded-lg border border-gray-100 bg-swLightGray/80 p-2"
            >
              <div className="truncate text-xs text-swGrey500">{file.name}</div>
              <button
                type="button"
                className="shrink-0 rounded-md p-1 text-swIndicatorLightRed transition hover:bg-red-50"
                onClick={() => {
                  deleteFile(index, "collaterals");
                }}
              >
                <AiOutlineDelete size={18} />
              </button>
            </div>
          ))}

        {formData[name]?.name ? (
          <div
            id="fileLabel3"
            className="flex justify-between gap-2 rounded-lg border border-gray-100 bg-swLightGray/80 p-2"
          >
            <div className="truncate text-xs text-swGrey500">
              {formData[name]?.name}
            </div>
            <button
              type="button"
              className="shrink-0 rounded-md p-1 text-swIndicatorLightRed transition hover:bg-red-50"
              onClick={() => {
                deleteFile(name);
              }}
            >
              <AiOutlineDelete size={18} />
            </button>
          </div>
        ) : null}

        <div className="relative mt-auto flex justify-center">
          <input
            name={name}
            type="file"
            id={`fileInput-${name}`}
            className="absolute h-0 w-0 opacity-0"
            onChange={handleFileChange}
            onClick={(e) => (e.target.value = null)}
          />
          <label htmlFor={`fileInput-${name}`} className="cursor-pointer">
            <span className="inline-flex items-center gap-2 rounded-xl border-2 border-dashed border-swBlue/25 bg-swBlueActiveStateBg/50 px-4 py-2.5 text-sm font-semibold text-swBlue transition hover:border-swBlue hover:bg-white">
              <AiOutlinePaperClip size={18} />
              {formData[name]?.name ? "Change file" : "Select file"}
            </span>
          </label>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout paths={["Create Loan"]} roles={createLoanAuthRoles}>
      <ToastContainer />
      {currentStep === 1 ? (
        <main className="min-h-full bg-gradient-to-b from-[#f0f6fc] via-gray-50 to-gray-50 text-swGray">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-4 py-6 text-sm sm:px-8 lg:flex-row lg:items-start">
          <div className="w-full flex-1 space-y-6 lg:max-w-none lg:pr-2">
            <header className="flex flex-col gap-4 rounded-2xl border border-white/70 bg-white/85 p-5 shadow-md shadow-swBlue/5 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-swBlue to-swDarkBlue text-white shadow-lg shadow-swBlue/25 ring-4 ring-white/60">
                  <LuBanknote size={26} strokeWidth={2} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-swBlue/80">
                    New application
                  </p>
                  <h1 className="mt-0.5 text-xl font-bold tracking-tight text-swGrey500 sm:text-2xl">
                    Initiate loan application
                  </h1>
                  <p className="mt-1 text-xs text-swGrey200 sm:text-sm">
                    Select a borrower, choose a package, and define loan terms.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                <Link
                  href="/create-borrower"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-swBlue bg-swBlue px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-white hover:text-swBlue"
                >
                  <LuUserPlus size={18} strokeWidth={2.25} />
                  Add new borrower
                </Link>
                <button
                  type="button"
                  onClick={savedLoans}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-xl border-2 border-swBlue/25 bg-white px-4 py-2.5 text-sm font-semibold text-swBlue shadow-sm transition hover:border-swBlue hover:bg-swBlueActiveStateBg"
                >
                  <LuSave size={18} strokeWidth={2.25} />
                  Save draft
                </button>
              </div>
            </header>

            <nav
              className="flex flex-col gap-3 rounded-2xl border border-gray-100/90 bg-white/95 p-3 shadow-sm backdrop-blur-sm sm:flex-row sm:items-stretch sm:gap-3"
              aria-label="Application steps"
            >
              <div
                className="flex flex-1 items-center gap-3 rounded-xl border border-swBlue/25 bg-swBlueActiveStateBg/60 p-3"
                aria-current="step"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-swBlue to-swDarkBlue text-sm font-bold text-white shadow-md shadow-swBlue/25">
                  1
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-swBlue">
                    You are here
                  </p>
                  <p className="font-semibold text-swGrey500">
                    Details & documents
                  </p>
                </div>
              </div>
              <div
                className="hidden h-auto w-px shrink-0 bg-gradient-to-b from-transparent via-gray-200 to-transparent sm:block"
                aria-hidden
              />
              <button
                type="button"
                onClick={goToReviewStep}
                disabled={
                  formData.repaymentType === null || isLoading === true
                }
                title="Open interest preview (same as Preview interest)"
                className="flex flex-1 items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 text-left transition hover:border-swBlue/40 hover:bg-swBlueActiveStateBg/40 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-swBlue/35 bg-gray-50 text-sm font-bold text-swBlue">
                  2
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-swGrey200">
                    Go to next
                  </p>
                  <p className="font-medium text-swGrey500">
                    Review & create
                  </p>
                </div>
              </button>
            </nav>

            <section className="rounded-2xl border border-gray-100/90 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-swBlueActiveStateBg text-swBlue">
                  <LuClipboardList size={20} strokeWidth={2} />
                </span>
                <div>
                  <h2 className="text-base font-bold text-swGrey500 sm:text-lg">
                    Loan details
                  </h2>
                  <p className="text-xs text-swGrey200 sm:text-sm">
                    Required fields are marked with *
                  </p>
                </div>
              </div>
            <div className="flex flex-col gap-6">
              <div className="space-y-4 rounded-xl border border-gray-100/80 bg-gradient-to-b from-gray-50/80 to-white p-4 sm:p-5">
                <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-swGrey200">
                  <LuSparkles size={14} className="text-amber-500" />
                  Borrower & product
                </h3>
                <div className="space-y-4">
              <div className="">
                <label className="mb-2 block text-xs font-medium text-swGrey500">
                  Select Customer <span className="ml-1 text-swIndicatorLightRed">*</span>
                </label>
                <button
                  type="button"
                  className="group flex w-full items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-3.5 text-left shadow-sm transition hover:border-swBlue/35 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-swBlue/25"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  <span className="flex min-w-0 flex-1 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-swBlueActiveStateBg text-swBlue transition group-hover:bg-swBlue group-hover:text-white">
                      <LuSearch size={18} strokeWidth={2.25} />
                    </span>
                    {selectedCustomer != null ? (
                      <span className="min-w-0">
                        <span className="block truncate font-semibold text-swGrey500">
                          {selectedCustomer.firstName} {selectedCustomer.lastName}
                        </span>
                        <span className="block truncate text-xs text-swGrey200">
                          Tap to change borrower
                        </span>
                      </span>
                    ) : (
                      <span className="text-sm text-swGrey200">
                        Search and select customer
                      </span>
                    )}
                  </span>
                  <LuChevronRight
                    className="shrink-0 text-swGrey200 transition group-hover:translate-x-0.5 group-hover:text-swBlue"
                    size={20}
                  />
                </button>
              </div>
              <SelectField
                value={modifyLoanPackageData(loanPackage?.data?.data)?.find(
                  (option) => option.value === formData.loanPackage
                )}
                disabled={selectedCustomer === null ? true : false}
                name="loanPackage"
                optionValue={modifyLoanPackageData(loanPackage?.data?.data)}
                label={"Loan Package "}
                required={true}
                placeholder={"Select loan package"}
                isSearchable={false}
                onChange={(selectedOption) => {
                  handleSelectChange(selectedOption, "loanPackage");
                  setLoanPackageText(selectedOption.label);
                  setLoanPackageRate(selectedOption.interestRate);
                }}
              />
              <div>
                <InputField
                  disabled={formData.loanPackage === null ? true : false}
                  name="interestRate"
                  required={true}
                  //ariaLabel={"Number input"}
                  //onKeyPress={preventMinus}
                  onWheel={() => document.activeElement.blur()}
                  activeBorderColor="border-swBlue"
                  endIcon={<p className="text-swGray">%</p>}
                  label="Interest Rate"
                  value={formData?.interestRate}
                  placeholder={`Enter interest rate`}
                  isActive="loan-amount"
                  onChange={(e) => {
                    setInputState(e);

                    if (formData.commitmentValue > 0) {
                      updateCommitmentTotal(e);
                    }
                    if (
                      formData.loanPackage &&
                      formData.loanDuration &&
                      formData.repaymentType
                    ) {
                      calculateInterest(
                        e.target.value,
                        formData.loanPackage,
                        formData.loanDuration,
                        formData.repaymentType
                      );
                    }
                  }}
                  inputOpen={isInputOpen}
                />
                <p
                  className={`mt-1.5 rounded-lg px-3 py-2 text-xs leading-relaxed ${
                    formData?.interestRate <
                      loanPackageInterestRate?.interestRate?.min ||
                    formData?.interestRate >
                      loanPackageInterestRate?.interestRate?.max
                      ? "bg-red-50 font-medium text-swIndicatorLightRed"
                      : "bg-slate-50 text-swGrey200"
                  }`}
                >
                  {formData?.interestRate <
                  loanPackageInterestRate?.interestRate?.min
                    ? `Interest rate cannot be less than ${loanPackageInterestRate?.interestRate?.min}%`
                    : formData?.interestRate >
                      loanPackageInterestRate?.interestRate?.max
                    ? `Interest rate cannot be more than ${loanPackageInterestRate?.interestRate?.max}%`
                    : `min = ${
                        loanPackageInterestRate?.interestRate?.min || 0
                      }% and max = ${
                        loanPackageInterestRate?.interestRate?.max || 0
                      }%`}
                </p>
              </div>
              {formData.loanPackage === "65390f290d0a83675c9517b3" ? (
                <SelectField
                  value={assetTypeData?.find(
                    (option) => option.value === formData.assetType
                  )}
                  disabled={formData.loanPackage === null ? true : false}
                  name="assetType"
                  optionValue={assetTypeData}
                  label={"Asset Type"}
                  required={true}
                  placeholder={"Select asset type"}
                  isSearchable={false}
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, "assetType")
                  }
                />
              ) : null}
                </div>
              </div>

              <div className="space-y-4 rounded-xl border border-gray-100/80 bg-gradient-to-b from-gray-50/80 to-white p-4 sm:p-5">
                <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-swGrey200">
                  <LuBanknote size={14} className="text-emerald-600" />
                  Terms & amounts
                </h3>
                <div className="space-y-4">
              <div>
                <InputField
                  disabled={formData.loanPackage === null ? true : false}
                  name="loanAmount"
                  required={true}
                  ariaLabel={"Number input"}
                  onKeyPress={preventMinus}
                  onWheel={() => document.activeElement.blur()}
                  activeBorderColor="border-swBlue"
                  endIcon={<p className="text-swGray">NGN &#8358;</p>}
                  label="Loan amount (Principal)"
                  value={formData?.loanAmount?.toLocaleString()}
                  placeholder="Enter loan amount"
                  isActive="loan-amount"
                  onChange={(e) => {
                    setInputState(e);
                    if (formData.commitmentValue > 0) {
                      updateCommitmentTotal(e);
                    }
                    if (
                      formData.loanPackage &&
                      formData.loanDuration &&
                      formData.repaymentType
                    ) {
                      calculateInterest(
                        e.target.value,
                        formData.loanPackage,
                        formData.loanDuration,
                        formData.repaymentType
                      );
                    }
                  }}
                  inputOpen={isInputOpen}
                />
                <p
                  className={`mt-1.5 rounded-lg px-3 py-2 text-xs leading-relaxed ${
                    formData?.loanAmount <
                      loanPackageInterestRate?.loanAmountRange?.min ||
                    formData?.loanAmount >
                      loanPackageInterestRate?.loanAmountRange?.max
                      ? "bg-red-50 font-medium text-swIndicatorLightRed"
                      : "bg-slate-50 text-swGrey200"
                  }`}
                >
                  {formData?.loanAmount <
                  loanPackageInterestRate?.loanAmountRange?.min
                    ? `Amount cannot be less than ₦${loanPackageInterestRate?.loanAmountRange?.min.toLocaleString()}`
                    : formData?.loanAmount >
                      loanPackageInterestRate?.loanAmountRange?.max
                    ? `Amount cannot be more than ₦${loanPackageInterestRate?.loanAmountRange?.max.toLocaleString()}`
                    : `min = ₦${
                        loanPackageInterestRate?.loanAmountRange?.min.toLocaleString() ||
                        0
                      } and max = ₦${
                        loanPackageInterestRate?.loanAmountRange?.max.toLocaleString() ||
                        0
                      }`}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 items-end">
                <div className="w-full sm:w-1/3">
                  <SelectField
                    value={loanDurationMetricsData.find(
                      (option) => option.value === formData.loanDurationMetrics
                    )}
                    name="loanDurationMetrics"
                    disabled={formData.loanAmount === 0 ? true : false}
                    optionValue={loanDurationMetricsData}
                    label={"Duration"}
                    required={true}
                    placeholder={"duration metics"}
                    isSearchable={false}
                    onChange={(selectedOption) => {
                      handleSelectChange(selectedOption, "loanDurationMetrics");
                    }}
                  />
                </div>
                <div className="w-full sm:w-2/3">
                  <InputField
                    disabled={
                      formData.loanDurationMetrics === null ? true : false
                    }
                    value={formData?.loanDuration}
                    required={false}
                    name="loanDuration"
                    onKeyPress={preventMinus}
                    onWheel={() => document.activeElement.blur()}
                    activeBorderColor="border-swBlue"
                    placeholder="Enter number"
                    onChange={(e) => {
                      setInputState(e);
                      //  calCommitmentTotal(e);
                    }}
                  />
                </div>
              </div>
                </div>
              </div>

              <div className="space-y-4 rounded-xl border border-gray-100/80 bg-gradient-to-b from-gray-50/80 to-white p-4 sm:p-5">
                <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-swGrey200">
                  <LuCalculator size={14} className="text-violet-600" />
                  Fees & repayment
                </h3>
                <div className="space-y-4">
              <div className="flex gap-2">
                <div className="w-full">
                  <InputField
                    value={formData.commitmentValue}
                    label="Commitment Fees"
                    disabled={formData.loanDuration === "" ? true : false}
                    required={true}
                    name="commitmentValue"
                    onKeyPress={preventMinus}
                    onWheel={() => document.activeElement.blur()}
                    activeBorderColor="border-swBlue"
                    placeholder="Enter Value"
                    onChange={(e) => {
                      setInputState(e);
                      calCommitmentTotal(e);
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-full">
                  <InputField
                    value={formData.managementValue}
                    label="Management Fees"
                    disabled={formData.commitmentValue === "" ? true : false}
                    required={true}
                    name="managementValue"
                    onKeyPress={preventMinus}
                    onWheel={() => document.activeElement.blur()}
                    activeBorderColor="border-swBlue"
                    placeholder="Enter Value"
                    onChange={(e) => {
                      setInputState(e);
                      calManagementTotal(e);
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-5 sm:gap-2">
                <div className="w-full sm:w-1/3">
                  <SelectField
                    value={frequencyTypeData.find(
                      (option) => option.value === formData.loanFrequencyType
                    )}
                    name="loanFrequencyType"
                    disabled={formData.commitmentValue === "" ? true : false}
                    optionValue={frequencyTypeData}
                    label={"Loan Frequency Type"}
                    required={true}
                    placeholder={"Select frequency type"}
                    isSearchable={false}
                    onChange={(selectedOption) => {
                      handleSelectChange(selectedOption, "loanFrequencyType");
                      calcRepaymentsNo(selectedOption.value);
                    }}
                  />
                </div>
                <div className="w-full sm:w-2/3">
                  <InputField
                    disabled={true}
                    label="Number of Repayments"
                    required={true}
                    name="numberOfRepayment"
                    onKeyPress={preventMinus}
                    onWheel={() => document.activeElement.blur()}
                    value={formData.numberOfRepayment}
                    activeBorderColor="border-swBlue"
                    placeholder="Enter number of repayment"
                  />
                </div>
              </div>
              <div className="w-full">
                <SelectField
                  value={modifyInterestTypeData(interestType?.data?.data)?.find(
                    (option) => option.value === formData.interestType
                  )}
                  name="interestType"
                  disabled={formData.numberOfRepayment === "" ? true : false}
                  optionValue={modifyInterestTypeData(interestType?.data?.data)}
                  label={"Interest Type"}
                  required={true}
                  placeholder={"Select interest type"}
                  isSearchable={false}
                  onChange={(selectedOption) => {
                    handleSelectChange(selectedOption, "interestType");
                  }}
                />
              </div>
              <div className="w-full">
                <SelectField
                  value={repaymentTypeData.find(
                    (option) => option.value === formData.repaymentType
                  )}
                  name="repaymentType"
                  disabled={formData.numberOfRepayment === "" ? true : false}
                  optionValue={
                    formData.interestType === "65392ef8f3b65979e7047c44"
                      ? reducingBalrepaymentTypeData
                      : repaymentTypeData
                  }
                  label={"Repayment Type"}
                  required={true}
                  placeholder={"Select repayment type"}
                  isSearchable={false}
                  onChange={(selectedOption) => {
                    handleSelectChange(selectedOption, "repaymentType");
                  }}
                />
              </div>
                </div>
              </div>

              {/* <div className="flex gap-2 items-end">
                  <div className="w-1/3">
                    <SelectField
                      name="commitmentType"
                      disabled={formData.loanAmount === 0 ? true : false}
                      optionValue={commitmentType}
                      label={"Fees"}
                      required={true}
                      placeholder={"Percentage"}
                      isSearchable={false}
                      onChange={(selectedOption) => {
                        handleSelectChange(selectedOption, "commitmentType");
                      }}
                    />
                  </div>
                  <div className="w-2/3">
                    <InputField
                      disabled={formData.commitmentType === null ? true : false}
                      required={false}
                      name="commitmentValue"
                       
                       
                      onKeyPress={preventMinus}
                      onWheel={() => document.activeElement.blur()}
                      activeBorderColor="border-swBlue"
                      placeholder="Enter Value"
                      endIcon={<p className="text-swGray">%</p>}
                      onChange={(e) => {
                        setInputState(e);
                        calCommitmentTotal(e);
                      }}
                    />
                  </div>
                  <div className="p-2 rounded-lg border-2 border-white hover:border-gray-300 cursor-pointer">
                    <AiOutlinePlus size={20} />
                  </div>
                </div> */}
            </div>
            </section>

            <section className="rounded-2xl border border-gray-100/90 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-4 ring-emerald-500/10">
                  <LuFileUp size={20} strokeWidth={2} />
                </span>
                <div>
                  <h2 className="text-base font-bold text-swGrey500 sm:text-lg">
                    Documents & uploads
                  </h2>
                  <p className="text-xs text-swGrey200 sm:text-sm">
                    PDF, JPG, or PNG — max size per your server policy
                  </p>
                </div>
              </div>
            <div className="mb-6 grid grid-cols-1 gap-5 xs:grid-cols-2 sm:grid-cols-3 [background-image:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] rounded-xl p-3 sm:p-4">
              {renderFileInput("Upload Collateral documents", "collaterals")}
              {renderFileInput(
                "Upload Loan Application form",
                "applicationForm"
              )}
              {renderFileInput(
                "Upload Loan Affidavit document",
                "loanAffidavit"
              )}
              {renderFileInput("Upload Guarantor Form", "guarantorForm")}
              {renderFileInput(
                "Upload Account Statement",
                "statementOfAccounts"
              )}
              {renderFileInput("Proof of Ownership", "proofOfOwnership")}
              {renderFileInput("Power of Attorney", "powerOfAttorney")}
            </div>
            </section>

            <div className="sticky bottom-0 z-30 mt-4 border-t border-gray-200/80 bg-gradient-to-t from-gray-50 via-gray-50/95 to-transparent pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 md:hidden">
              <div className="rounded-2xl border border-gray-200/80 bg-white/95 p-4 shadow-2xl shadow-swBlue/10 backdrop-blur-md">
                <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-wide text-swGrey200">
                  Continue when ready
                </p>
                <div className="flex flex-col gap-3">
                  <EditableButton
                    blueBtn={true}
                    disabled={
                      formData.repaymentType === null || loading === true
                        ? true
                        : false
                    }
                    className={"w-full"}
                    label={"Preview Interest"}
                    onClick={goToReviewStep}
                  />
                  <EditableButton
                    blueBtn={true}
                    disabled={
                      formData.repaymentType === null || loading === true
                        ? true
                        : false
                    }
                    startIcon={
                      loading && (
                        <Rings
                          height="20"
                          width="20"
                          color="#ffffff"
                          radius="2"
                          wrapperStyle={{}}
                          wrapperClass=""
                          visible={true}
                          ariaLabel="rings-loading"
                        />
                      )
                    }
                    className={`w-full ${loading === true && "cursor-not-allowed"}`}
                    label={"Create Loan"}
                    onClick={submitLoan}
                  />
                </div>
              </div>
            </div>
          </div>
          <aside className="hidden w-full shrink-0 border-t border-gray-200/80 pt-6 md:block lg:w-[300px] xl:w-[320px] lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <div className="sticky top-4 max-h-[calc(100vh-6rem)] space-y-3 overflow-y-auto overscroll-contain rounded-2xl border border-gray-100/90 bg-gradient-to-b from-white via-white to-swBlueActiveStateBg/20 p-4 shadow-lg shadow-swBlue/5 ring-1 ring-black/[0.03]">
            <div className="border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-swBlue text-white shadow-md">
                  <LuPanelRight size={18} strokeWidth={2.25} />
                </span>
                <div>
                  <p className="text-lg font-bold text-swGrey500">At a glance</p>
                  <p className="text-[11px] leading-snug text-swGrey200">
                    Snapshot only — full fields stay on the left
                  </p>
                </div>
              </div>
            </div>
            {selectedCustomer != null ? (
              <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
                <BorrowerAvatar
                  key={`${selectedCustomer?._id ?? "c"}-${getProfilePictureSrc(selectedCustomer) ?? "no-photo"}`}
                  customer={selectedCustomer}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-swGrey500">
                    {selectedCustomer.firstName} {selectedCustomer.lastName}
                  </p>
                  <p className="truncate text-xs text-swGrey200">
                    {selectedCustomer.phoneNumber?.replace(/^\+/, "") || "—"}
                  </p>
                </div>
              </div>
            ) : (
              <p className="rounded-lg border border-dashed border-gray-200 bg-gray-50/80 px-3 py-2 text-center text-xs text-swGrey200">
                No borrower selected yet
              </p>
            )}

            <div className="rounded-xl border border-swBlue/20 bg-swBlueActiveStateBg/50 p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-swBlue">
                Principal
              </p>
              <p className="text-lg font-bold tabular-nums text-swGrey500 sm:text-xl">
                ₦{formatNumber(formData.loanAmount) || "0"}
              </p>
            </div>

            <dl className="space-y-0 text-sm">
              <div className="flex justify-between gap-2 border-b border-gray-100 py-2">
                <dt className="text-swGrey200">Package</dt>
                <dd className="max-w-[60%] text-right font-medium text-swGrey500">
                  {loanPackageText || "—"}
                </dd>
              </div>
              <div className="flex justify-between gap-2 border-b border-gray-100 py-2">
                <dt className="text-swGrey200">Rate & tenor</dt>
                <dd className="text-right font-medium text-swGrey500">
                  {formData?.interestRate ?? "—"}% · {formData.loanDuration || "—"}{" "}
                  {formData.loanDurationMetrics || ""}
                </dd>
              </div>
              <div className="flex justify-between gap-2 border-b border-gray-100 py-2">
                <dt className="text-swGrey200">Repayment</dt>
                <dd className="max-w-[58%] text-right font-medium text-swGrey500">
                  {repaymentTypeData.find(
                    (o) => o.value === formData.repaymentType
                  )?.label || "—"}{" "}
                  · {formData.numberOfRepayment || 0} pymt
                </dd>
              </div>
              <div className="flex justify-between gap-2 py-2">
                <dt className="text-swGrey200">Fees (est.)</dt>
                <dd className="text-right font-semibold tabular-nums text-swGrey500">
                  ₦
                  {(
                    (Number(formData.commitmentTotal) || 0) +
                    (Number(formData.managementTotal) || 0)
                  ).toLocaleString()}
                </dd>
              </div>
            </dl>

            {interest != null && !Number.isNaN(Number(interest)) && (
              <div className="rounded-lg border border-emerald-100 bg-emerald-50/60 px-3 py-2">
                <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-800">
                  Est. interest (maturity)
                </p>
                <p className="text-sm font-bold tabular-nums text-emerald-900">
                  ₦
                  {Number(interest)
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
              </div>
            )}

            <p className="text-center text-[10px] leading-relaxed text-swGrey200">
              Full breakdown appears after you tap{" "}
              <span className="font-semibold text-swGrey400">Preview interest</span>.
            </p>

                <div className="flex flex-col gap-3 border-t border-gray-100 pt-3">
                  <EditableButton
                    blueBtn={true}
                    disabled={
                      formData.repaymentType === null || isLoading === true
                        ? true
                        : false
                    }
                    className={"w-full"}
                    label={"Preview Interest"}
                    onClick={goToReviewStep}
                  />

                  <EditableButton
                    blueBtn={true}
                    disabled={
                      formData.repaymentType === null || loading === true
                        ? true
                        : false
                    }
                    startIcon={
                      loading && (
                        <Rings
                          height="20"
                          width="20"
                          color="#ffffff"
                          radius="2"
                          wrapperStyle={{}}
                          wrapperClass=""
                          visible={true}
                          ariaLabel="rings-loading"
                        />
                      )
                    }
                    className={`w-full ${
                      loading === true && "cursor-not-allowed"
                    }`}
                    label={"Create Loan"}
                    onClick={submitLoan}
                  />
                </div>
            </div>
          </aside>
          </div>
        </main>
      ) : null}

      {currentStep === 2 && (
        <main className="min-h-full bg-gradient-to-b from-[#f0f6fc] via-gray-50 to-gray-50 text-swGray">
        <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="w-full rounded-2xl border border-gray-100/90 bg-white p-4 shadow-sm sm:p-6 lg:w-2/3">
            <nav
              className="mb-6 flex flex-col gap-3 rounded-xl border border-swBlue/15 bg-gradient-to-r from-swBlueActiveStateBg/60 to-white p-3 shadow-inner sm:flex-row sm:items-stretch sm:gap-3"
              aria-label="Application steps"
            >
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="flex flex-1 items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 text-left transition hover:border-swBlue/40 hover:bg-swBlueActiveStateBg/40 hover:shadow-sm"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-swBlue/35 bg-white text-sm font-bold text-swBlue shadow-sm">
                  1
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-swBlue">
                    Go back
                  </p>
                  <p className="font-semibold text-swGrey500">
                    Details & documents
                  </p>
                </div>
              </button>
              <div
                className="hidden h-auto w-px shrink-0 bg-gradient-to-b from-transparent via-gray-200 to-transparent sm:block"
                aria-hidden
              />
              <div
                className="flex flex-1 items-center gap-3 rounded-xl border border-swBlue/25 bg-swBlueActiveStateBg/60 p-3"
                aria-current="step"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-swBlue to-swDarkBlue text-sm font-bold text-white shadow-md shadow-swBlue/25">
                  2
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-swBlue">
                    You are here
                  </p>
                  <p className="font-semibold text-swGrey500">Review & create</p>
                </div>
              </div>
            </nav>
            <div className="overflow-hidden rounded-xl border border-gray-100/80 bg-gray-50/30">
            <PreviewInterest
              formData={formData}
              selectedCustomer={selectedCustomer}
              setCurrentStep={setCurrentStep}
              data={interestValue?.data}
            />
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="order-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-swGrey500 shadow-sm transition hover:border-swBlue/35 hover:bg-swBlueActiveStateBg/50 hover:text-swBlue sm:order-1 sm:w-auto"
              >
                <LuArrowLeft size={18} strokeWidth={2.25} className="shrink-0" />
                Back to edit details
              </button>
              <p className="order-1 hidden text-xs text-swGrey200 sm:order-2 sm:mr-auto sm:inline sm:max-w-xs">
                <LuPencil
                  size={14}
                  className="mr-1 inline align-text-bottom text-swBlue"
                />
                Return to step 1 to change any value, then run{" "}
                <span className="font-medium text-swGrey400">Preview interest</span>{" "}
                again to refresh numbers.
              </p>
              <div className="md:hidden">
                <EditableButton
                  blueBtn={true}
                  disabled={
                    formData.repaymentType === null || loading === true
                      ? true
                      : false
                  }
                  startIcon={
                    loading && (
                      <Rings
                        height="20"
                        width="20"
                        color="#ffffff"
                        radius="2"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="rings-loading"
                      />
                    )
                  }
                  className={`w-full ${loading === true && "cursor-not-allowed"}`}
                  label={"Create Loan"}
                  onClick={submitLoan}
                />
              </div>
            </div>
          </div>
          <aside className="hidden w-full shrink-0 border-t border-gray-200/80 pt-6 md:block lg:w-[300px] xl:w-[320px] lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <div className="sticky top-4 max-h-[calc(100vh-6rem)] space-y-3 overflow-y-auto overscroll-contain rounded-2xl border border-gray-100/90 bg-gradient-to-b from-white via-white to-swBlueActiveStateBg/20 p-4 shadow-lg shadow-swBlue/5 ring-1 ring-black/[0.03]">
            <div className="border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-swBlue text-white shadow-md">
                  <LuPanelRight size={18} strokeWidth={2.25} />
                </span>
                <div>
                  <p className="text-lg font-bold text-swGrey500">Review snapshot</p>
                  <p className="text-[11px] leading-snug text-swGrey200">
                    Key figures from your preview — full schedule is on the left
                  </p>
                </div>
              </div>
            </div>
            {selectedCustomer != null ? (
              <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
                <BorrowerAvatar
                  key={`${selectedCustomer?._id ?? "c"}-${getProfilePictureSrc(selectedCustomer) ?? "no-photo"}`}
                  customer={selectedCustomer}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-swGrey500">
                    {selectedCustomer.firstName} {selectedCustomer.lastName}
                  </p>
                  <p className="truncate text-xs text-swGrey200">
                    {selectedCustomer.phoneNumber?.replace(/^\+/, "") || "—"}
                  </p>
                </div>
              </div>
            ) : (
              <p className="rounded-lg border border-dashed border-gray-200 bg-gray-50/80 px-3 py-2 text-center text-xs text-swGrey200">
                No borrower selected yet
              </p>
            )}

            <div className="rounded-xl border border-swBlue/20 bg-swBlueActiveStateBg/50 p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-swBlue">
                Principal
              </p>
              <p className="text-lg font-bold tabular-nums text-swGrey500 sm:text-xl">
                ₦{formatNumber(formData.loanAmount) || "0"}
              </p>
            </div>

            <div className="rounded-xl border-2 border-swBlue/30 bg-white p-3 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-wider text-swGrey200">
                Total at maturity
              </p>
              <p className="text-xl font-bold tabular-nums text-swBlue">
                ₦
                {interestValue?.data?.totalPayments != null
                  ? String(interestValue.data.totalPayments).replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      ","
                    )
                  : "—"}
              </p>
            </div>

            <dl className="space-y-0 text-sm">
              <div className="flex justify-between gap-2 border-b border-gray-100 py-2">
                <dt className="text-swGrey200">Interest (preview)</dt>
                <dd className="font-semibold tabular-nums text-swGrey500">
                  ₦
                  {interestValue?.data?.totalInterestPayments != null
                    ? Number(interestValue.data.totalInterestPayments)
                        .toFixed(2)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : "—"}
                </dd>
              </div>
              <div className="flex justify-between gap-2 py-2">
                <dt className="text-swGrey200">Fees (commitment + mgmt)</dt>
                <dd className="font-semibold tabular-nums text-swGrey500">
                  ₦
                  {(
                    (Number(formData.commitmentTotal) || 0) +
                    (Number(formData.managementTotal) || 0)
                  ).toLocaleString()}
                </dd>
              </div>
            </dl>

            <p className="text-center text-[10px] leading-relaxed text-swGrey200">
              Line-by-line breakdown is in the preview panel.
            </p>

                <div className="border-t border-gray-100 pt-3">
                  <EditableButton
                    blueBtn={true}
                    disabled={
                      formData.repaymentType === null || loading === true
                        ? true
                        : false
                    }
                    startIcon={
                      loading && (
                        <Rings
                          height="20"
                          width="20"
                          color="#ffffff"
                          radius="2"
                          wrapperStyle={{}}
                          wrapperClass=""
                          visible={true}
                          ariaLabel="rings-loading"
                        />
                      )
                    }
                    className={`w-full ${
                      loading === true && "cursor-not-allowed"
                    }`}
                    label={"Create Loan"}
                    onClick={submitLoan}
                  />
                </div>
            </div>
          </aside>
        </div>
        </div>
        </main>
      )}

      <CenterModal
        width={"40%"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="h-[500px] overflow-y-scroll rounded-xl">
          <div className="mb-4 flex gap-2">
            <input
              type="search"
              placeholder="Search customer by name, email, or phone"
              onChange={(e) => {
                search(e.target.value);
              }}
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50/80 px-4 text-sm outline-none ring-swBlue/20 transition placeholder:text-swGrey200 focus:border-swBlue focus:bg-white focus:ring-2"
            />
            <button
              type="button"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-swGrey400 transition hover:border-swBlue/30 hover:text-swBlue"
              onClick={() => {
                setIsOpen(false);
                setFilteredData(customer?.data);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {Array.isArray(filteredData) &&
            filteredData?.map((item) => (
              <div
                key={item._id}
                onClick={() => {
                  setFormData({
                    ...formData,
                    customerId: item._id,
                  });
                  setSelectedCustomer(item);
                  setIsOpen(false);
                  setFilteredData(customer?.data);
                }}
                className="mb-3 cursor-pointer rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:border-swBlue/25 hover:bg-swBlueActiveStateBg/40 hover:shadow-md"
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <div className="text-xs text-gray-800">
                      {item.firstName} {item.lastName}
                    </div>
                    <div className="text-xs text-gray-600 font-semibold">
                      {item.email}
                    </div>
                  </div>
                  <div className="text-xs text-gray-800 font-semibold">
                    {item.phoneNumber}
                  </div>
                  <div>
                    <button
                      className={`${"font-semibold text-swBlue bg-blue-50"} p-1 text-xs rounded-full border cursor-pointer`}
                    >
                      Badge
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </CenterModal>
      <Loader isOpen={isLoading} />
    </DashboardLayout>
  );
};

export default CreateLoan;
