import { useState } from "react";
import { IoClose } from "react-icons/io5";
import InputField from "../shared/input/InputField";
import EditableButton from "../shared/editableButtonComponent/EditableButton";
import { useDispatch } from "react-redux";
import {
  creatAssetCategory,
  getAllAssetCategories,
} from "@/redux/slices/assetManagementSlice";
import { ToastContainer, toast } from "react-toastify";
import {
  createExpenseCategory,
  getAllExpenseCategories,
} from "@/redux/slices/expenseManagementSlice";

const CreateAssetModal = ({
  open,
  onClose,
  setAssetTypeOptions,
  setExpenseTypeOptions,
  type,
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFormData({ name: "", description: "" });
  };

  const handleSubmit = () => {
    setLoading(true);
    if (type === "asset") {
      dispatch(creatAssetCategory(formData))
        .unwrap()
        .then((res) => {
          if (res.success === true) {
            toast.success(res.message);
            setTimeout(() => {
              dispatch(getAllAssetCategories())
                .unwrap()
                .then((res) => setAssetTypeOptions(res?.data))
                .catch((err) => console.log({ err }));
              onClose(false);
              resetForm();
              setLoading(false);
            }, 2000);
          }
        })
        .catch((error) => {
          toast.error(error.message);
          setLoading(false);
        });
    } else {
      dispatch(createExpenseCategory(formData))
        .unwrap()
        .then((res) => {
          if (res.success === true) {
            toast.success(res.message);

            setTimeout(() => {
              dispatch(getAllExpenseCategories())
                .unwrap()
                .then((res) => setExpenseTypeOptions(res?.data))
                .catch((err) => console.log({ err }));
              onClose(false);
              resetForm();
              setLoading(false);
            }, 2000);
          }
        })
        .catch((error) => {
          toast.error(error.message);
          setLoading(false);
        });
    }
  };

  if (!open) return null;
  return (
    <main className="fixed h-full w-full top-0 left-0 bg-black bg-opacity-25 p-5 flex justify-center items-center z-[110]">
      <ToastContainer />
      <div className="max-w-lg w-full p-5 bg-white rounded-xl">
        <div className="flex justify-between items-center gap-5">
          <div>
            <p className="text-xl font-semibold text-swBlack">
              {type === "asset" ? "Add asset category" : "Add expense category"}
            </p>
            <p>
              This category helps to organise each{" "}
              {type === "asset" ? "asset" : "category"}
            </p>
          </div>
          <IoClose
            size={20}
            className="ml-auto cursor-pointer"
            onClick={() => {
              resetForm();
              onClose(false);
            }}
          />
        </div>

        <div className="mt-5">
          <InputField
            label={`${
              type === "asset" ? "Asset category" : "Expense category"
            }`}
            name={"name"}
            required={true}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <div className="mt-3">
            <p className="block text-gray-700 text-sm mb-2">
              Description
              <span className="text-red-600 ml-1">*</span>
            </p>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="5"
              className="w-full h-20 px-3 py-2 rounded border border-gray-300 focus:outline-none"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="flex gap-5 mt-5">
            <EditableButton
              className="bg-gray-200 w-full"
              label="Cancel"
              onClick={() => {
                resetForm();
                onClose(false);
              }}
            />
            <EditableButton
              className={`${
                Object.values(formData).some((e) => e === "") || loading
                  ? "bg-gray-200 cursor-not-allowed pointer-events-none"
                  : "bg-swBlue text-white "
              } w-full`}
              label="Add"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateAssetModal;
