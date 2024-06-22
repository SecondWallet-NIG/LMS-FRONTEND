import { useState } from "react";
import { IoClose } from "react-icons/io5";
import InputField from "../shared/input/InputField";
import EditableButton from "../shared/editableButtonComponent/EditableButton";

const CreateAssetModal = ({ open, onClose }) => {
  const [newCategory, setNewCategory] = useState("");
  if (!open) return null;
  return (
    <main className="fixed h-full w-full top-0 left-0 bg-black bg-opacity-25 p-5 flex justify-center items-center z-[110]">
      <div className="max-w-lg w-full p-5 bg-white rounded-xl">
        <div className="flex justify-between items-center gap-5">
          <div>
            <p className="text-xl font-semibold text-swBlack">
              Add asset Category
            </p>
            <p>This category helps to organise each asset</p>
          </div>
          <IoClose
            size={20}
            className="ml-auto"
            onClick={() => onClose(false)}
          />
        </div>

        <div className="mt-5">
          <InputField
            label="Asset catergory"
            required={true}
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />

          <div className="flex gap-5 mt-5">
            <EditableButton className="bg-gray-200 w-full" label="Cancel" />
            <EditableButton
              className={`${newCategory ? "bg-swBlue text-white" : "bg-gray-200"} w-full`}
              label="Add"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateAssetModal;
