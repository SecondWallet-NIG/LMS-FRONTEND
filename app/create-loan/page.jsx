"use client";

import { useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import InputField from "../components/shared/input/InputField";
import SelectField from "../components/shared/input/SelectField";
import { useState } from "react";
import { AiOutlineDelete, AiOutlinePaperClip } from "react-icons/ai";
import Button from "../components/shared/buttonComponent/Button";
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
      e.preventDefault();
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
  useEffect(() => {
    dispatch(getCustomers());
    dispatch(getLoanPackage());
    dispatch(getInterestType());
    setIsLoading(false);
  }, []);

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
    let userId;
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setRoleTag(storedUser?.data?.user?.role.tag);
    }
  }, []);

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
      <div className="flex flex-col items-center justify-center gap-2 mt-5">
        <p className="font-semibold text-center">{text}</p>
        {fileError[name] && (
          <p className="text-red-500 text-sm">{fileError[name]}</p>
        )}

        {name === "collaterals" &&
          formData[name]?.map((file, index) => (
            <div
              key={index}
              id="fileLabel3"
              className="bg-swLightGray p-2 flex justify-between"
            >
              <div className="text-xs">{file.name}</div>
              <div
                onClick={() => {
                  deleteFile(index, "collaterals");
                }}
              >
                <AiOutlineDelete color="red" size={20} />
              </div>
            </div>
          ))}

        {formData[name]?.name ? (
          <div
            id="fileLabel3"
            className="bg-swLightGray p-2 flex justify-between"
          >
            <div className="text-xs">{formData[name]?.name}</div>
            <div
              onClick={() => {
                deleteFile(name);
              }}
            >
              <AiOutlineDelete color="red" size={20} />
            </div>
          </div>
        ) : null}

        <div className="relative">
          <input
            name={name}
            type="file"
            id={`fileInput-${name}`}
            className="absolute w-0 h-0 opacity-0"
            onChange={handleFileChange}
            onClick={(e) => (e.target.value = null)}
          />
          <label
            htmlFor={`fileInput-${name}`}
            className="text-white cursor-pointer"
          >
            <span
              className={`py-2 px-6 rounded-md outline outline-2 hover:outline-gray-200 flex gap-2 border w-fit  `}
            >
              <AiOutlinePaperClip color="black" size={20} />
              <p className="font-semibold text-black">
                {formData[name]?.name ? "Change file" : "Select file"}
              </p>
            </span>
          </label>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const loanpackage = loanPackage?.data?.data.find(
      (item) => item._id === formData.loanPackage
    );
    setLoanPackageInterestRate(loanpackage);
  }, [formData.loanPackage]);

  if (roleTag && roleTag !== "LO") {
    return <Unauthorized />;
  }
  return (
    <DashboardLayout>
      <ToastContainer />
      {currentStep === 1 ? (
        <main className="flex text-sm">
          <div className="w-full md:w-2/3 pl-5 pr-5 pt-10 ">
            <div className="flex justify-between">
              <p className="text-lg font-semibold">Initiate loan application</p>

              <div className="flex items-center gap-5">
                <Link
                  href="/create-borrower"
                  className="flex gap-1 py-2 px-3 border-2 text-white hover:text-swBlue bg-swBlue hover:bg-white border-swBlue rounded-md focus:outline-none whitespace-nowrap"
                >
                  <IoMdAdd size={20} />
                  <p>Add new borrower</p>
                </Link>
                <div
                  onClick={savedLoans}
                  className="flex gap-1 py-2 px-7 cursor-pointer border-2  text-swBlue hover:text-white hover:bg-swBlue border-swBlue rounded-md focus:outline-none whitespace-nowrap"
                >
                  <p>Save</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5 mt-5">
              <p className="font-semibold">Loan details</p>
              <div className="">
                <label className="block mb-2 text-gray-700 text-xs">
                  Select Customer <span className="text-red-600 ml-1">*</span>
                </label>
                <div
                  className="border border-[#ccc] text-[#808080] p-2.5 rounded-md"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  {selectedCustomer != null ? (
                    <div className="">
                      {selectedCustomer.firstName} {selectedCustomer.lastName}
                    </div>
                  ) : (
                    <div> Search and select customer</div>
                  )}
                </div>
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
                  className={`${
                    (formData?.interestRate <
                      loanPackageInterestRate?.interestRate?.min ||
                      formData?.interestRate >
                        loanPackageInterestRate?.interestRate?.max) &&
                    "text-red-500"
                  }`}
                >
                  {formData?.interestRate <
                  loanPackageInterestRate?.interestRate?.min
                    ? `Interest rate cannot be less than ${loanPackageInterestRate?.interestRate?.min}%`
                    : formData?.interestRate >
                      loanPackageInterestRate?.interestRate?.max
                    ? `Interest rate cannot be more than ${loanPackageInterestRate?.interestRate?.min}%`
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
                  className={`${
                    (formData?.loanAmount <
                      loanPackageInterestRate?.loanAmountRange?.min ||
                      formData?.loanAmount >
                        loanPackageInterestRate?.loanAmountRange?.max) &&
                    "text-red-500"
                  }`}
                >
                  {formData?.loanAmount <
                  loanPackageInterestRate?.loanAmountRange?.min
                    ? `Interest rate cannot be less than ₦${loanPackageInterestRate?.loanAmountRange?.min.toLocaleString()}`
                    : formData?.loanAmount >
                      loanPackageInterestRate?.loanAmountRange?.max
                    ? `Interest rate cannot be more than ₦${loanPackageInterestRate?.loanAmountRange?.max.toLocaleString()}`
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
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-5 mb-10">
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

            <div className="flex items-center gap-5 my-5 md:hidden">
              <EditableButton
                blueBtn={true}
                disabled={
                  formData.repaymentType === null || isLoading === true
                    ? true
                    : false
                }
                className={"w-full"}
                label={"Preview Interest"}
                onClick={fetchInterest}
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
          <div className="w-1/3 pl-4 pr-4 pt-10  border-l border-gray-300 hidden md:block">
            <p className="text-lg text-swBlue font-semibold">Loan Summary</p>
            {selectedCustomer != null ? (
              <div className="p-4 m-2 bg-swBlue rounded-3xl text-white mx-auto items-start flex gap-5">
                {selectedCustomer.image ? (
                  ""
                ) : (
                  // <div className="rounded-full bg-white h-fit w-fit">
                  //   <img
                  //     className="rounded-full"
                  //     src={selectedCustomer?.profilePicture}
                  //     alt="user image"
                  //     width="60px"
                  //     height="60px"
                  //   />
                  // </div>
                  <div className="h-[4.7rem] w-[4.7rem] border-2 rounded-full relative overflow-hidden">
                    <img
                      src={selectedCustomer?.profilePicture}
                      alt="borrower"
                      fill
                      sizes="100%"
                    />
                  </div>
                )}
                <div>
                  <p className="text-lg font-semibold">
                    {selectedCustomer.firstName} {selectedCustomer.lastName}
                  </p>

                  <p className="text-sm mb-2">{selectedCustomer.email}</p>

                  <p className="text-sm py-1 px-2 bg-white text-swBlue rounded-full w-fit">
                    {selectedCustomer.phoneNumber.slice(1)}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 m-2 bg-swBlue text-white rounded-3xl mx-auto flex gap-2 items-center">
                <div className="h-[4.7rem] w-[4.7rem] border-2 rounded-full relative overflow-hidden">
                  <img
                    src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_5247852.jpg"
                    alt="borrower"
                  />
                </div>
                <p className="text-xl font-semibold">Select Borrower</p>
              </div>
            )}
            <div className="flex pt-2">
              <div className="w-1/3 text-swGray text-xs font-semibold pt-2">
                Loan Package
              </div>
              <div className="w-2/3">
                <div className="p-4 m-2 bg-swLightGray rounded-lg  mx-auto">
                  {loanPackageText || "No package selected yet"}
                </div>
              </div>
            </div>

            <div className="flex pt-2">
              <div className="w-1/3 text-swGray text-xs font-semibold pt-2">
                Interest Rate (Monthly)
              </div>
              <div className="w-2/3">
                <div className="p-4 m-2 bg-swLightGray rounded-lg  mx-auto">
                  {formData?.interestRate || 0} %
                </div>
              </div>
            </div>

            <div className="flex pt-2">
              <div className="w-1/3 text-swGray text-xs font-semibold pt-2">
                Loan Amount
              </div>
              <div className="w-2/3">
                <div className="p-4 m-2 bg-swLightGray rounded-lg  mx-auto">
                  ₦{formatNumber(formData.loanAmount) || 0.0}
                </div>
              </div>
            </div>
            <div className="flex pt-2">
              <div className="w-1/3 text-swGray text-xs font-semibold pt-2">
                Loan Frequency Type
              </div>
              <div className="w-2/3">
                <div className="p-4 m-2 bg-swLightGray rounded-lg  mx-auto">
                  {repaymentTypeData.find(
                    (option) => option.value === formData.repaymentType
                  )?.label || "No Loan Frequency Type Yet"}
                </div>
              </div>
            </div>
            <div className="flex pt-2">
              <div className="w-1/3 text-swGray text-xs font-semibold pt-2">
                Loan Duration
              </div>
              <div className="w-2/3">
                <div className="p-4 m-2 bg-swLightGray rounded-lg  mx-auto flex justify-between">
                  <div>{formData.loanDuration || 0}</div>
                  <div>{formData.loanDurationMetrics}</div>
                </div>
              </div>
            </div>
            <div className="flex pt-2">
              <div className="w-1/3 text-swGray text-xs font-semibold pt-2">
                Numbers of Repayment
              </div>
              <div className="w-2/3">
                <div className="p-4 m-2 bg-swLightGray rounded-lg  mx-auto">
                  {formData.numberOfRepayment || 0}
                </div>
              </div>
            </div>

            <div className="flex pt-2">
              <div className="w-1/3 text-swGray text-xs font-semibold pt-2">
                Commitment Fee
              </div>
              <div className="w-2/3 ">
                <div className="p-4 m-2 bg-swLightGray rounded-lg  mx-auto flex justify-between">
                  <div>{formData.commitmentValue || 0.0}%</div>
                  <div>
                    ₦
                    {formData.commitmentTotal
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex pt-2">
              <div className="w-1/3 text-swGray text-xs font-semibold pt-2">
                Management Fee
              </div>
              <div className="w-2/3 ">
                <div className="p-4 m-2 bg-swLightGray rounded-lg  mx-auto flex justify-between">
                  <div>{formData.commitmentValue || 0.0}%</div>
                  <div>
                    ₦
                    {formData.managementTotal
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex pt-2">
              <div className="w-full">
                <div className="p-4 m-2 bg-swLightGray rounded-lg  mx-auto">
                  <div className="flex justify-between  text-xs font-semibold pt-2">
                    <div className="text-swGray">Loan Principal :</div>{" "}
                    <div className="text-swBlue">
                      ₦{formatNumber(formData?.loanAmount)}
                    </div>
                  </div>
                  <div className="flex justify-between text-xs font-semibold pt-2">
                    <div className="text-swGray">Interest at maturity :</div>{" "}
                    <div className="text-swBlue">
                      ₦
                      {interest
                        ?.toFixed(2)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0.0}
                    </div>
                  </div>
                  <div className="flex justify-between  text-xs font-semibold pt-2">
                    <div className="text-swGray">Commitment Fee :</div>{" "}
                    <div className="text-swBlue">
                      ₦
                      {formData.commitmentTotal
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0.0}
                    </div>
                  </div>
                  <div className="flex justify-between  text-xs font-semibold pt-2">
                    <div className="text-swGray">Management Fee :</div>{" "}
                    <div className="text-swBlue">
                      ₦
                      {formData.managementTotal
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0.0}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-5 mt-5">
                  <EditableButton
                    blueBtn={true}
                    disabled={
                      formData.repaymentType === null || isLoading === true
                        ? true
                        : false
                    }
                    className={"w-full"}
                    label={"Preview Interest"}
                    onClick={fetchInterest}
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
            </div>
          </div>
        </main>
      ) : null}

      {currentStep === 2 && (
        <div className="flex">
          <div className="w-full md:w-2/3 p-2">
            <PreviewInterest
              formData={formData}
              selectedCustomer={selectedCustomer}
              setCurrentStep={setCurrentStep}
              data={interestValue?.data}
            />

            <div className="text-end pt-4 flex gap-5 justify-end">
              <Button
                variant="danger"
                onClick={() => {
                  setCurrentStep(1);
                }}
              >
                Edit Loan Details
              </Button>
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
                  className={`${loading === true && "cursor-not-allowed"}`}
                  label={"Create Loan"}
                  onClick={submitLoan}
                />
              </div>
            </div>
          </div>
          <div className="hidden md:block w-1/3 pl-4 pr-4 pt-10  border-l border-gray-300">
            <p className="text-lg text-swBlue font-semibold">Loan Summary</p>
            {selectedCustomer != null ? (
              <div className="p-4 m-2 bg-swBlue rounded-3xl text-white mx-auto flex gap-5 items-start">
                {selectedCustomer.image ? (
                  ""
                ) : (
                  <div className="h-[4.7rem] w-[4.7rem] border-2 rounded-full relative overflow-hidden">
                    <img
                      src={selectedCustomer?.profilePicture}
                      alt="borrower"
                      fill
                      sizes="100%"
                    />
                  </div>
                )}
                <div>
                  <p className="text-lg font-semibold">
                    {selectedCustomer.firstName} {selectedCustomer.lastName}
                  </p>

                  <p className="text-sm mb-2">{selectedCustomer.email}</p>

                  <p className="text-sm py-1 px-2 bg-white text-swBlue rounded-full w-fit">
                    {selectedCustomer.phoneNumber.slice(1)}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 m-2 bg-swBlue text-white rounded-3xl mx-auto flex gap-2 items-center">
                <div className="h-[4.7rem] w-[4.7rem] border-2 rounded-full relative overflow-hidden">
                  <img
                    src={selectedCustomer?.profilePicture}
                    alt="borrower"
                    fill
                    sizes="100%"
                  />
                </div>
                <p className="text-xl font-semibold">Select Borrower</p>
              </div>
            )}
            <div className="flex pt-2">
              <div className="w-1/3 text-swGray text-xs font-semibold pt-2">
                Loan Package
              </div>
              <div className="w-2/3">
                <div className="p-4 m-2 bg-swLightGray rounded-lg  mx-auto">
                  {loanPackageText || "No package selected yet"}
                </div>
              </div>
            </div>

            <div className="flex pt-2">
              <div className="w-1/3 text-swGray text-xs font-semibold pt-2">
                Loan Amount
              </div>
              <div className="w-2/3">
                <div className="p-4 m-2 bg-swLightGray rounded-lg  mx-auto">
                  ₦{formatNumber(formData.loanAmount) || 0.0}
                </div>
              </div>
            </div>
            <div className="flex pt-2">
              <div className="w-1/3 text-swGray text-xs font-semibold pt-2">
                Loan Frequency Type
              </div>
              <div className="w-2/3">
                <div className="p-4 m-2 bg-swLightGray rounded-lg  mx-auto">
                  {repaymentTypeData.find(
                    (option) => option.value === formData.repaymentType
                  )?.label || "No Loan Frequency Type Yet"}
                </div>
              </div>
            </div>
            <div className="flex pt-2">
              <div className="w-1/3 text-swGray text-xs font-semibold pt-2">
                Loan Duration
              </div>
              <div className="w-2/3">
                <div className="p-4 m-2 bg-swLightGray rounded-lg  mx-auto flex justify-between">
                  <div> {formData.loanDuration || 0}</div>
                  <div> {formData.loanDurationMetrics || 0}</div>
                </div>
              </div>
            </div>
            <div className="flex pt-2">
              <div className="w-1/3 text-swGray text-xs font-semibold pt-2">
                Numbers of Repayment
              </div>
              <div className="w-2/3">
                <div className="p-4 m-2 bg-swLightGray rounded-lg  mx-auto">
                  {formData.numberOfRepayment || 0}
                </div>
              </div>
            </div>

            <div className="flex pt-2">
              <div className="w-1/3 text-swGray text-xs font-semibold pt-2">
                Commitment Fee
              </div>
              <div className="w-2/3 ">
                <div className="p-4 m-2 bg-swLightGray rounded-lg  mx-auto flex justify-between">
                  <div>{formData.commitmentValue || 0.0}%</div>
                  <div>
                    ₦
                    {formData.commitmentTotal
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex pt-2">
              <div className="w-1/3 text-swGray text-xs font-semibold pt-2">
                Management Fee
              </div>
              <div className="w-2/3 ">
                <div className="p-4 m-2 bg-swLightGray rounded-lg  mx-auto flex justify-between">
                  <div>{formData.managementValue || 0.0}%</div>
                  <div>
                    ₦
                    {formData.managementTotal
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex pt-2">
              <div className="w-full">
                <div className="p-4 m-2 bg-swLightGray rounded-lg  mx-auto">
                  <div className="flex justify-between  text-xs font-semibold pt-2">
                    <div className="text-swGray">Loan Principal :</div>{" "}
                    <div className="text-swBlue">
                      ₦{formatNumber(formData?.loanAmount)}
                    </div>
                  </div>
                  <div className="flex justify-between text-xs font-semibold pt-2">
                    <div className="text-swGray">Interest at maturity :</div>{" "}
                    <div className="text-swBlue">
                      ₦
                      {interestValue?.data?.totalInterestPayments
                        ?.toFixed(2)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0.0}
                    </div>
                  </div>
                  <div className="flex justify-between  text-xs font-semibold pt-2">
                    <div className="text-swGray">Commitment Fee :</div>{" "}
                    <div className="text-swBlue">
                      ₦
                      {formData.commitmentTotal
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0.0}
                    </div>
                  </div>
                  <div className="flex justify-between  text-sm  font-semibold pt-2">
                    <div className="text-swGray">
                      Total payment at maturity :
                    </div>{" "}
                    <div className="text-swBlue">
                      ₦
                      {interestValue?.data?.totalPayments
                        ?.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0.0}
                    </div>
                  </div>
                </div>
                <div className="mb-10 mt-5">
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
            </div>
          </div>
        </div>
      )}

      <CenterModal
        width={"40%"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="h-[500px] overflow-y-scroll">
          <div className="mb-4 flex">
            <input
              type="search"
              placeholder="Search Customer"
              onChange={(e) => {
                search(e.target.value);
              }}
              className="bg-swLightGray px-2 rounded outline-none border w-full border-swLightGray h-10 "
            />
            <button
              className="p-2"
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
                className="mb-4 p-4 border rounded-lg shadow-md transition duration-300 hover:bg-gray-100 cursor-pointer"
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
