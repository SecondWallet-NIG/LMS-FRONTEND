"use client";
import DashboardLayout from "../dashboardLayout/DashboardLayout";
import { getRoles } from "@/redux/slices/roleSlice";
import { getUserById } from "@/redux/slices/userSlice";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getStaffTasks } from "@/redux/slices/userTaskSlice";
import dynamic from "next/dynamic";
import StaffPersonalDetails from "./PersonalDetails";
import StaffLeaveDetails from "./LeaveDetails";
import StaffDeptInfo from "./DepartmentInformation";

// import Viewer from "react-viewer";
const Viewer = dynamic(
    () => import("react-viewer"),
    { ssr: false }
);

const StaffData = ({ path, isDashboard }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [profileImg, setProfileImg] = useState(null);
    const { data, loading } = useSelector((state) => state.user);
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
            paths={path}
        >
            <ToastContainer />
            <main>
                <div className="p-5 sm:p-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 lg gap-5">
                        {/* Personal details */}
                        <StaffPersonalDetails data={data?.data} />

                        {/*Leave details */}
                        <StaffLeaveDetails data={data?.data} id={id} isDashboard={isDashboard} />

                        {/* Department information */}
                        <StaffDeptInfo />
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

export default StaffData;
