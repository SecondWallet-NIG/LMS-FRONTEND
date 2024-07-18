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
  const [loading, setLoading] = useState(false);
  const [expectedROI, setExpectedROI] = useState(null);
  const [payloadData, setPayloadData] = useState({});
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

  const interestDurationOpt = [
    { value: "daily", label: "Daily" },
    { value: "monthly", label: "Monthly" },
    { value: "annually", label: "Annually" },
  ];

  const durationOpt = [
    { value: "Month", label: "Month" },
    { value: "Quarter", label: "Quarter" },
    { value: "Annual", label: "Annual" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/[^0-9.]/g, "");
    const formattedValue = Number(numericValue).toLocaleString();

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: formattedValue,
    }));
    setPayloadData((prevFormData) => ({
      ...prevFormData,
      [name]: removeCommasFromNumber(value),
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
  };

  const removeCommasFromNumber = (numberString) => {
    if (typeof numberString !== "string") {
      // Convert to string or handle the case appropriately
      numberString = String(numberString);
    }
    return numberString.replace(/,/g, "");
  };

  const handleSubmit = () => {
    setLoading(true);
    const payload = {
      investorProfile: payloadData.investorProfile,
      investmentProduct: payloadData.investmentProduct,
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

    dispatch(createInvestment(payload))
      .unwrap()
      .then((res) => {
        setSuccessModalMessage(res?.message);
        setSuccessModal(true);
        resetFormField();
        setLoading(false);
        console.log({ data });
      })
      .catch((err) => {
        setFailedModalMessage(err?.message);
        setFailedModal(true);
        setLoading(false);
      });
  };

  const preventMinus = (e) => {
    if (/[^0-9,.]/g.test(e.key)) {
      e.preventDefault();
    }
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
          console.log("roi", res);
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

        <div className="flex justify-between gap-4 my-7">
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
              //   placeholder={"Month"}
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
              onKeyPress={preventMinus}
              onChange={handleInputChange}
            />
          </div>
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
              //   placeholder={"Month"}
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
              //   endIcon={"₦"}
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

        <div className="mb-20">
          <InputField
            disabled={true}
            name={"roiEstimate"}
            label={"ROI Estimate"}
            value={expectedROI || ""}
            placeholder={"System generated"}
            required={true}
          />
        </div>

        <div className="flex justify-center gap-2">
          {/* <span
            onClick={() => setPreview(true)}
            className={`py-2 px-12 text-swBlue font-semibold rounded-md outline outline-1 
                        hover:outline-gray-200 flex gap-2 border w-fit cursor-pointer
                    `}
          >
            Preview ROI
          </span> */}
          {/* <div className="w-fit" onClick={handleSubmit}>
            <Button className="rounded-md font-semibold">
              Create Investment
            </Button>
          </div> */}
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
