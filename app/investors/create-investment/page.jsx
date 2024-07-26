"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import InputField from "@/app/components/shared/input/InputField";
import SelectField from "@/app/components/shared/input/SelectField";
import SharedInvestmentModal from "@/app/components/modals/Investments/SharedInvestmentModal";
import { useDispatch, useSelector } from "react-redux";
import {
  createInvestment,
  getAllInvestmentProducts,
  getAllInvestors,
  getROI,
} from "@/redux/slices/investmentSlice";
import SuccessModal from "@/app/components/modals/SuccessModal";
import CancelModal from "@/app/components/modals/CancelModal";
import EditableButton from "@/app/components/shared/editableButtonComponent/EditableButton";
import { useRouter } from "next/navigation";
import { LuPaperclip } from "react-icons/lu";
import { FiTrash } from "react-icons/fi";

const CreateInvestment = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isPreviewOpen, setPreview] = useState(false);
  const [investors, setInvestors] = useState([]);
  const [investmentPlans, setInvestmentPlans] = useState([]);
  const [successModal, setSuccessModal] = useState(false);
  const [successModalMessage, setSuccessModalMessage] = useState("");
  const [failedModal, setFailedModal] = useState(false);
  const [failedModalMessage, setFailedModalMessage] = useState("");
  const [fileError, setFileError] = useState("");
  const [loading, setLoading] = useState(false);
  const [expectedROI, setExpectedROI] = useState(null);
  const [payloadData, setPayloadData] = useState({});
  const [proofOfPayment, setProofOfPayment] = useState([]);
  const [investmentProducts, setInvestmentProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [prodRange, setProdRange] = useState({ min: 0, max: 0 });
  const [formData, setFormData] = useState({
    investorProfile: "",
    investmentProduct: "",
    durationMetric: "",
    durationValue: "",
    initialInvestmentPrincipal: "",
    interestRateMetric: "",
    interestRateValue: "",
  });
  const { data } = useSelector((state) => state.investment);

  // const interestDurationOpt = [
  //   { value: "daily", label: "Daily" },
  //   { value: "monthly", label: "Monthly" },
  //   { value: "annually", label: "Annually" },
  // ];
  const interestDurationOpt = selectedProduct?.interestRateRanges
    ? Object.keys(selectedProduct.interestRateRanges).map((key) => ({
        value: key,
        label: key.charAt(0).toUpperCase() + key.slice(1),
      }))
    : [];

  const durationOpt = [
    { value: "Month", label: "Month" },
    { value: "Quarter", label: "Quarter" },
    { value: "Annual", label: "Annual" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/[^0-9.]/g, "");
    // const formattedValue = Number(numericValue).toLocaleString();

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]:
        name === "interestRateValue"
          ? value
          : Number(numericValue).toLocaleString(),
    }));
    setPayloadData((prevFormData) => ({
      ...prevFormData,
      [name]:
        name === "interestRateValue" ? value : removeCommasFromNumber(value),
    }));
  };

  const resetFormField = () => {
    setFormData({
      investorProfile: "",
      investmentProduct: "",
      durationMetric: "",
      durationValue: "",
      initialInvestmentPrincipal: "",
      interestRateMetric: "",
      interestRateValue: "",
    });
    setPayloadData({});
  };

  const handleSelectChange = (selectedOption, name) => {
    setFormData({
      ...formData,
      [name]: selectedOption.value,
    });
    setPayloadData({
      ...formData,
      [name]: selectedOption.value,
    });

    if (name === "investmentProduct") {
      const selected = investmentProducts.find(
        (e) => e._id === selectedOption.value
      );
      setSelectedProduct(selected);
    }
  };

  const removeCommasFromNumber = (numberString) => {
    if (typeof numberString !== "string") {
      // Convert to string or handle the case appropriately
      numberString = String(numberString);
    }
    return numberString.replace(/,/g, "");
  };

  const handleSubmit = () => {
    if (
      formData?.interestRateValue < prodRange?.min ||
      formData?.interestRateValue > prodRange?.max
    ) {
      setFailedModalMessage(
        `Interest rate cannot be less than ${prodRange?.min}% or more than ${prodRange?.max}%`
      );
      setFailedModal(true);
      return null;
    }
    const x = JSON.stringify({
      metric: payloadData.interestRateMetric,
      value: Number(payloadData.interestRateValue),
    });

    const y = JSON.stringify({
      metric: payloadData.durationMetric,
      value: Number(payloadData.durationValue),
    });

    // console.log(x);
    // console.log(y);

    const _formData = new FormData();
    _formData.append("investorProfile", payloadData.investorProfile);
    _formData.append("investmentProduct", payloadData.investmentProduct);
    _formData.append("duration", y);
    _formData.append(
      "initialInvestmentPrincipal",
      Number(payloadData.initialInvestmentPrincipal)
    );
    _formData.append("interestRate", x);
    _formData.append("paymentReceipt", proofOfPayment[0]);

    setLoading(true);

    dispatch(createInvestment(_formData))
      .unwrap()
      .then((res) => {
        setSuccessModalMessage(res?.message);
        setSuccessModal(true);
        resetFormField();
        setLoading(false);
      })
      .catch((err) => {
        setFailedModalMessage(err?.message || err?.error);
        setFailedModal(true);
        setLoading(false);
      });
  };

  const preventMinus = (e) => {
    if (/[^0-9,.]/g.test(e.key)) {
      e.preventDefault();
    }
  };

  const uploadProofOfPayment = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length <= 2) {
      setProofOfPayment(files);
    } else {
      alert("You can only upload a maximum of 2 files.");
    }
  };

  const handleUploadProofOfPayment = (e) => {
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
      setProofOfPayment(files);
    }
  };

  const handleFileDelete = (index) => {
    proofOfPayment.splice(index, 1);
    setProofOfPayment([...proofOfPayment]);
  };

  const modalChildren = (
    <>
      <div className="px-5 pb-10">
        <InputField
          required={true}
          disabled={true}
          label={"ROI"}
          placeholder={"System returns the roi"}
        />
      </div>
    </>
  );

  useEffect(() => {
    dispatch(getAllInvestors())
      .unwrap()
      .then((res) => {
        const data = res?.data?.investorProfiles.map((item) => ({
          label: `${item?.firstName} ${item?.lastName} ${item?.investorId} `,
          value: item?._id,
        }));
        setInvestors(data);
      })
      .catch((err) => console.log(err));
    dispatch(getAllInvestmentProducts())
      .unwrap()
      .then((res) => {
        const data = res?.data?.investmentProducts.map((item) => ({
          label: item?.name,
          value: item?._id,
        }));
        setInvestmentPlans(data);
        setInvestmentProducts(res?.data?.investmentProducts);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (payloadData?.initialInvestmentPrincipal?.length > 3) {
      const payload = {
        duration: {
          metric: payloadData.durationMetric,
          value: Number(payloadData.durationValue),
        },
        initialInvestmentPrincipal: Number(
          payloadData.initialInvestmentPrincipal
        ),
        interestRate: {
          metric: payloadData.interestRateMetric,
          value: Number(payloadData.interestRateValue),
        },
      };

      dispatch(getROI(payload))
        .unwrap()
        .then((res) => {
          setExpectedROI(Number(res?.data?.expectedInterest).toLocaleString());
        })
        .catch((err) => {
          console.log("roi", err);
        });
    } else {
      setExpectedROI(null);
    }
  }, [
    payloadData?.initialInvestmentPrincipal,
    payloadData?.durationValue,
    payloadData?.interestRateValue,
  ]);

  useEffect(() => {
    setProdRange({
      min: selectedProduct?.interestRateRanges?.[formData?.interestRateMetric]
        ?.min,
      max: selectedProduct?.interestRateRanges?.[formData?.interestRateMetric]
        ?.max,
    });
  }, [formData?.interestRateMetric, formData?.investmentProduct]);

  return (
    <DashboardLayout isBackNav={true} paths={["Investors", "New investment"]}>
      <div className="mx-auto w-full px-5 lg:px-1 lg:w-3/5 mb-28">
        <h1 className="font-medium text-xl leading-7 text-black py-5">
          Create New Investment
        </h1>
        <h5 className="font-medium leading-5 text-sm text-swBlack mt-5 mb-8">
          Enter investment details
        </h5>

        <div>
          <SelectField
            name={"investorProfile"}
            label={"Select investor"}
            required={true}
            value={
              investors.find(
                (item) => item.value === formData.investorProfile
              ) || ""
            }
            placeholder={"Select from list"}
            optionValue={investors}
            onChange={(e) => handleSelectChange(e, "investorProfile")}
            isSearchable={true}
          />
        </div>
        <div className="my-6">
          <SelectField
            name={"investmentProduct"}
            label={"Investment Plan"}
            required={true}
            value={
              investmentPlans.find(
                (item) => item.value === formData.investmentProduct
              ) || ""
            }
            placeholder={"Select plan"}
            optionValue={investmentPlans}
            onChange={(e) => handleSelectChange(e, "investmentProduct")}
          />
        </div>
        <div>
          <div className="flex justify-between gap-4 mt-7">
            <div className="w-1/2">
              <SelectField
                name={"interestRateMetric"}
                label={"Interest rate metrics"}
                required={true}
                value={
                  interestDurationOpt.find(
                    (item) => item.value === formData.interestRateMetric
                  ) || ""
                }
                optionValue={interestDurationOpt}
                onChange={(e) => handleSelectChange(e, "interestRateMetric")}
              />
            </div>
            <div className="w-full mt-7">
              <InputField
                name={"interestRateValue"}
                value={formData?.interestRateValue}
                placeholder={"Enter number"}
                required={true}
                inputType="number"
                onWheel={() => document.activeElement.blur()}
                endIcon={"%"}
                onKeyPress={preventMinus}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <p
            className={`${
              (formData?.interestRateValue < prodRange?.min ||
                formData?.interestRateValue > prodRange?.max) &&
              "text-red-500"
            } text-xs`}
          >
            {formData?.interestRateValue < prodRange?.min
              ? `Interest rate cannot be less than ${prodRange?.min}%`
              : formData?.interestRateValue > prodRange?.max
              ? `Interest rate cannot be more than ${prodRange?.max}%`
              : `min = ${prodRange?.min || 0}% and max = ${
                  prodRange?.max || 0
                }%`}
          </p>
        </div>

        <div className="flex justify-between gap-4 my-7">
          <div className="w-1/2">
            <SelectField
              name={"durationMetric"}
              label={"Duration"}
              required={true}
              value={
                durationOpt.find(
                  (item) => item.value === formData.durationMetric
                ) || ""
              }
              optionValue={durationOpt}
              onChange={(e) => handleSelectChange(e, "durationMetric")}
            />
          </div>
          <div className="w-full mt-7">
            <InputField
              name={"durationValue"}
              value={formData?.durationValue}
              placeholder={"Enter number"}
              required={true}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="my-7">
          <InputField
            name={"initialInvestmentPrincipal"}
            value={formData?.initialInvestmentPrincipal}
            label={"Investment amount"}
            placeholder={"Enter amount invested"}
            required={true}
            endIcon={"₦"}
            onChange={handleInputChange}
          />
        </div>

        <div className="my-7">
          <InputField
            disabled={true}
            name={"roiEstimate"}
            label={"ROI Estimate"}
            value={expectedROI || ""}
            placeholder={"System generated"}
            required={true}
          />
        </div>

        <div className="my-7">
          <div
            className="text-center w-full"
            onDrop={uploadProofOfPayment}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="w-full border-dotted border-[2px] rounded-3xl bg-pharmaGray pt-2 pb-2 text-swBlack">
              <input
                type="file"
                id="fileInput"
                className="hidden"
                accept=".pdf, .jpg, .png, .jpeg"
                onChange={handleUploadProofOfPayment}
              />

              <p className="mt-10 text-sm font-medium">
                Upload Proof of Payment(Optional)
              </p>

              <p className="text-xs">Max file size: 3mb</p>

              <label
                htmlFor="fileInput"
                className="cursor-pointer flex gap-2 itwms-center p-2 rounded-md bg-swBlue text-white font-medium w-fit mx-auto mt-5 mb-3 text-sm"
              >
                <LuPaperclip size={16} />
                {proofOfPayment.length > 0 ? "Change file" : "Upload file"}
              </label>
            </div>
          </div>
          {proofOfPayment.length > 0 && (
            <div className="mt-5">
              <ul className="">
                {proofOfPayment.map((file, index) => (
                  <li
                    key={index}
                    className="my-2 bg-white flex rounded-md border"
                  >
                    <div className="flex gap-3 items-center p-2 pl-2 text-sm">
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
        </div>

        <div className="flex justify-center gap-2">
          <EditableButton
            label={"Create Investment"}
            blueBtn={true}
            onClick={handleSubmit}
            disabled={Object.values(formData).some((e) => e === "") || loading}
          />
        </div>
      </div>

      <SharedInvestmentModal
        css={"max-w-sm"}
        header={"Preview ROI"}
        children={modalChildren}
        isOpen={isPreviewOpen}
        onClose={setPreview}
      />
      <SuccessModal
        isOpen={successModal}
        description={successModalMessage}
        title={"Investment Created Successfully"}
        // noButtons={true}
        btnLeft={"View Investments"}
        btnLeftFunc={() => router.push("/investors")}
        btnRight={"Edit"}
        btnRightFunc={() => setSuccessModal(false)}
        onClose={() => setSuccessModal(false)}
      />
      <CancelModal
        isOpen={failedModal}
        description={`${failedModalMessage}`}
        title={"Investment Creation Failed"}
        // noButtons={true}
        noButtons={true}
        onClose={() => setFailedModal(false)}
      />
    </DashboardLayout>
  );
};

export default CreateInvestment;
