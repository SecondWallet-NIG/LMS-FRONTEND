"use client";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";
import InputField from "../components/shared/input/InputField";
import SelectField from "../components/shared/input/SelectField";
import { useState, useEffect } from "react";
import Button from "../components/shared/buttonComponent/Button";
import { genderOptions, countryOptions } from "../components/helpers/utils";
import { bankArr, statesAndLgas } from "@/constant";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import { createCustomer } from "@/redux/slices/customerSlice";
import SuccessModal from "../components/modals/SuccessModal";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";

const customNoOptionsMessage = () => {
  return (
    <div>
      {/* Custom message with a link */}
      <p>
        Not found. <Link href="/create">Create new customer</Link>
      </p>
    </div>
  );
};

const CreateCustomer = () => {
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [bankNameVal, setBankNameVal] = useState("");
  const [verificationResponse, setVerificationResponse] = useState(null);
  const [lga, setLga] = useState([]);

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
    createdBy: "5f7c335b7f6c9a1234567890",
  });

  const payload = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    middleName: formData.middleName,
    dateOfBirth: formData.dateOfBirth,
    gender: formData.gender,
    nin: formData.nin,
    bvn: formData.bvn,
    country: formData.country,
    state: formData.state,
    lga: formData.lga,
    address: formData.address,
    phoneNumber: formData.phoneNumber,
    email: formData.email,
    bankAccount: {
      accountNumber: formData.accountNumber,
      accountName: formData.accountName,
      bankName: formData.bankName,
    },
    createdBy: userId?.data?.user?._id,
  };

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
        } catch (error) {
          console.error("Error verifying bank details:", error);
        }
      }
    }
  };

  const handleSelectChange = async (selectedOption, name) => {
    setFormData({
      ...formData,
      [name]: selectedOption.value,
    });
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
    router.push("/create-customer");
  };
  const btnRightFunc = () => {
    router.push("/customers/profile");
  };

  const states = statesAndLgas.map((item, index) => ({
    value: item.state,
    label: item.state,
  }));

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
      createdBy: "5f7c335b7f6c9a1234567890",
    });
    setVerificationResponse(null);
    setBankNameVal("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCustomer(payload))
      .unwrap()
      .then(() => {
        document.getElementById("add-customer-form").reset();
        resetForm();
        openModal();
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
    <DashboardLayout isBackNav={true} paths={["Borrowers","Create borrower"]}>
      <ToastContainer />
      <main className="max-w-3xl mx-auto p-2 mt-10 text-sm">
        <div className="flex justify-between">
          <p className="text-lg font-semibold">Create borrower profile</p>
        </div>

        <form id="add-customer-form">
          <div className="flex flex-col gap-5 mt-5">
            <p className="font-semibold">Personal information</p>
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
            <div className="flex space-x-4">
              <div className="w-1/2">
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
              <div className="w-1/2">
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
              label="Social security number or NIN"
              placeholder="Social security number or NIN"
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
                  isSearchable={false}
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
                  isSearchable={false}
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
                  isSearchable={false}
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

            <div className="flex space-x-4">
              <div className="w-1/2">
                <InputField
                  name="phoneNumber"
                  placeholder="Phone Number"
                  inputType={"text"}
                  required={true}
                  activeBorderColor="border-swBlue"
                  label="Phone number"
                  isActive="loan-amount"
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-1/2">
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
            <div className="flex space-x-4">
              <div className="w-1/2">
                <SelectField
                  name="bankName"
                  optionValue={bankArr}
                  required={true}
                  placeholder={"Select bank"}
                  isSearchable={true}
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, "bankName")
                  }
                />
              </div>
              <div className="w-1/2">
                <InputField
                  maxLength={10}
                  name="accountNumber"
                  placeholder="Account number"
                  inputType="text"
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
      </main>
      <div className="">
        <SuccessModal
          isOpen={isModalOpen}
          onClose={closeModal}
          btnLeft="Add Customer"
          btnRight="View Customer"
          description="Customers profile has been successfully created. You can update the
            profile or create a new customer"
          title="Successfully created"
          btnLeftFunc={btnLeftFunc}
          btnRightFunc={btnRightFunc}
        />
      </div>
    </DashboardLayout>
  );
};

export default CreateCustomer;
