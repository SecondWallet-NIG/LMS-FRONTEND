"use client";
import Link from "next/link";
import Dashboard from "../dashboard/page";
import { IoMdAdd } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import InputField from "../components/shared/input/InputField";
import { useState } from "react";
import { AiOutlineExclamationCircle, AiOutlinePaperClip } from "react-icons/ai";
import Button from "../components/shared/buttonComponent/Button";

const CreateLoan = () => {
  const [isInputOpen, setIsInputOpen] = useState(false);

  return (
    <Dashboard>
      <main className="max-w-3xl mx-auto p-2 mt-10 text-sm">
        <p className="text-lg font-semibold">Initiate loan application</p>
        <div className="flex flex-col gap-5 mt-5">
          <p className="font-semibold">Loan details</p>
          <div className="flex gap-5 items-start">
            <InputField
              required={true}
              customSelect={true}
              borderColor={`border-swGray`}
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
            <div className="p-[0.1rem] -mt-[0.1rem] rounded roundned-md bg-white hover:bg-swLightGray font-semibold">
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
            borderColor={`border-swGray ${
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
            borderColor={`border-swGray ${
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
            hintText="Content here"
            borderColor={`border-swGray ${
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
            hintText="Content here"
            borderColor={`border-swGray ${
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
        <div className="flex flex-col gap-5 mt-5">
          <p className="font-semibold">Upload Collateral documents</p>
          <p className="text-gray-700 -mt-3">
            Document types uploaded should be JPEGS, PNG or PDF and should not
            exceed 4mb
          </p>
          <button className="py-2 px-6 rounded-md flex gap-2 border w-fit">
            <AiOutlinePaperClip size={20} />
            <p className="font-semibold">Select files</p>
          </button>
        </div>
        <div className="flex flex-col gap-5 mt-5">
          <p className="font-semibold">Upload Hard copy of filled form</p>
          <p className="text-gray-700 -mt-3">
            Document types uploaded should be JPEGS, PNG or PDF and should not
            exceed 4mb
          </p>
          <button className="py-2 px-6 rounded-md flex gap-2 border w-fit">
            <AiOutlinePaperClip size={20} />
            <p className="font-semibold">Select files</p>
          </button>
        </div>
        <Button
          disabled={true}
          variant={"secondary"}
          className="py-2 px-9 rounded-md flex gap-2 border w-fit mt-10"
        >
          Create loan
        </Button>
      </main>
    </Dashboard>
  );
};

export default CreateLoan;
