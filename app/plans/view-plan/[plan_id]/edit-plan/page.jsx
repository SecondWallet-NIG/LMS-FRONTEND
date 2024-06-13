"use client";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import InputField from "@/app/components/shared/input/InputField";
import SelectField from "@/app/components/shared/input/SelectField";
import { FiMinus } from "react-icons/fi";
import { MdArrowBackIos, MdKeyboardArrowDown, MdPercent } from "react-icons/md";
import { TbCurrencyNaira } from "react-icons/tb";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createLoanPackage,
  getSingleLoanPackage,
  updateLoanPackage,
} from "@/redux/slices/loanPackageSlice";
import { useEffect } from "react";
import CenterModal from "@/app/components/modals/CenterModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Rings } from "react-loader-spinner";
import EditableButton from "@/app/components/shared/editableButtonComponent/EditableButton";
import check from "../../../../../public/images/check.svg";
import Image from "next/image";
const EditPlansAndPackages = () => {
  const router = useRouter();
  const { plan_id } = useParams();
  const dispatch = useDispatch();
  const [cancelModal, setCancelModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const buttonRef = useRef(null);
  const [selectStatusMenu, setSelectStatusMenu] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const loanPackage =
    useSelector((state) => {
      return state?.loanPackage?.data?.data;
    }) || [];
  console.log({ loanPackage });
  const [editPlan, setEditPlan] = useState({
    name: "",
    minAmount: "",
    maxAmount: "",
    interestRateType: "",
    minRate: "",
    maxRate: "",
    repaymentInterval: "",
    status: "Active",
    createdBy: "",
  });

  // console.log(user?.data?.token);

  const handleInputChange = (e) => {
    const { name, value } = e.target || e;

    const ariaLabel = e.target.getAttribute("aria-label");

    if (ariaLabel === "Number input") {
      const num = Number(value.replace(/\D/g, ""));
      setEditPlan((prevFormData) => ({
        ...prevFormData,
        [name]: num,
        createdBy: user?.data?.user?._id,
      }));
    } else {
      setEditPlan((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        createdBy: user?.data?.user?._id,
      }));
    }
  };

  const resetForm = () => {
    setEditPlan({
      name: "",
      minAmount: "",
      maxAmount: "",
      interestRateType: "",
      minRate: "",
      maxRate: "",
      repaymentInterval: "",
      status: "Active",
      createdBy: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      name: editPlan.name,
      loanAmountRange: {
        min: editPlan.minAmount,
        max: editPlan.maxAmount,
      },
      interestRate: {
        rateType: editPlan.interestRateType,
        min: editPlan.minRate,
        max: editPlan.maxRate,
      },
    };

    dispatch(updateLoanPackage({ loanPackageId: plan_id, payload }))
      .unwrap()
      .then((response) => {
        setSuccessModal(true);
        resetForm();
        setLoading(false);
        console.log({ response });
      })
      .catch((error) => {
        toast.error(error?.message);
        setLoading(false);
        // toast.error;
      });
    // console.log(payload);
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
    dispatch(getSingleLoanPackage(plan_id));
    if (typeof window !== "undefined") {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  // console.log(
  //   "type",
  //   // interestTypeOptions.find(
  //   //   (option) => option?.value === editPlan?.interestRateType
  //   // )
  //   editPlan?.interestRateType
  // );
  // console.log(editPlan);
  const preventMinus = (e) => {
    if (/[^0-9,]/g.test(e.key)) {
      e.preventDefault();
    }
  };
  console.log(editPlan?.interestRateType);

  useEffect(() => {
    setEditPlan({
      name: loanPackage?.name,
      minAmount: loanPackage?.loanAmountRange?.min,
      maxAmount: loanPackage?.loanAmountRange?.max,
      interestRateType: loanPackage?.interestRate?.rateType,
      minRate: loanPackage?.interestRate?.minRate,
      maxRate: loanPackage?.interestRate?.maxRate,
      repaymentInterval: loanPackage?.repaymentInterval,
      status: loanPackage?.status,
      createdBy: loanPackage?.createdBy,
    });
  }, [loanPackage]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        // Click outside the button, close it
        setSelectStatusMenu(!selectStatusMenu);
      } else {
        setSelectStatusMenu(false);
      }
    };

    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectStatusMenu]);
  return (
    <DashboardLayout
      isBackNav={true}
      paths={["Loan Plans and Packages", "View Plan", "Edit Plan"]}
    >
      <main className="mx-auto max-w-4xl py-10 px-5">
        <ToastContainer />
        <p className="font-semibold text-lg">Edit Loan plan and Packages</p>
        <div className="flex justify-between items-center">
          <p className="font-semibold my-5">Loan details</p>
          <div className="relative">
            <div
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => setSelectStatusMenu(!selectStatusMenu)}
            >
              <p
                className={`${
                  loanPackage?.status === "Active"
                    ? "border-green-500 bg-green-100 text-green-500"
                    : loanPackage?.status === "Under review"
                    ? "border-purple-500 bg-purple-100 text-purple-500"
                    : "border-orange-500 bg-orange-100 text-orange-500"
                } border px-3 rounded-full text-xs flex items-center capitalize`}
              >
                {loanPackage?.status}
              </p>
              <MdKeyboardArrowDown size={20} className="text-swGray" />
              {selectStatusMenu && (
                <div
                  ref={buttonRef}
                  className="absolute w-60 p-2 shadow-md rounded-lg mt-52 border bg-white right-0 z-20"
                >
                  <p
                    className={`flex justify-between items-center p-2 rounded-lg hover:bg-swLightGray ${
                      loanPackage.status === "Active" && "text-swBlue"
                    }`}
                  >
                    Active{" "}
                    {loanPackage.status === "Active" && (
                      <IoMdCheckmark size={20} />
                    )}
                  </p>
                  <p
                    className={`flex justify-between items-center p-2 rounded-lg hover:bg-swLightGray ${
                      loanPackage.status === "Inacive" && "text-swBlue"
                    }`}
                  >
                    Inactive{" "}
                    {loanPackage.status === "Inctive" && (
                      <IoMdCheckmark size={20} />
                    )}
                  </p>
                  <p
                    className={`flex justify-between items-center p-2 rounded-lg hover:bg-swLightGray ${
                      loanPackage.status === "Under review" && "text-swBlue"
                    }`}
                  >
                    Under Review{" "}
                    {loanPackage.status === "Under review" && (
                      <IoMdCheckmark size={20} />
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-5 flex-col">
          <InputField
            required={true}
            name={"name"}
            label={"Plan/package name"}
            placeholder={"Student Loan"}
            value={editPlan.name}
            onChange={handleInputChange}
          />

          <SelectField
            required={true}
            name={"interestRateType"}
            label={"Interest type"}
            value={
              interestTypeOptions.find(
                (option) => option.value === editPlan?.interestRateType
              ) || ""
            }
            optionValue={interestTypeOptions}
            onChange={handleInputChange}
          />

          {/* <InputField
            label={"Interest rate"}
            required={true}
            placeholder={"5"}
            //onKeyPress={preventMinus}
            //onWheel={() => document.activeElement.blur()}
            endIcon={<MdPercent size={20} className="text-swGray" />}
            name={"interestRate"}
            value={editPlan.interestRate}
            onChange={handleInputChange}
          /> */}

          <div className="flex gap-5 items-end">
            <div className="w-full">
              <InputField
                label={"Interest rate range"}
                placeholder={"Maximum amount"}
                required={true}
                onKeyPress={preventMinus}
                onWheel={() => document.activeElement.blur()}
                endIcon={<MdPercent size={20} className="text-swGray" />}
                name={"minRate"}
                value={editPlan?.minRate?.toLocaleString()}
                onChange={handleInputChange}
              />
            </div>
            <FiMinus size={60} className="text-swGray -mb-3" />
            <div className="w-full">
              <InputField
                placeholder={"Maximum amount"}
                onKeyPress={preventMinus}
                ariaLabel={"Number input"}
                onWheel={() => document.activeElement.blur()}
                endIcon={<MdPercent size={20} className="text-swGray" />}
                name={"maxRate"}
                value={editPlan?.maxRate?.toLocaleString()}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex gap-5 items-end">
            <div className="w-full">
              <InputField
                label={"Loan amount range"}
                required={true}
                placeholder={"Minimum amount - 5000"}
                ariaLabel={"Number input"}
                onKeyPress={preventMinus}
                onWheel={() => document.activeElement.blur()}
                endIcon={<TbCurrencyNaira size={20} className="text-swGray" />}
                name={"minAmount"}
                value={editPlan?.minAmount?.toLocaleString()}
                onChange={handleInputChange}
              />
            </div>
            <FiMinus size={60} className="text-swGray -mb-3" />
            <div className="w-full">
              <InputField
                placeholder={"Maximum amount - 50000"}
                ariaLabel={"Number input"}
                onKeyPress={preventMinus}
                onWheel={() => document.activeElement.blur()}
                endIcon={<TbCurrencyNaira size={20} className="text-swGray" />}
                name={"maxAmount"}
                value={editPlan?.maxAmount?.toLocaleString()}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex justify-between ">
            <button
              className="border py-2 px-4 rounded-lg"
              onClick={() => {
                setCancelModal(true);
              }}
            >
              <div className="flex gap-1 items-center ">
                <MdArrowBackIos size={15} />
                Cancel
              </div>
            </button>

            <EditableButton
              blueBtn={true}
              disabled={loading ? true : false}
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
              label={"Update plan/package"}
              endIcon={<IoMdCheckmark size={20} />}
              onClick={handleSubmit}
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
              warning sign
            </div>
            <p className="text-center">
              You&apos;re currently creatin a plan/package canceling will make
              you loose your progress
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
              <button className="w-full border rounded-lg p-3">No</button>
            </div>
            <Link
              href="/plans"
              className="border-2 border-transparent w-full h-fit rounded-lg hover:border-blue-100 overflow-hidden text-white"
            >
              <button className="w-full h-fpull bg-swBlue border rounded-lg  p-3">
                Yes, Cancel
              </button>
            </Link>
          </div>
        </CenterModal>
        <CenterModal width={"600px"} isOpen={successModal}>
          <div className="flex justify-between items-center border-b p-3">
            <p className="font-semibold text-lg cursor-pointer">
              Plan updated successfully
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
              <Image src={check} alt="check" height={50} width={50} />
            </div>
            <p className="text-center">Loans can now be created under plan</p>
          </div>
          <div className="flex justify-between items-center gap-5 font-semibold">
            <div
              className="border-2 border-transparent w-full rounded-lg hover:border-gray-100"
              onClick={() => {
                router.push(`/plans/view-plan/${plan_id}`);
              }}
            >
              <button className="w-full border rounded-lg p-3">
                View plan
              </button>
            </div>
            <div
              className="border-2 border-transparent w-full rounded-lg hover:border-blue-200 text-white"
              onClick={handleSubmit}
            >
              <button className="w-full bg-swBlue border rounded-lg  p-3">
                Edit loan
              </button>
            </div>
          </div>
        </CenterModal>
      </main>
    </DashboardLayout>
  );
};

export default EditPlansAndPackages;