"use client";
import Link from "next/link";
import { useEffect } from "react";
import Dashboard from "../dashboard/page";
import { IoMdAdd } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import InputField from "../components/shared/input/InputField";
import SelectField from "../components/shared/input/SelectField";
import { useState } from "react";
import { AiOutlinePaperClip } from "react-icons/ai";
import Button from "../components/shared/buttonComponent/Button";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "@/redux/slices/customerSlice";

import CenterModal from "../components/modals/CenterModal";
import EditableButton from "../components/shared/editableBuutonComponent/EditableButton";

const CreateLoan = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.customer);
  const [filteredData, setFilteredData] = useState(data);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loanPackageText, setLoanPackageText] = useState(null);
  const [interest, setInterest] = useState(null);
  const [noOfRepayments, setNoOfRepayment] = useState(0);
  const [formData, setFormData] = useState({
    customerId: "",
    loanAmount: 0,
    loanDuration: 0,
    loanPackage: null,
    repaymentNo: 0,
    commitmentValue: 0,
    commitmentTotal: 0,
    numberOfRepayment: 0,
    repaymentType: null,
    loanFrequency: null,
    assetType: null,
    loanDurationMetrics: null,
    interestType: null,
    commitmentType: null,
  });

  const calcRepaymentsNo = (repaymentType) => {
    console.log("io", repaymentType);
    let loanDuration = formData.loanDuration;
   // let repaymentType = formData.repaymentType;
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
    if (repaymentType === "Quartely") {
      setNoOfRepayment(loanDuration / 3);
      setFormData((prevFormData) => ({
        ...prevFormData,
        numberOfRepayment: loanDuration / 3,
      }));
    }
  };
  

  const loanPackagesData = [
    { value: 5, label: "Basic Loans" },
    { value: 5, label: "Payday / Salary Loan" },
    { value: 5, label: "SME Loan" },
    { value: 5, label: "Auto / Car Loan" },
    { value: 5, label: "Asset Financing" },
  ];
  const assetTypeData = [
    { value: 100, label: "Investment" },
    { value: 200, label: "Building" },
    { value: 300, label: "Construction" },
    { value: 400, label: "Vehicles" },
    { value: 500, label: "Machineries" },
  ];
  const repaymentData = [
    { value: "Monthly", label: "Monthly" },
    { value: "Quartely", label: "Quartely" },
  ];

  const loanDurationMetricsData = [
    { value: "Monthly", label: "Monthly" },
    { value: "Yearly", label: "Yearly" },
  ];

  const interestTypeData = [
    { value: "Flat Interest Rate", label: "Flat Interest Rate" },
    { value: "Reducing Balance Rate", label: "Reducing Balance Rate" },
    { value: "Interest Servicing", label: "Interest Servicing" },
  ];
  const commitmentType = [{ value: "Percentage", label: "Percentage" }];

  const modifyObjects = (arr) => {
    return arr?.map((item) => ({
      label: item.firstName,
      value: item._id,
    }));
  };

  const setInputState = async (e) => {
    let { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const search = (e) => {
    const filtered = data.filter((item) => {
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

  const calculateInterest = (
    principal,
    monthlyRate,
    timeDays,
    repaymentType
  ) => {
    if (repaymentType === "Weekly") {
      timeDays = timeDays * 7.5;
    } else if (repaymentType === "Monthly") {
      timeDays = timeDays * 30;
    } else if (repaymentType === "Daily") {
      timeDays = timeDays;
    } else if (repaymentType === "Quartely") {
      timeDays = timeDays * 30 * 3;
    }

    const interest = (principal * monthlyRate * ((timeDays * 12) / 360)) / 100;
    setInterest(interest);
  };

  const handleSelectChange = async (selectedOption, name) => {
    setFormData({
      ...formData,
      [name]: selectedOption.value,
    });

  
  };
  // function calculateReducingBalanceInstallments(principal, annualInterestRate, numberOfPayments) {
  //   const monthlyInterestRate = annualInterestRate / 100;
  //   const installmentPayments = [];

  //   for (let i = 0; i < numberOfPayments; i++) {
  //     const remainingPrincipal = principal - (i * (principal / numberOfPayments));
  //     const installment = (remainingPrincipal * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments + i));
  //     installmentPayments.push(installment);
  //   }
  //   console.log("Installments for each period:");
  //   installmentPayments.forEach((installment, index) => {
  //     console.log(`Month ${index + 1}: $${installment.toFixed(2)}`);
  //   });
  //   return installmentPayments;
  // }
  function calculateReducingBalanceInstallments(
    principal,
    annualInterestRate,
    numberOfRepayments
  ) {
    const monthlyInterestRate = annualInterestRate / 100;
    const installmentAmount =
      principal / numberOfRepayments + monthlyInterestRate * principal;
    const installmentPayments = [];

    for (let i = 0; i < numberOfRepayments; i++) {
      const interestPayment =
        monthlyInterestRate *
        (principal - i * (principal / numberOfRepayments));
      const totalPayment = principal / numberOfRepayments + interestPayment;
      installmentPayments.push(totalPayment);
    }

    installmentPayments.forEach((installment, index) => {
      console.log(`Repayment ${index + 1}: $${installment.toFixed(2)}`);
    });

    return installmentPayments;
  }

  useEffect(() => {
    dispatch(getCustomers());
    calculateReducingBalanceInstallments(500000, 10, 5);
  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  return (
    <Dashboard>
      <main className="flex text-sm">
        <div className="w-2/3 pl-5 pr-5 pt-10 ">
          <div className="flex justify-between">
            <p className="text-lg font-semibold">Initiate loan application</p>

            <Button
              href=""
              className="hidden flex gap-1 py-2 px-3 border-2 bg-swBlue border-swLightGray rounded-md focus:outline-none whitespace-nowrap"
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
              optionValue={loanPackagesData}
              label={"Loan Package "}
              required={true}
              placeholder={"Select loan package"}
              isSearchable={false}
              onChange={(selectedOption) => {
                handleSelectChange(selectedOption, "loanPackage");
                setLoanPackageText(selectedOption.label);
                if (
                  formData.loanAmount &&
                  formData.loanDuration &&
                  formData.repaymentType
                ) {
                  calculateInterest(
                    formData.loanAmount,
                    selectedOption.value,
                    formData.loanDuration,
                    formData.repaymentType
                  );
                }
              }}
            />
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
            <InputField
              maxLength="1000000"
              disabled={formData.assetType === null ? true : false}
              name="loanAmount"
              required={true}
              inputType="number"
              hintText={"Enter the loan amount in digit (Naira currency)"}
              activeBorderColor="border-swBlue"
              label="Loan amount"
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
            <div className="flex gap-2">
              <div className="w-1/3">
                <SelectField
                  name="loanDurationMetrics"
                  disabled={formData.loanAmount === 0 ? true : false}
                  optionValue={loanDurationMetricsData}
                  label={"Loan Duration Metrics"}
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
                  placeholder="Enter loan duration based on metrics"
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
                  disabled={formData.commitmentType === null ? true : false}
                  required={false}
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
                  optionValue={repaymentData}
                  label={"Repayment Type"}
                  required={true}
                  placeholder={"Select repayment type"}
                  isSearchable={false}
                  onChange={(selectedOption) => {
                    console.log({selectedOption});
                    handleSelectChange(selectedOption, "repaymentType");
                    calcRepaymentsNo(selectedOption.value);
                  }}
                />
              </div>
              <div className="w-2/3">
                <InputField
                  disabled={true}
                  name="numberOfRepayment"
                  inputType="number"
                  value={formData.numberOfRepayment}
                  activeBorderColor="border-swBlue"
                  placeholder="Enter number of repayment"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 mt-5">
            <p className="font-semibold">Upload Collateral documents</p>
            <p className="text-gray-700 -mt-3">
              Document types uploaded should be JPEGS, PNG or PDF and should not
              exceed 4mb
            </p>
            <button className="py-2 px-6 rounded-md flex gap-2 border w-fit">
              <AiOutlinePaperClip size={20} />
              <p className="font-semibold">Select files</p>
            </button>
          </div>
          <div className="flex flex-col gap-5 mt-5">
            <p className="font-semibold">Upload Hard copy of filled form</p>
            <p className="text-gray-700 -mt-3">
              Document types uploaded should be JPEGS, PNG or PDF and should not
              exceed 4mb
            </p>
            <button className="py-2 px-6 rounded-md flex gap-2 border w-fit">
              <AiOutlinePaperClip size={20} />
              <p className="font-semibold">Select files</p>
            </button>
          </div>
          <Button
            disabled={true}
            variant={"secondary"}
            className="py-2 px-9 rounded-md flex gap-2 border w-fit mt-10"
          >
            Create loan
          </Button>
        </div>

        <div className="w-1/3 pl-4 pr-4 pt-10  border-l border-gray-300">
          <p className="text-lg text-swBlue font-semibold">Loan Summary</p>
          {selectedCustomer != null ? (
            <div className="p-4 m-2 bg-swLightGray rounded-lg  mx-auto">
              <div className="text-sm font-semibold text-swGray">SWC-0001</div>
              <div className="text-xs font-semibold text-swGray mt-2">
                {selectedCustomer.firstName} {selectedCustomer.lastName}
              </div>

              <div className="flex justify-between">
                <div className="text-swGray font-semibold text-xs my-2">
                  {selectedCustomer.phoneNumber}
                </div>
                <div className="text-gray-600 font-semibold text-xs my-2">
                  {selectedCustomer.email}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 m-2 bg-swLightGray rounded-lg  mx-auto">
              No Customer Added Yet
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
              Repayment Type
            </div>
            <div className="w-2/3">
              <div className="p-4 m-2 bg-swLightGray rounded-lg  mx-auto">
                {formData.repaymentType || "No Repayment Type Yet"}
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
                  <div>Loan Principal :</div>{" "}
                  <div>₦{formData.loanAmount || 0}</div>
                </div>
                <div className="flex justify-between text-xs font-semibold pt-2">
                  <div>Interest at maturity :</div> <div>₦{interest || 0}</div>
                </div>
                <div className="flex justify-between  text-xs font-semibold pt-2">
                  <div>Commitment Fee :</div>{" "}
                  <div>₦{formData.commitmentTotal || 0}</div>
                </div>
                <div className="flex justify-between  text-sm font-semibold pt-2">
                  <div>Total Amount :</div>{" "}
                  <div>
                    ₦
                    {parseFloat(interest) +
                      parseFloat(formData.loanAmount) +
                      parseFloat(formData.commitmentTotal) || 0}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
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
