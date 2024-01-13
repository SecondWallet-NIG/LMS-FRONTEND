import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import SelectField from "../../shared/input/SelectField";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const RolesModal = ({ isOpen, onClose, children, width }) => {
  const [selectedStaffRole, setSelectedStaffRole] = useState("");

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
  if (!isOpen) return null;
  return (
    <main className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-10">
      <div
        className="rounded-2xl overflow-auto border border-swGray h-[80%] scrollbar-hide relative bg-white"
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

        <div className="p-3 border-t flex items-center justify-end gap-2 absolute bottom-0 left-0 w-full">
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

export default RolesModal;
