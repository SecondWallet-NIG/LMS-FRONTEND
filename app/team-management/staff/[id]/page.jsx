"use client";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import { getRoles } from "@/redux/slices/roleSlice";
import { getUserById } from "@/redux/slices/userSlice";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiEdit2, FiPhone, FiUser } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getStaffTasks } from "@/redux/slices/userTaskSlice";
import dynamic from "next/dynamic";
import Button from "@/app/components/shared/buttonComponent/Button";
import { AiOutlinePlus } from "react-icons/ai";

// import Viewer from "react-viewer";
const Viewer = dynamic(
  () => import("react-viewer"),
  { ssr: false } // This line is important
);

const StaffPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.UserTasks);
  const [profileImg, setProfileImg] = useState(null);
  const [openProfilePic, setOpenProfilePic] = useState(false);
  const [formData, setFormData] = useState({
    profilePicture: null,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "",
    tag: null,
    status: "",
    isRoleAdmin: false,
  });
  const { data, loading } = useSelector((state) => state.user);

  const returnCardDetails = (name, value) => {
    return (
      <div>
        <p>{name}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    );
  };

  useEffect(() => {
    setFormData({
      profilePicture: null,
      firstName: data?.data?.user?.firstName,
      lastName: data?.data?.user?.lastName,
      email: data?.data?.user?.email,
      phoneNumber: data?.data?.user?.phoneNumber,
      role: data?.data?.user?.role?._id,
      tag: data?.data?.user?.role?.tag,
      status: data?.data?.user?.status,
      isRoleAdmin: false,
      profilePicture: data?.data?.user?.profilePicture,
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
    dispatch(getStaffTasks(id));
  }, []);
  return (
    <DashboardLayout
      isBackNav={true}
      paths={["Team management", "Staff profile"]}
    >
      <ToastContainer />
      <main>
        <div className="p-5 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 lg gap-5">
            {/* Personal details */}
            <div className="p-5 border-2 shadow-lg rounded-lg">
              <div className="flex items-start gap-5">
                {data?.data?.user?.profilePicture &&
                  data?.data?.user?.profilePicture !== "null" &&
                  data?.data?.user?.profilePicture !== "undefined" ? (
                  <div className="h-[6rem] w-[6rem] rounded-lg text-swBlue border-swBlue relative overflow-hidden">
                    <Image
                      src={data?.data?.user?.profilePicture}
                      alt="profile"
                      fill
                      sizes="100%"
                      className="cursor-pointer"
                      onClick={() =>
                        data?.data?.user?.profilePicture &&
                        setOpenProfilePic(true)
                      }
                    />
                    {typeof window !== "undefined" ? (
                      <>
                        <Viewer
                          visible={openProfilePic}
                          onClose={() => {
                            setOpenProfilePic(false);
                          }}
                          images={[data?.data?.user?.profilePicture].map(
                            (item) => ({
                              src: item,
                              key: item,
                            })
                          )}
                        />
                      </>
                    ) : null}
                  </div>
                ) : (
                  <div className="h-[6rem] w-[6rem] rounded-md text-swBlue border-swBlue border-2 flex justify-center items-center">
                    <FiUser size={40} />
                  </div>
                )}

                <div>
                  <div className="flex gap-3 items-end">
                    <p className="font-medium text-2xl whitespace-nowrap">
                      {data?.data?.user?.firstName} {data?.data?.user?.lastName}
                    </p>
                  </div>
                  <p className="font-light">{data?.data?.user?.email}</p>
                  <p className="font-light">SWL-{data?.data?.user?.staffId}</p>
                  <div className="flex gap-5 items-center mt-2">
                    <Link
                      href={`mailto:${data?.data?.user?.email}`}
                      target="_blank"
                      className="hover:border-swBlue border-2 border-transparent hover:text-swBlue p-1 rounded-md cursor-pointer"
                    >
                      <MdOutlineEmail size="22" />
                    </Link>
                    <Link
                      href={`tel:${data?.data?.user?.phoneNumber}`}
                      className="hover:border-swBlue border-2 border-transparent hover:text-swBlue p-1 rounded-md cursor-pointer"
                    >
                      <FiPhone size="20" />
                    </Link>
                    <Link
                      href={`/team-management/staff/update/${data?.data?.user?._id}`}
                      className="hover:border-swBlue border-2 border-transparent hover:text-swBlue p-1 rounded-md cursor-pointer"
                    // onClick={() => setIsOpen(true)}
                    >
                      <FiEdit2 size="20" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5 mt-10">
                {returnCardDetails(
                  "Status",
                  // <span
                  //   className={`${
                  //     data?.data?.user?.status === "Active"
                  //       ? "bg-[#E7F1FE] text-swBlue"
                  //       : "bg-[#F8A9A3] text-white"
                  //   } text-xs px-2 py-1 rounded-full text-swBlue`}
                  // >
                  //   {data?.data?.user?.status}
                  // </span>
                  <span
                    className={`${data?.data?.user?.status === "Active"
                      ? "text-green-500"
                      : "text-red-500"
                      }`}
                  >
                    {data?.data?.user?.status}
                  </span>
                )}
                {returnCardDetails("Total Tasks", tasks?.data?.totalCount || 0)}
                {returnCardDetails(
                  "Pending Tasks",
                  tasks?.data?.pendingCount || 0
                )}
                {returnCardDetails(
                  "Completed Tasks",
                  tasks?.data?.doneCount || 0
                )}
              </div>
            </div>

            {/*Leave details */}
            <div className="p-5 border-2 shadow-lg rounded-lg">
              <div className="flex justify-between">
                <p className="text-2xl font-semibold">Leave Details</p>
                {!data?.data?.employeeBenefit && (
                  <Button className="bg-swBlue hover:bg-swBlue500 text-white md:p-[0.37rem] rounded-md ml-2 whitespace-nowrap">
                    <Link href={`/team-management/operations/employee-benefit/add-new/${id}`}
                      className="flex gap-1 items-center p-1"
                    >
                      <AiOutlinePlus size={15} />
                      <p className="block">Add Employee Benefit</p>
                    </Link>
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-5 mt-10">
                {returnCardDetails(
                  "Annual Leave",
                  `${data?.data?.employeeBenefit?.benefitType?.leaveTypes
                    ?.annualLeave || 0
                  } days`
                )}
                {returnCardDetails(
                  "Sick Leave",
                  `${data?.data?.employeeBenefit?.benefitType?.leaveTypes
                    ?.sickLeave || 0
                  } days`
                )}
                {returnCardDetails(
                  "Maternity Leave",
                  `${data?.data?.employeeBenefit?.benefitType?.leaveTypes
                    ?.maternityLeave || 0
                  } days`
                )}
                {returnCardDetails(
                  "Paternity Leave",
                  `${data?.data?.employeeBenefit?.benefitType?.leaveTypes
                    ?.paternityLeave || 0
                  } days`
                )}
                {returnCardDetails(
                  "Unpaid Leave",
                  `${data?.data?.employeeBenefit?.benefitType?.leaveTypes
                    ?.unpaidLeave || 0
                  } days`
                )}
              </div>
            </div>

            {/* Department information */}
            <div className="p-5 border-2 shadow-lg rounded-lg">
              <p className="text-2xl font-semibold">Department Information</p>
              <div className="grid grid-cols-2 gap-5 mt-10">
                {returnCardDetails(
                  "Department Name",
                  data?.data?.user?.role?.department?.departmentName || "None"
                )}
                {returnCardDetails(
                  "Department Code",
                  data?.data?.user?.role?.department?.departmentCode || "None"
                )}
                {returnCardDetails(
                  "Department Head",
                  data?.data?.user?.role?.department?.departmentHead || "None"
                )}
                {returnCardDetails(
                  "Role",
                  data?.data?.user?.role?.name || "None"
                )}
                {returnCardDetails(
                  "Salary",
                  `₦ ${data?.data?.employeeBenefit?.salary?.toLocaleString() || 0
                  }`
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* <div className="bg-swBlue rounded-2xl p-5 sm:p-10">
            <div className="grid grid-cols-1 md:flex justify-between items-center gap-10">
              <div className="bg-white rounded-md p-5 w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="">
                  <p className="text-xl font-semibold mb-2">Tasks</p>
                  <div className="w-full flex flex-col sm:flex-row gap-3">
                    <TasksCard
                      taskName={"Total tasks"}
                      taskAmount={tasks?.data?.totalCount || 0}
                    />
                    <TasksCard
                      taskName={"Pending tasks"}
                      taskAmount={tasks?.data?.pendingCount || 0}
                    />
                    <TasksCard
                      taskName={"Completed tasks"}
                      taskAmount={tasks?.data?.doneCount || 0}
                    />
                  </div>
                </div>
                <div className="">
                  <p className="text-xl font-semibold mb-2">
                    Available Leave Days
                  </p>
                  <div>
                    <div className="flex justify-between">
                      <p>Annual Leave</p>
                      <p>
                        {data?.data?.employeeBenefit?.benefitType?.leaveTypes
                          ?.annualLeave || 0}{" "}
                        days
                      </p>
                    </div>
                    <div className="bg-swBlue w-full p-1 rounded-md" />
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <p>Sick Leave</p>
                      <p>
                        {data?.data?.employeeBenefit?.benefitType?.leaveTypes
                          ?.sickLeave || 0}{" "}
                        days
                      </p>
                    </div>
                    <div className="bg-swBlue w-full p-1 rounded-md" />
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <p>Paternity Leave</p>
                      <p>
                        {data?.data?.employeeBenefit?.benefitType?.leaveTypes
                          ?.paternityLeave || 0}{" "}
                        days
                      </p>
                    </div>
                    <div className="bg-swBlue w-full p-1 rounded-md" />
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <p>Maternity Leave</p>
                      <p>
                        {data?.data?.employeeBenefit?.benefitType?.leaveTypes
                          ?.maternityLeave || 0}{" "}
                        days
                      </p>
                    </div>
                    <div className="bg-swBlue w-full p-1 rounded-md" />
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <p>Unpaid Leave</p>
                      <p>
                        {data?.data?.employeeBenefit?.benefitType?.leaveTypes
                          ?.unpaidLeave || 0}{" "}
                        days
                      </p>
                    </div>
                    <div className="bg-swBlue w-full p-1 rounded-md" />
                  </div>
                </div>
              </div>
              <div>
                <div className="flex w-80 items-center justify-between text-lg">
                  <p>Role:</p>
                  <p className="">{data?.data?.user?.role?.name}</p>
                </div>
                <div className="flex w-80 items-center justify-between text-lg mt-5">
                  <p>Permissions:</p>
                  <div className="flex">
                    {data?.data?.user?.role?.permissions.map((item, index) => (
                      <div className="flex" key={index}>
                        <span>
                          {item}
                          {index <
                          data?.data?.user?.role?.permissions.length - 1
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
              <TasksCard
                taskName={"Total tasks"}
                taskAmount={tasks?.data?.totalCount}
              />
              <TasksCard
                taskName={"Pending tasks"}
                taskAmount={tasks?.data?.pendingCount}
              />
              <TasksCard
                taskName={"Completed tasks"}
                taskAmount={tasks?.data?.doneCount}
              />
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
              <p>{data?.data?.user?.role?.name}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 p-5">
          <div className="flex flex-col gap-5">
            <p className="text-xl font-semibold mb-2">Department</p>
            <div className="flex gap-5">
              <p>Department Name:</p>
              <p>{data?.data?.user?.role?.department?.departmentName}</p>
            </div>
            <div className="flex gap-5">
              <p>Department Code :</p>
              <p>{data?.data?.user?.role?.department?.departmentCode}</p>
            </div>
            <div className="flex gap-5">
              <p>Role:</p>
              <p>{data?.data?.user?.role?.name}</p>
            </div>
            <div className="flex gap-5">
              <p>Department Head:</p>
              <p>
                {data?.data?.user?.role?.department?.departmentHead || "..."}
              </p>
            </div>
            <div className="flex gap-5">
              <p>Salart:</p>
              <p>₦ {data?.data?.employeeBenefit?.salary?.toLocaleString()}</p>
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
                <p className="text-base font-semibold">Add a new staff</p>
                <p className="text-base font-semibold">
                  {data?.data?.user?.firstName} {data?.data?.user?.lastName}
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
              <div className="flex flex-col">
              <div className="flex">
                <p className="font-semibold my-5 w-1/4">Profile picture</p>
                <div className="flex flex-col">
                  <div className="flex gap-5 items-center">
                    {profileImg !== null ? (
                      <div className="h-[8rem] w-[8rem] border-2 rounded-md relative overflow-hidden">
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
                      className="border-2 rounded-lg p-2 px-4 font-semibold cursor-pointer whitespace-nowrap"
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
                  {fileError && (
                    <p className="text-red-500 text-sm mt-2">{fileError}</p>
                  )}
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
              <div className="flex justify-between mt-5">
                <p className="w-1/4 font-semibold mr-2">Status</p>
                <div className="w-3/4 flex flex-col gap-3">
                  <SelectField
                    name="status"
                    label={"Select User Status"}
                    required={true}
                    value={userStatus.find(
                      (option) => option.value === formData.status
                    )}
                    isSearchable={false}
                    optionValue={userStatus}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, "status")
                    }
                  />
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
      </main> */}
      {/* </CenterModal> */}
    </DashboardLayout>
  );
};

export default StaffPage;
