import React from "react";
import Button from "../shared/buttonComponent/Button";
import InputField from "../shared/input/InputField";
import SelectField from "../shared/input/SelectField";

const EmploymentDetailsModal = ({ isOpen, onClose, children, width }) => {
  if (!isOpen) return null;
  const modalStyles = {
    width: width || '90%', // Use full width on mobile
    maxWidth: '1000px', // Set a maximum width for larger screens
  };
  

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-md" style={modalStyles}>
       <div className="text-end">
       <button
          className="text-white bg-gray-400 pl-2 pr-2"
          onClick={onClose}
        >
          X
        </button>
       </div>

        <main className="max-w-3xl mx-auto p-2 mt-10 text-sm">
          <div className="flex justify-between">
            <p className="text-lg font-semibold">
              Employment and Income Information
            </p>

          </div>

          <div className="flex flex-col gap-5 mt-5">
          <InputField
                  placeholder="Date of Birth"
                  inputType={"date"}
                  required={true}
                  activeBorderColor="border-swBlue"
                  label="Date of Birth"
                  isActive="loan-amount"
                />
            <div className="flex space-x-4">
              <div className="w-1/2">
                <InputField
                  required={true}
                  hintText={""}
                  activeBorderColor="border-swBlue"
                  label="First Name"
                  placeholder="Enter first name"
                  isActive="loan-amount"
                  onclick={() => {
                    isInputOpen === "loan-amount"
                      ? setIsInputOpen(null)
                      : setIsInputOpen("loan-amount");
                  }}
                  
                />
              </div>
              <div className="w-1/2">
                <InputField
                  required={true}
                  hintText={""}
                  activeBorderColor="border-swBlue"
                  label="Last Name"
                  placeholder="Enter middle name"
                  isActive="loan-amount"
                  onclick={() => {
                    isInputOpen === "loan-amount"
                      ? setIsInputOpen(null)
                      : setIsInputOpen("loan-amount");
                  }}
                  
                />
              </div>
            
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <InputField
                  required={true}
                  hintText={""}
                  activeBorderColor="border-swBlue"
                  label="First Name"
                  placeholder="Enter first name"
                  isActive="loan-amount"
                  onclick={() => {
                    isInputOpen === "loan-amount"
                      ? setIsInputOpen(null)
                      : setIsInputOpen("loan-amount");
                  }}
                  
                />
              </div>
              <div className="w-1/2">
                <InputField
                  required={true}
                  hintText={""}
                  activeBorderColor="border-swBlue"
                  label="Last Name"
                  placeholder="Enter middle name"
                  isActive="loan-amount"
                  onclick={() => {
                    isInputOpen === "loan-amount"
                      ? setIsInputOpen(null)
                      : setIsInputOpen("loan-amount");
                  }}
                  
                />
              </div>
            
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <InputField
                  required={true}
                  hintText={""}
                  activeBorderColor="border-swBlue"
                  label="First Name"
                  placeholder="Enter first name"
                  isActive="loan-amount"
                  onclick={() => {
                    isInputOpen === "loan-amount"
                      ? setIsInputOpen(null)
                      : setIsInputOpen("loan-amount");
                  }}
                  
                />
              </div>
              <div className="w-1/2">
                <InputField
                  required={true}
                  hintText={""}
                  activeBorderColor="border-swBlue"
                  label="Last Name"
                  placeholder="Enter middle name"
                  isActive="loan-amount"
                  onclick={() => {
                    isInputOpen === "loan-amount"
                      ? setIsInputOpen(null)
                      : setIsInputOpen("loan-amount");
                  }}
                  
                />
              </div>
            
            </div>
         

            <InputField
              required={true}
              activeBorderColor="border-swBlue"
              label="Social security number or NIN"
              placeholder="Social security number or NIN"
              isActive="loan-amount"
              onclick={() => {
                isInputOpen === "loan-amount"
                  ? setIsInputOpen(null)
                  : setIsInputOpen("loan-amount");
              }}
              
            />
          </div>
       

          <Button
            disabled={true}
            variant={"secondary"}
            className="py-2 px-9 rounded-md flex gap-2 border w-fit mt-10"
          >
            Save Info
          </Button>
        </main>
      </div>
    </div>
  );
};

export default EmploymentDetailsModal;
