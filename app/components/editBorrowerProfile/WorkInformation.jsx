"use client";
import { Rings } from "react-loader-spinner";
import EditableButton from "../shared/editableButtonComponent/EditableButton";
import { IoMdCheckmark } from "react-icons/io";
import InputField from "../shared/input/InputField";
import SelectField from "../shared/input/SelectField";
import { useEffect, useState } from "react";
import { updateEmployment } from "@/redux/slices/customerSlice";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

const WorkInformation = ({ userData, loading }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
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


  const handleInputChange = async (e) => {
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

  const employmentStatus = [
    { value: "Employed", label: "Employed" },
    { value: "Self Employed", label: "Self Employed" },
  ];

  const incomePeriodData = [
    { value: "Daily", label: "Daily" },
    { value: "Weekly", label: "Weekly" },
    { value: "Monthly", label: "Monthly" },
  ];

  const preventMinus = (e) => {
    if (/[^0-9,]/g.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleSelectChange = async (selectedOption, name) => {
    setFormData({
      ...formData,
      [name]: selectedOption.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
      incomePeriod: formData.incomePeriod,
      incomeSource: formData.incomeSource,
      customerProfileInformation: id,
      createdBy: "650f659167a782d8868b76ee",
    };



    dispatch(updateEmployment({id: userData?.employmentInformation?._id, payload}))
      .unwrap()
      .then((res) => {
        toast.success("Profile updated successfully");
        window.location.reload()
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  useEffect(() => {
    if (userData?.employmentInformation !== "null") {
      setFormData({
        employerName:
          userData?.employmentInformation?.employerInformation?.name,
        employerPhone:
          userData?.employmentInformation?.employerInformation?.contact,
        incomeSource: userData?.employmentInformation?.incomeSource,
        currentEmploymentStatus:
          userData?.employmentInformation?.currentEmploymentStatus,
        jobTitle: userData?.employmentInformation?.jobTitle,
        monthlyIncome: userData?.employmentInformation?.monthlyIncome,
        employerAddress:
          userData?.employmentInformation?.employerInformation?.address,
        incomePeriod: userData?.employmentInformation?.incomePeriod,
      });
    }
  }, [userData]);

  return (
    <form id="add-user-form">
      <ToastContainer />
      <div className="p-4 bg-white">
        <div className="">
          <p className="font-semibold text-lg text-swBlack">Work information</p>

          <div className="pt-4 flex gap-4">
            <div className="w-1/2">
              <SelectField
                name="currentEmploymentStatus"
                label={"Employment Status"}
                required={true}
                isSearchable={false}
                value={employmentStatus.find(
                  (option) => option.value === formData.currentEmploymentStatus
                )}
                optionValue={employmentStatus}
                onChange={(selectedOption) =>
                  handleSelectChange(selectedOption, "currentEmploymentStatus")
                }
              />
            </div>
            <div className="w-1/2">
              <InputField
                name="employerName"
                label="Employer Name"
                required={true}
                value={formData.employerName}
                placeholder="Employer name"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-5 gap-4">
          <div className="w-1/2">
            <InputField
              name="employerAddress"
              label="Employer Address"
              required={true}
              value={formData.employerAddress}
              placeholder="Employer address "
              onChange={handleInputChange}
            />
          </div>
          <div className="w-1/2">
            <InputField
              name="employerPhone"
              label="Employer Contact"
              value={formData?.employerPhone?.toLocaleString()}
              onKeyPress={preventMinus}
              onWheel={() => document.activeElement.blur()}
              required={true}
              placeholder="Employer phone number"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex justify-between mt-5 gap-4">
          <div className="w-1/2">
            <InputField
              name="jobTitle"
              label="Job Title"
              value={formData.jobTitle}
              required={true}
              placeholder="Job title"
              onChange={handleInputChange}
            />
          </div>
          <div className="w-1/2">
            <InputField
              name="incomeSource"
              label="Income Source"
              value={formData.incomeSource}
              required={true}
              placeholder="Income source"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex justify-between mt-5 gap-4">
          <div className="w-1/2">
            <SelectField
              value={incomePeriodData.find(
                (option) => option.value === formData.incomePeriod
              )}
              name="incomePeriod"
              label={"Income Period"}
              required={true}
              isSearchable={false}
              optionValue={incomePeriodData}
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, "incomePeriod")
              }
            />
          </div>
          <div className="w-1/2">
            <InputField
              name="monthlyIncome"
              value={Number(formData?.monthlyIncome)?.toLocaleString()}
              label="Income Per Period"
              onKeyPress={preventMinus}
              ariaLabel={"Number input"}
              onWheel={() => document.activeElement.blur()}
              includeComma={true}
              required={true}
              placeholder="Income per period"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className="p-3 mt-5 flex items-center justify-center gap-2 bg-white">
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
    </form>
  );
};

export default WorkInformation;
