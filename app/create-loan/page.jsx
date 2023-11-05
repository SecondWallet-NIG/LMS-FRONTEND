"use client";
import Link from "next/link";
import { useEffect } from "react";
import Dashboard from "../dashboard/page";
import { IoMdAdd } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
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
import EditableButton from "../components/shared/editableBuutonComponent/EditableButton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PreviewInterest from "../components/modals/PreviewInterest";
import { FiUser } from "react-icons/fi";
import { useRouter } from "next/navigation";

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
  const [interest, setInterest] = useState(null);
  const [noOfRepayments, setNoOfRepayment] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileForm, setSelectedFileForm] = useState(null);

  const [formData, setFormData] = useState({
    loanAmount: 0,
    loanPackage: null,
    loanDuration: 0,
    commitmentValue: 0,
    commitmentTotal: 0,
    numberOfRepayment: 0,
    repaymentType: null,
    assetType: null || "null",
    loanDurationMetrics: null,
    loanFrequencyType: null,
    interestType: null,
    commitmentType: null,
    applicationForm: "applicationForm.pdf",
    preferredInterestRate: "Fixed",
    collaterals: ["collateral1.pdf", "collateral2.pdf"],
    guarantorForm: "guarantorForm.pdf",
    loanAffidavit: "loanAffidavit.pdf",
    offerLetter: "offerLetter.pdf",
    status: "Pending",
    createdBy: "60c1d48a90d7456b1b3c65e6",
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

  const loanDurationMetricsData = [
    { value: "Monthly", label: "Monthly" },
    { value: "Yearly", label: "Yearly" },
  ];

  const commitmentType = [{ value: "Percentage", label: "Percentage" }];

  const validateFormData = (formData) => {
    for (const key in formData) {
      if (formData[key] === null || formData[key] === 0) {
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
      interestRate: item?.interestRate?.rate
    }));
  };

  const modifyInterestTypeData = (arr) => {
    if (Array.isArray(arr)) {
      return arr.map((item) => ({
        label: item.name,
        value: item._id,

      }));
    } else {
      // Handle the case when 'arr' is not an array
      return []; // or any other suitable value or action
    }
  };

  const setInputState = async (e) => {
    let { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    console.log({ formData });
  };

  const search = (e) => {
    const filtered = customer?.data.filter((item) => {
      const fullName =
        `${item.firstName} ${item.lastName} ${item.email}`.toLowerCase();
      return fullName.includes(e.toLowerCase());
    });

    setFilteredData(filtered);
  };

  const calCommitmentTotal = (e) => {
    let { name, value } = e.target;
    let total = (value * formData.loanAmount) / 100;
    setFormData((prevFormData) => ({
      ...prevFormData,
      commitmentTotal: total,
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

    console.log({ formData });
  };

  const fetchInterest = (e) => {
    setLoading(true);
    const isFormDataValid = validateFormData(formData);
    if (isFormDataValid === true) {
      const payload = {
        loanDurationMetrics: formData.loanDurationMetrics,
        loanDuration: formData.loanDuration,
        loanAmount: formData.loanAmount,
        loanPackageId: formData.loanPackage,
        interestTypeId: formData.interestType,
        repaymentType: formData.repaymentType,
        loanFrequencyType: formData.loanFrequencyType,
        startDate: "02-01-2023",
      };
      e.preventDefault();
      dispatch(calculateInterest(payload))
        .unwrap()
        .then(() => {
          setIsPreviewInterestOpen(true);
          setCurrentStep(2);
          setLoading(false);
        })
        .catch((error) => {
          toast.error(`An error occured`);
          setLoading(false);
        });
    } else {
      toast.error("Some required fields are missing");
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleFileChange1 = (e) => {
    const file = e.target.files[0];
    setSelectedFileForm(file);
  };
  const deleteFile = () => {
    setSelectedFile(null);
  };
  const deleteFileForm = () => {
    setSelectedFileForm(null);
  };

  const submitLoan = (e) => {
    setLoading(true);
    e.preventDefault();
    dispatch(createLoanApplication(formData))
      .unwrap()
      .then(() => {
        toast("Loan application successful");
        router.push("/loan-applications/all");
        setLoading(false);
      })
      .catch((error) => {
        console.log({ error });
        toast.error(`An error occured`);
        setLoading(false);
      });
  };
  useEffect(() => {
    dispatch(getCustomers());
    dispatch(getLoanPackage());
    dispatch(getInterestType());
  }, []);

  useEffect(() => {
    setFilteredData(customer?.data);
  }, [customer?.data]);

  return (
    <Dashboard>
      <ToastContainer />

      {currentStep === 1 ? (
        <main className="flex text-sm">
          <div className="w-2/3 pl-5 pr-5 pt-10 ">
            <div className="flex justify-between">
              <p className="text-lg font-semibold">Initiate loan application</p>

              <Button
                href=""
                className="flex gap-1 py-2 px-3 border-2 bg-swBlue border-swLightGray rounded-md focus:outline-none whitespace-nowrap"
              >
                <IoMdAdd size={20} />
                <p>Add new customer</p>
              </Button>
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
              {formData.loanPackage === "65390f290d0a83675c9517b3" ? (
                <SelectField
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
              <InputField
                maxLength="1000000"
                disabled={formData.loanPackage === null ? true : false}
                name="loanAmount"
                required={true}
                inputType="number"
                activeBorderColor="border-swBlue"
                endIcon={<p className="text-swGray">NGN &#8358;</p>}
                label="Loan amount (Principal)"
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
              <div className="flex gap-2 items-end">
                <div className="w-1/3">
                  <SelectField
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
                <div className="w-2/3">
                  <InputField
                    disabled={
                      formData.loanDurationMetrics === null ? true : false
                    }
                    required={false}
                    name="loanDuration"
                    inputType="number"
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
                    value={formData.commitmentValue}
                    label="Percentage"
                    disabled={formData.commitmentType === null ? true : false}
                    required={true}
                    name="commitmentValue"
                    inputType="number"
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
                <div className="w-1/3">
                  <SelectField
                    disabled={formData.commitmentValue === 0 ? true : false}
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
                <div className="w-2/3">
                  <InputField
                    disabled={true}
                    label="Number of Repayments"
                    required={true}
                    name="numberOfRepayment"
                    inputType="number"
                    value={formData.numberOfRepayment}
                    activeBorderColor="border-swBlue"
                    placeholder="Enter number of repayment"
                  />
                </div>
              </div>
              <div className="w-full">
                <SelectField
                  name="repaymentType"
                  disabled={formData.numberOfRepayment === 0 ? true : false}
                  optionValue={repaymentTypeData}
                  label={"Repayment Type"}
                  required={true}
                  placeholder={"Select repayment type"}
                  isSearchable={false}
                  onChange={(selectedOption) => {
                    handleSelectChange(selectedOption, "repaymentType");
                  }}
                />
              </div>
              <div className="w-full">
                <SelectField
                  name="interestType"
                  disabled={formData.numberOfRepayment === 0 ? true : false}
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
                    inputType="number"
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
            <div className="flex flex-col gap-2 mt-5">
              <p className="font-semibold">Upload Collateral documents</p>
              <p className="text-gray-700">
                Document types uploaded should be JPEGS, PNG or PDF and should
                not exceed 4mb
              </p>
              <div className="relative">
                <input
                  type="file"
                  id="fileInput"
                  className="absolute w-0 h-0 opacity-0"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="fileInput"
                  className="px-4 py-2 text-white rounded-md cursor-pointer"
                >
                  <span className="py-2 px-6 rounded-md flex gap-2 border w-fit">
                    <AiOutlinePaperClip color="black" size={20} />
                    <p className="font-semibold text-black">
                      {selectedFile ? "Change file" : "Select file"}
                    </p>
                  </span>
                </label>
                {selectedFile ? (
                  <div
                    id="fileLabel"
                    className="bg-swLightGray p-2 flex justify-between"
                  >
                    <div className="text-xs">{selectedFile.name}</div>
                    <div>
                      <AiOutlineDelete
                        onClick={deleteFile}
                        color="red"
                        size={20}
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-5">
              <p className="font-semibold">Upload Hard copy of filled form</p>
              <p className="text-gray-700 ">
                Document types uploaded should be JPEGS, PNG or PDF and should
                not exceed 4mb
              </p>
              <div className="relative">
                <input
                  type="file"
                  id="fileInput1"
                  className="absolute w-0 h-0 opacity-0"
                  onChange={handleFileChange1}
                />
                <label
                  htmlFor="fileInput1"
                  className="px-4 py-2 text-white rounded-md cursor-pointer"
                >
                  <span className="py-2 px-6 rounded-md flex gap-2 border w-fit">
                    <AiOutlinePaperClip color="black" size={20} />
                    <p className="font-semibold text-black">
                      {" "}
                      {selectedFileForm ? "Change file" : "Select file"}
                    </p>
                  </span>
                </label>
                {selectedFileForm ? (
                  <div
                    id="fileLabel"
                    className="bg-swLightGray p-2 flex justify-between"
                  >
                    <div className="text-xs">{selectedFileForm.name}</div>
                    <div>
                      <AiOutlineDelete
                        onClick={deleteFileForm}
                        color="red"
                        size={20}
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="w-1/3 pl-4 pr-4 pt-10  border-l border-gray-300">
            <p className="text-lg text-swBlue font-semibold">Loan Summary</p>
            {selectedCustomer != null ? (
              <div className="p-4 m-2 bg-swBlue rounded-3xl text-white mx-auto flex gap-5">
                {selectedCustomer.image ? (
                  ""
                ) : (
                  <div className="p-3 rounded-full bg-white h-fit w-fit">
                    <FiUser size={30} className="text-gray-400" />
                  </div>
                )}
                <div>
                  <p className="text-lg font-semibold">
                    {selectedCustomer.firstName} {selectedCustomer.lastName}
                  </p>

                  <p className="text-sm mb-2">{selectedCustomer.email}</p>

                  <p className="text-sm py-1 px-2 bg-white text-swBlue rounded-full w-fit">
                    {selectedCustomer.nin}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 m-2 bg-swBlue text-white rounded-3xl mx-auto flex gap-2 items-center">
                <div className="p-3 rounded-full bg-white">
                  <FiUser size={35} className="text-gray-400" />
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
                  {loanPackageRate || 0} %
                </div>
              </div>
            </div>

            <div className="flex pt-2">
              <div className="w-1/3 text-swGray text-xs font-semibold pt-2">
                Loan Amount
              </div>
              <div className="w-2/3">
                <div className="p-4 m-2 bg-swLightGray rounded-lg  mx-auto">
                  ₦
                  {formData.loanAmount
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0.0}
                </div>
              </div>
            </div>
            <div className="flex pt-2">
              <div className="w-1/3 text-swGray text-xs font-semibold pt-2">
                Loan Frequency Type
              </div>
              <div className="w-2/3">
                <div className="p-4 m-2 bg-swLightGray rounded-lg  mx-auto">
                  {formData.repaymentType || "No Loan Frequency Type Yet"}
                </div>
              </div>
            </div>
            <div className="flex pt-2">
              <div className="w-1/3 text-swGray text-xs font-semibold pt-2">
                Loan Duration
              </div>
              <div className="w-2/3">
                <div className="p-4 m-2 bg-swLightGray rounded-lg  mx-auto">
                  {formData.loanDuration || 0}
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
              <div className="w-full">
                <div className="p-4 m-2 bg-swLightGray rounded-lg  mx-auto">
                  <div className="flex justify-between  text-xs font-semibold pt-2">
                    <div className="text-swGray">Loan Principal :</div>{" "}
                    <div className="text-swBlue">
                      ₦{formData.loanAmount || 0}
                    </div>
                  </div>
                  <div className="flex justify-between text-xs font-semibold pt-2">
                    <div className="text-swGray">Interest at maturity :</div>{" "}
                    <div className="text-swBlue">₦{interest || 0}</div>
                  </div>
                  <div className="flex justify-between  text-xs font-semibold pt-2">
                    <div className="text-swGray">Commitment Fee :</div>{" "}
                    <div className="text-swBlue">
                      ₦{formData.commitmentTotal || 0}
                    </div>
                  </div>
                  <div className="flex justify-between  text-sm  font-semibold pt-2">
                    <div className="text-swGray">
                      Total payment at maturity :
                    </div>{" "}
                    <div className="text-swBlue">
                      ₦
                      {parseFloat(interest) +
                        parseFloat(formData.loanAmount) +
                        parseFloat(formData.commitmentTotal) || 0}
                    </div>
                  </div>
                </div>
                <div className="">
                  <Button
                    disabled={
                      formData.interestType === null || loading === true
                        ? true
                        : false
                    }
                    onClick={fetchInterest}
                    className="h-10 w-full mt-6 bg-swBlue text-white"
                  >
                    Compute Interest
                  </Button>
                </div>
              </div>
            </div>

          
          </div>
        </main>
      ) : null}

      {currentStep === 2 && (
        <div className="flex">
          <div className="w-2/3 p-2 ">
            <PreviewInterest
              formData={formData}
              setCurrentStep={setCurrentStep}
              data={interestValue?.data}
            />
          </div>
          <div className="w-1/3 pl-4 pr-4 pt-10  border-l border-gray-300">
            <p className="text-lg text-swBlue font-semibold">Loan Summary</p>
            {selectedCustomer != null ? (
              <div className="p-4 m-2 bg-swBlue rounded-3xl text-white mx-auto flex gap-5">
                {selectedCustomer.image ? (
                  ""
                ) : (
                  <div className="p-3 rounded-full bg-white h-fit w-fit">
                    <FiUser size={30} className="text-gray-400" />
                  </div>
                )}
                <div>
                  <p className="text-lg font-semibold">
                    {selectedCustomer.firstName} {selectedCustomer.lastName}
                  </p>

                  <p className="text-sm mb-2">{selectedCustomer.email}</p>

                  <p className="text-sm py-1 px-2 bg-white text-swBlue rounded-full w-fit">
                    {selectedCustomer.nin}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 m-2 bg-swBlue text-white rounded-3xl mx-auto flex gap-2 items-center">
                <div className="p-3 rounded-full bg-white">
                  <FiUser size={35} className="text-gray-400" />
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
                  ₦
                  {formData.loanAmount
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0.0}
                </div>
              </div>
            </div>
            <div className="flex pt-2">
              <div className="w-1/3 text-swGray text-xs font-semibold pt-2">
                Loan Frequency Type
              </div>
              <div className="w-2/3">
                <div className="p-4 m-2 bg-swLightGray rounded-lg  mx-auto">
                  {formData.repaymentType || "No Loan Frequency Type Yet"}
                </div>
              </div>
            </div>
            <div className="flex pt-2">
              <div className="w-1/3 text-swGray text-xs font-semibold pt-2">
                Loan Duration
              </div>
              <div className="w-2/3">
                <div className="p-4 m-2 bg-swLightGray rounded-lg  mx-auto">
                  {formData.loanDuration || 0}
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
              <div className="w-full">
                <div className="p-4 m-2 bg-swLightGray rounded-lg  mx-auto">
                  <div className="flex justify-between  text-xs font-semibold pt-2">
                    <div className="text-swGray">Loan Principal :</div>{" "}
                    <div className="text-swBlue">
                      ₦{formData.loanAmount || 0}
                    </div>
                  </div>
                  <div className="flex justify-between text-xs font-semibold pt-2">
                    <div className="text-swGray">Interest at maturity :</div>{" "}
                    <div className="text-swBlue">
                      ₦{interestValue?.data?.totalInterestPayments}
                    </div>
                  </div>
                  <div className="flex justify-between  text-xs font-semibold pt-2">
                    <div className="text-swGray">Commitment Fee :</div>{" "}
                    <div className="text-swBlue">
                      ₦{formData.commitmentTotal || 0}
                    </div>
                  </div>
                  <div className="flex justify-between  text-sm  font-semibold pt-2">
                    <div className="text-swGray">
                      Total payment at maturity :
                    </div>{" "}
                    <div className="text-swBlue">
                      ₦{parseFloat(interestValue?.data?.totalPayments)}
                    </div>
                  </div>
                </div>
                <div className="">
                  <Button
                    className="rounded rounded-md h-10 w-full mt-6 bg-swBlue text-white"
                    onClick={submitLoan}
                  >
                    Create Loan
                  </Button>
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
                    <EditableButton
                      className={`${"font-semibold text-swBlue bg-blue-50"} p-1 text-xs rounded-full border cursor-pointer`}
                    >
                      Badge
                    </EditableButton>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </CenterModal>
    </Dashboard>
  );
};

export default CreateLoan;
