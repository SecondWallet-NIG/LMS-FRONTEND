"use client";
import DashboardLayout from "../../components/dashboardLayout/DashboardLayout";
import InputField from "../../components/shared/input/InputField";
import { AiOutlinePercentage, AiOutlineMinus } from "react-icons/ai";
import SelectField from "../../components/shared/input/SelectField";
import Button from "../../components/shared/buttonComponent/Button";
import { useState } from "react";
import EditableButton from "@/app/components/shared/editableButtonComponent/EditableButton";
import { createInvestmentProduct } from "@/redux/slices/investmentSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FaBullseye, FaRegTrashAlt } from "react-icons/fa";
import SuccessModal from "@/app/components/modals/SuccessModal";
import CancelModal from "@/app/components/modals/CancelModal";

const CreateInvestmentProduct = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [displayDailyForm, setDisplayDailyForm] = useState(false);
  const [displayMonthlyForm, setDisplayMonthlyForm] = useState(false);
  const [displayYearlyForm, setDisplayYearlyForm] = useState(false);
  const [payload, setPayload] = useState({});
  const [successModal, setSuccessModal] = useState(false);
  const [successName, setSuccessName] = useState("");
  const [failedModal, setFailedModal] = useState(false);
  const [failedModalMessage, setFailedModalMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    minInterestRangeDaily: "",
    maxInterestRangeDaily: "",
    minimumInvestmentAmountDaily: "",
    maximumInvestmentAmountDaily: "",
    minInterestRangeMonthly: "",
    maxInterestRangeMonthly: "",
    minimumInvestmentAmountMonthly: "",
    maximumInvestmentAmountMonthly: "",
    minInterestRangeYearly: "",
    maxInterestRangeYearly: "",
    minimumInvestmentAmountYearly: "",
    maximumInvestmentAmountYearly: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      minInterestRangeDaily: "",
      maxInterestRangeDaily: "",
      minimumInvestmentAmountDaily: "",
      maximumInvestmentAmountDaily: "",
      minInterestRangeDaily: "",
      maxInterestRangeDaily: "",
      minimumInvestmentAmountDaily: "",
      maximumInvestmentAmountDaily: "",
      minInterestRangeDaily: "",
      maxInterestRangeDaily: "",
      minimumInvestmentAmountDaily: "",
      maximumInvestmentAmountDaily: "",
    });
    setDisplayDailyForm(false);
    setDisplayMonthlyForm(false);
    setDisplayYearlyForm(false);
    setPayload({});
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    if (name !== "name") {
      // Remove all non-numeric characters except for a dot
      const numericValue = value.replace(/[^0-9.]/g, "");

      // Format the value with commas
      const formattedValue = Number(numericValue).toLocaleString();

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: formattedValue,
      }));
      setPayload((prev) => ({
        ...prev,
        [name]: removeCommasFromNumber(value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setPayload((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const preventMinus = (e) => {
    if (/[^0-9,]/g.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    let data = {
      name: payload?.name,
      interestRateRanges: {
        ...(payload?.minInterestRangeDaily?.length > 0 &&
          payload?.minimumInvestmentAmountDaily?.length > 0 && {
            daily: {
              min: payload?.minInterestRangeDaily,
              max: payload?.maxInterestRangeDaily,
            },
          }),
        ...(payload?.minInterestRangeMonthly?.length > 0 &&
          payload?.minimumInvestmentAmountMonthly?.length > 0 && {
            monthly: {
              min: payload?.minInterestRangeMonthly,
              max: payload?.maxInterestRangeMonthly,
            },
          }),
        ...(payload?.minInterestRangeYearly?.length > 0 &&
          payload?.minimumInvestmentAmountYearly?.length > 0 && {
            annually: {
              min: payload?.minInterestRangeYearly,
              max: payload?.maxInterestRangeYearly,
            },
          }),
      },
      investmentAmountRanges: {
        ...(payload?.minimumInvestmentAmountDaily?.length > 0 &&
          payload?.minInterestRangeDaily?.length > 0 && {
            daily: {
              min: payload?.minimumInvestmentAmountDaily,
              max: payload?.maximumInvestmentAmountDaily,
            },
          }),
        ...(payload?.minimumInvestmentAmountMonthly?.length > 0 &&
          payload?.minInterestRangeMonthly?.length > 0 && {
            monthly: {
              min: payload?.minimumInvestmentAmountMonthly,
              max: payload?.maximumInvestmentAmountMonthly,
            },
          }),
        ...(payload?.minimumInvestmentAmountYearly?.length > 0 &&
          payload?.minInterestRangeYearly?.length > 0 && {
            annually: {
              min: payload?.minimumInvestmentAmountYearly,
              max: payload?.maximumInvestmentAmountYearly,
            },
          }),
      },
    };
    console.log({ data });

    // setPayload(payload);

    dispatch(createInvestmentProduct(data))
      .unwrap()
      .then((response) => {
        // toast.success(response?.message);
        setSuccessName(response?.data?.name);
        setSuccessModal(true);
        resetForm();
        // router.push("/investors");
        // setNewUserId(response?.data?._id);
        setLoading(false);
      })
      .catch((error) => {
        setFailedModalMessage(error?.message);
        setFailedModal(true);
        setLoading(false);
      });

    // setLoading(false);
  };

  console.log({ payload });

  const handleFormDisplay = (e, metric, btn) => {
    let isChecked = e.target.checked
      ? e.target.checked
      : e.target.checked === undefined
      ? btn
      : false;

    if (metric === "daily") {
      setDisplayDailyForm(isChecked);
      if (!isChecked) {
        e.target.checked = false;
        setFormData((prev) => ({
          ...prev,
          minInterestRangeDaily: "",
          maxInterestRangeDaily: "",
          minimumInvestmentAmountDaily: "",
          maximumInvestmentAmountDaily: "",
        }));
        setPayload((prev) => ({
          ...prev,
          minInterestRangeDaily: "",
          maxInterestRangeDaily: "",
          minimumInvestmentAmountDaily: "",
          maximumInvestmentAmountDaily: "",
        }));
      }
      // alert(e.target.checked);
    } else if (metric === "monthly") {
      setDisplayMonthlyForm(isChecked);
      if (!isChecked) {
        e.target.checked = false;
        setFormData((prev) => ({
          ...prev,
          minInterestRangeMonthly: "",
          maxInterestRangeMonthly: "",
          minimumInvestmentAmountMonthly: "",
          maximumInvestmentAmountMonthly: "",
        }));
        setPayload((prev) => ({
          ...prev,
          minInterestRangeMonthly: "",
          maxInterestRangeMonthly: "",
          minimumInvestmentAmountMonthly: "",
          maximumInvestmentAmountMonthly: "",
        }));
      }
    } else {
      setDisplayYearlyForm(isChecked);
      if (!isChecked) {
        e.target.checked = false;
        setFormData((prev) => ({
          ...prev,
          minInterestRangeYearly: "",
          maxInterestRangeYearly: "",
          minimumInvestmentAmountYearly: "",
          maximumInvestmentAmountYearly: "",
        }));
        setPayload((prev) => ({
          ...prev,
          minInterestRangeYearly: "",
          maxInterestRangeYearly: "",
          minimumInvestmentAmountYearly: "",
          maximumInvestmentAmountYearly: "",
        }));
      }
    }
  };

  const removeCommasFromNumber = (numberString) => {
    if (typeof numberString !== "string") {
      numberString = String(numberString);
    }
    return numberString.replace(/,/g, "");
  };

  return (
    <DashboardLayout
      isBackNav={true}
      paths={["Investors", "Create Investment Product"]}
    >
      <ToastContainer />
      <div className="mx-auto w-3/5">
        <h1 className="font-medium text-xl leading-7 text-black py-5">
          Create Investment Product
        </h1>
        <div>
          <div className="w-full">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={displayDailyForm}
                className={"h-5 w-5"}
                onChange={(e) => handleFormDisplay(e, "daily")}
              />
              <div className="">Daily</div>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <input
                type="checkbox"
                className={"h-5 w-5"}
                checked={displayMonthlyForm}
                onChange={(e) => handleFormDisplay(e, "monthly")}
              />
              <div className="">Monthly</div>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <input
                type="checkbox"
                className={"h-5 w-5"}
                checked={displayYearlyForm}
                onChange={(e) => handleFormDisplay(e, "yearly")}
              />
              <div className="">Yearly</div>
            </div>
          </div>
        </div>
        <div>
          <div className="mt-5">
            <InputField
              name={"name"}
              label={"Product Name"}
              placeholder={"Enter product name"}
              required={true}
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          {displayDailyForm === true && (
            <div>
              <p className="mt-8 text-black">Daily</p>

              <div className="my-5 flex justify-between gap-4">
                <div className="w-full">
                  <InputField
                    required={true}
                    name="minInterestRangeDaily"
                    // inputType="number"
                    onKeyPress={preventMinus}
                    onWheel={() => document.activeElement.blur()}
                    activeBorderColor="border-swBlue"
                    label={"Interest rate range"}
                    endIcon={"%"}
                    value={formData.minInterestRangeDaily}
                    placeholder={"Minimum rate"}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mt-10">
                  <AiOutlineMinus className="text-swGray" size={20} />
                </div>
                <div className="w-full mt-7">
                  <InputField
                    required={true}
                    name="maxInterestRangeDaily"
                    // inputType="number"
                    onKeyPress={preventMinus}
                    onWheel={() => document.activeElement.blur()}
                    activeBorderColor="border-swBlue"
                    endIcon={"%"}
                    value={formData.maxInterestRangeDaily}
                    placeholder={"Maximum rate"}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="my-5 flex justify-between gap-4">
                <div className="w-full">
                  <InputField
                    required={true}
                    name="minimumInvestmentAmountDaily"
                    label={"Investment amount range"}
                    onKeyPress={preventMinus}
                    onWheel={() => document.activeElement.blur()}
                    activeBorderColor="border-swBlue"
                    endIcon={"NGN"}
                    value={formData.minimumInvestmentAmountDaily}
                    placeholder={"Minimum amount"}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mt-10">
                  <AiOutlineMinus className="text-swGray" size={20} />
                </div>
                <div className="w-full">
                  <InputField
                    required={true}
                    name="maximumInvestmentAmountDaily"
                    label={"Investment amount range"}
                    onKeyPress={preventMinus}
                    onWheel={() => document.activeElement.blur()}
                    activeBorderColor="border-swBlue"
                    endIcon={"NGN"}
                    value={formData.maximumInvestmentAmountDaily}
                    placeholder={"Minimum amount"}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <FaRegTrashAlt
                  size={20}
                  className="cursor-pointer"
                  onClick={(e) => handleFormDisplay(e, "daily", false)}
                />
              </div>
            </div>
          )}
          {displayMonthlyForm === true && (
            <div>
              <p className="mt-8 text-black">Monthly</p>

              <div className="my-5 flex justify-between gap-4">
                <div className="w-full">
                  <InputField
                    required={true}
                    name="minInterestRangeMonthly"
                    // inputType="number"
                    onKeyPress={preventMinus}
                    onWheel={() => document.activeElement.blur()}
                    activeBorderColor="border-swBlue"
                    label={"Interest rate range"}
                    endIcon={"%"}
                    value={formData.minInterestRangeMonthly}
                    placeholder={"Minimum rate"}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mt-10">
                  <AiOutlineMinus className="text-swGray" size={20} />
                </div>
                <div className="w-full mt-7">
                  <InputField
                    required={true}
                    name="maxInterestRangeMonthly"
                    // inputType="number"
                    onKeyPress={preventMinus}
                    endIcon={"%"}
                    onWheel={() => document.activeElement.blur()}
                    activeBorderColor="border-swBlue"
                    value={formData.maxInterestRangeMonthly}
                    placeholder={"Maximum rate"}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="my-5 flex justify-between gap-4">
                <div className="w-full">
                  <InputField
                    required={true}
                    name="minimumInvestmentAmountMonthly"
                    label={"Investment amount range"}
                    onKeyPress={preventMinus}
                    onWheel={() => document.activeElement.blur()}
                    activeBorderColor="border-swBlue"
                    endIcon={"NGN"}
                    value={formData.minimumInvestmentAmountMonthly}
                    placeholder={"Minimum amount"}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mt-10">
                  <AiOutlineMinus className="text-swGray" size={20} />
                </div>
                <div className="w-full">
                  <InputField
                    required={true}
                    name="maximumInvestmentAmountMonthly"
                    label={"Investment amount range"}
                    onKeyPress={preventMinus}
                    onWheel={() => document.activeElement.blur()}
                    activeBorderColor="border-swBlue"
                    endIcon={"NGN"}
                    value={formData.maximumInvestmentAmountMonthly}
                    placeholder={"Minimum amount"}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <FaRegTrashAlt
                  size={20}
                  className="cursor-pointer"
                  onClick={(e) => handleFormDisplay(e, "monthly", false)}
                />
              </div>
            </div>
          )}
          {displayYearlyForm === true && (
            <div>
              <p className="mt-8 text-black">Yearly</p>

              <div className="my-5 flex justify-between gap-4">
                <div className="w-full">
                  <InputField
                    required={true}
                    name="minInterestRangeYearly"
                    // inputType="number"
                    onKeyPress={preventMinus}
                    onWheel={() => document.activeElement.blur()}
                    activeBorderColor="border-swBlue"
                    label={"Interest rate range"}
                    value={formData.minInterestRangeYearly}
                    placeholder={"Minimum rate"}
                    endIcon={"%"}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mt-10">
                  <AiOutlineMinus className="text-swGray" size={20} />
                </div>
                <div className="w-full mt-7">
                  <InputField
                    required={true}
                    name="maxInterestRangeYearly"
                    // inputType="number"
                    onKeyPress={preventMinus}
                    onWheel={() => document.activeElement.blur()}
                    activeBorderColor="border-swBlue"
                    value={formData.maxInterestRangeYearly}
                    placeholder={"Maximum rate"}
                    endIcon={"%"}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="my-5 flex justify-between gap-4">
                <div className="w-full">
                  <InputField
                    required={true}
                    name="minimumInvestmentAmountYearly"
                    label={"Investment amount range"}
                    onKeyPress={preventMinus}
                    onWheel={() => document.activeElement.blur()}
                    activeBorderColor="border-swBlue"
                    endIcon={"NGN"}
                    value={formData.minimumInvestmentAmountYearly}
                    placeholder={"Minimum amount"}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mt-10">
                  <AiOutlineMinus className="text-swGray" size={20} />
                </div>
                <div className="w-full">
                  <InputField
                    required={true}
                    name="maximumInvestmentAmountYearly"
                    label={"Investment amount range"}
                    onKeyPress={preventMinus}
                    onWheel={() => document.activeElement.blur()}
                    activeBorderColor="border-swBlue"
                    endIcon={"NGN"}
                    value={formData.maximumInvestmentAmountYearly}
                    placeholder={"Minimum amount"}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <FaRegTrashAlt
                  size={20}
                  className="cursor-pointer"
                  onClick={(e) => handleFormDisplay(e, "yearly", false)}
                />
              </div>
            </div>
          )}

          <div className="flex justify-center my-20">
            <EditableButton
              disabled={loading}
              blueBtn={true}
              onClick={handleSubmit}
              className="rounded-md"
              label={"Create investment product"}
            />
          </div>
        </div>
      </div>
      <SuccessModal
        isOpen={successModal}
        title={"Product creation Successful"}
        description={`${successName} has been created successfully`}
        // noButtons={true}
        btnLeft={"Investment products"}
        btnLeftFunc={() => router.push("/investors")}
        btnRight={"Create Product"}
        btnRightFunc={() => setSuccessModal(false)}
        onClose={() => setSuccessModal(false)}
      />
      <CancelModal
        isOpen={failedModal}
        description={`${failedModalMessage}`}
        title={"Product Creation Failed"}
        // noButtons={true}
        noButtons={true}
        onClose={() => setFailedModal(false)}
      />
    </DashboardLayout>
  );
};

export default CreateInvestmentProduct;
