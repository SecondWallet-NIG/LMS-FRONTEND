"use client";

import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import Button from "@/app/components/shared/buttonComponent/Button";
import EditableButton from "@/app/components/shared/editableButtonComponent/EditableButton";
import InputField from "@/app/components/shared/input/InputField";
import SelectField from "@/app/components/shared/input/SelectField";
import { AiOutlinePercentage } from "react-icons/ai";

const CreateInvestment = () => {
  const selInvestorsOPt = [{ value: "", label: "" }];

  const investPlanOpt = [{ value: "", label: "" }];

  const durationOpt = [
    { value: "", label: "Monthly" },
    { value: "", label: "Quarterly" },
    { value: "", label: "Annually" },
  ];

  const investPostFreq = [
    { value: "", label: "Every 1 month" },
    { value: "", label: "Every 2 months" },
    { value: "", label: "Every 3 months" },
    { value: "", label: "Every 6 months" },
    { value: "", label: "Every 12 months" },
  ];

  return (
    <DashboardLayout isBackNav={true} paths={["Investors", "New investment"]}>
      <div className="mx-auto w-3/5 mb-28">
        <h1 className="font-medium text-xl leading-7 text-black py-5">
          Create new investment
        </h1>
        <h5 className="font-medium leading-5 text-sm text-swBlack mt-5 mb-8">
          Enter investment details
        </h5>

        <div>
          <SelectField
            name={"selectInvestor"}
            label={"Select investor"}
            required={true}
            placeholder={"Select from list"}
            optionValue={selInvestorsOPt}
          />
        </div>
        <div className="my-6">
          <SelectField
            name={"investPlan"}
            label={"Investment Plan"}
            required={true}
            placeholder={"Select plan"}
            optionValue={investPlanOpt}
          />
        </div>

        <div className="w-full">
          <InputField
            name={"interestRate"}
            label={"Interest Rate"}
            placeholder={"30"}
            required={true}
            endIcon={<AiOutlinePercentage />}
          />
          <p className="leading-5 text-sm mt-1 text-swGrey200">
            Interest rate should be between the min and max range for the
            investment plan
          </p>
        </div>

        <div className="flex justify-between gap-4 my-7">
          <div className="w-1/2">
            <SelectField
              name={"duration"}
              label={"Duration"}
              required={true}
              placeholder={"Month"}
              optionValue={durationOpt}
            />
          </div>
          <div className="w-full mt-7">
            <InputField
              name={"interestRate"}
              placeholder={"Enter number"}
              required={true}
              inputType={"number"}
            />
          </div>
        </div>

        <div className="">
          <SelectField
            name={"interestPostFreq"}
            label={"Interest posting frequency"}
            required={true}
            placeholder={"Select posting frequency"}
            optionValue={investPostFreq}
          />
        </div>

        <div className="my-7">
          <InputField
            name={"investAmount"}
            label={"Investment amount"}
            placeholder={"Enter amount invested"}
            required={true}
          />
        </div>

        <div className="mb-20">
          <InputField
            disabled={true}
            name={"numOfPayout"}
            label={"Number of payout"}
            placeholder={"returned by the system"}
            required={true}
          />
        </div>

        <div className="flex justify-center gap-2">
          {/* <Button className="rounded-md text-swBlue500 bg-white px-5 border border-sky-200">
                        Preview ROI
                    </Button> */}
          <button
            label="Preview ROI"
            className="rounded-md text-swBlue bg-white px-5 border border-swBlue hover:bg-blue-50"
          >
            Preview ROI
          </button>

          <Button className="rounded-md">Create Investment</Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateInvestment;
