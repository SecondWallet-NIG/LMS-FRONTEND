import React from "react";
import Button from "../shared/buttonComponent/Button";

const SuccessModal = ({ isOpen, onClose, children, width }) => {
  if (!isOpen) return null;
  const modalStyles = {
    width: width || "90%", // Use full width on mobile
    maxWidth: "500px", // Set a maximum width for larger screens
  };

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-md" style={modalStyles}>
        <div className="flex justify-between">
          <p className="text-lg font-semibold">Successfully created</p>

          <button
            className="text-white bg-gray-400 pl-2 pr-2"
            onClick={onClose}
          >
            X
          </button>
        </div>

        <main className="max-w-3xl mx-auto p-2 mt-10 text-sm">
          <div className="flex flex-col gap-5 mt-5">
            Customers profile has been successfully created. You can update the
            profile or create a new customer
          </div>
          <div className="flex ">
            <Button
              disabled={true}
              variant={"secondary"}
              className="py-2 px-9 rounded-md flex gap-2 border w-fit mt-10"
            >
              View Customer
            </Button>
            <Button
              disabled={true}
              variant={"secondary"}
              className="py-2 px-9 rounded-md flex gap-2 border w-fit mt-10"
            >
              View Customer
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SuccessModal;
