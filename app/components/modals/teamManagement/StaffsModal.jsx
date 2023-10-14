"use client";
import { AiOutlineClose, AiOutlineMail } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import InputField from "../../shared/input/InputField";
import SelectField from "../../shared/input/SelectField";
import { useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const StaffsModal = ({ isOpen, onClose, width }) => {
  const [selectedStaffRole, setSelectedStaffRole] = useState("");
  if (!isOpen) return null;
  const modalStyles = {
    width: width || "90%", // Use full width on mobile
    maxWidth: "800px", // Set a maximum width for larger screens
  };

  const staffOptions = [
    { value: "loan_officer", label: "Loan officer" },
    { value: "credit_officer", label: "Credit officer" },
    { value: "internal_control", label: "Internal control" },
    { value: "admin", label: "Admin" },
  ];

  const adminOptions = [
    { value: "ceo", label: "CEO" },
    { value: "cfo", label: "CFO" },
    { value: "cto", label: "CTO" },
    { value: "director", label: "Director" },
  ];

  const handleRoleSelection = (e) => {
    setSelectedStaffRole(e.value);
  };

  return (
    <main className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-10">
      <div
        className="rounded-2xl overflow-auto border border-swGray h-[80%] scrollbar-hide"
        style={modalStyles}
      >
        <div className="bg-swBlue flex justify-between items-center p-3 text-white">
          <div>
            <p className="text-base font-semibold">Add a new staff</p>
            <p className="text-xs">Staff information</p>
          </div>
          <AiOutlineClose
            size={20}
            onClick={onClose}
            className="cursor-pointer"
          />
        </div>
        <div className="pt-8 px-5 pb-16 bg-white">
          <div className="flex justify-between">
            <p className="w-1/4 font-semibold mr-2">Upload an image</p>
            <div className="w-3/4 flex items-center text-xs gap-3">
              <div className="p-3 border-2 rounded-full w-fit text-[#B0B0B0]">
                <FiUser size={50} />
              </div>
              <button className="border font-semibold w-fit p-2 rounded-md">
                Select a file
              </button>
            </div>
          </div>
          <div className="flex justify-between mt-5">
            <p className="w-1/4 font-semibold mr-2">Personal information</p>
            <div className="w-3/4 flex flex-col gap-2">
              <InputField
                label="First name"
                required={true}
                placeholder="Start typing"
              />
              <InputField
                label="Last name"
                required={true}
                placeholder="Start typing"
              />
              <div className="flex gap-2 items-end">
                <SelectField
                  label={"Phone number"}
                  required={true}
                  placeholder={"NG"}
                  isSearchable={false}
                />
                <div className="w-full ">
                  <InputField placeholder={"Start typing"} />
                </div>
              </div>
              <InputField
                label="Email address"
                required={true}
                placeholder="Start typing"
                startIcon={
                  <AiOutlineMail className="text-[#B0B0B0]" size={20} />
                }
              />
            </div>
          </div>
          <div className="flex justify-between mt-5">
            <p className="w-1/4 font-semibold mr-2">Roles</p>

            <div className="w-3/4 flex flex-col gap-2">
              <SelectField
                label={"Select a role"}
                required={true}
                isSearchable={false}
                onChange={handleRoleSelection}
                optionValue={staffOptions}
              />

              {selectedStaffRole === "admin" && (
                <SelectField
                  label={"Select admin"}
                  required={true}
                  isSearchable={false}
                  optionValue={adminOptions}
                />
              )}
            </div>
          </div>
          <div className="flex justify-between mt-5 mb-20">
            <p className="w-1/4 font-semibold mr-2">Permissions and access</p>
            <div className="w-3/4">
              <p>
                {selectedStaffRole ? selectedStaffRole : "Select role first"}
              </p>
            </div>
          </div>
        </div>

        <div className="p-3 border-t flex items-center justify-end gap-2 bg-white">
          <button className="border text-swGray font-semibold p-2 px-16 rounded-md">
            Cancel
          </button>
          <button className=" text-[#B0B0B0] font-semibold p-2 pl-4 pr-3 rounded-md bg-swLightGray flex items-center gap-2">
            <div className="h-2 w-2 bg-swGreen rounded-full" />
            Create new staff
            <MdOutlineKeyboardArrowRight size={20} />
          </button>
        </div>
      </div>
    </main>
  );
};

export default StaffsModal;
