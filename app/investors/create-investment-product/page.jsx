"use client";
import DashboardLayout from "../../components/dashboardLayout/DashboardLayout";
import InputField from "../../components/shared/input/InputField";
import { AiOutlineMinus } from "react-icons/ai";
import { useState } from "react";
import EditableButton from "@/app/components/shared/editableButtonComponent/EditableButton";
import { createInvestmentProduct } from "@/redux/slices/investmentSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import SuccessModal from "@/app/components/modals/SuccessModal";
import CancelModal from "@/app/components/modals/CancelModal";

const CreateInvestmentProduct = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [displayDailyForm, setDisplayDailyForm] = useState(false);
  const [displayMonthlyForm, setDisplayMonthlyForm] = useState(false);
  const [displayYearlyForm, setDisplayYearlyForm] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [failedModal, setFailedModal] = useState(false);
  const [successModalData, setSuccessModalData] = useState({});
  const [errorModalData, setErrorModalData] = useState({});
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
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/[^0-9.]/g, "");   // Remove all non-numeric characters except for a dot
    const formattedValue = Number(numericValue).toLocaleString();

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: formattedValue,
    }));
  };


  const preventMinus = (e) => {
    if (/[^0-9,.]/g.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    let payload = {
      name: formData.name,
      interestRateRanges: {
        ...(displayYearlyForm && {
          daily: {
            min: Number(removeCommasFromNumber(formData.minInterestRangeDaily)),
            max: Number(removeCommasFromNumber(formData.maxInterestRangeDaily)),
          },
        }),
        ...(displayMonthlyForm && {
          monthly: {
            min: Number(removeCommasFromNumber(formData.minInterestRangeMonthly)),
            max: Number(removeCommasFromNumber(formData.maxInterestRangeMonthly)),
          },
        }),
        ...(displayDailyForm && {
          annually: {
            min: Number(removeCommasFromNumber(formData.minInterestRangeYearly)),
            max: Number(removeCommasFromNumber(formData.maxInterestRangeYearly)),
          },
        }),
      },
      investmentAmountRanges: {
        ...(displayDailyForm && {
          daily: {
            min: Number(removeCommasFromNumber(formData.minimumInvestmentAmountDaily)),
            max: Number(removeCommasFromNumber(formData.maximumInvestmentAmountDaily)),
          },
        }),
        ...(displayMonthlyForm && {
          monthly: {
            min: Number(removeCommasFromNumber(formData.minimumInvestmentAmountMonthly)),
            max: Number(removeCommasFromNumber(formData.maximumInvestmentAmountMonthly)),
          },
        }),
        ...(displayYearlyForm && {
          annually: {
            min: Number(removeCommasFromNumber(formData.minimumInvestmentAmountYearly)),
            max: Number(removeCommasFromNumber(formData.maximumInvestmentAmountYearly)),
          },
        }),
      },
    };
    dispatch(createInvestmentProduct(payload))
      .unwrap()
      .then((response) => {
        setSuccessModalData({
          title: "Investment Product Created Successfully",
          description: response?.message,
          btnLeft: "View Products",
          btnRight: "Close",
          btnRightFunc: () => {
            setSuccessModalData({});
            setSuccessModal(false);
          },
        });
      });

    dispatch(createInvestmentProduct(payload))
      .unwrap()
      .then((response) => {
        setSuccessModalData({
          title: "Investor created Successfully",
          description: response?.message,
          btnLeft: "View Products",
          btnRight: "Close",
          btnRightFunc: () => {
            setSuccessModalData({});
            setSuccessModal(false);
          },
        });
        setSuccessModal(true);
        resetForm();
      })
      .catch((error) => {
        setErrorModalData({
          description: error?.message,
        });
        setFailedModal(true);
        setLoading(false);
      });
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
            <div className="flex gap-3">
              <InputField
                required={true}
                // name="minInterestRange"
                inputType="checkbox"
                // onKeyPress={preventMinus}
                // onWheel={() => document.activeElement.blur()}
                activeBorderColor="border-swBlue"
                // value={formData.minInterestRange}
                // placeholder={"Minimum rate"}
                onChange={() => setDisplayDailyForm(!displayDailyForm)}
              />
              <div className="mt-2">Daily</div>
            </div>
            <div className="flex gap-3">
              <InputField
                required={true}
                // name="minInterestRange"
                inputType="checkbox"
                // onKeyPress={preventMinus}
                // onWheel={() => document.activeElement.blur()}
                // activeBorderColor="border-swBlue"
                // value={formData.}
                // placeholder={"Minimum rate"}
                onChange={() => setDisplayMonthlyForm(!displayMonthlyForm)}
              />
              <div className="mt-2">Monthly</div>
            </div>
            <div className="flex gap-3">
              <InputField
                required={true}
                // name="minInterestRange"
                inputType="checkbox"
                // onKeyPress={preventMinus}
                // onWheel={() => document.activeElement.blur()}
                // activeBorderColor="border-swBlue"
                // value={formData.minInterestRange}
                // placeholder={"Minimum rate"}
                onChange={() => setDisplayYearlyForm(!displayYearlyForm)}
              />
              <div className="mt-2">Yearly</div>
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
              onChange={e => setFormData((prev) => ({ ...prev, ["name"]: e.target.value }))}
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
                    onKeyPress={preventMinus}
                    onWheel={() => document.activeElement.blur()}
                    activeBorderColor="border-swBlue"
                    label={"Interest rate range"}
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
                    onKeyPress={preventMinus}
                    onWheel={() => document.activeElement.blur()}
                    activeBorderColor="border-swBlue"
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
                    placeholder={"Maximum amount"}
                    onChange={handleInputChange}
                  />
                </div>
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
                    onKeyPress={preventMinus}
                    onWheel={() => document.activeElement.blur()}
                    activeBorderColor="border-swBlue"
                    label={"Interest rate range"}
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
                    onKeyPress={preventMinus}
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
                    placeholder={"Maximum amount"}
                    onChange={handleInputChange}
                  />
                </div>
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
                    onKeyPress={preventMinus}
                    onWheel={() => document.activeElement.blur()}
                    activeBorderColor="border-swBlue"
                    label={"Interest rate range"}
                    value={formData.minInterestRangeYearly}
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
                    name="maxInterestRangeYearly"
                    onKeyPress={preventMinus}
                    onWheel={() => document.activeElement.blur()}
                    activeBorderColor="border-swBlue"
                    value={formData.maxInterestRangeYearly}
                    placeholder={"Maximum rate"}
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
                    placeholder={"Maximum amount"}
                    onChange={handleInputChange}
                  />
                </div>
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
    </DashboardLayout>
  );
};

export default CreateInvestmentProduct;
