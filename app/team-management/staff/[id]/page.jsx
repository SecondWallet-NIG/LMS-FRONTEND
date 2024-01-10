"use client";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import CenterModal from "@/app/components/modals/CenterModal";
import EditableButton from "@/app/components/shared/editableButtonComponent/EditableButton";
import InputField from "@/app/components/shared/input/InputField";
import SelectField from "@/app/components/shared/input/SelectField";
import TasksCard from "@/app/components/teamManagement/TasksCard";
import { getRoles } from "@/redux/slices/roleSlice";
import { getUserById, updateUser } from "@/redux/slices/userSlice";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FiEdit2, FiPhone, FiUser } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { Rings } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StaffPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [pageState, setPageState] = useState("r&p");
  const [isOpen, setIsOpen] = useState(false);

  const { loading, error, data } = useSelector((state) => state?.user);
  const { data: roleData } = useSelector((state) => state?.role);
  console.log({ staffdata: data });

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
  console.log(data);
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

  const modifyObjects = (arr) => {
    return Array.isArray(arr)
      ? arr.map((item) => ({
          label: item.name,
          value: item._id,
        }))
      : [];
  };

  const preventMinus = (e) => {
    if (/[^0-9,]/g.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const payload = new FormData();
    // payload.append("firstName", formData.firstName);
    // payload.append("lastName", formData.lastName);
    // payload.append("email", formData.email);
    // payload.append("phoneNumber", formData.phoneNumber);
    // payload.append("role", formData.role);
    // payload.append("tag", formData.tag);
    // payload.append("isRoleAdmin", formData.isRoleAdmin);
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      role: formData.role,
    };
    dispatch(updateUser({ userId: data?._id, updatedData: payload }))
      .unwrap()
      .then((res) => {
        toast.success("Profile updated successfully");
        getUserById(data?._id);
        setIsOpen(false);
      })
      .catch((error) => {
        toast.error("An error occured");
      });
    // console.log(...payload);
  };

  useEffect(() => {
    setFormData({
      // profilePicture: null,
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      phoneNumber: data?.phoneNumber,
      role: data?.role?._id,
      tag: data?.role?.tag,
      isRoleAdmin: false,
    });
  }, [data]);

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

  useEffect(() => {
    dispatch(getUserById(id));
    dispatch(getRoles());
  }, []);
  return (
    <DashboardLayout
      isBackNav={true}
      paths={["Team management", "Staff profile"]}
    >
      <ToastContainer />
      <main>
        <div className="p-5">
          <div className="bg-swBlue rounded-2xl p-10 text-white">
            <div className="flex justify-between items-center">
              <div className="flex gap-5 items-start">
                {data?.profilePicture !== null ? (
                  <div className="h-[4.7rem] w-[4.7rem] border-2 rounded-full relative overflow-hidden">
                    <Image
                      src={data?.profilePicture}
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
                    <p className="font-medium text-2xl">
                      {data?.firstName} {data?.lastName}
                    </p>
                    <p
                      className={`${
                        data?.status === "Active"
                          ? "bg-[#E7F1FE] text-swBlue"
                          : "bg-[#F8A9A3] text-white"
                      } text-xs px-2 py-1 rounded-full text-swBlue`}
                    >
                      {data?.status}
                    </p>
                  </div>
                  <p className="font-light">{data?.email}</p>
                  <p className="font-light">SWL-{data?.staffId}</p>
                  <div className="flex gap-5 items-center mt-5">
                    <Link
                      href={`mailto:${data?.email}`}
                      target="_blank"
                      className="hover:bg-white hover:text-swBlue p-2 rounded-md cursor-pointer"
                    >
                      <MdOutlineEmail size="22" />
                    </Link>
                    <Link
                      href={`tel:${data?.phoneNumber}`}
                      className="hover:bg-white hover:text-swBlue p-2 rounded-md cursor-pointer"
                    >
                      <FiPhone size="20" />
                    </Link>
                    <div
                      className="hover:bg-white hover:text-swBlue p-2 rounded-md cursor-pointer"
                      onClick={() => setIsOpen(true)}
                    >
                      <FiEdit2 size="20" />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex w-80 items-center justify-between text-lg">
                  <p>Role:</p>
                  <p className="">{data?.role?.name}</p>
                </div>
                <div className="flex w-80 items-center justify-between text-lg mt-5">
                  <p>Permissions:</p>
                  <div className="flex">
                    {data?.role?.permissions.map((item, index) => (
                      <div className="flex" key={index}>
                        <span>
                          {item}
                          {index < data?.role?.permissions.length - 1
                            ? ","
                            : ""}
                        </span>
                      </div>
                    ))}
                  </div>
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
              <p>{data?.role?.name}</p>
            </div>
          </div>
        </div>
      </main>
      {/* <CenterModal
        // width={"70%"}
        bgColor={"bg-black bg-opacity-5"}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(!isOpen);
        }}
      > */}
      <main
        className={`fixed top-0 left-0 ${
          isOpen ? "flex" : "hidden"
        }  items-center justify-center w-screen h-screen bg-black bg-opacity-10 z-[120]`}
      >
        <form
          id="add-user-form"
          className="bg-white rounded-2xl max-w-2xl w-full m-5"
        >
          <div className="rounded-2xl overflow-auto border border-swGray h-[80%] scrollbar-hide">
            <div className="bg-swBlue flex justify-between items-center p-3 text-white">
              <div>
                {/* <p className="text-base font-semibold">Add a new staff</p> */}
                <p className="text-base font-semibold">
                  {data?.firstName} {data?.lastName}
                </p>
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
                <p className="w-1/4 font-semibold mr-2">Personal information</p>
                <div className="w-3/4 flex flex-col gap-2">
                  <InputField
                    name="firstName"
                    label="First name"
                    value={formData.firstName}
                    required={true}
                    placeholder="First name"
                    onChange={handleInputChange}
                  />

                  <InputField
                    name="lastName"
                    label="Last name"
                    required={true}
                    value={formData.lastName}
                    placeholder="Last name"
                    onChange={handleInputChange}
                  />

                  <div className="flex gap-3 items-end">
                    <div className="w-full ">
                      <InputField
                        label="Phone number"
                        name="phoneNumber"
                        required={true}
                        value={formData.phoneNumber}
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
                    value={formData.email}
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
                    value={modifyObjects(roleData?.data).find(
                      (option) => option.value === formData.role
                    )}
                    isSearchable={false}
                    optionValue={modifyObjects(roleData?.data)}
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
              <EditableButton
                whiteBtn={true}
                label={"Cancel"}
                onClick={() => setIsOpen(false)}
              />
              <EditableButton
                blueBtn={true}
                disabled={loading === "pending" ? true : false}
                startIcon={
                  loading === "pending" && (
                    <Rings
                      height="20"
                      width="20"
                      color="#ffffff"
                      radius="2"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                      ariaLabel="rings-loading"
                    />
                  )
                }
                label={"Update user"}
                endIcon={<IoMdCheckmark size={20} />}
                onClick={handleSubmit}
              />
            </div>
          </div>
        </form>
      </main>
      {/* </CenterModal> */}
    </DashboardLayout>
  );
};

export default StaffPage;
