"use client";
import { useState, useEffect } from "react";
import InputField from "@/app/components/shared/input/InputField";
import SelectField from "@/app/components/shared/input/SelectField";
import { createUser } from "@/redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { FiUser } from "react-icons/fi";
import EditableButton from "@/app/components/shared/editableButtonComponent/EditableButton";
import { Rings } from "react-loader-spinner";
import { IoMdCheckmark } from "react-icons/io";
import { getRoles } from "@/redux/slices/roleSlice";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import SuccessModal from "@/app/components/modals/SuccessModal";
import CancelModal from "@/app/components/modals/CancelModal";
import { useImmer } from "use-immer";

const NewStaffPage = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.user);
    const { data } = useSelector((state) => state?.role);
    const [profileImg, setProfileImg] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fileError, setFileError] = useState("");
    const [isLoading, setLoading] = useState(false)
    const [state, setState] = useImmer({
        successModal: false,
        successMessage: "",
        failedModal: false,
        failedMessage: ""
    })

    const [formData, setFormData] = useState({
        profilePicture: null,
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        role: "",
        // tag: null,
        isRoleAdmin: false,
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    const rings = <Rings
        height="20"
        width="20"
        color="#ffffff"
        radius="2"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="rings-loading"
    />

    useEffect(() => {
        dispatch(getRoles());
    }, []);

    const handleFileInputChange = (e) => {
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

    const modifyObjects = (arr) => {
        return Array.isArray(arr)
            ? arr.map((item) => ({
                label: item.name,
                value: item._id,
            }))
            : [];
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
        setLoading(true)
        const isValid = validateForm();
        if (isValid) {
            const payload = new FormData();
            payload.append("firstName", formData.firstName);
            payload.append("profilePicture", formData.profilePicture);
            payload.append("lastName", formData.lastName);
            payload.append("email", formData.email);
            payload.append("phoneNumber", formData.phoneNumber);
            payload.append("role", formData.role);
            //  payload.append("tag", formData.tag);
            payload.append("isRoleAdmin", formData.isRoleAdmin);

            dispatch(createUser(payload))
                .unwrap()
                .then((res) => {
                    dispatch(getRoles());
                    document.getElementById("add-user-form").reset();
                    resetForm();
                    setLoading(false)
                    setState(draft => {
                        draft.successMessage = res?.message
                        draft.successModal = true
                    })
                    // setProfileImg(null);
                })
                .catch((err) => {
                    setProfileImg(null);
                    setLoading(false)
                    setState(draft => {
                        draft.failedMessage = err?.message
                        draft.failedModal = true
                    })
                });
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
        <DashboardLayout isBackNav={true} paths={["Team Management", "New Staff"]}>
            <main className="mx-auto w-full px-5 lg:px-1 lg:w-3/5 my-20">
                <form
                    id="add-user-form"
                    className=""
                >
                    <div className="">
                        <div className="flex justify-between items-center p-3">
                            <div>
                                <p className="text-2xl lg:text-3xl font-bold text-swBlack">Add New Staff</p>
                                <p className="text-sm mt-1">Staff Information</p>
                            </div>
                        </div>
                        <div className="pt-8 pb-16">
                            <div className="flex">
                                <p className="font-semibold my-5 w-1/4">Profile Picture</p>
                                <div>
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
                                    {fileError && (
                                        <p className="text-red-500 text-sm mt-2">{fileError}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-between mt-7">
                                <p className="w-1/4 font-semibold mr-2">Personal Information</p>
                                <div className="w-3/4 flex flex-col gap-5">
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
                                                required={true}
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
                                        label={"Select user role"}
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
                            <EditableButton
                                blueBtn={true}
                                disabled={loading === "pending" || !formData.firstName || !formData.lastName || 
                                    !formData.email || !formData.role ? true : false}
                                startIcon={isLoading ? rings : state.successModal ? <IoMdCheckmark size={20} /> : ""}
                                label={"Create User"}
                                onClick={handleSubmit}
                            />
                        </div>
                    </div>
                </form>
            </main>

            <SuccessModal
                isOpen={state.successModal}
                description={state.successMessage}
                title={"Staff Created Successfully"}
                noButtons={true}
                onClose={() => setState(draft => {
                    draft.successModal = false
                })}
            />
            <CancelModal
                isOpen={state.failedModal}
                description={state.failedMessage}
                title={"Staff Creation Failed"}
                noButtons={true}
                onClose={() => setState(draft => {
                    draft.failedModal = false
                })}
            />
        </DashboardLayout>
    );
};

export default NewStaffPage;
