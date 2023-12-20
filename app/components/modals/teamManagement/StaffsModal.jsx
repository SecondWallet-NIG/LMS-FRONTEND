"use client";

import { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMail } from "react-icons/ai";
import InputField from "../../shared/input/InputField";
import SelectField from "../../shared/input/SelectField";
import { createUser } from "@/redux/slices/userSlice";
import Button from "../../shared/buttonComponent/Button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";


const StaffsModal = ({ isOpen, onClose, width, data, selected }) => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.user);
 // const [profileImg, setProfileImg] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const successPopup = (selected) => {
    selected(true);
  };

  const [formData, setFormData] = useState({
  //  profilePicture: null,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "",
    tag: null,
    isRoleAdmin: false,
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    if (e.target.id === "profilePicture" && e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, [e.target.id]: files[0] }));
    } else {
      setSelectedFiles(files);
    }
  };

  console.log(formData);

  const modifyObjects = (arr) => {
    return Array.isArray(arr)
      ? arr.map((item) => ({
          label: item.name,
          value: item._id,
        }))
      : [];
  };

  const modalStyles = {
    width: width || "90%",
    maxWidth: "800px",
  };

  const adminOptions = [
    { value: "CEO", label: "CEO" },
    { value: "CFO", label: "CFO" },
    { value: "CFO", label: "CFO" },
    { value: "Director", label: "Director" },
  ];

  const handleInputChange = async (e) => {
    let { name, value } = e.target;
    setErrors({ ...errors, [name]: "" });
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
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (formData.firstName.trim() === "") {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    if (formData.lastName.trim() === "") {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

    if (formData.email.trim() === "") {
      newErrors.email = "Email address is required";
      isValid = false;
    }
    setErrors(newErrors);

    return isValid;
  };
  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      role: "",
      tag: null,
      isRoleAdmin: false,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      const payload = new FormData();
      payload.append("firstName", formData.firstName);
      payload.append("lastName", formData.lastName);
      payload.append("email", formData.email);
      payload.append("phoneNumber", formData.phoneNumber);
      payload.append("role", formData.role);
      payload.append("tag", formData.tag);
      payload.append("isRoleAdmin", formData.isRoleAdmin);
      dispatch(createUser(formData))
        .unwrap()
        .then(() => {
          successPopup(selected);
          document.getElementById("add-user-form").reset();
          resetForm();
          onClose(); 
         // setProfileImg(null);
        })
        .catch((error) => {
          toast.error(error?.message);
        });
    }
  };

  // useEffect(() => {
  //   if (
  //     formData?.profilePicture !== null &&
  //     formData?.profilePicture &&
  //     (formData?.profilePicture instanceof Blob ||
  //       formData?.profilePicture instanceof File)
  //   ) {
  //     try {
  //       setProfileImg(URL.createObjectURL(formData.profilePicture));
  //     } catch (error) {
  //       console.error("Error creating object URL:", error);
  //     }
  //   } else {
  //     // Handle cases where the selected file is not a Blob or File
  //     console.error("Invalid file type selected.");
  //   }
  // }, [formData?.profilePicture]);

  if (!isOpen) return null;
  return (
    <main className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-10 z-[120]">
      <form
        style={modalStyles}
        id="add-user-form"
        className="bg-white rounded-2xl"
      >
        <div className="rounded-2xl overflow-auto border border-swGray h-[80%] scrollbar-hide">
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
          <div className="pt-8 px-5 pb-16 bg-white relative">
            <div className="flex justify-between mt-5">
              <p className="w-1/4 font-semibold mr-2">Personal information</p>
              <div className="w-3/4 flex flex-col gap-2">
                <InputField
                  name="firstName"
                  label="First name"
                  required={true}
                  placeholder="First name"
                  onChange={handleInputChange}
                />
                {errors.firstName && (
                  <span className="text-red-500 text-xs">
                    {errors.firstName}
                  </span>
                )}
                <InputField
                  name="lastName"
                  label="Last name"
                  required={true}
                  placeholder="Last name"
                  onChange={handleInputChange}
                />
                {errors.lastName && (
                  <span className="text-red-500 text-xs">
                    {errors.lastName}
                  </span>
                )}
                <div className="flex gap-3 items-end">
                  <div className="w-full ">
                    <InputField
                      label="Phone number"
                      name="phoneNumber"
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
                {errors.email && (
                  <span className="text-red-500 text-xs">{errors.email}</span>
                )}
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
                  optionValue={modifyObjects(data?.data)}
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
            <button
              type="button"
              onClick={onClose}
              className="border text-swGray font-semibold p-2 px-16 rounded-md"
            >
              Cancel
            </button>
            <Button
              disabled={loading === "pending" ? true : false}
              onClick={handleSubmit}
              className="block  rounded-full"
            >
              {loading === "pending" ? "Processing" : " Create User"}
            </Button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default StaffsModal;
