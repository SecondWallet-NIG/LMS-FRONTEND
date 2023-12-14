import { MdOutlineEmail } from "react-icons/md";
import InputField from "../shared/input/InputField";
import { FiUser } from "react-icons/fi";
import { FaCircleUser } from "react-icons/fa6";
import EditableButton from "../shared/editableButtonComponent/EditableButton";

const AccountPage = () => {
  return (
    <div className="max-w-3xl mx-auto p-5 my-10">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <FaCircleUser size={80} />
          <div className="font-medium text-lg">
            <p className="text-swBlack">Profile picture</p>
            <p>PNG,JPEG under 15mb</p>
          </div>
        </div>

        <label
          htmlFor="uploadProfilePic"
          className="border py-2 px-3 text-swBlack rounded-md font-semibold cursor-pointer"
        >
          <input type="file" id="uploadProfilePic" className="hidden" />
          Update profile picture
        </label>
      </div>
      <div className="my-10">
        <p className="font-semibold text-lg">Full Name</p>
        <div className="flex gap-5 items-center mt-5">
          <div className="w-full">
            <InputField
              label={"First name"}
              required={true}
              startIcon={<FiUser size={20} />}
              placeholder={"John"}
            />
          </div>
          <div className="w-full">
            <InputField
              label={"Last name"}
              required={true}
              startIcon={<FiUser size={20} />}
              placeholder={"Doe"}
            />
          </div>
        </div>
      </div>

      <div className="mb-10">
        <p className="font-semibold text-lg">Full Name</p>
        <p>Manage your account email for correspondence and login purpose</p>

        <div className="mt-5">
          <InputField
            label={"Email address"}
            required={true}
            startIcon={<MdOutlineEmail size={20} />}
            placeholder={"Johndoe@gmail.com"}
          />
        </div>
      </div>

      <div>
        <p className="font-semibold text-lg">Role</p>
        <p className="my-3">View your account role and access</p>
        <div className="flex ">
          <p className="w-60 font-medium">Role</p>
          <p>Role name to show here</p>
        </div>
        <div className="flex my-3 w-full">
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
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-5 p-3 border-t">
        <EditableButton whiteBtn={true} label={"Cancel"} />
        <EditableButton blueBtn={true} label={"Save changes"} />
      </div>
    </div>
  );
};

export default AccountPage;
