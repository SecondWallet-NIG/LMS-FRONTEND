import {
  getSingleLoan,
  requestLoanRestructure,
} from "@/redux/slices/loanApplicationSlice";
import { MdClose } from "react-icons/md";
import { Rings } from "react-loader-spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import EditableButton from "../../shared/editableButtonComponent/EditableButton";
import SelectField from "../../shared/input/SelectField";
import InputField from "./../../shared/input/InputField";

export default function RestructureLoanModal({
  loanId,
  defaultLoanAmount,
  defaultLoanDuration,
  defaultInterestRate,
  defaultRepaymentType,
  defaultLoanFrequencyType,
  minInterestRate,
  maxInterestRate,
  minLoanAmount,
  maxLoanAmount,
  closeModal,
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    loanAmount: defaultLoanAmount,
    interestRate: defaultInterestRate,
    loanDuration: defaultLoanDuration,
    repaymentType: defaultRepaymentType,
    loanFrequencyType: defaultLoanFrequencyType,
  });

  const frequencyTypeData = [
    { value: "Monthly", label: "Monthly" },
    { value: "Quarterly", label: "Quarterly" },
  ];

  const repaymentTypeData = [
    { value: "bulletRepayment", label: "Bullet Repayment" },
    { value: "interestServicing", label: "Interest Servicing" },
    { value: "installmentPayment", label: "Installment Payment" },
  ];

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

  const handleSelectChange = async (selectedOption, name) => {
    setFormData({
      ...formData,
      [name]: selectedOption.value,
    });
  };

  const removeCommasFromNumber = (numberString) => {
    if (typeof numberString !== "string") {
      // Convert to string or handle the case appropriately
      numberString = String(numberString);
    }
    return numberString.replace(/,/g, "");
  };

  const reStructureLoan = (e) => {
    if (
      formData.loanAmount < minLoanAmount ||
      formData.loanAmount > maxLoanAmount
    ) {
      if (formData.loanAmount < minLoanAmount) {
        toast.error(
          `Loan amount cannot be less than ₦${minLoanAmount.toLocaleString()}`
        );
      } else if (formData.loanAmount > maxLoanAmount) {
        toast.error(
          `Loan amount cannot be more than ₦${maxLoanAmount.toLocaleString()}`
        );
      }
      return;
    }
    if (
      formData.interestRate < minInterestRate ||
      formData.interestRate > maxInterestRate
    ) {
      if (formData.interestRate < minInterestRate) {
        toast.error(`Interest rate cannot be less than ${minInterestRate}%`);
      } else if (formData.interestRate > maxInterestRate) {
        toast.error(`Interest rate cannot be more than ${maxInterestRate}%`);
      }
      return;
    }

    const payload = new FormData();
    const num = parseInt(removeCommasFromNumber(formData.loanAmount));
    payload.append("loanAmount", num);
    payload.append("interestRate", formData.interestRate);
    payload.append("loanDuration", formData.loanDuration);
    payload.append("repaymentType", formData.repaymentType);
    payload.append("loanFrequencyType", formData.loanFrequencyType);

    setLoading(true);
    e.preventDefault();
    dispatch(requestLoanRestructure({ loanId, payload }))
      .unwrap()
      .then(() => {
        toast("Loan re-structure successful");
        closeModal();
        dispatch(getSingleLoan(loanId));
        setLoading(false);
      })
      .catch((error) => {
        toast.error(`${error?.message}`);
        setLoading(false);
      });
  };

  return (
    <div className="p-4 overflow-x-auto">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold">Loan Restructure Request</h4>
        <MdClose
          size={20}
          onClick={() => closeModal()}
          className="cursor-pointer"
        />
      </div>
      <div className="w-full my-3 space-y-6">
        <div>
          <InputField
            name="interestRate"
            required={true}
            onWheel={() => document.activeElement.blur()}
            activeBorderColor="border-swBlue"
            endIcon={<p className="text-swGray">%</p>}
            label="Interest Rate"
            value={formData?.interestRate}
            placeholder={`Enter interest rate`}
            isActive="loan-amount"
            onChange={(e) => {
              setInputState(e);
            }}
          />
          <p
            className={`${
              (formData?.interestRate < minInterestRate ||
                formData?.interestRate > maxInterestRate) &&
              "text-red-500"
            }`}
          >
            {formData?.interestRate < minInterestRate
              ? `Interest rate cannot be less than ${minInterestRate}%`
              : formData?.interestRate > maxInterestRate
              ? `Interest rate cannot be more than ${maxInterestRate}%`
              : `min = ${minInterestRate || 0}% and max = ${
                  maxInterestRate || 0
                }%`}
          </p>
        </div>
        <div>
          <InputField
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
            }}
          />
          <p
            className={`${
              (formData?.loanAmount < minLoanAmount ||
                formData?.loanAmount > maxLoanAmount) &&
              "text-red-500"
            }`}
          >
            {formData?.loanAmount < minLoanAmount
              ? `Interest rate cannot be less than ₦${minLoanAmount.toLocaleString()}`
              : formData?.loanAmount > maxLoanAmount
              ? `Interest rate cannot be more than ₦${maxLoanAmount.toLocaleString()}`
              : `min = ₦${minLoanAmount.toLocaleString() || 0} and max = ₦${
                  maxLoanAmount.toLocaleString() || 0
                }`}
          </p>
        </div>

        <InputField
          value={formData?.loanDuration}
          required={true}
          name="loanDuration"
          onKeyPress={preventMinus}
          onWheel={() => document.activeElement.blur()}
          activeBorderColor="border-swBlue"
          label="Loan Duration"
          placeholder="Enter Loan Duration"
          onChange={(e) => {
            setInputState(e);
          }}
        />
        <div className="grid grid-cols-2 gap-4">
          <div>
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
              }}
            />
          </div>

          <div>
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

        <EditableButton
          blueBtn={true}
          disabled={loading}
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
          label={"Request"}
          onClick={reStructureLoan}
        />
      </div>
    </div>
  );
}
