import { AiOutlineClose, AiOutlineMail } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import InputField from "../../shared/input/InputField";
import SelectField from "../../shared/input/SelectField";

const StaffsModal = ({ isOpen, onClose, children, width }) => {
  if (!isOpen) return null;
  const modalStyles = {
    width: width || "90%", // Use full width on mobile
    maxWidth: "800px", // Set a maximum width for larger screens
  };

  return (
    <main className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-10">
      <div
        className="rounded-2xl overflow-hidden border border-swGray"
        style={modalStyles}
      >
        <div className="bg-swBlue flex justify-between items-center p-3 text-white">
          <div>
            <p className="text-base font-semibold">Add a new staff</p>
            <p className="text-xs">Staff information</p>
          </div>
          <AiOutlineClose size={20} />
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
          <div className="flex justify-between">
            <p className="w-1/4 font-semibold mr-2">Roles</p>

            <div className="w-3/4">
              <SelectField op  />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default StaffsModal;
