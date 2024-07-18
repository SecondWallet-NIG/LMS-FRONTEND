import { IoClose } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import EditableButton from "../shared/editableButtonComponent/EditableButton";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { deleteSingleInvestmentProduct } from "@/redux/slices/investmentSlice";

const DeleteInvesmentProductModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    dispatch(deleteSingleInvestmentProduct(id))
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
        setTimeout(() => {
          router.push("/investors");
        }, 1000);
      })
      .catch((err) => {
        toast.error(err?.message);
        setLoading(false);
      });
  };

  if (!open) return null;
  return (
    <main className="fixed h-full w-full top-0 left-0 bg-black bg-opacity-25 p-5 flex justify-center items-center z-[110]">
      <ToastContainer />
      <div className="max-w-sm w-full bg-white rounded-xl">
        <div className="flex justify-between items-center gap-5 p-5 border-b">
          <div>
            <p className="text-xl font-semibold text-swBlack">Delete Product</p>
            {/* <p>This category helps to organise each asset</p> */}
          </div>
          <IoClose
            size={20}
            className="ml-auto cursor-pointer"
            onClick={() => {
              onClose(false);
            }}
          />
        </div>

        <div className="flex flex-col justify-center items-center text-sm">
          <Image
            src="/images/red_delete_icon.png"
            width={50}
            height={50}
            className="my-5"
          />
          <p>Are you sure you want to delete this product?</p>
        </div>

        <div className="flex gap-5 mt-5 p-4 border-t">
          <EditableButton
            className="bg-gray-200 w-full"
            label="Cancel"
            onClick={() => {
              onClose(false);
            }}
          />
          <EditableButton
            className={`${
              loading
                ? "bg-gray-200 cursor-not-allowed pointer-events-none"
                : "bg-red-500 text-white "
            } w-full`}
            label="Yes, Delete"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </main>
  );
};

export default DeleteInvesmentProductModal;
