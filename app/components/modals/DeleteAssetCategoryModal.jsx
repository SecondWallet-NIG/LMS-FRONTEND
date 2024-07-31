import { IoClose } from "react-icons/io5";
import { ToastContainer } from "react-toastify";
import SelectField from "../shared/input/SelectField";
import { getAllAssetCategories } from "@/redux/slices/assetManagementSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import EditableButton from "../shared/editableButtonComponent/EditableButton";
import { getAllExpenseCategories } from "@/redux/slices/expenseManagementSlice";

const DeleteAssetCategoryModal = ({ open, onClose, type }) => {
  const dispatch = useDispatch();
  const [assetTypeOptions, setAssetTypeOptions] = useState([]);
  const [formData, setFormData] = useState({ category: "" });
  const [loading, setLoading] = useState(false);

  const transformedOptions = assetTypeOptions.map((option) => ({
    value: option?.name,
    label: option?.name,
  }));

  const handleSubmit = () => {};

  useEffect(() => {
    dispatch(
      type === "asset" ? getAllAssetCategories() : getAllExpenseCategories()
    )
      .unwrap()
      .then((res) => setAssetTypeOptions(res?.data))
      .catch((err) => console.log({ err }));

    // setLoading(false);
  }, []);

  if (!open) return null;
  return (
    <main className="fixed h-full w-full top-0 left-0 bg-black bg-opacity-25 p-5 flex justify-center items-center z-[110]">
      <ToastContainer />
      <div className="max-w-sm w-full p-5 bg-white rounded-xl">
        <div className="flex justify-between items-center gap-5">
          <div>
            <p className="text-xl font-semibold text-swBlack">
              {type === "asset"
                ? "Delete asset category"
                : "Delete expense category"}
            </p>
            {/* <p>This category helps to organise each asset</p> */}
          </div>
          <IoClose
            size={20}
            className="ml-auto cursor-pointer"
            onClick={() => {
              setFormData({ category: "" });
              onClose(false);
            }}
          />
        </div>

        <div className="w-full mt-5">
          <SelectField
            label={`${
              type === "asset" ? "Asset category" : "Expense category"
            }`}
            required={true}
            optionValue={transformedOptions}
            name="category"
            value={transformedOptions.find(
              (option) => option.value === formData.category
            )}
            onChange={(selectedOption) =>
              setFormData((prev) => ({
                ...prev,
                category: selectedOption.value,
              }))
            }
          />
        </div>

        <div className="flex gap-5 mt-5">
          <EditableButton
            className="bg-gray-200 w-full"
            label="Cancel"
            onClick={() => {
              setFormData({ category: "" });
              onClose(false);
            }}
          />
          <EditableButton
            className={`${
              Object.values(formData).some((e) => e === "") || loading
                ? "bg-gray-200 cursor-not-allowed pointer-events-none"
                : "bg-swBlue text-white "
            } w-full`}
            label="Delete"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </main>
  );
};

export default DeleteAssetCategoryModal;
