"use client";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import Button from "@/app/components/shared/buttonComponent/Button";
import InputField from "@/app/components/shared/input/InputField";
import SelectField from "@/app/components/shared/input/SelectField";
import { useEffect, useState } from "react";
import {
  FiUser,
  FiCalendar,
  FiMapPin,
  FiMail,
  FiPaperclip,
} from "react-icons/fi";
import {
  genderOptions,
  countryOptions,
  createBorrowerType,
} from "../../components/helpers/utils";
import { bankArr, statesAndLgas } from "@/constant";
import { createInvestor } from "@/redux/slices/investmentSlice";

const CreateInvestor = () => {
  const headerClass = "font-medium text-sm leading-5 text-swBlack";
  const [userId, setUserId] = useState("");
  const [lga, setLga] = useState([]);
  const [bankNameVal, setBankNameVal] = useState("");
  const [verificationResponse, setVerificationResponse] = useState(null);
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
    bankAccount: "",
    workStatus: "",
    taxDoc: null,
    bvnDoc: null,
    ninDoc: null,
  });

  const states = statesAndLgas.map((item, index) => ({
    value: item.state,
    label: item.state,
  }));

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
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
    { label: "Self employed", value: "selfEmployed" },
    { label: "Government employee", value: "governmentEmployee" },
    { label: "Pensioneer", value: "pensioneer" },
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
    payload.append("address[houseNumber]", formData.houseNumber);
    payload.append("address[houseLocation]", formData.houseLocation);
    payload.append("phoneNumber", formData.phoneNumber);
    payload.append("email", formData.email);
    payload.append("bankAccount[accountNumber]", formData.accountNumber);
    payload.append("bankAccount[accountName]", formData.accountName);
    payload.append("bankAccount[bankName]", formData.bankName);
    payload.append("annualIncome", formData.annualIncome);
    payload.append("networth", formData.networth);
    payload.append("sourceOfIncome", formData.sourceOfIncome);
    payload.append("workStatus", formData.workStatus);
    payload.append("taxDoc", formData.taxDoc);
    payload.append("bvnDoc", formData.bvnDoc);
    payload.append("ninDoc", formData.ninDoc);
    payload.append("createdBy", userId?.data?.user?._id);
    dispatch(createInvestor(payload))
      .unwrap()
      .then((response) => {
        console.log(response);
        document.getElementById("add-customer-form").reset();
        resetForm();
        openModal();
        setNewUserId(response?.data?._id);
        setProfileImg(null);
      })
      .catch((error) => {
        console.log({ error });
        toast.error(error?.message);
      });
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserId(user);
  }, []);

  console.log({ formData });
  return (
    <DashboardLayout isBackNav={true} paths={["Investors", "Create investor"]}>
      <div className="mx-auto w-3/5 mb-28">
        <h1 className="font-medium text-xl leading-7 text-black py-5">
          Create investor profile
        </h1>
        <h5 className="font-semibold leading-7 text-lg text-swBlack mt-5 mb-8">
          Personal information
        </h5>

        {/* Profile Picture */}
        <h6 className={`${headerClass}`}>Profile picture</h6>
        <div className="mt-5 flex gap-6 mb-10">
          <FiUser className="opacity-50 border-2 rounded-full p-4" size={82} />
          <div className="mt-5">
            <Button className="px-2 text-black rounded-md text-sm">
              Select a file
            </Button>
          </div>
        </div>

        {/* Investor Information */}
        <div>
          <h6 className={`${headerClass}`}>Investor information</h6>
          <div className="my-5 flex justify-between gap-6">
            <InputField
              name={"firstName"}
              label={"First name"}
              placeholder={"Start typing"}
              required={true}
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <InputField
              name={"middleName"}
              label={"Middle name"}
              placeholder={"Start typing"}
              required={false}
              value={formData.middleName}
              onChange={handleInputChange}
            />
            <InputField
              name={"lastname"}
              label={"Last Name"}
              placeholder={"Start typing"}
              required={true}
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex justify-between gap-6">
            <div className="w-full">
              <InputField
                name={"dateOfBirth"}
                label={"Date of Birth"}
                placeholder={"mm/dd/yyyy"}
                required={true}
                endIcon={<FiCalendar />}
                value={formData.dateOfBirth}
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
                  handleSelectChange(selectedOption, gender)
                }
              />
            </div>
          </div>

          <div className="flex justify-between mt-5 mb-10 gap-6">
            <div className="w-full">
              <InputField
                name={"nin"}
                label={"NIN"}
                placeholder={"Start typing"}
                required={true}
                value={formData.nin}
                onChange={handleInputChange}
              />
            </div>

            <div className="w-full">
              <InputField
                name={"bvn"}
                label={"BVN"}
                placeholder={"Start typing"}
                required={true}
                value={formData.bvn}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Contact information */}
        <div>
          <h6 className={`${headerClass}`}>Contact information</h6>
          <div className="my-5 flex justify-between gap-6">
            <div className="w-full">
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
            <div className="w-full">
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
            <div className="w-full">
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

          <div className="flex justify-between gap-6 text-center">
            <span className="w-full">
              <p className="text-swGrey500 leading-5 text-sm">
                Upload Tax Identification Number (TIN)
              </p>
              <Button className="mt-5 rounded-md flex gap-1 items-center">
                <FiPaperclip />
                Select files
              </Button>
            </span>

            <span className="w-full">
              <p className="text-swGrey500 leading-5 text-sm">
                Upload Bank Verification Number (BVN)
              </p>
              <Button className="mt-5 rounded-md flex gap-1 items-center">
                <FiPaperclip />
                Select files
              </Button>
            </span>

            <span className="w-full">
              <p className="text-swGrey500 leading-5 text-sm">
                Upload National Identity Number (NIN)
              </p>
              <Button className="mt-5 rounded-md flex gap-1 items-center">
                <FiPaperclip />
                Select files
              </Button>
            </span>
          </div>
        </div>

        <div className="flex justify-center my-20">
          <Button className="rounded-md">Create Investor profile</Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateInvestor;
