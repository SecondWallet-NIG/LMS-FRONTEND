"use client";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import EditableButton from "@/app/components/shared/editableButtonComponent/EditableButton";
import InputField from "@/app/components/shared/input/InputField";
import SelectField from "@/app/components/shared/input/SelectField";
import { getAllDepartments } from "@/redux/slices/hrmsSlice";
import { getRoles } from "@/redux/slices/roleSlice";
import { getUserById } from "@/redux/slices/userSlice";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";
import { Rings } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";

const StaffUpdatePAge = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [profileImg, setProfileImg] = useState(null);
  const [fileError, setFileError] = useState("");
  const { data, loading } = useSelector((state) => state.user);
  const { data: roleData } = useSelector((state) => state?.role);
  const { data: departments } = useSelector((state) => state?.hrms);
  const [formData, setFormData] = useState({
    profilePicture: null,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "",
    department: "",
    tag: null,
    status: "",
    isRoleAdmin: false,
  });

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

  const preventMinus = (e) => {
    if (/[^0-9,]/g.test(e.key)) {
      e.preventDefault();
    }
  };

  const modifyObjects = (arr) => {
    return Array.isArray(arr)
      ? arr.map((item) => ({
          label: item.name || item.departmentName,
          value: item._id,
        }))
      : [];
  };

  const userStatus = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
  ];

  const handleFileInputChange = (e) => {
    setFileError("");
    const files = Array.from(e.target.files);
    if (e.target.id === "profilePicture" && e.target.files.length > 0) {
      const fileExtension = files[0].name.split(".").pop().toLowerCase();

      const allowedExtensions = ["jpg", "jpeg", "png"];
      if (!allowedExtensions.includes(fileExtension)) {
        setFileError(
          "Invalid file type. Please select an image (.jpg, .jpeg, .png)."
        );
        return;
      }
      setFormData((prev) => ({ ...prev, [e.target.id]: files[0] }));
    } else {
      setSelectedFiles(files);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("firstName", formData.firstName);
    payload.append("lastName", formData.lastName);
    payload.append("email", formData.email);
    payload.append("phoneNumber", formData.phoneNumber);
    payload.append("role", formData.role);
    payload.append("profilePicture", formData.profilePicture);

    dispatch(
      updateUser({ userId: data?.data?.user?._id, updatedData: payload })
    )
      .unwrap()
      .then((res) => {
        toast.success("Profile updated successfully");
        getUserById(data?.data?.user?._id);
        setIsOpen(false);
        //  window.location.reload();
      })
      .catch((error) => {
        toast.error("An error occured");
      });
  };

  console.log("est", data);

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
      department: data?.data?.user?.role?.department?._id,
      isRoleAdmin: false,
      profilePicture: data?.data?.user?.profilePicture,
    });
  }, [data]);

  useEffect(() => {
    dispatch(getUserById(id));
    dispatch(getRoles());
    dispatch(getAllDepartments());
    // dispatch(getStaffTasks(id));
  }, []);
  console.log("role", formData?.department);

  return (
    <DashboardLayout
      isBackNav={true}
      paths={["Team Management", "Staff", "Update Staff"]}
    >
      <div className="flex justify-center p-5">
        <form
          id="add-user-form"
          className="bg-white rounded-2xl max-w-2xl w-full"
        >
          <div className="rounded-2xl overflow-auto">
            <div className="flex justify-between items-center p-3">
              <div>
                <p className="text-2xl lg:text-3xl font-bold text-swBlack">
                  Update Staff Information
                </p>
                <p className="text-sm mt-1">Staff Information</p>
              </div>
            </div>

            <div className="pt-8 px-5 pb-16 overflow-y-auto bg-white relative">
              {/* <div className="flex flex-col"> */}
              <div className="flex">
                <p className="font-semibold my-5 w-1/4">Profile picture</p>
                <div className="flex flex-col">
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
                <p className="w-1/4 font-semibold mr-2">Department</p>
                <div className="w-3/4 flex flex-col gap-3">
                  <SelectField
                    name="department"
                    label={"Select User Department"}
                    required={true}
                    value={modifyObjects(departments?.data?.departments).find(
                      (option) => option.value === formData.department
                    )}
                    isSearchable={false}
                    optionValue={modifyObjects(departments?.data?.departments)}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, "department")
                    }
                  />
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
      </div>
    </DashboardLayout>
  );
};

export default StaffUpdatePAge;