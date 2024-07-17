"use client";

import { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMail } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import InputField from "../shared/input/InputField";
import SelectField from "../shared/input/SelectField";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { createEmployment } from "@/redux/slices/customerSlice";
import EditableButton from "../shared/editableButtonComponent/EditableButton";
import { Rings } from "react-loader-spinner";
import { IoMdCheckmark } from "react-icons/io";
import { useRouter } from "next/navigation";

const EmploymentDetailsModal = ({
  isOpen,
  onClose,
  width,
  data,
  selected,
  getCustomer,
}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading } = useSelector((state) => state.user);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  const [formData, setFormData] = useState({
    employerName: "",
    employerPhone: "",
    incomeSource: "",
    currentEmploymentStatus: "",
    jobTitle: "",
    monthlyIncome: "",
    employerAddress: "",
    incomePeriod: "",
  });

  const [errors, setErrors] = useState({
    employerName: "",
    employerPhone: "",
    incomeSource: "",
    currentEmploymentStatus: "",
    jobTitle: "",
    monthlyIncome: "",
    employerAddress: "",
    incomePeriod: "",
  });
  if (!isOpen) return null;

  const successPopup = (selected) => {
    selected(true);
  };

  const modalStyles = {
    width: width || "90%",
    maxWidth: "800px",
  };

  const employmentStatus = [
    { value: "Employed", label: "Employed" },
    { value: "Self Employed", label: "Self Employed" },
  ];

  const incomePeriodData = [
    { value: "Daily", label: "Daily" },
    { value: "Weekly", label: "Weekly" },
    { value: "Monthly", label: "Monthly" },
  ];

  const handleInputChange = async (e) => {
    let { name, value } = e.target;
    setErrors({ ...errors, [name]: "" });
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

  const preventMinus = (e) => {
    if (/[^0-9,.]/g.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleSelectChange = async (selectedOption, name) => {
    setFormData({
      ...formData,
      [name]: selectedOption.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (formData.employerName.trim() === "") {
      newErrors.employerName = "Employee name is required";
      isValid = false;
    }

    if (formData.employerPhone?.trim() === "") {
      newErrors.employerPhone = "Employer phone number is required";
      isValid = false;
    }

    if (formData.incomeSource?.trim() === "") {
      newErrors.incomeSource = "Income Source is required";
      isValid = false;
    }
    if (formData.incomePeriod?.trim() === "") {
      newErrors.incomePeriod = "Income period is required";
      isValid = false;
    }

    // if (formData.monthlyIncome?.trim() === "") {
    //   newErrors.monthlyIncome = "Income per period is required";
    //   isValid = false;
    // }
    if (formData.employerAddress?.trim() === "") {
      newErrors.employerAddress = "Employer address is required";
      isValid = false;
    }
    if (formData.currentEmploymentStatus?.trim() === "") {
      newErrors.currentEmploymentStatus = "Employment status is required";
      isValid = false;
    }
    if (formData.jobTitle?.trim() === "") {
      newErrors.jobTitle = "Job title is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const resetForm = () => {
    setFormData({
      employerName: "",
      employerPhone: "",
      incomeSource: "",
      currentEmploymentStatus: "",
      jobTitle: "",
      monthlyIncome: "",
      employerAddress: "",
      incomePeriod: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      const payload = {
        currentEmploymentStatus: formData.currentEmploymentStatus,
        employerInformation: {
          name: formData.employerName,
          natureOfBusiness: formData.employerName,
          address: formData.employerAddress,
          contact: formData.employerPhone,
        },
        jobTitle: formData.jobTitle,
        monthlyIncome: formData.monthlyIncome,
        incomeSource: formData.incomeSource,
        incomePeriod: formData.incomePeriod,
        customerProfileInformation: id,
        createdBy: "650f659167a782d8868b76ee",
      };

      dispatch(createEmployment(payload))
        .unwrap()
        .then((res) => {
          dispatch(getCustomer(id));
          onClose("employmentDetails");
          resetForm();
          document.getElementById("add-user-form").reset();
          // Close the modal here
        })
        .catch((error) => {
          toast.error(error?.message);
        });
    }
  };

  return (
    <main className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-10 z-[110]">
      <form style={modalStyles} id="add-user-form">
        <div className="rounded-2xl border bg-white overflow-hidden border-swLightGray">
          <div className="bg-swBlue flex justify-between items-center p-3 text-white">
            <div>
              <p className="text-base font-semibold">Employment Details</p>
              <p className="text-xs">
                Update Employment and Income Information
              </p>
            </div>
            <AiOutlineClose
              size={20}
              onClick={() => onClose("employmentDetails")}
              className="cursor-pointer"
            />
          </div>
          <div className="p-4 bg-white h-[22rem] overflow-auto custom-scrollbar">
            <div className="">
              <p className="font-semibold mr-2">
                Employment and income history
              </p>

              <div className="pt-4 flex gap-4">
                <div className="w-1/2">
                  <SelectField
                    name="currentEmploymentStatus"
                    label={"Employment Status"}
                    required={true}
                    isSearchable={false}
                    optionValue={employmentStatus}
                    onChange={(selectedOption) =>
                      handleSelectChange(
                        selectedOption,
                        "currentEmploymentStatus"
                      )
                    }
                  />
                  {errors.currentEmploymentStatus && (
                    <span className="text-red-500 text-xs">
                      {errors.currentEmploymentStatus}
                    </span>
                  )}
                </div>
                <div className="w-1/2">
                  <InputField
                    name="employerName"
                    label="Employer Name"
                    required={true}
                    placeholder="Employer name"
                    onChange={handleInputChange}
                  />
                  {errors.employerName && (
                    <span className="text-red-500 text-xs">
                      {errors.employerName}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-5 gap-4">
              <div className="w-1/2">
                <InputField
                  name="employerAddress"
                  label="Employer Address"
                  required={true}
                  placeholder="Employer address "
                  onChange={handleInputChange}
                />
                {errors.employerAddress && (
                  <span className="text-red-500 text-xs">
                    {errors.employerAddress}
                  </span>
                )}
              </div>
              <div className="w-1/2">
                <InputField
                  name="employerPhone"
                  label="Employer Contact"
                  onKeyPress={preventMinus}
                  onWheel={() => document.activeElement.blur()}
                  required={true}
                  placeholder="Employer phone number"
                  onChange={handleInputChange}
                />
                {errors.employerPhone && (
                  <span className="text-red-500 text-xs">
                    {errors.employerPhone}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-between mt-5 gap-4">
              <div className="w-1/2">
                <InputField
                  name="jobTitle"
                  label="Job Title"
                  required={true}
                  placeholder="Job title"
                  onChange={handleInputChange}
                />
                {errors.jobTitle && (
                  <span className="text-red-500 text-xs">
                    {errors.jobTitle}
                  </span>
                )}
              </div>
              <div className="w-1/2">
                <InputField
                  name="incomeSource"
                  label="Income Source"
                  required={true}
                  placeholder="Income source"
                  onChange={handleInputChange}
                />
                {errors.incomeSource && (
                  <span className="text-red-500 text-xs">
                    {errors.incomeSource}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-between mt-5 gap-4">
              <div className="w-1/2">
                <SelectField
                  name="incomePeriod"
                  label={"Income Period"}
                  required={true}
                  isSearchable={false}
                  optionValue={incomePeriodData}
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, "incomePeriod")
                  }
                />
                {errors.incomePeriod && (
                  <span className="text-red-500 text-xs">
                    {errors.incomePeriod}
                  </span>
                )}
              </div>
              <div className="w-1/2">
                <InputField
                  name="monthlyIncome"
                  value={formData?.monthlyIncome?.toLocaleString()}
                  ariaLabel={"Number input"}
                  label="Income Per Period"
                  onKeyPress={preventMinus}
                  onWheel={() => document.activeElement.blur()}
                  includeComma={true}
                  required={true}
                  placeholder="Income per period"
                  onChange={handleInputChange}
                />
                {errors.monthlyIncome && (
                  <span className="text-red-500 text-xs">
                    {errors.monthlyIncome}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="p-3 border-t flex items-center justify-end gap-2 bg-white z-[100] relative">
            <EditableButton
              whiteBtn={true}
              label={"Cancel"}
              // className="px-20"
              onClick={() => onClose("employmentDetails")}
            />

            <EditableButton
              blueBtn={true}
              disabled={loading === "pending" ? true : false}
              startIcon={
                loading === "pending" && (
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
              label={"Save & Update profile"}
              endIcon={<IoMdCheckmark size={20} />}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </form>
    </main>
  );
};

export default EmploymentDetailsModal;
