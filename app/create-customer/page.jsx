"use client";
import Link from "next/link";
import Dashboard from "../dashboard/page";
import { IoMdAdd } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import InputField from "../components/shared/input/InputField";
import SelectField from "../components/shared/input/SelectField";
import { useState } from "react";
import { AiOutlineExclamationCircle, AiOutlinePaperClip } from "react-icons/ai";
import Button from "../components/shared/buttonComponent/Button";
import CenterModal from "../components/modals/CenterModal";
import EmploymentDetailsModal from "../components/modals/EmploymentDetailsModal";

const customNoOptionsMessage = () => {
  return (
    <div>
      {/* Custom message with a link */}
      <p>
        Not found. <Link href="/create">Create new customer</Link>
      </p>
    </div>
  );
};

const CreateCustomer = () => {
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Dashboard>
      <main className="max-w-3xl mx-auto p-2 mt-10 text-sm">
        <div className="flex justify-between">
          <p className="text-lg font-semibold">Create customer profile</p>

          <button
            href=""
            className="flex gap-1 py-2 px-3 border-2 bg-swLightGray text-black border-swLightGray rounded-md focus:outline-none whitespace-nowrap"
            onClick={openModal}
          >
            <IoMdAdd size={20} />
            <p>Add new customer</p>
          </button>
        </div>

        <div className="flex flex-col gap-5 mt-5">
          <p className="font-semibold">Personal information</p>
          <div className="flex space-x-4">
            <div className="w-1/3">
              <InputField
                required={true}
                hintText={""}
                activeBorderColor="border-swBlue"
                label="First Name"
                placeholder="Enter first name"
                isActive="loan-amount"
                onclick={() => {
                  isInputOpen === "loan-amount"
                    ? setIsInputOpen(null)
                    : setIsInputOpen("loan-amount");
                }}
                inputOpen={isInputOpen}
              />
            </div>
            <div className="w-1/3">
              <InputField
                required={true}
                hintText={""}
                activeBorderColor="border-swBlue"
                label="Last Name"
                placeholder="Enter middle name"
                isActive="loan-amount"
                onclick={() => {
                  isInputOpen === "loan-amount"
                    ? setIsInputOpen(null)
                    : setIsInputOpen("loan-amount");
                }}
                inputOpen={isInputOpen}
              />
            </div>
            <div className="w-1/3">
              <InputField
                placeholder="Enter last name"
                required={true}
                activeBorderColor="border-swBlue"
                label="Last Name"
                isActive="loan-amount"
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <InputField
                placeholder="Date of Birth"
                inputType={"date"}
                required={true}
                activeBorderColor="border-swBlue"
                label="Date of Birth"
                isActive="loan-amount"
              />
            </div>
            <div className="w-1/2">
              <SelectField
                label={"Gender"}
                required={true}
                placeholder={"Select gender"}
                isSearchable={false}
              />
            </div>
          </div>

          <InputField
            required={true}
            activeBorderColor="border-swBlue"
            label="Social security number or NIN"
            placeholder="Social security number or NIN"
            isActive="loan-amount"
            onclick={() => {
              isInputOpen === "loan-amount"
                ? setIsInputOpen(null)
                : setIsInputOpen("loan-amount");
            }}
            inputOpen={isInputOpen}
          />
        </div>
        <div className="flex flex-col gap-5 mt-5">
          <p className="font-semibold">Contact information</p>
          <div className="flex space-x-4">
            <div className="w-1/3">
              <SelectField
                label={"Country"}
                required={true}
                placeholder={"Select country"}
                isSearchable={false}
              />
            </div>
            <div className="w-1/3">
              <SelectField
                label={"State"}
                required={true}
                placeholder={"Select state"}
                isSearchable={false}
              />
            </div>
            <div className="w-1/3">
              <SelectField
                label={"LGA"}
                required={true}
                placeholder={"Select lga"}
                isSearchable={false}
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="w-2/3">
              <InputField
                placeholder="Address"
                inputType={"text"}
                required={true}
                activeBorderColor="border-swBlue"
                label="Address"
                isActive="loan-amount"
              />
            </div>
            <div className="w-1/3">
              <InputField
                placeholder="House number"
                inputType={"text"}
                required={true}
                activeBorderColor="border-swBlue"
                label="House Number"
                isActive="loan-amount"
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <InputField
                placeholder="Phone Number"
                inputType={"text"}
                required={true}
                activeBorderColor="border-swBlue"
                label="Phone number"
                isActive="loan-amount"
              />
            </div>
            <div className="w-1/2">
              <InputField
                placeholder="Email Address"
                inputType={"text"}
                required={true}
                activeBorderColor="border-swBlue"
                label="Email address"
                isActive="loan-amount"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 mt-5">
          <p className="font-semibold">Bank Account Information</p>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <SelectField
                required={true}
                placeholder={"Select bank"}
                isSearchable={false}
              />
            </div>
            <div className="w-1/2">
              <InputField
                placeholder="Account number"
                inputType={"text"}
                required={true}
                activeBorderColor="border-swBlue"
                label="Account Number"
              />
            </div>
          </div>

          <InputField
            disabled={true}
            required={true}
            activeBorderColor="border-swBlue"
            label="Name on Account"
            placeholder="Name on account"
            isActive="loan-amount"
          />
        </div>

        <Button
          disabled={true}
          variant={"secondary"}
          className="py-2 px-9 rounded-md flex gap-2 border w-fit mt-10"
        >
          Create customer
        </Button>
      </main>
      <div className="">
      <EmploymentDetailsModal isOpen={isModalOpen} onClose={closeModal}/>
      </div>
   
    </Dashboard>
  );
};

export default CreateCustomer;
