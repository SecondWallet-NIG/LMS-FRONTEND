"use client";
import Link from "next/link";
import Dashboard from "../dashboard/page";
import { IoMdAdd } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import InputField from "../components/shared/input/InputField";
import { useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const CreateLoan = () => {
  const [isInputOpen, setIsInputOpen] = useState(false);

  return (
    <Dashboard>
      <main className="max-w-3xl mx-auto p-2 mt-10 text-sm">
        <p className="text-lg font-semibold">Initiate loan application</p>
        <div className="flex flex-col gap-5 mt-5">
          <p>Loan details</p>
          <div className="flex gap-5 items-start">
            <InputField
              required={true}
              customSelect={true}
              borderColor={`border-swLightGray`}
              activeBorderColor="border-swBlue"
              label="Search and select customer"
              placeholder="Start typing"
              endIcon={<MdKeyboardArrowDown size={20} />}
              isActive="select-customer"
              onclick={() => {
                isInputOpen === "select-customer"
                  ? setIsInputOpen(null)
                  : setIsInputOpen("select-customer");
              }}
              inputOpen={isInputOpen}
            />
            <div className="p-[0.1rem] -mt-[0.1rem] rounded roundned-md bg-white hover:bg-swLightGray">
              <Link
                href=""
                className="flex gap-1 py-2 px-3 border-2 bg-white border-swLightGray rounded-md focus:outline-none whitespace-nowrap"
              >
                <IoMdAdd size={20} />
                <p>Add new customer</p>
              </Link>
            </div>
          </div>
          <InputField
            required={true}
            dropDown={true}
            borderColor={`border-swLightGray ${
              isInputOpen === "loan-package" && "border-swBlue"
            }`}
            activeBorderColor="border-swBlue"
            label="Loan package"
            placeholder="Start typing"
            endIcon={<MdKeyboardArrowDown size={20} />}
            isActive="loan-package"
            onclick={() => {
              isInputOpen === "loan-package"
                ? setIsInputOpen(null)
                : setIsInputOpen("loan-package");
            }}
            inputOpen={isInputOpen}
          />
          <InputField
            required={true}
            dropDown={true}
            borderColor={`border-swLightGray ${
              isInputOpen === "asset-type" && "border-swBlue"
            }`}
            activeBorderColor="border-swBlue"
            label="Asset type"
            placeholder="Start typing"
            endIcon={<MdKeyboardArrowDown size={20} />}
            isActive="asset-type"
            onclick={() => {
              isInputOpen === "asset-type"
                ? setIsInputOpen(null)
                : setIsInputOpen("asset-type");
            }}
            inputOpen={isInputOpen}
          />
          <InputField
            required={true}
            borderColor={`border-swLightGray ${
              isInputOpen === "loan-amount" && "border-swBlue"
            }`}
            activeBorderColor="border-swBlue"
            label="Loan amount"
            placeholder="Start typing"
            endIcon={
              <AiOutlineExclamationCircle className="text-swGray" size={20} />
            }
            isActive="loan-amount"
            onclick={() => {
              isInputOpen === "loan-amount"
                ? setIsInputOpen(null)
                : setIsInputOpen("loan-amount");
            }}
            inputOpen={isInputOpen}
          />
          <InputField
            required={true}
            borderColor={`border-swLightGray ${
              isInputOpen === "duration" && "border-swBlue"
            }`}
            activeBorderColor="border-swBlue"
            label="Duration"
            placeholder="Start typing"
            endIcon={
              <AiOutlineExclamationCircle className="text-swGray" size={20} />
            }
            isActive="duration"
            onclick={() => {
              isInputOpen === "duration"
                ? setIsInputOpen(null)
                : setIsInputOpen("duration");
            }}
            inputOpen={isInputOpen}
          />
        </div>
      </main>
    </Dashboard>
  );
};

export default CreateLoan;
