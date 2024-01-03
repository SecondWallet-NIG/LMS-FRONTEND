"use client";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import CenterModal from "@/app/components/modals/CenterModal";
import EditableButton from "@/app/components/shared/editableButtonComponent/EditableButton";
import InputField from "@/app/components/shared/input/InputField";
import SelectField from "@/app/components/shared/input/SelectField";
import TasksCard from "@/app/components/teamManagement/TasksCard";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FiEdit2, FiPhone, FiUser } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { Rings } from "react-loader-spinner";

const StaffPage = () => {
  const { id } = useParams();
  const [pageState, setPageState] = useState("r&p");
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    // profilePicture: null,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "",
    tag: null,
    isRoleAdmin: false,
  });
  const profileImg = null;

  const adminOptions = [
    { value: "CEO", label: "CEO" },
    { value: "CFO", label: "CFO" },
    { value: "CFO", label: "CFO" },
    { value: "Director", label: "Director" },
  ];

  const handleInputChange = async (e) => {
    let { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelectChange = async (selectedOption, name) => {
    setFormData({
      ...formData,
      [name]: selectedOption.value,
    });
  };

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    if (e.target.id === "profilePicture" && e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, [e.target.id]: files[0] }));
    } else {
      setSelectedFiles(files);
    }
  };

  const preventMinus = (e) => {
    if (/[^0-9,]/g.test(e.key)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (
      formData?.profilePicture !== null &&
      formData?.profilePicture &&
      (formData?.profilePicture instanceof Blob ||
        formData?.profilePicture instanceof File)
    ) {
      try {
        setProfileImg(URL.createObjectURL(formData.profilePicture));
      } catch (error) {
        console.error("Error creating object URL:", error);
      }
    } else {
      // Handle cases where the selected file is not a Blob or File
      console.error("Invalid file type selected.");
    }
  }, [formData?.profilePicture]);
  return (
    <DashboardLayout>
      <main>
        <div className="p-5">
          <div className="bg-swBlue rounded-2xl p-10 text-white">
            <div className="flex justify-between items-center">
              <div className="flex gap-5 items-start">
                {profileImg !== null ? (
                  <div className="h-[4.7rem] w-[4.7rem] border-2 rounded-full relative overflow-hidden">
                    <Image
                      src={profileImg !== null && profileImg}
                      alt="profile"
                      fill
                      sizes="100%"
                    />
                  </div>
                ) : (
                  <div className="border-2 p-4 rounded-full">
                    <FiUser size={40} color="white" />
                  </div>
                )}
                <div>
                  <div className="flex gap-3 items-end">
                    <p className="font-medium text-2xl">John Doe</p>
                    <p>Active</p>
                  </div>
                  <p className="font-light">johndoe@gmail.com</p>
                  <p className="font-light">SWL-837639</p>
                  <div className="flex gap-5 items-center mt-5">
                    <div className="hover:bg-white hover:text-swBlue p-2 rounded-md cursor-pointer">
                      <MdOutlineEmail size="22" />
                    </div>
                    <div className="hover:bg-white hover:text-swBlue p-2 rounded-md cursor-pointer">
                      <FiPhone size="20" />
                    </div>
                    <div className="hover:bg-white hover:text-swBlue p-2 rounded-md cursor-pointer">
                      <FiEdit2 size="20" />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex w-80 items-center justify-between text-lg">
                  <p>Role:</p>
                  <p className="">Credit Officer,Admin</p>
                </div>
                <div className="flex w-80 items-center justify-between text-lg mt-5">
                  <p>Permissions:</p>
                  <p className="">All</p>
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-5">
              <TasksCard taskName={"Total tasks"} taskAmount={"10"} />
              <TasksCard taskName={"Pending tasks"} taskAmount={"5"} />
              <TasksCard taskName={"Completed tasks"} taskAmount={"5"} />
            </div>
          </div>
        </div>
        <div>
          <div className="border-b p-2 flex">
            <p
              className={`p-2 ${
                pageState === "r&p" &&
                "text-swBlue bg-swBlueActiveStateBg rounded-md"
              }`}
            >
              Roles and Permissions
            </p>
          </div>
          <div className="p-5">
            <div className="flex justify-end">
              <EditableButton
                blueBtn={true}
                label={"Update roles"}
                onClick={() => setIsOpen(true)}
              />
            </div>
            <div className="flex ">
              <p className="w-60 font-medium">Role</p>
              <p>Credit officer, Admin</p>
            </div>
          </div>
        </div>
      </main>
      <CenterModal
        // width={"70%"}
        bgColor={"bg-black bg-opacity-5"}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(!isOpen);
        }}
      >
        <main className="w-full">
          <form id="add-user-form" className="bg-white rounded-2xl">
            <div className="rounded-2xl overflow-auto border border-swGray h-[80%] scrollbar-hide">
              <div className="bg-swBlue flex justify-between items-center p-3 text-white">
                <div>
                  <p className="text-base font-semibold">Add a new staff</p>
                  <p className="text-xs">Staff information</p>
                </div>
                <AiOutlineClose
                  size={20}
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer"
                />
              </div>
              <div className="pt-8 px-5 pb-16 h-[20rem] overflow-y-auto bg-white relative custom-scrollbar">
                <div className="flex">
                  <p className="font-semibold my-5 w-1/4">Profile picture</p>
                  <div className="flex gap-5 items-center">
                    {profileImg !== null ? (
                      <div className="h-[4.7rem] w-[4.7rem] border-2 rounded-full relative overflow-hidden">
                        <Image
                          src={profileImg !== null && profileImg}
                          alt="profile"
                          fill
                          sizes="100%"
                        />
                      </div>
                    ) : (
                      <div className="border-2 p-4 rounded-full">
                        <FiUser size={40} />
                      </div>
                    )}

                    <label
                      htmlFor="profilePicture"
                      className="border-2 rounded-lg p-2 px-4 font-semibold cursor-pointer"
                    >
                      <input
                        type="file"
                        id="profilePicture"
                        className="hidden"
                        onChange={handleFileInputChange}
                      />
                      {profileImg !== null ? "Change file" : "Select a file"}
                    </label>
                  </div>
                </div>
                <div className="flex justify-between mt-5">
                  <p className="w-1/4 font-semibold mr-2">
                    Personal information
                  </p>
                  <div className="w-3/4 flex flex-col gap-2">
                    <InputField
                      name="firstName"
                      label="First name"
                      required={true}
                      placeholder="First name"
                      onChange={handleInputChange}
                    />

                    <InputField
                      name="lastName"
                      label="Last name"
                      required={true}
                      placeholder="Last name"
                      onChange={handleInputChange}
                    />

                    <div className="flex gap-3 items-end">
                      <div className="w-full ">
                        <InputField
                          label="Phone number"
                          name="phoneNumber"
                          onKeyPress={preventMinus}
                          onWheel={() => document.activeElement.blur()}
                          placeholder="Phone number"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <InputField
                      name="email"
                      label="Email address"
                      required={true}
                      placeholder="Email"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-5">
                  <p className="w-1/4 font-semibold mr-2">Roles</p>
                  <div className="w-3/4 flex flex-col gap-3">
                    <SelectField
                      name="role"
                      label={"Select User Role"}
                      required={true}
                      isSearchable={false}
                      // optionValue={modifyObjects(data?.data)}
                      onChange={(selectedOption) =>
                        handleSelectChange(selectedOption, "role")
                      }
                    />

                    {formData?.role === "650f61f89e06e619920a7f4e" && (
                      <SelectField
                        name="tag"
                        label={"Select Admin Tag"}
                        required={true}
                        isSearchable={false}
                        optionValue={adminOptions}
                        onChange={(selectedOption) =>
                          handleSelectChange(selectedOption, "tag")
                        }
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="p-3 border-t flex items-center justify-end gap-2 bg-white">
                {/* <button
              type="button"
              onClick={onClose}
              className="border text-swGray font-semibold p-2 px-16 rounded-md"
            >
              Cancel
            </button> */}
                {/* <Button
              disabled={loading === "pending" ? true : false}
              onClick={handleSubmit}
              className="block  rounded-full"
            >
              {loading === "pending" ? "Processing" : " Create User"}
            </Button> */}
                <EditableButton
                  whiteBtn={true}
                  label={"Cancel"}
                  onClick={() => setIsOpen(false)}
                />
                <EditableButton
                  blueBtn={true}
                  // disabled={loading === "pending" ? true : false}
                  // startIcon={
                  //   loading === "pending" && (
                  //     <Rings
                  //       height="20"
                  //       width="20"
                  //       color="#ffffff"
                  //       radius="2"
                  //       wrapperStyle={{}}
                  //       wrapperClass=""
                  //       visible={true}
                  //       ariaLabel="rings-loading"
                  //     />
                  //   )
                  // }
                  label={"Create user"}
                  endIcon={<IoMdCheckmark size={20} />}
                  // onClick={handleSubmit}
                />
              </div>
            </div>
          </form>
        </main>
      </CenterModal>
    </DashboardLayout>
  );
};

export default StaffPage;
