import { IoMdClose } from "react-icons/io";

const BorrowerOptions = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <main className="fixed top-0 left-0 w-screen h-screen border bg-black bg-opacity-25 flex justify-center items-center z-[200] p-5">
      <div className="max-w-lg w-full rounded-xl bg-white p-5">
        <div className="flex items-center justify-between">
          <p>Blacklist Customer</p>
          <div
            onClick={() => onClose(false)}
            className="p-2 rounded-lg hover:bg-gray-200 cursor-pointer"
          >
            <IoMdClose size={20} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default BorrowerOptions;
