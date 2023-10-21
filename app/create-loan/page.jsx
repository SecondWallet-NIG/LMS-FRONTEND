"use client";
import Link from "next/link";
import { useEffect } from "react";
import Dashboard from "../dashboard/page";
import { IoMdAdd } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import InputField from "../components/shared/input/InputField";
import SelectField from "../components/shared/input/SelectField";
import { useState } from "react";
import { AiOutlinePaperClip } from "react-icons/ai";
import Button from "../components/shared/buttonComponent/Button";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "@/redux/slices/customerSlice";

import CenterModal from "../components/modals/CenterModal";
import EditableButton from "../components/shared/editableBuutonComponent/EditableButton";

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

const CreateLoan = () => {
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.customer);

  const modifyObjects = (arr) => {
    return arr?.map((item) => ({
      label: item.firstName,
      value: item._id,
    }));
  };

  const modifiedArray = modifyObjects(data);
  console.log({ modifiedArray });

  useEffect(() => {
    dispatch(getCustomers());
  }, []);

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
          <div
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Search and select customer
          </div>
          <SelectField
            label={"Customer Name/ID"}
            required={true}
            placeholder={"Search and select customer"}
            isSearchable={true}
            optionValue={modifiedArray}
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
      <CenterModal width={"40%"} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="h-[500px] overflow-y-scroll">
          {data?.map((item) => (
            <div
              key={item._id}
              className="mb-4 p-4 border rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <div className="text-xs text-gray-800">
                    {item.firstName} {item.lastName}
                  </div>
                  <div className="text-xs text-gray-600 font-semibold">
                    {item.email}
                  </div>
                </div>
                <div className=" text-xs text-gray-800 font-semibold">
                  {item.phoneNumber}
                </div>
                <div>
                  <EditableButton
                    className={`${"font-semibold text-swBlue bg-blue-50"} p-1 text-xs rounded-full border cursor-pointer`}
                  >
                    Badge
                  </EditableButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CenterModal>
    </Dashboard>
  );
};

export default CreateLoan;
