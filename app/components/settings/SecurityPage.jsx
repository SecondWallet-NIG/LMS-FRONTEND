"use client";
import { FiLock, FiUser } from "react-icons/fi";
import InputField from "../shared/input/InputField";
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import EditableButton from "../shared/editableButtonComponent/EditableButton";

const SecurityPage = () => {
  const [viewCurrentPassword, setViewCurrentPassword] = useState(false);
  const [viewNewPassword, setViewNewPassword] = useState(false);
  return (
    <div className="max-w-3xl mx-auto p-5 my-10">
      <p className="font-medum">Update your password and login information.</p>
      <p className="font-semibold text-lg">Password</p>
      <div className="flex gap-5 items-center mt-5">
        <div className="w-full">
          <InputField
            label={"Current password"}
            required={true}
            startIcon={<FiLock size={20} />}
            placeholder={"Enter current password"}
            endIcon={
              !viewCurrentPassword ? (
                <IoEyeOutline
                  size={20}
                  onClick={() => setViewCurrentPassword(!viewCurrentPassword)}
                />
              ) : (
                <FaRegEyeSlash
                  size={20}
                  onClick={() => setViewCurrentPassword(!viewCurrentPassword)}
                />
              )
            }
          />
        </div>
        <div className="w-full">
          <InputField
            label={"New password"}
            required={true}
            startIcon={<FiLock size={20} />}
            placeholder={"Enter new password"}
            endIcon={
              !viewNewPassword ? (
                <IoEyeOutline
                  size={20}
                  onClick={() => setViewNewPassword(!viewNewPassword)}
                />
              ) : (
                <FaRegEyeSlash
                  size={20}
                  onClick={() => setViewNewPassword(!viewNewPassword)}
                />
              )
            }
          />
        </div>
      </div>
      <div className="flex justify-end gap-3 mt-10 p-3 border-t">
        <EditableButton whiteBtn={true} label={"Cancel"} />
        <EditableButton blueBtn={true} label={"Save changes"} />
      </div>
    </div>
  );
};

export default SecurityPage;
