"use state";
import { FiUser } from "react-icons/fi";
import Button from "../shared/buttonComponent/Button";
import SelectField from "../shared/input/SelectField";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { genderOptions, countryOptions } from "../helpers/utils";
import { bankArr, statesAndLgas } from "@/constant";
import InputField from "../shared/input/InputField";
import { updateCustomer } from "@/redux/slices/customerSlice";
const PersonalInformation = ({ userData, loading }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useParams();
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [bankNameVal, setBankNameVal] = useState("");
  const [verificationResponse, setVerificationResponse] = useState(null);
  const [lga, setLga] = useState([]);
  const [profileImg, setProfileImg] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

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

  console.log(formData.bankName);

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
          // console.error("Error verifying bank details:", error);
        }
      }
    }
  };

  const handleFileInputChange = (e) => {
    // console.log(e.target.id);
    const files = Array.from(e.target.files);
    if (e.target.id === "profilePicture" && e.target.files.length > 0) {
      // console.log(files[0])
      setFormData((prev) => ({ ...prev, [e.target.id]: files[0] }));
    } else {
      setSelectedFiles(files);
    }
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
    const selectedState = selectedOption?.value || selectedOption;
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
    payload.append("createdBy", userId?._id);

    dispatch(updateCustomer({ customerId: id, payload }))
      .unwrap()
      .then((response) => {
        document.getElementById("add-customer-form").reset();
        window.location.reload();
        resetForm();
      })
      .catch((error) => {
        toast.error(`An error occured`);
      });
  };

  const handleSelectChange = async (selectedOption, name) => {
    setFormData({
      ...formData,
      [name]: selectedOption?.value,
    });
  };

  // useEffect(() => {
  //   if (
  //     formData?.profilePicture !== null &&
  //     formData?.profilePicture &&
  //     (formData?.profilePicture instanceof Blob ||
  //       formData?.profilePicture instanceof File)
  //   ) {
  //     try {
  //       setProfileImg(URL.createObjectURL(formData.profilePicture));
  //     } catch (error) {
  //       console.error("Error creating object URL:", error);
  //     }
  //   } else {
  //     // Handle cases where the selected file is not a Blob or File
  //     console.error("Invalid file type selected.");
  //   }
  // }, [formData?.profilePicture]);

  useEffect(() => {
    handleStateChange(userData?.profileInfo?.state);

    // handleSelectChange(userData?.profileInfo?.genderlga, "lga");
    setFormData({
      profilePicture: null,
      firstName: userData?.profileInfo?.firstName,
      lastName: userData?.profileInfo?.lastName,
      middleName: userData?.profileInfo?.middleName,
      dateOfBirth: userData?.profileInfo?.dateOfBirth,
      gender: userData?.profileInfo?.gender,
      nin: userData?.profileInfo?.nin,
      bvn: userData?.profileInfo?.bvn,
      country: userData?.profileInfo?.country,
      state: userData?.profileInfo?.state,
      lga: userData?.profileInfo?.lga,
      address: userData?.profileInfo?.address,
      phoneNumber: userData?.profileInfo?.phoneNumber,
      email: userData?.profileInfo?.email,
      accountNumber: userData?.profileInfo?.bankAccount?.accountNumber,
      accountName: userData?.profileInfo?.bankAccount?.accountName,
      bankName: userData?.profileInfo?.bankAccount?.bankName,
      createdBy: userData?.profileInfo?.bankAccount?.createdBy,
    });

    const getBankName = async () => {
      if (userData?.profileInfo?.bankAccount?.accountNumber) {
        try {
          const response = await verifyBankDetails(
            userData?.profileInfo?.bankAccount?.accountNumber,
            userData?.profileInfo?.bankAccount?.bankName
          );
          setVerificationResponse(response);
          console.log("useEffect resp", response);
          setBankNameVal(response?.data?.account_name);
        } catch (error) {
          // console.error("Error verifying bank details:", error);
        }
      }
    };
    getBankName();
    const _user = JSON.parse(localStorage.getItem("user"));
    console.log({ _user });
    if (_user) {
      setUserId(_user?.data?.user);
    }
  }, [userData]);
  return (
    <form id="add-customer-form">
      <ToastContainer />
      <div className="flex flex-col gap-5 mb-10">
        <p className="font-semibold text-lg text-swBlack">
          Personal information
        </p>
        <div>
          <p className="font-semibold my-5">Profile picture</p>
          {/* <div className="flex gap-5 items-center">
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
          </div> */}
        </div>
        <p className="font-semibold my-3">Borrower information</p>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3">
            <InputField
              required={true}
              name="firstName"
              value={formData.firstName}
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
              value={formData.middleName}
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
              value={formData.lastName}
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
              value={formData.dateOfBirth}
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
              value={genderOptions.find(
                (option) => option.value === formData.gender
              )}
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
          value={formData.nin}
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
          value={formData.bvn}
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
              value={countryOptions.find(
                (option) => option.value === formData.country
              )}
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
              value={states.find((option) => option.value === formData.state)}
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
              name="lga"
              label={"LGA"}
              required={true}
              value={lga.find((option) => option.value === formData.lga)}
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
          value={formData.address}
          isActive="loan-amount"
          onChange={handleInputChange}
        />

        <div className="flex space-x-4">
          <div className="w-1/2">
            <InputField
              name="phoneNumber"
              placeholder="Phone Number"
              onKeyPress={preventMinus}
              onWheel={() => document.activeElement.blur()}
              value={formData.phoneNumber}
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
              value={formData.email}
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
              label="Bank name"
              value={bankArr.find(
                (option) => option.value === formData.bankName
              )}
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
              onKeyPress={preventMinus}
              inputType="text"
              required={true}
              value={formData.accountNumber}
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
          {loading === "pending" ? "Processing..." : "Update borrower profile"}
        </Button>
      </div>
    </form>
  );
};

export default PersonalInformation;
