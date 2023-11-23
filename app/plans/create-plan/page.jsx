"use client";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import EditableButton from "@/app/components/shared/editableButtonComponent/EditableButton";
import InputField from "@/app/components/shared/input/InputField";
import SelectField from "@/app/components/shared/input/SelectField";
import { FiMinus } from "react-icons/fi";
import { MdArrowBackIos, MdPercent } from "react-icons/md";
import { TbCurrencyNaira } from "react-icons/tb";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createLoanPackage } from "@/redux/slices/loanPackageSlice";
import { useEffect } from "react";
import CenterModal from "@/app/components/modals/CenterModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import checkGif from "../../../public/images/check.gif";
import warningGif from "../../../public/images/warning.gif";
import { staticGenerationAsyncStorage } from "next/dist/client/components/static-generation-async-storage.external";
import Image from "next/image";

const CreatePlansAndPackages = () => {
  const dispatch = useDispatch();
  const [cancelModal, setCancelModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [user, setUser] = useState({});
  const [createPlan, setCreatePlan] = useState({
    name: "",
    minAmount: "",
    maxAmount: "",
    interestRateType: "",
    interestRate: "",
    repaymentInterval: "",
    status: "Active",
    createdBy: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    minAmount: "",
    maxAmount: "",
    interestRateType: "",
    interestRate: "",
    repaymentInterval: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target || e;
    setCreatePlan((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setCreatePlan({
      name: "",
      minAmount: "",
      maxAmount: "",
      interestRateType: "",
      interestRate: "",
      repaymentInterval: "",
      status: "Active",
      createdBy: user?.data?.user?._id,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (createPlan.name.trim() === "") {
      newErrors.name = "Package name is required";
      isValid = false;
    }

    if (createPlan.minAmount.trim() === "") {
      newErrors.minAmount = "Minimum loan range is required";
      isValid = false;
    }

    if (createPlan.maxAmount.trim() === "") {
      newErrors.maxAmount = "Maximum loan range is required";
      isValid = false;
    }
    if (createPlan.interestRateType.trim() === "") {
      newErrors.interestRateType = "Intrest type is required";
      isValid = false;
    }

    if (createPlan.interestRate.trim() === "") {
      newErrors.interestRate = "Interest rate is required";
      isValid = false;
    }
    if (createPlan.repaymentInterval.trim() === "") {
      newErrors.repaymentInterval = "Duration is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  console.log(user?.data?.token);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      const payload = {
        name: createPlan.name,
        loanAmountRange: {
          min: createPlan.minAmount,
          max: createPlan.maxAmount,
        },
        interestRate: {
          rateType: createPlan.interestRateType,
          rate: createPlan.interestRate,
        },
        repaymentInterval: createPlan.repaymentInterval,
        status: "Active",
        createdBy: user?.data?.user?._id,
      };

      dispatch(createLoanPackage(payload))
        .unwrap()
        .then(() => {
          setSuccessModal(true);
          resetForm();
        })
        .catch((error) => {
          toast.error(error?.message);
          toast.error;
        });
    }
  };

  const interestTypeOptions = [
    { value: "Fixed Rate", label: "Fixed Rate", name: "interestRateType" },
    {
      value: "Reducing Balance",
      label: "Reducing balance",
      name: "interestRateType",
    },
  ];

  const durationOptions = [
    { label: "Daily", value: "Daily", name: "repaymentInterval" },
    { label: "Weekly", value: "Weekly", name: "repaymentInterval" },
    { label: "Monthly", value: "Monthly", name: "repaymentInterval" },
    { label: "Yearly", value: "Yearly", name: "repaymentInterval" },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);
  return (
    <DashboardLayout>
      <main className="mx-auto max-w-4xl py-10 px-5">
        <ToastContainer />
        <p className="font-semibold text-lg">Create Loan plan and Packages</p>
        <p className="font-semibold my-5">Loan details</p>
        <div className="flex gap-5 flex-col">
          <InputField
            required={true}
            name={"name"}
            label={"Plan/package name"}
            placeholder={"Student Loan"}
            value={createPlan.name}
            onChange={handleInputChange}
          />
          {errors.name && (
            <span className="text-red-500 text-xs">{errors.name}</span>
          )}

          <SelectField
            required={true}
            name={"interestRateType"}
            label={"Interest type"}
            optionValue={interestTypeOptions}
            onChange={handleInputChange}
          />
          {errors.interestRateType && (
            <span className="text-red-500 text-xs">
              {errors.interestRateType}
            </span>
          )}

          <InputField
            label={"Interest rate"}
            required={true}
            placeholder={"5"}
            inputType={"number"}
            endIcon={<MdPercent size={20} className="text-swGray" />}
            name={"interestRate"}
            value={createPlan.interestRate}
            onChange={handleInputChange}
          />
          {errors.interestRate && (
            <span className="text-red-500 text-xs">{errors.interestRate}</span>
          )}

          <div className="flex gap-5 items-end">
            <div className="w-full">
              <InputField
                label={"Loan amount range"}
                required={true}
                placeholder={"Minimum amount - 5000"}
                endIcon={<TbCurrencyNaira size={20} className="text-swGray" />}
                name={"minAmount"}
                value={createPlan.minAmount}
                onChange={handleInputChange}
              />
            </div>
            <FiMinus size={60} className="text-swGray -mb-3" />
            <div className="w-full">
              <InputField
                placeholder={"Maximum amount - 50000"}
                inputType={"number"}
                endIcon={<TbCurrencyNaira size={20} className="text-swGray" />}
                name={"maxAmount"}
                value={createPlan.maxAmount}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex gap-10">
            {errors.minAmount && (
              <span className="text-red-500 text-xs">{errors.minAmount}</span>
            )}
            {errors.maxAmount && (
              <span className="text-red-500 text-xs">{errors.maxAmount}</span>
            )}
          </div>

          <div>
            <p className="mb-2 text-sm">
              Eligibility criteria <span className="text-red-500">*</span>
            </p>
            <div className="flex flex-col gap-2 text-sm text-swGray">
              <div className="flex gap-2">
                <input type="checkbox" name="above 18 years" />
                Older than 18 years
              </div>
              <div className="flex gap-2">
                <input type="checkbox" name="employed" />
                Employed
              </div>
              <div className="flex gap-2">
                <input type="checkbox" name="earn atleast 1m" />
                Earns at least 1,000,000 per annum
              </div>
            </div>
          </div>

          <InputField
            required={true}
            label={"Minimum collateral amount"}
            placeholder={"500,000"}
            inputType={"number"}
            endIcon={<TbCurrencyNaira size={20} className="text-swGray" />}
          />

          <div>
            <SelectField
              label="Duration"
              required={true}
              name={"repaymentInterval"}
              optionValue={durationOptions}
              onChange={handleInputChange}
            />
            {errors.repaymentInterval && (
              <span className="text-red-500 text-xs">
                {errors.repaymentInterval}
              </span>
            )}
          </div>

          <div>
            <p className="mb-2 text-sm">
              Loan Description <span className="text-red-500">*</span>
            </p>
            <textarea
              name="loan description"
              id=""
              className="w-full border hover:border-swBlue p-2 focus:outline-none rounded-md"
              rows="8"
            ></textarea>
          </div>

          <div className="flex justify-between ">
            <EditableButton
              className="border py-2 px-4 rounded-lg"
              children={
                <div className="flex gap-1 items-center ">
                  <MdArrowBackIos size={15} />
                  Cancel
                </div>
              }
              onClick={() => {
                setCancelModal(true);
              }}
            />
            <EditableButton
              className="border bg-swBlue text-white py-2 px-4 rounded-lg"
              onClick={handleSubmit}
              children={
                <div className="flex gap-2 items-center">
                  Create plan/package
                  <FaCheck size={15} />
                </div>
              }
            />
          </div>
        </div>
        <CenterModal width={"600px"} isOpen={cancelModal}>
          <div className="flex justify-between items-center border-b p-3">
            <p className="font-semibold text-lg cursor-pointer">
              Cancel warning
            </p>
            <IoMdClose
              size={20}
              onClick={() => {
                setCancelModal(false);
              }}
            />
          </div>
          <div className="p-3">
            <div className="flex justify-center items-center py-5">
              <Image src={warningGif} height={50} width={50} alt="warning" />
            </div>
            <p className="text-center">
              You're currently creatin a plan/package canceling will make you
              loose your progress
            </p>
            <p className="my-3 text-center">Are you sure you want to cancel?</p>
          </div>
          <div className="flex justify-between gap-5 font-semibold">
            <div
              className="border-2 border-transparent w-full rounded-lg hover:border-gray-100"
              onClick={() => {
                setCancelModal(false);
              }}
            >
              <EditableButton className="w-full border rounded-lg p-3">
                No
              </EditableButton>
            </div>
            <Link
              href="/plans"
              className="border-2 border-transparent w-full h-fit rounded-lg hover:border-blue-100 overflow-hidden text-white"
            >
              <EditableButton className="w-full h-fpull bg-swBlue border rounded-lg  p-3">
                Yes, Cancel
              </EditableButton>
            </Link>
          </div>
        </CenterModal>
        <CenterModal width={"600px"} isOpen={successModal}>
          <div className="flex justify-between items-center border-b p-3">
            <p className="font-semibold text-lg cursor-pointer">
              Plan created succeefully
            </p>
            <IoMdClose
              size={20}
              className="cursor-pointer"
              onClick={() => {
                setSuccessModal(false);
              }}
            />
          </div>
          <div className="p-3">
            <div className="flex justify-center items-center py-5">
              <Image src={checkGif} height={50} width={50} alt="check" />
            </div>
            <p className="text-center">Loans can now be created under plan</p>
          </div>
          <div className="flex justify-between items-center gap-5 font-semibold">
            <div
              className="border-2 border-transparent w-full rounded-lg hover:border-gray-100"
              onClick={() => {
                setSuccessModal(false);
              }}
            >
              <EditableButton className="w-full border rounded-lg p-3">
                View plan
              </EditableButton>
            </div>
            <div
              className="border-2 border-transparent w-full rounded-lg hover:border-blue-200 text-white"
              onClick={() => {
                setSuccessModal(false);
              }}
            >
              <EditableButton className="w-full bg-swBlue border rounded-lg  p-3">
                Create a loan
              </EditableButton>
            </div>
          </div>
        </CenterModal>
      </main>
    </DashboardLayout>
  );
};

export default CreatePlansAndPackages;
