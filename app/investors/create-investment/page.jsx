"use client";

import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import Button from "@/app/components/shared/buttonComponent/Button";
import EditableButton from "@/app/components/shared/editableButtonComponent/EditableButton";
import InputField from "@/app/components/shared/input/InputField";
import SelectField from "@/app/components/shared/input/SelectField";
import { AiOutlinePercentage } from "react-icons/ai";

const CreateInvestment = () => {
    const selInvestorsOPt = [
        { value: '', label: '' }
    ]

    const investPlanOpt = [{ value: "", label: "" }];

    const interestDurationOpt = [
        { value: '', label: 'Daily' },
        { value: '', label: 'Monthly' },
        { value: '', label: 'Yearly' }
    ]

    const durationOpt = [
        { value: '', label: 'Monthly' },
        { value: '', label: 'Quarterly' },
        { value: '', label: 'Annually' }
    ]

    return (
        <DashboardLayout
            isBackNav={true}
            paths={["Investors", "New investment"]}
        >
            <div className="mx-auto w-3/5 mb-28">
                <h1 className="font-medium text-xl leading-7 text-black py-5">
                    Create New Investment
                </h1>
                <h5 className="font-medium leading-5 text-sm text-swBlack mt-5 mb-8">Enter investment details</h5>

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

                <div className="flex justify-between gap-4 my-7">
                    <div className="w-1/2">
                        <SelectField
                            name={"interestRateMetrics"}
                            label={"Interest rate metrics"}
                            required={true}
                            placeholder={"Month"}
                            optionValue={interestDurationOpt}
                        />
                    </div>
                    <div className="w-full mt-7">
                        <InputField
                            name={"interestRateMetrics"}
                            placeholder={"Enter number"}
                            required={true}
                            inputType={'number'}
                        />
                    </div>
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

                <div className="my-7">
                    <InputField
                        name={"investAmount"}
                        label={'Investment amount'}
                        placeholder={"Enter amount invested"}
                        required={true}
                    />
                </div>

                <div className="mb-20">
                    <InputField
                        disabled={true}
                        name={"roiEstimate"}
                        label={'ROI Estimate'}
                        placeholder={"System generated"}
                        required={true}
                    />
                </div>

                <div className="flex justify-center gap-2">
                    <span className="py-2 px-12 text-swBlue font-semibold rounded-md outline outline-1 hover:outline-gray-200 flex gap-2 border w-fit cursor-pointer">
                        Preview ROI
                    </span>

                    <Button className="rounded-md font-semibold">
                        Create Investment
                    </Button>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default CreateInvestment;
