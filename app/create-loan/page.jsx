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

const customNoOptionsMessage = () => {
  return (
    <div>
      {/* Custom message with a link */}
      <p>Not found. <Link href="/create">Create new customer</Link></p>
    </div>
  );
};

const CreateLoan = () => {
  const [isInputOpen, setIsInputOpen] = useState(false);

  return (
    <Dashboard>
      <main className="max-w-3xl mx-auto p-2 mt-10 text-sm">
     <div className="flex justify-between">
     <p className="text-lg font-semibold">Initiate loan application</p>
   
   <Button
   
     href=""
     className="hidden flex gap-1 py-2 px-3 border-2 bg-swBlue border-swLightGray rounded-md focus:outline-none whitespace-nowrap"
   >
     <IoMdAdd size={20} />
     <p>Add new customer</p>
   </Button>
     </div>
      
        <div className="flex flex-col gap-5 mt-5">
          <p className="font-semibold">Loan details</p>
          <SelectField
            label={"Customer Name/ID"}
            required={true}
            placeholder={"Search and select customer"}
            isSearchable={true}
            noOptionsMessage={customNoOptionsMessage}
          />
          <SelectField
            label={"Loan Package "}
            required={true}
            placeholder={"Select loan package"}
            isSearchable={false}
          />
          <SelectField
            label={"Asset Type"}
            required={true}
            placeholder={"Select asset type"}
            isSearchable={false}
          />
          <InputField
            required={true}
            hintText={"Enter the loan amount in digit (Naira currency)"}
            activeBorderColor="border-swBlue"
            label="Loan amount"
            placeholder="Enter loan amount"
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
            hintText={"Enter the loan duration in months"}
            activeBorderColor="border-swBlue"
            label="Duration"
            placeholder="Enter loan duration"
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
