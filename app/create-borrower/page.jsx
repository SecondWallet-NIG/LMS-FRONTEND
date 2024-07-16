"use client";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";
import InputField from "../components/shared/input/InputField";
import SelectField from "../components/shared/input/SelectField";
import { useState, useEffect } from "react";
import Button from "../components/shared/buttonComponent/Button";
import {
  genderOptions,
  countryOptions,
  createBorrowerType,
} from "../components/helpers/utils";
import { bankArr, statesAndLgas } from "@/constant";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import {
  createBulkCustomer,
  createCustomer,
} from "@/redux/slices/customerSlice";
import SuccessModal from "../components/modals/SuccessModal";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import { LuPaperclip } from "react-icons/lu";
import { AiOutlineClose } from "react-icons/ai";
import { FiTrash, FiUser } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import EditableButton from "../components/shared/editableButtonComponent/EditableButton";
import Image from "next/image";

const CreateCustomer = () => {
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [bankNameVal, setBankNameVal] = useState("");
  const [verificationResponse, setVerificationResponse] = useState(null);
  const [lga, setLga] = useState([]);
  const [newUserId, setNewUserId] = useState("");
  const [fileError, setFileError] = useState("");
  const [borrowerType, setBorrowerType] = useState({
    value: "Single borrower",
    label: "Single borrower",
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [profileImg, setProfileImg] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    loading,
    error,
    data: userData,
  } = useSelector((state) => state.customer);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [formData, setFormData] = useState({
    profilePicture: null,
    firstName: "",
    lastName: "",
    middleName: "",
    dateOfBirth: "",
    gender: "",
    nin: "",
    bvn: "",
    country: "",
    state: "",
    lga: "",
    address: "",
    phoneNumber: "",
    email: "",
    accountNumber: "",
    accountName: "",
    bankName: "",
    createdBy: "",
  });

  const handleInputChange = async (e) => {
    let { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "accountNumber" && value.length === 10) {
      const selectedBankOption = formData.bankName;

      if (selectedBankOption) {
        try {
          const response = await verifyBankDetails(value, selectedBankOption);
          setVerificationResponse(response);
          setFormData((prevFormData) => ({
            ...prevFormData,
            accountName: response.data.account_name,
          }));
          setBankNameVal(response.data.account_name);
        } catch (error) {}
      }
    }
  };

  const handleSelectChange = async (selectedOption, name) => {
    if (name === "borrower") {
      setBorrowerType(selectedOption);
    } else {
      setFormData({
        ...formData,
        [name]: selectedOption.value,
      });
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length <= 2) {
      setSelectedFiles(files);
    } else {
      alert("You can only upload a maximum of 2 files.");
    }
  };

  const handleFileInputChange = (e) => {
    setFileError("");
    const files = Array.from(e.target.files);
    if (e.target.id === "profilePicture" && e.target.files.length > 0) {
      const fileExtension = files[0].name.split(".").pop().toLowerCase();

      const allowedExtensions = ["jpg", "jpeg", "png"];
      if (!allowedExtensions.includes(fileExtension)) {
        setFileError(
          "Invalid file type. Please select an image (.jpg, .jpeg, .png)."
        );
        return;
      }
      setFormData((prev) => ({ ...prev, [e.target.id]: files[0] }));
    } else {
      setSelectedFiles(files);
    }
  };

  const handleFileDelete = (index) => {
    selectedFiles.splice(index, 1);
    setSelectedFiles([...selectedFiles]);
  };

  const verifyBankDetails = async (accountNumber, bankCode) => {
    const url = `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`;
    const secretKey = "sk_test_fc684264fab5c82971c56f2fab38c5c252c171b4"; // Replace with your actual secret key

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      });

      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      throw error;
    }
  };

  const btnLeftFunc = () => {
    router.push("/create-borrower");
    closeModal();
  };
  const btnRightFunc = () => {
    closeModal();
    router.push(`/borrowers/profile/${newUserId}`);
  };

  const states = statesAndLgas.map((item, index) => ({
    value: item.state,
    label: item.state,
  }));

  const preventMinus = (e) => {
    if (/[^0-9,]/g.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleStateChange = (selectedOption) => {
    const selectedState = selectedOption.value;
    const selectedLgas =
      statesAndLgas.find((item) => item.state === selectedState)?.lgas || [];
    const lgas = selectedLgas.map((item, index) => ({
      value: item,
      label: item,
    }));
    setLga(lgas);
  };
  const resetForm = () => {
    setFormData({
      profilePicture: null,
      firstName: "",
      lastName: "",
      middleName: "",
      dateOfBirth: "",
      gender: "",
      nin: "",
      bvn: "",
      country: "",
      state: "",
      lga: "",
      address: "",
      phoneNumber: "",
      email: "",
      accountNumber: "",
      accountName: "",
      bankName: "",
      createdBy: "",
    });
    setVerificationResponse(null);
    setBankNameVal("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let payload = new FormData();
    payload.append("profilePicture", formData.profilePicture);
    payload.append("firstName", formData.firstName);
    payload.append("lastName", formData.lastName);
    payload.append("middleName", formData.middleName);
    payload.append("dateOfBirth", formData.dateOfBirth);
    payload.append("gender", formData.gender);
    payload.append("nin", formData.nin);
    payload.append("bvn", formData.bvn);
    payload.append("country", formData.country);
    payload.append("state", formData.state);
    payload.append("lga", formData.lga);
    payload.append("address", formData.address);
    payload.append("phoneNumber", formData.phoneNumber);
    payload.append("email", formData.email);
    payload.append("bankAccount[accountNumber]", formData.accountNumber);
    payload.append("bankAccount[accountName]", formData.accountName);
    payload.append("bankAccount[bankName]", formData.bankName);
    payload.append("createdBy", userId?.data?.user?._id);
    dispatch(createCustomer(payload))
      .unwrap()
      .then((response) => {
        document.getElementById("add-customer-form").reset();
        resetForm();
        openModal();
        setNewUserId(response?.data?._id);
        setProfileImg(null);
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  useEffect(() => {
    if (
      formData?.profilePicture !== null &&
      formData?.profilePicture &&
      (formData?.profilePicture instanceof Blob ||
        formData?.profilePicture instanceof File)
    ) {
      try {
        setProfileImg(URL.createObjectURL(formData.profilePicture));
      } catch (error) {
        console.error("Error creating object URL:", error);
      }
    } else {
      // Handle cases where the selected file is not a Blob or File
      console.error("Invalid file type selected.");
    }
  }, [formData?.profilePicture]);

  const handleBulkCustomerSubmit = (e) => {
    const payload = new FormData();
    payload.append("bulkCustomerCsv", selectedFiles[0]);
    payload.append("createdBy", userId?.data?.user?._id);
    e.preventDefault();
    dispatch(createBulkCustomer(payload))
      .unwrap()
      .then((response) => {
        toast.success(
          "Upload in progress, you will be notified when this is complete"
        );
      })
      .catch((error) => {
        toast.error(`An error occured`);
      });
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserId(user);
  }, []);

  return (
    <DashboardLayout isBackNav={true} paths={["Borrowers", "Create borrower"]}>
      <ToastContainer />
      <main className="max-w-3xl mx-auto p-2 mt-10 text-sm">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold text-swBlue">
            Create borrower profile
          </p>
          <SelectField
            name="borrower"
            optionValue={createBorrowerType}
            value={borrowerType}
            isSearchable={false}
            onChange={(selectedOption) =>
              handleSelectChange(selectedOption, "borrower")
            }
          />
        </div>

        {borrowerType.value === "Single borrower" && (
          <form id="add-customer-form">
            <div className="flex flex-col gap-5 my-10">
              <p className="font-semibold text-lg text-swBlack">
                Personal information
              </p>

              <div>
                <p className="font-semibold my-5">Profile picture</p>
                <div className="flex gap-5 items-center">
                  {profileImg !== null ? (
                    <div className="h-[4.7rem] w-[4.7rem] border-2 rounded-full relative overflow-hidden">
                      <Image
                        src={profileImg !== null && profileImg}
                        alt="profile"
                        fill
                        sizes="100%"
                      />
                    </div>
                  ) : (
                    <div className="border-2 p-4 rounded-full">
                      <FiUser size={40} />
                    </div>
                  )}

                  <label
                    htmlFor="profilePicture"
                    className="border-2 rounded-lg p-2 px-4 font-semibold cursor-pointer"
                  >
                    <input
                      type="file"
                      id="profilePicture"
                      className="hidden"
                      onChange={handleFileInputChange}
                    />
                    {profileImg !== null ? "Change file" : "Select a file"}
                  </label>
                </div>
              </div>
              {fileError && <p className="text-red-500 text-sm">{fileError}</p>}
              <p className="font-semibold my-3">Borrower information</p>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/3">
                  <InputField
                    required={true}
                    name="firstName"
                    hintText={""}
                    activeBorderColor="border-swBlue"
                    label="First Name"
                    placeholder="Enter first name"
                    isActive="loan-amount"
                    onclick={() => {
                      isInputOpen === "loan-amount"
                        ? setIsInputOpen(null)
                        : setIsInputOpen("loan-amount");
                    }}
                    inputOpen={isInputOpen}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-full md:w-1/3">
                  <InputField
                    name="middleName"
                    required={true}
                    hintText={""}
                    activeBorderColor="border-swBlue"
                    label="Middle Name"
                    placeholder="Enter middle name"
                    isActive="loan-amount"
                    onclick={() => {
                      isInputOpen === "loan-amount"
                        ? setIsInputOpen(null)
                        : setIsInputOpen("loan-amount");
                    }}
                    inputOpen={isInputOpen}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-full md:w-1/3">
                  <InputField
                    name="lastName"
                    placeholder="Enter last name"
                    required={true}
                    activeBorderColor="border-swBlue"
                    label="Last Name"
                    isActive="loan-amount"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-5">
                <div className="w-full md:w-1/2">
                  <InputField
                    name="dateOfBirth"
                    placeholder="Date of Birth"
                    inputType={"date"}
                    required={true}
                    activeBorderColor="border-swBlue"
                    label="Date of Birth"
                    isActive="loan-amount"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <SelectField
                    name="gender"
                    optionValue={genderOptions}
                    label={"Gender"}
                    required={true}
                    placeholder={"Select gender"}
                    isSearchable={false}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, "gender")
                    }
                  />
                </div>
              </div>

              <InputField
                required={true}
                name="nin"
                activeBorderColor="border-swBlue"
                onKeyPress={preventMinus}
                onWheel={() => document.activeElement.blur()}
                label="NIN"
                placeholder="NIN"
                isActive="loan-amount"
                onclick={() => {
                  isInputOpen === "loan-amount"
                    ? setIsInputOpen(null)
                    : setIsInputOpen("loan-amount");
                }}
                inputOpen={isInputOpen}
                onChange={handleInputChange}
              />
              <InputField
                required={true}
                name="bvn"
                onKeyPress={preventMinus}
                onWheel={() => document.activeElement.blur()}
                activeBorderColor="border-swBlue"
                label="Bank Verification Number"
                placeholder="Bank Verification Number"
                isActive="loan-amount"
                onclick={() => {
                  isInputOpen === "loan-amount"
                    ? setIsInputOpen(null)
                    : setIsInputOpen("loan-amount");
                }}
                inputOpen={isInputOpen}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-5 mt-5">
              <p className="font-semibold">Contact information</p>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/3">
                  <SelectField
                    name="country"
                    label={"Country"}
                    optionValue={countryOptions}
                    required={true}
                    placeholder={"Select country"}
                    isSearchable={true}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, "country")
                    }
                  />
                </div>
                <div className="w-full md:w-1/3">
                  <SelectField
                    name="state"
                    label={"State"}
                    optionValue={states}
                    required={true}
                    placeholder={"Select state"}
                    isSearchable={true}
                    onChange={(selectedOption) => {
                      handleStateChange(selectedOption);
                      handleSelectChange(selectedOption, "state");
                    }}
                  />
                </div>
                <div className="w-full md:w-1/3">
                  <SelectField
                    name="dateOfBirth"
                    label={"LGA"}
                    required={true}
                    optionValue={lga}
                    placeholder={"Select lga"}
                    isSearchable={true}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, "lga")
                    }
                  />
                </div>
              </div>

              <InputField
                name="address"
                placeholder="Address"
                inputType={"text"}
                required={true}
                activeBorderColor="border-swBlue"
                label="Address"
                isActive="loan-amount"
                onChange={handleInputChange}
              />

              <div className="flex flex-col md:flex-row gap-5">
                <div className="w-full md:w-1/2">
                  <InputField
                    name="phoneNumber"
                    placeholder="Phone Number"
                    onKeyPress={preventMinus}
                    onWheel={() => document.activeElement.blur()}
                    required={true}
                    activeBorderColor="border-swBlue"
                    label="Phone number"
                    isActive="loan-amount"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <InputField
                    name="email"
                    placeholder="Email Address"
                    inputType={"text"}
                    required={true}
                    activeBorderColor="border-swBlue"
                    label="Email address"
                    isActive="loan-amount"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 mt-5">
              <p className="font-semibold">Bank Account Information</p>
              <div className="flex flex-col md:flex-row gap-5">
                <div className="w-full md:w-1/2">
                  <SelectField
                    name="bankName"
                    label="Bank name"
                    optionValue={bankArr}
                    required={true}
                    placeholder={"Select bank"}
                    isSearchable={true}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, "bankName")
                    }
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <InputField
                    maxLength={10}
                    name="accountNumber"
                    placeholder="Account number"
                    onKeyPress={preventMinus}
                    onWheel={() => document.activeElement.blur()}
                    required={true}
                    activeBorderColor="border-swBlue"
                    label="Account Number"
                    onChange={handleInputChange}
                    disabled={!formData.bankName} // Disable if bankName is not selected
                  />
                </div>
              </div>
              <InputField
                name="accountName"
                disabled={true}
                required={true}
                activeBorderColor="border-swBlue"
                label="Name on Account"
                placeholder="Name on account"
                isActive="loan-amount"
                onChange={handleInputChange}
                value={bankNameVal}
              />
            </div>

            <div className="flex justify-center">
              <Button
                disabled={loading === "pending" ? true : false}
                onClick={handleSubmit}
                className="py-2 px-9 rounded-md flex gap-2 border w-fit mt-10 bg-swBlue"
              >
                {loading === "pending"
                  ? "Processing..."
                  : "Create borrower profile"}
              </Button>
            </div>
          </form>
        )}

        {borrowerType.value === "Bulk borrowers" && (
          <div className="">
            <p className="font-semibold text-lg my-5 text-swBlack">
              Upload a file
            </p>
            <div
              className="text-center w-full"
              onDrop={handleFileDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <div className="w-full border-dotted border-[5px] rounded-3xl bg-pharmaGray pt-4 pb-4 text-swBlack">
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  accept=".csv,.xlsx"
                  onChange={handleFileInputChange}
                />

                <p className="mt-10 text-lg font-medium">
                  Drag and drop a file to upload
                </p>
                <p className="textxs">File types: .xlsx, .csv</p>
                <p className="textxs">Max file size: 3mb</p>

                <label
                  htmlFor="fileInput"
                  className="cursor-pointer flex gap-2 itwms-center p-2 rounded-md bg-swBlue text-white font-medium w-fit mx-auto mt-5 mb-3"
                >
                  <LuPaperclip size={20} />{" "}
                  {selectedFiles.length > 0 ? "Change file" : "Upload file"}
                </label>
              </div>
            </div>

            {selectedFiles.length > 0 && (
              <div className="mt-5">
                <ul className="">
                  {selectedFiles.map((file, index) => (
                    <li
                      key={index}
                      className="my-2 bg-white flex rounded-md border"
                    >
                      <div className="flex gap-3 items-center p-2 pl-2 font-medium ">
                        {/* <FiFileText size={20} /> */}
                        {file.name}
                      </div>
                      <div
                        className="flex gap-4 items-center ml-auto p-2 border-l cursor-pointer"
                        onClick={() => {
                          handleFileDelete(index);
                        }}
                      >
                        <FiTrash
                          className=" text-swIndicatorLightRed"
                          size={15}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex justify-center mt-5">
              <EditableButton
                onClick={handleBulkCustomerSubmit}
                disabled={selectedFiles.length > 0 ? false : true}
                label={"Create borrower profiles"}
                blueBtn={true}
              />
            </div>
          </div>
        )}
      </main>
      <div className="">
        <SuccessModal
          isOpen={isModalOpen}
          onClose={closeModal}
          btnLeft="Add Borrower"
          btnRight="View Borrower"
          description="Borrower's profile has been successfully created. You can update the
            profile or create a new borrower"
          title="Successfully created"
          btnLeftFunc={btnLeftFunc}
          btnRightFunc={btnRightFunc}
        />
      </div>
    </DashboardLayout>
  );
};

export default CreateCustomer;
