"use client";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import InputField from "@/app/components/shared/input/InputField";
import SelectField from "@/app/components/shared/input/SelectField";
import { useEffect, useState } from "react";
import { FiUser, FiMapPin, FiMail } from "react-icons/fi";
import { genderOptions, countryOptions } from "../../components/helpers/utils";
import { bankArr, statesAndLgas } from "@/constant";
import {
  createInvestor,
  getSingleInvestor,
  updateSingleInvestor,
} from "@/redux/slices/investmentSlice";
import { AiOutlineDelete, AiOutlinePaperClip } from "react-icons/ai";
import Image from "next/image";
import EditableButton from "@/app/components/shared/editableButtonComponent/EditableButton";
import { ToastContainer, toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import SuccessModal from "@/app/components/modals/SuccessModal";
import CancelModal from "@/app/components/modals/CancelModal";
import { investorsAuthRoles } from "@/app/components/helpers/pageAuthRoles";

const UpdateInvestorPorfileScreen = () => {
  const headerClass = "font-medium text-sm leading-5 text-swBlack";
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [lga, setLga] = useState([]);
  const [profileImg, setProfileImg] = useState(null);
  const [bankNameVal, setBankNameVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationResponse, setVerificationResponse] = useState(null);
  const [successModal, setSuccessModal] = useState(false);
  const [failedModal, setFailedModal] = useState(false);
  const [successModalData, setSuccessModalData] = useState({});
  const [errorModalData, setErrorModalData] = useState({});
  const [accountProfileImg, setAccoutProfileImage] = useState("");
  const [formData, setFormData] = useState({
    profilePicture: null,
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    nin: "",
    bvn: "",
    country: "",
    state: "",
    lga: "",
    houseNumber: "",
    houseLocation: "",
    email: "",
    phoneNumber: "",
    annualIncome: "",
    networth: "",
    sourceOfIncome: "",
    accountNumber: "",
    accountName: "",
    bankName: "",
    workStatus: "",
    taxDoc: null,
    bvnDoc: null,
    ninDoc: null,
  });
  const [fileError, setFileError] = useState({
    taxDoc: "",
    bvnDoc: "",
    ninoc: "",
  });

  const states = statesAndLgas.map((item, index) => ({
    value: item.state,
    label: item.state,
  }));

  const handleInputChange = async (e) => {
    let { name, value } = e.target;
    const reqComma = ["annualIncome", "networth"];

    if (reqComma.includes(name)) {
      const numericValue = value.replace(/[^0-9.]/g, "");
      value = Number(numericValue).toLocaleString();
    }
    setFormData((prev) => ({ ...prev, [name]: value }));

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
    setFormData({
      ...formData,
      [name]: selectedOption.value,
    });
  };

  const handleFileChange = (e) => {
    let { name, files } = e.target;
    setFileError((prev) => ({
      ...prev,
      [name]: "",
    }));
    const file = files[0];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    const allowedExtensions = ["jpg", "jpeg", "png", "pdf"];
    if (!allowedExtensions.includes(fileExtension)) {
      // setFileError(
      //   "Invalid file type. Please select an image (.jpg, .jpeg, .png) or PDF (.pdf)."
      // );
      setFileError((prev) => ({
        ...prev,
        [name]:
          "Invalid file type. Please select an image (.jpg, .jpeg, .png) or PDF (.pdf).",
      }));
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files[0],
    }));
  };

  const deleteFile = (name) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: null,
    }));
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

  const workStatusOpt = [
    { label: "Self employed", value: "Self employed" },
    { label: "Government employee", value: "Government employee" },
    { label: "Pensioner", value: "Pensioner" },
  ];

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

  const preventMinus = (e) => {
    if (/[^0-9,]/g.test(e.key)) {
      e.preventDefault();
    }
  };

  const renderFileInput = (text, name) => {
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-center text-swTextColor text-sm">{text}</p>
        {fileError[name] && (
          <p className="text-red-500 text-sm">{fileError[name]}</p>
        )}

        {formData[name]?.name ? (
          <div
            id="fileLabel3"
            className="bg-swLightGray p-2 flex justify-between"
          >
            <div className="text-xs">{formData[name]?.name}</div>
            <div
              onClick={() => {
                deleteFile(name);
              }}
            >
              <AiOutlineDelete color="red" size={20} />
            </div>
          </div>
        ) : null}

        <div className="relative">
          <input
            name={name}
            type="file"
            id={`fileInput-${name}`}
            className="absolute w-0 h-0 opacity-0"
            onChange={handleFileChange}
            onClick={(e) => (e.target.value = null)}
          />
          <label
            htmlFor={`fileInput-${name}`}
            className="text-white cursor-pointer"
          >
            <span
              className={`py-2 px-6 rounded-md outline outline-2 hover:outline-gray-200 flex gap-2 border w-fit  `}
            >
              <AiOutlinePaperClip className="text-swTextColor" size={20} />
              <p className="font-medium text-sm text-swTextColor">
                {formData[name]?.name ? "Change file" : "Select file"}
              </p>
            </span>
          </label>
        </div>
      </div>
    );
  };

  const removeCommasFromNumber = (numberString) => {
    if (typeof numberString !== "string") {
      numberString = String(numberString);
    }
    return numberString.replace(/,/g, "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    let payload = new FormData();

    const keysToAppend = Object.keys(formData);

    keysToAppend.forEach((key) => {
      if (formData[key]) {
        if (key === "annualIncome" || key === "networth") {
          payload.append(key, removeCommasFromNumber(formData[key]));
        } else if (
          key !== "accountNumber" &&
          key !== "accountName" &&
          key !== "bankName" &&
          key !== "houseNumber" &&
          key !== "houseLocation"
        ) {
          payload.append(key, formData[key]);
        }
      }
    });
    if (formData.houseNumber && formData.houseLocation) {
      const address = {
        houseNumber: formData.houseNumber,
        houseLocation: formData.houseLocation,
      };
      payload.append("address", JSON.stringify(address));
    }
    if (formData.accountNumber && formData.accountName && formData.bankName) {
      const bankAccount = {
        accountNumber: formData.accountNumber,
        accountName: formData.accountName,
        bankName: formData.bankName,
      };
      payload.append("bankAccount", JSON.stringify(bankAccount));
    }

    dispatch(updateSingleInvestor({ id, payload }))
      .unwrap()
      .then((response) => {
        // toast.success(response?.message);
        setSuccessModalData({
          title: "Investor Updated Successfully",
          description: response?.message,
          btnLeft: "View investors",
          btnRight: "Close",
          btnRightFunc: () => {
            setSuccessModalData({});
            setSuccessModal(false);
          },
        });
        setSuccessModal(true);
        setProfileImg(null);
        // router.push("/investors");
        // setNewUserId(response?.data?._id);
      })
      .catch((error) => {
        // toast.error(error?.message);
        setErrorModalData({
          description: error?.message,
        });
        setFailedModal(true);
        setLoading(false);
      });
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
    }
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user"));
      setUserId(user);

      dispatch(getSingleInvestor(id))
        .unwrap()
        .then((res) => {
          console.log("investor vibes...", res?.data);
          setFormData((prev) => ({
            ...prev,
            profilePicture: null,
            firstName: res?.data?.firstName,
            middleName: res?.data?.middleName,
            lastName: res?.data?.lastName,
            dateOfBirth: res?.data?.dateOfBirth,
            gender: res?.data?.gender,
            nin: res?.data?.nin,
            bvn: res?.data?.bvn,
            country: res?.data?.country,
            state: res?.data?.state,
            // lga: res?.data?.lga,
            houseNumber: res?.data?.address?.houseNumber,
            houseLocation: res?.data?.address?.houseLocation,
            email: res?.data?.email,
            phoneNumber: res?.data?.phoneNumber,
            annualIncome: Number(res?.data?.annualIncome)?.toLocaleString(),
            networth: Number(res?.data?.networth)?.toLocaleString(),
            sourceOfIncome: res?.data?.sourceOfIncome,
            workStatus: res?.data?.workStatus,
            // bankName: res?.data?.bankAccount?.bankName,
            // accountNumber: res?.data?.bankAccount?.accountNumber,
            // accountName: res?.data?.bankAccount?.accountName,
            taxDoc: null,
            bvnDoc: null,
            ninDoc: null,
          }));
          setAccoutProfileImage(res?.data?.profilePicture);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  console.log("bankk", formData.country);
  return (
    <div>
      <ToastContainer />
      <div className="mx-auto w-full px-10 lg:w-3/5 mb-28">
        <h1 className="font-medium text-xl leading-7 text-black py-5">
          Update investor profile
        </h1>
        <h5 className="font-semibold leading-7 text-lg text-swBlack mt-5 mb-8">
          Personal information
        </h5>

        {/* Profile Picture */}
        <h6 className={`${headerClass}`}>Profile picture</h6>
        <div className="mt-5 mb-10">
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
              <div>
                {accountProfileImg &&
                accountProfileImg !== "null" &&
                accountProfileImg !== "undefined" ? (
                  <div className="h-[4.7rem] w-[4.7rem] border-2 rounded-full relative overflow-hidden">
                    <Image
                      src={accountProfileImg}
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

        {/* Investor Information */}
        <div>
          <h6 className={`${headerClass}`}>Investor information</h6>
          <div className="my-5 flex flex-col md:flex-row gap-6">
            <div className="w-full">
              <InputField
                name={"firstName"}
                label={"First name"}
                placeholder={"Start typing"}
                required={true}
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full">
              <InputField
                name={"middleName"}
                label={"Middle name"}
                placeholder={"Start typing"}
                required={false}
                value={formData.middleName}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full">
              <InputField
                name={"lastName"}
                label={"Last Name"}
                placeholder={"Start typing"}
                required={true}
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-full">
              {/* <InputField
                name={"dateOfBirth"}
                label={"Date of Birth"}
                placeholder={"mm/dd/yyyy"}
                required={true}
                endIcon={<FiCalendar />}
                value={formData.dateOfBirth}
                onChange={handleInputChange}
              /> */}
              <InputField
                name="dateOfBirth"
                placeholder="Date of Birth"
                inputType={"date"}
                value={formData.dateOfBirth}
                required={true}
                activeBorderColor="border-swBlue"
                label="Date of Birth"
                isActive="loan-amount"
                onChange={handleInputChange}
              />
            </div>

            <div className="w-full">
              <SelectField
                name={"gender"}
                label={"Gender"}
                required={true}
                placeholder={"Select gender"}
                optionValue={genderOptions}
                value={genderOptions.find((e) => e.value === formData.gender)}
                onChange={(selectedOption) =>
                  handleSelectChange(selectedOption, "gender")
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 mt-5 mb-10 gap-6">
            <div className="w-full">
              <InputField
                required={true}
                name="nin"
                activeBorderColor="border-swBlue"
                onKeyPress={preventMinus}
                value={formData.nin}
                onWheel={() => document.activeElement.blur()}
                label="NIN"
                placeholder="NIN"
                // isActive="loan-amount"
                // onclick={() => {
                //   isInputOpen === "loan-amount"
                //     ? setIsInputOpen(null)
                //     : setIsInputOpen("loan-amount");
                // }}
                // inputOpen={isInputOpen}
                onChange={handleInputChange}
              />
            </div>

            <div className="w-full">
              <InputField
                required={true}
                name="bvn"
                onKeyPress={preventMinus}
                onWheel={() => document.activeElement.blur()}
                value={formData.bvn}
                activeBorderColor="border-swBlue"
                label="BVN"
                placeholder="Bank Verification Number"
                isActive="loan-amount"
                // onclick={() => {
                //   isInputOpen === "loan-amount"
                //     ? setIsInputOpen(null)
                //     : setIsInputOpen("loan-amount");
                // }}
                // inputOpen={isInputOpen}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Contact information */}
        <div>
          <h6 className={`${headerClass}`}>Contact information</h6>
          <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="w-full">
              <SelectField
                name="country"
                label={"Country"}
                value={
                  countryOptions.find((e) => e.value === formData.country) || ""
                }
                optionValue={countryOptions}
                required={true}
                placeholder={"Select country"}
                isSearchable={true}
                onChange={(selectedOption) =>
                  handleSelectChange(selectedOption, "country")
                }
              />
            </div>
            <div className="w-full">
              <SelectField
                name="state"
                label={"State"}
                optionValue={states}
                required={true}
                placeholder={"Select state"}
                isSearchable={true}
                value={states.find((e) => e.value === formData.state)}
                onChange={(selectedOption) => {
                  handleStateChange(selectedOption);
                  handleSelectChange(selectedOption, "state");
                }}
              />
            </div>
            <div className="w-full">
              <SelectField
                name="dateOfBirth"
                label={"LGA"}
                required={true}
                optionValue={lga}
                value={lga.find((e) => e.value === formData.lga)}
                placeholder={"Select lga"}
                isSearchable={true}
                onChange={(selectedOption) =>
                  handleSelectChange(selectedOption, "lga")
                }
              />
            </div>
          </div>

          <div className="flex justify-between gap-6">
            <div className="w-1/2">
              <InputField
                name={"houseNumber"}
                label={"House number"}
                placeholder={"Start typing"}
                required={false}
                value={formData.houseNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full">
              <InputField
                name={"houseLocation"}
                label={"Street name"}
                placeholder={"Start typing"}
                required={false}
                startIcon={<FiMapPin />}
                value={formData.houseLocation}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex justify-between gap-6 mt-5 mb-10">
            <div className="w-full">
              <InputField
                name={"email"}
                label={"Email address"}
                placeholder={"Start typing"}
                required={true}
                startIcon={<FiMail />}
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full">
              <InputField
                name={"phoneNumber"}
                label={"Phone number"}
                placeholder={"Start typing"}
                required={true}
                // startIcon={"NG "}
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Financial Information */}
        <div>
          <h6 className={`${headerClass}`}>Financial information</h6>
          <div className="w-full my-5">
            <InputField
              name={"annualIncome"}
              label={"Annual Income"}
              placeholder={"Start typing"}
              required={true}
              value={formData.annualIncome}
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full">
            <InputField
              name={"networth"}
              label={"Networth"}
              placeholder={"Start typing"}
              required={true}
              value={formData.networth}
              onChange={handleInputChange}
            />
            <p className="text-swGrey200 text-sm mt-1">
              Assets minus Liabilities
            </p>
          </div>

          <div className="w-full my-5">
            <InputField
              name={"sourceOfIncome"}
              label={"Source of income"}
              placeholder={"Start typing"}
              required={true}
              value={formData.sourceOfIncome}
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full">
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
            <p className="text-swGrey200 text-sm mt-1">
              Bank account to remit investment ROI
            </p>
          </div>

          <div className="w-full my-5">
            <InputField
              maxLength={10}
              name="accountNumber"
              placeholder="Account number"
              onKeyPress={preventMinus}
              onWheel={() => document.activeElement.blur()}
              required={true}
              activeBorderColor="border-swBlue"
              // value={formData.accountNumber}
              label="Account Number"
              onChange={handleInputChange}
              disabled={!formData.bankName} // Disable if bankName is not selected
            />
          </div>

          <div className="w-full mb-10">
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
        </div>

        {/* Work information */}
        <div>
          <h6 className={`${headerClass}`}>Work information</h6>
          <div className="w-full mt-5 mb-10">
            <SelectField
              name={"workStatus"}
              label={"Work status"}
              optionValue={workStatusOpt}
              required={true}
              value={workStatusOpt.find((e) => e.value === formData.workStatus)}
              placeholder={"Select work status"}
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, "workStatus")
              }
            />
          </div>
        </div>

        {/* Investor file upload */}
        <div>
          <h6 className={`${headerClass}`}>Investor file upload</h6>
          <p className="text-swGray text-sm mt-2 mb-10">
            Document types uploaded should be JPEGS, PNG or PDF and should not
            exceed 4mb
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
            {renderFileInput(
              "Upload Tax Identification Number (TIN)",
              "taxDoc"
            )}
            {renderFileInput("Upload Bank Verification Number (BVN)", "bvnDoc")}
            {renderFileInput("Upload National Identity Number (NIN)", "ninDoc")}
          </div>
        </div>

        <div className="flex justify-center my-20">
          <EditableButton
            disabled={loading}
            blueBtn={true}
            onClick={handleSubmit}
            className="rounded-md"
            label={"Update Investor profile"}
          />
        </div>
      </div>
      <SuccessModal
        isOpen={successModal}
        title={successModalData.title}
        description={successModalData.description}
        btnLeft={successModalData.btnLeft}
        btnLeftFunc={() => router.push("/investors")}
        btnRight={successModalData.btnRight}
        btnRightFunc={successModalData.btnRightFunc}
        onClose={() => {
          setSuccessModalData({});
          setSuccessModal(false);
        }}
      />
      <CancelModal
        isOpen={failedModal}
        title={"An error has occured"}
        description={errorModalData?.description}
        noButtons={true}
        onClose={() => {
          setErrorModalData({});
          setFailedModal(false);
        }}
      />
    </div>
  );
};

export default UpdateInvestorPorfileScreen;
