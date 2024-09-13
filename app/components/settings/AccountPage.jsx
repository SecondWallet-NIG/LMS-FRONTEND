"use client";

import { MdOutlineEmail } from "react-icons/md";
import InputField from "../shared/input/InputField";
import { FiUser } from "react-icons/fi";
import { FaCircleUser } from "react-icons/fa6";
import EditableButton from "../shared/editableButtonComponent/EditableButton";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, updateUser } from "@/redux/slices/userSlice";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const AccountPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState(null);
  const [firstName, setFirstName] = useState(userDetails?.firstName);
  const [lastName, setLastName] = useState(userDetails?.lastName);
  const [email, setEmail] = useState(userDetails?.email);
  const [profileImg, setProfileImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    profilePicture: null,
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });
  // console.log({ userDetails });
  // console.log("userDetails", formData);

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    if (e.target.id === "profilePicture" && e.target.files.length > 0) {
      const fileExtension = files[0].name.split(".").pop().toLowerCase();

      const allowedExtensions = ["jpg", "jpeg", "png"];
      if (!allowedExtensions.includes(fileExtension)) {
        alert("Invalid file type. Please select an image (.jpg, .jpeg, .png).");
        return;
      }
      setFormData((prev) => ({ ...prev, [e.target.id]: files[0] }));
    } else {
      setSelectedFiles(files);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = new FormData();
    payload.append("profilePicture", formData.profilePicture);
    payload.append("firstName", formData.firstName);
    payload.append("lastName", formData.lastName);
    payload.append("email", formData.email);

    dispatch(updateUser({ userId: userDetails?._id, updatedData: payload }))
      .unwrap()
      .then((res) => {
        toast.success("Profile updated successfully");
        getUserById(userDetails?._id);
        setLoading(false);

        const user = JSON.parse(localStorage.getItem("user"));
        user.data.user = res;
        localStorage.setItem("user", JSON.stringify(user));

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        toast.error("An error occured");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log({ user });
      setUserDetails(user?.data?.user);
    }
  }, []);

  useEffect(() => {
    setFirstName(userDetails?.firstName);
    setLastName(userDetails?.lastName);
    setEmail(userDetails?.email);
    setFormData({
      profilePicture: userDetails?.profilePicture,
      firstName: userDetails?.firstName,
      lastName: userDetails?.lastName,
      email: userDetails?.email,
      role: userDetails?.role?.name,
    });
  }, [userDetails]);

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
    <div className="max-w-3xl mx-auto p-5 my-10">
      <ToastContainer />
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
          <div>
            {userDetails?.profilePicture ? (
              <div className="h-[4.7rem] w-[4.7rem] border-2 rounded-full relative overflow-hidden">
                <Image
                  src={userDetails?.profilePicture}
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
          </div>
        )}

        <label
          htmlFor="profilePicture"
          className="border-2 rounded-lg p-1 px-2 font-semibold cursor-pointer"
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
      <div className="my-10">
        <p className="font-semibold text-lg">Full Name</p>
        <div className="flex gap-5 items-center mt-5">
          <div className="w-full">
            <InputField
              label={"First name"}
              required={true}
              disabled={true}
              startIcon={<FiUser size={20} />}
              placeholder={"John"}
              value={formData?.firstName}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, firstName: e.target.value }));
              }}
            />
          </div>
          <div className="w-full">
            <InputField
              label={"Last name"}
              required={true}
              disabled={true}
              startIcon={<FiUser size={20} />}
              placeholder={"Doe"}
              value={formData?.lastName}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, lastName: e.target.value }));
              }}
            />
          </div>
        </div>
      </div>

      <div className="mb-10">
        <p className="font-semibold text-lg">Email</p>
        <p>Manage your account email for correspondence and login purpose</p>

        <div className="mt-5">
          <InputField
            label={"Email address"}
            required={true}
            startIcon={<MdOutlineEmail size={20} />}
            disabled={true}
            placeholder={"Johndoe@gmail.com"}
            value={formData?.email}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, email: e.target.value }));
            }}
          />
        </div>
      </div>

      <div>
        <p className="font-semibold text-lg">Role</p>
        <p className="my-3">View your account role and access</p>
        <div className="flex ">
          <p className="w-60 font-medium">Role</p>
          <p>{formData?.role}</p>
        </div>
        {/* <div className="flex my-3 w-full">
          <p className="w-60 font-medium">Permissions</p>
          <div className="p-5 flex flex-col gap-3">
            <div className="w-full flex">
              <p className="w-60 font-medium">Dashboard</p>
              <div className="w-full flex justify-between pb-2 border-b">
                <p className="w-60 font-medium text-sm">View Dashboard</p>
                <input type="checkbox" />
              </div>
            </div>

            <div className="w-full flex">
              <p className="w-60 font-medium">My tasks</p>
              <div className="w-full flex justify-between pb-2 border-b">
                <p className="w-60 font-medium text-sm">View tasks page</p>
                <input type="checkbox" />
              </div>
            </div>

            <div className="w-full flex">
              <p className="w-60 font-medium">Dashboard</p>

              <div className="flex flex-col border-b w-full">
                <div className="w-full flex justify-between pb-2 ">
                  <p className="w-60 font-medium text-sm">
                    View all information
                  </p>
                  <input type="checkbox" />
                </div>

                <div className="w-full flex justify-between pb-2">
                  <p className="w-60 font-medium text-sm">Edit details</p>
                  <input type="checkbox" />
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      <div className="flex justify-end gap-3 mt-5 p-3 border-t">
        <EditableButton
          whiteBtn={true}
          label={"Cancel"}
          onClick={() => router.back()}
        />
        <EditableButton
          blueBtn={true}
          disabled={loading ? true : false}
          // disabled={true}
          label={"Save changes"}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AccountPage;
