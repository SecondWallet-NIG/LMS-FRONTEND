"use client";
import DashboardLayout from "../../../../components/dashboardLayout/DashboardLayout";
import InputField from "../../../../components/shared/input/InputField";
import { AiOutlineMinus } from "react-icons/ai";
import { useEffect, useState } from "react";
import EditableButton from "@/app/components/shared/editableButtonComponent/EditableButton";
import SuccessModal from "@/app/components/modals/SuccessModal";
import {
  getSingleInvestmentProduct,
  updateProduct,
} from "@/redux/slices/investmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import { FaRegTrashAlt } from "react-icons/fa";
import CancelModal from "@/app/components/modals/CancelModal";

const EditInvestmentProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [displayDailyForm, setDisplayDailyForm] = useState(false);
  const [displayMonthlyForm, setDisplayMonthlyForm] = useState(false);
  const [displayYearlyForm, setDisplayYearlyForm] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [failedModal, setFailedModal] = useState(false);
  const [failedModalMessage, setFailedModalMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    minInterestRangeDaily: 0,
    maxInterestRangeDaily: 0,
    minimumInvestmentAmountDaily: "",
    maximumInvestmentAmountDaily: "",
    minInterestRangeMonthly: 0,
    maxInterestRangeMonthly: 0,
    minimumInvestmentAmountMonthly: "",
    maximumInvestmentAmountMonthly: "",
    minInterestRangeYearly: 0,
    maxInterestRangeYearly: 0,
    minimumInvestmentAmountYearly: "",
    maximumInvestmentAmountYearly: "",
  });
  const { data } = useSelector((state) => state.investment);

  const resetForm = () => {
    setFormData({
      name: "",
      minInterestRangeDaily: 0,
      maxInterestRangeDaily: 0,
      minimumInvestmentAmountDaily: "",
      maximumInvestmentAmountDaily: "",
      minInterestRangeMonthly: 0,
      maxInterestRangeMonthly: 0,
      minimumInvestmentAmountMonthly: "",
      maximumInvestmentAmountMonthly: "",
      minInterestRangeYearly: 0,
      maxInterestRangeYearly: 0,
      minimumInvestmentAmountYearly: "",
      maximumInvestmentAmountYearly: "",
    });
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    if (
      name !== "name" &&
      name !== "minInterestRangeDaily" &&
      name !== "maxInterestRangeDaily" &&
      name !== "minInterestRangeMonthly" &&
      name !== "maxInterestRangeMonthly" &&
      name !== "minInterestRangeYearly" &&
      name !== "maxInterestRangeYearly"
    ) {
      // Remove all non-numeric characters except for a dot
      const numericValue = value.replace(/[^0-9.]/g, "");

      // Format the value with commas
      const formattedValue = Number(numericValue).toLocaleString();

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: formattedValue,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const preventMinus = (e) => {
    if (/[^0-9,.]/g.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    let data = {
      name: formData?.name,
      interestRateRanges: {
        ...(formData?.minInterestRangeDaily > 0 &&
          formData?.minimumInvestmentAmountDaily?.length > 0 && {
            daily: {
              min: Number(formData?.minInterestRangeDaily),
              max: Number(formData?.maxInterestRangeDaily),
            },
          }),
        ...(formData?.minInterestRangeMonthly > 0 &&
          formData?.minimumInvestmentAmountMonthly?.length > 0 && {
            monthly: {
              min: Number(formData?.minInterestRangeMonthly),
              max: Number(formData?.maxInterestRangeMonthly),
            },
          }),
        ...(formData?.minInterestRangeYearly > 0 &&
          formData?.minimumInvestmentAmountYearly?.length > 0 && {
            annually: {
              min: Number(formData?.minInterestRangeYearly),
              max: Number(formData?.maxInterestRangeYearly),
            },
          }),
      },
      investmentAmountRanges: {
        ...(formData?.minimumInvestmentAmountDaily?.length > 0 &&
          formData?.minInterestRangeDaily > 0 && {
            daily: {
              min: Number(
                removeCommasFromNumber(formData?.minimumInvestmentAmountDaily)
              ),
              max: Number(
                removeCommasFromNumber(formData?.maximumInvestmentAmountDaily)
              ),
            },
          }),
        ...(formData?.minimumInvestmentAmountMonthly?.length > 0 &&
          formData?.minInterestRangeMonthly > 0 && {
            monthly: {
              min: Number(
                removeCommasFromNumber(formData?.minimumInvestmentAmountMonthly)
              ),
              max: Number(
                removeCommasFromNumber(formData?.maximumInvestmentAmountMonthly)
              ),
            },
          }),
        ...(formData?.minimumInvestmentAmountYearly?.length > 0 &&
          formData?.minInterestRangeYearly > 0 && {
            annually: {
              min: Number(
                removeCommasFromNumber(formData?.minimumInvestmentAmountYearly)
              ),
              max: Number(
                removeCommasFromNumber(formData?.maximumInvestmentAmountYearly)
              ),
            },
          }),
      },
    };

    dispatch(updateProduct({ id, formData: data }))
      .unwrap()
      .then((response) => {
        resetForm();
        setSuccessModal(true);
        dispatch(getSingleInvestmentProduct(id));
      })
      .catch((error) => {
        setFailedModal(true);
        setFailedModalMessage(error?.message);
        setLoading(false);
      });
  };

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
      }
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
      }
    }
  };

  const removeCommasFromNumber = (numberString) => {
    if (typeof numberString !== "string") {
      numberString = String(numberString);
    }
    return numberString.replace(/,/g, "");
  };

  useEffect(() => {
    dispatch(getSingleInvestmentProduct(id));
  }, []);

  useEffect(() => {
    if (data) {
      setFormData((prev) => ({
        ...prev,
        name: data?.data?.name,
        ...(data?.data?.interestRateRanges?.daily?.min && {
          minInterestRangeDaily:
            data?.data?.interestRateRanges?.daily?.min?.toLocaleString(),
        }),
        ...(data?.data?.interestRateRanges?.daily?.max && {
          maxInterestRangeDaily:
            data?.data?.interestRateRanges?.daily?.max?.toLocaleString(),
        }),
        ...(data?.data?.interestRateRanges?.monthly?.min && {
          minInterestRangeMonthly:
            data?.data?.interestRateRanges?.monthly?.min?.toLocaleString(),
        }),
        ...(data?.data?.interestRateRanges?.monthly?.max && {
          maxInterestRangeMonthly:
            data?.data?.interestRateRanges?.monthly?.max?.toLocaleString(),
        }),
        ...(data?.data?.interestRateRanges?.annually?.min && {
          minInterestRangeYearly:
            data?.data?.interestRateRanges?.annually?.min?.toLocaleString(),
        }),
        ...(data?.data?.interestRateRanges?.annually?.max && {
          maxInterestRangeYearly:
            data?.data?.interestRateRanges?.annually?.max?.toLocaleString(),
        }),
        ...(data?.data?.investmentAmountRanges?.daily?.min && {
          minimumInvestmentAmountDaily:
            data?.data?.investmentAmountRanges?.daily?.min?.toLocaleString(),
        }),
        ...(data?.data?.investmentAmountRanges?.daily?.max && {
          maximumInvestmentAmountDaily:
            data?.data?.investmentAmountRanges?.daily?.max?.toLocaleString(),
        }),
        ...(data?.data?.investmentAmountRanges?.monthly?.min && {
          minimumInvestmentAmountMonthly:
            data?.data?.investmentAmountRanges?.monthly?.min?.toLocaleString(),
        }),
        ...(data?.data?.investmentAmountRanges?.monthly?.max && {
          maximumInvestmentAmountMonthly:
            data?.data?.investmentAmountRanges?.monthly?.max?.toLocaleString(),
        }),
        ...(data?.data?.investmentAmountRanges?.annually?.min && {
          minimumInvestmentAmountYearly:
            data?.data?.investmentAmountRanges?.annually?.min?.toLocaleString(),
        }),
        ...(data?.data?.investmentAmountRanges?.annually?.max && {
          maximumInvestmentAmountYearly:
            data?.data?.investmentAmountRanges?.annually?.max?.toLocaleString(),
        }),
      }));
    }
    if (
      data?.data?.interestRateRanges?.daily?.min &&
      data?.data?.investmentAmountRanges?.daily?.min
    ) {
      setDisplayDailyForm(true);
    }
    if (
      data?.data?.interestRateRanges?.monthly?.min &&
      data?.data?.investmentAmountRanges?.monthly?.min
    ) {
      setDisplayMonthlyForm(true);
    }
    if (
      data?.data?.interestRateRanges?.annually?.min &&
      data?.data?.investmentAmountRanges?.annually?.min
    ) {
      setDisplayYearlyForm(true);
    }
  }, [data]);

  return (
    <DashboardLayout
      isBackNav={true}
      paths={["Investors", "View Investment Product", "Edit Product"]}
    >
      <ToastContainer />
      <div className="mx-auto w-3/5">
        <h1 className="font-medium text-xl leading-7 text-black py-5">
          Edit Product
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
                    onKeyPress={preventMinus}
                    inputType="number"
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
                    onKeyPress={preventMinus}
                    inputType="number"
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
                    placeholder={"Maximum amount"}
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
                    onKeyPress={preventMinus}
                    inputType="number"
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
                    onKeyPress={preventMinus}
                    inputType="number"
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
                    placeholder={"Maximum amount"}
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
                    onKeyPress={preventMinus}
                    inputType="number"
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
                    onKeyPress={preventMinus}
                    inputType="number"
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
                    placeholder={"Maximum amount"}
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
              label={"Update Product"}
            />
          </div>
        </div>
      </div>
      <SuccessModal
        isOpen={successModal}
        description={`${data?.data?.name} has been updated successfully`}
        title={"Update Successful"}
        // noButtons={true}
        btnLeft={"Investment products"}
        btnLeftFunc={() => router.push("/investors")}
        btnRight={"Edit"}
        btnRightFunc={() => setSuccessModal(false)}
        onClose={() => setSuccessModal(false)}
      />
      <CancelModal
        isOpen={failedModal}
        description={`${failedModalMessage}`}
        title={"Update Failed"}
        // noButtons={true}
        noButtons={true}
        onClose={() => setFailedModal(false)}
      />
    </DashboardLayout>
  );
};

export default EditInvestmentProduct;
