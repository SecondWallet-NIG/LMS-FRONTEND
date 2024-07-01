import { IoClose } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import { deleteSingleAsset } from "@/redux/slices/assetManagementSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import EditableButton from "../shared/editableButtonComponent/EditableButton";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { deleteSingleExpense } from "@/redux/slices/expenseManagementSlice";

const DeleteAssetModal = ({ open, onClose, type }) => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    dispatch(type === "asset" ? deleteSingleAsset(id) : deleteSingleExpense(id))
      .unwrap()
      .then((res) => {
        toast.success(
          type === "asset"
            ? "Asset deleted successfully"
            : "Expense deleted successfully"
        );
        setTimeout(() => {
          router.push(type === "asset" ? "/asset-management" : "/expenses");
        }, 2000);
      })
      .catch((err) => {
        toast.error("An error occured. Please try again");
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
  };

  if (!open) return null;
  return (
    <main className="fixed h-full w-full top-0 left-0 bg-black bg-opacity-25 p-5 flex justify-center items-center z-[110]">
      <ToastContainer />
      <div className="max-w-sm w-full p-5 bg-white rounded-xl">
        <div className="flex justify-between items-center gap-5">
          <div>
            <p className="text-xl font-semibold text-swBlack">
              Delete {type === "asset" ? "Asset" : "Expense"}
            </p>
          </div>
          <IoClose
            size={20}
            className="ml-auto cursor-pointer"
            onClick={() => onClose(false)}
          />
        </div>

        <div className="flex flex-col justify-center items-center gap-5 mt-5">
          <Image
            src="/images/warning.gif"
            alt="warning"
            height={50}
            width={50}
          />
          <p className="text-center">
            Are you sure you want to delete this{" "}
            {type === "asset" ? "asset" : "expense"}?
          </p>
        </div>

        <div className="flex gap-5 mt-5">
          <EditableButton
            className="bg-gray-200 w-full"
            label="Cancel"
            onClick={() => onClose(false)}
          />
          <EditableButton
            className={`bg-red-500 text-white w-full`}
            label="Yes, Delete"
            disabled={loading}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </main>
  );
};

export default DeleteAssetModal;
