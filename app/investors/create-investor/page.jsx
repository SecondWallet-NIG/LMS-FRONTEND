"use client"
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import Button from "@/app/components/shared/buttonComponent/Button";
import InputField from "@/app/components/shared/input/InputField";
import SelectField from "@/app/components/shared/input/SelectField";
import { FiUser, FiCalendar, FiMapPin, FiMail, FiPaperclip } from "react-icons/fi";

const CreateInvestor = () => {
    const headerClass = 'font-medium text-sm leading-5 text-swBlack'
    const genderOpt = [
        { value: '', label: 'Male' },
        { value: '', label: 'Female' }
    ]

    return (
        <DashboardLayout
            isBackNav={true}
            paths={["Investors", "Create investor"]}
        >
            <div className="mx-auto w-3/5 mb-28">
                <h1 className="font-medium text-xl leading-7 text-black py-5">
                    Create investor profile
                </h1>
                <h5 className="font-semibold leading-7 text-lg text-swBlack mt-5 mb-8">Personal information</h5>

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
                            name={"firstname"}
                            label={'First name'}
                            placeholder={'Start typing'}
                            required={true}
                        />
                        <InputField
                            name={"middlename"}
                            label={'Middle name'}
                            placeholder={'Start typing'}
                            required={false}
                        />
                        <InputField
                            name={"lastname"}
                            label={'Last Name'}
                            placeholder={'Start typing'}
                            required={true}
                        />
                    </div>

                    <div className="flex justify-between gap-6">
                        <div className="w-full">
                            <InputField
                                name={"dateOfBirth"}
                                label={'Date of Birth'}
                                placeholder={'mm/dd/yyyy'}
                                required={true}
                                endIcon={<FiCalendar />}
                            />
                        </div>

                        <div className="w-full">
                            <SelectField
                                name={"gender"}
                                label={"Gender"}
                                required={true}
                                placeholder={"Select gender"}
                                optionValue={genderOpt}
                            />
                        </div>
                    </div>

                    <div className="flex justify-between mt-5 mb-10 gap-6">
                        <div className="w-full">
                            <InputField
                                name={"nin"}
                                label={'NIN'}
                                placeholder={'Start typing'}
                                required={true}
                            />
                        </div>

                        <div className="w-full">
                            <InputField
                                name={"bvn"}
                                label={'BVN'}
                                placeholder={'Start typing'}
                                required={true}
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
                                name={"country"}
                                label={"Country"}
                                required={false}
                                placeholder={"Default Selected"}
                            />
                        </div>
                        <div className="w-full">
                            <SelectField
                                name={"state"}
                                label={"State"}
                                required={false}
                                placeholder={"Default Selected"}
                            />
                        </div>
                        <div className="w-full">
                            <SelectField
                                name={"city"}
                                label={"City"}
                                required={false}
                                placeholder={"Default Selected"}
                            />
                        </div>
                    </div>

                    <div className="flex justify-between gap-6">
                        <div className="w-1/2">
                            <InputField
                                name={"houseNumber"}
                                label={'House number'}
                                placeholder={'Start typing'}
                                required={false}
                            />
                        </div>
                        <div className="w-full">
                            <InputField
                                name={"streetName"}
                                label={'Street name'}
                                placeholder={'Start typing'}
                                required={false}
                                startIcon={<FiMapPin />}
                            />
                        </div>
                    </div>

                    <div className="flex justify-between gap-6 mt-5 mb-10">
                        <div className="w-full">
                            <InputField
                                name={"emailAddress"}
                                label={'Email address'}
                                placeholder={'Start typing'}
                                required={true}
                                startIcon={<FiMail />}
                            />
                        </div>
                        <div className="w-full">
                            <InputField
                                name={"phoneNumber"}
                                label={'Phone number'}
                                placeholder={'Start typing'}
                                required={true}
                                startIcon={"NG "}
                            />
                        </div>
                    </div>
                </div>

                {/* Financial Information */}
                <div>
                    <h6 className={`${headerClass}`}>Financial information</h6>
                    <div className="w-full my-5">
                        <SelectField
                            name={"annualIncome"}
                            label={"Annual Income"}
                            required={true}
                            placeholder={"Default Selected"}
                        />
                    </div>

                    <div className="w-full">
                        <InputField
                            name={"networth"}
                            label={'Networth'}
                            placeholder={'Start typing'}
                            required={true}
                        />
                        <p className="text-swGrey200 text-sm mt-1">Assets minus Liabilities</p>
                    </div>

                    <div className="w-full my-5">
                        <InputField
                            name={"sourceOfIncome"}
                            label={'Source of income'}
                            placeholder={'Start typing'}
                            required={true}
                        />
                    </div>

                    <div className="w-full">
                        <InputField
                            name={"bankname"}
                            label={'Bank name'}
                            placeholder={'Enter bank name'}
                            required={true}
                        />
                        <p className="text-swGrey200 text-sm mt-1">Bank account to remit investment ROI</p>
                    </div>

                    <div className="w-full my-5">
                        <InputField
                            name={"accNumber"}
                            label={'Account number'}
                            placeholder={'Enter account number'}
                            required={true}
                        />
                    </div>

                    <div className="w-full mb-10">
                        <InputField
                            name={"sourceOfIncome"}
                            label={'Account name'}
                            placeholder={'Name to display here'}
                            required={true}
                            disabled={true}
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
                            required={true}
                            placeholder={"Select work status"}
                        />
                    </div>
                </div>

                {/* Investor file upload */}
                <div>
                    <h6 className={`${headerClass}`}>Investor file upload</h6>
                    <p className="text-swGray text-sm mt-2 mb-10">Document types uploaded should be JPEGS, PNG or PDF and should not exceed 4mb</p>

                    <div className="flex justify-between gap-6 text-center">
                        <span className="w-full">
                            <p className="text-swGrey500 leading-5 text-sm">Upload Tax Identification Number (TIN)</p>
                            <Button className="mt-5 rounded-md">
                                <FiPaperclip />
                                Select files
                            </Button>
                        </span>

                        <span className="w-full">
                            <p className="text-swGrey500 leading-5 text-sm">Upload Bank Verification Number (BVN)</p>
                            <Button className="mt-5 rounded-md">
                                <FiPaperclip />
                                Select files
                            </Button>
                        </span>

                        <span className="w-full">
                            <p className="text-swGrey500 leading-5 text-sm">Upload National Identity Number (NIN)</p>
                            <Button className="mt-5 rounded-md">
                                <FiPaperclip />
                                Select files
                            </Button>
                        </span>
                    </div>
                </div>

                <div className="flex justify-center my-20">
                    <Button className="rounded-md">
                        Create Investor profile
                    </Button>
                </div>
            </div>

        </DashboardLayout>
    );
};

export default CreateInvestor;
