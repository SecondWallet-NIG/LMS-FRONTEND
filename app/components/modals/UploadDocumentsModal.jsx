import { AiOutlineClose } from "react-icons/ai";
import CenterModal from "./CenterModal";
import { FaPaperclip } from "react-icons/fa";
import EditableButton from "../shared/editableButtonComponent/EditableButton";
import { IoMdCheckmark } from "react-icons/io";
import { useState } from "react";
import { FiTrash } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { identityVerification } from "@/redux/slices/customerSlice";
import SuccessModal from "./SuccessModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Rings } from "react-loader-spinner";
import CancelModal from "./CancelModal";

const UploadDocumentsModal = ({ isOpen, onClose, customerID, cload }) => {
  const dispatch = useDispatch();
  const [selectedFilesArr, setSelectedFilesArr] = useState([]);
  const [selectedFilesObj, setSelectedFilesObj] = useState({});
  const [successModal, setSuccessModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);

  const { loading, error, data } = useSelector((state) => state.customer);

  if (!isOpen) return null;

  // This puts the names of  all the selected forms in an array
  const keysArray = Object.keys(selectedFilesObj);

  const handleFileInputChange = (e, formName) => {
    const { files, value } = e.target;

    // Checks if more than one file is being uploaded at once
    if (files.length === 1) {
      // Checks if a the form name is icluded in the array and if its less than 4mb
      if (
        !Object.keys(selectedFilesObj).includes(formName) &&
        files[0].size <= 4 * 1024 * 1024
      ) {
        setSelectedFilesObj((prev) => ({ ...prev, [formName]: files[0] }));
        setSelectedFilesArr((prev) => [...prev, { [formName]: files[0] }]);
      } else {
        if (Object.keys(selectedFilesObj).includes(formName)) {
          // setFileUploadedError(`You've uploaded a file for ${formName} previously`)
          alert(`You've uploaded a file for ${formName} previously`);
          return null;
        }
        if (files[0].size > 4 * 1024 * 1024) {
          alert("file size is greater than 4mb");
        }
      }
    } else {
      // setFileLengthError("You chose more than one file");
      alert(`You chose more than one file for ${formName}`);
    }
  };

  const handleFileDelete = (fileName, fileIndex) => {
    const updatedArr = [...selectedFilesArr];
    updatedArr.splice(fileIndex, 1);
    setSelectedFilesArr(updatedArr);

    const updatedObj = { ...selectedFilesObj };
    delete updatedObj[fileName];
    setSelectedFilesObj(updatedObj);
  };

  function resetUploadModal() {
    onClose("uploadDocuments");
    setSelectedFilesArr([]);
    setSelectedFilesObj({});
    setCancelModal(false);
  }

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("utilityBill", selectedFilesObj["Utility bill"]);
    payload.append(
      "statementOfAccount",
      selectedFilesObj["Statement of account"]
    );
    payload.append("idCard", selectedFilesObj["ID card"]);
    payload.append("kyc", selectedFilesObj["ID card"]);
    payload.append("powerOfAttorney", selectedFilesObj["Power of attorney"]);
    payload.append("transferOfOwnership", selectedFilesObj["ID card"]);
    payload.append("customerProfileInformation", customerID);

    dispatch(identityVerification(payload))
      .unwrap()
      .then(() => {
        console.log("Profile successfully updated");
        toast.success("Profile successfully updated");
        resetUploadModal();
        successModal(true);
      })
      .catch((error) => {
        toast.error(`An error occured`);
      });
  };

  return (
    <CenterModal isOpen={isOpen}>
      <ToastContainer />
      <div>
        <div className="bg-swBlue flex justify-between items-center p-3 text-white">
          <div>
            <p className="text-lg font-semibold">Work details</p>
            <p className="text-xs">Update work details and information </p>
          </div>
          <AiOutlineClose
            size={20}
            onClick={() => onClose("uploadDocuments")}
            className="cursor-pointer"
          />
        </div>
        <div className="p-5 pb-0 my-2">
          <p className="text-lg font-semibold text-swBlack">
            Identity verification/ Document
          </p>
          <p className="text-xs">
            Document types uploaded should be JPEGS, PNG or PDF and should not
            exceed 4mb
          </p>
          <div className="flex flex-col gap-5">
            <p className="text-sm font- mt-5">Upload Application Form</p>

            {selectedFilesArr.length > 0 &&
              selectedFilesArr.map((item, index) => (
                <div className="flex flex-col gap-2 text-sm" key={index}>
                  <div className="w-full border rounded-md flex justify-between">
                    <div className="flex gap-1">
                      <p className="p-1 pl-2">{keysArray?.[index]}:</p>
                      <p className="py-1">{item?.[keysArray?.[index]]?.name}</p>
                    </div>
                    <div className="flex gap-1">
                      <p className="py-1">
                        {item?.[keysArray?.[index]]?.size < 1024
                          ? `${item?.[keysArray?.[index]]?.size} bytes`
                          : item?.[keysArray?.[index]]?.size < 1024 * 1024
                          ? `${(
                              item?.[keysArray?.[index]]?.size / 1024
                            ).toFixed(2)} kb`
                          : item?.[keysArray?.[index]]?.size < 4 * 1024 * 1024
                          ? `${(
                              item?.[keysArray?.[index]]?.size /
                              (1024 * 1024)
                            ).toFixed(2)} mb`
                          : item?.[keysArray?.[index]]?.size}
                      </p>
                      <p
                        className="p-1 text-red-500 border-l cursor-pointer flex-center items-center"
                        onClick={() =>
                          handleFileDelete(keysArray[index], index)
                        }
                      >
                        <FiTrash size={15} className="-mb-2" />
                      </p>
                    </div>
                  </div>
                </div>
              ))}

            <div className="flex justify-around text-center">
              <div>
                <label
                  htmlFor="fileInput"
                  className="border rounded-md py-2 px-8 cursor-pointer flex gap-2 fony-medium w-fit"
                >
                  <FaPaperclip size={20} />
                  Select files
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    id="fileInput"
                    className="hidden"
                    onChange={(e) =>
                      handleFileInputChange(e, "Application form")
                    }
                    onClick={(e) => (e.target.value = null)}
                  />
                </label>
                <p className="text-sm">Upload Application Form</p>
              </div>
              <div>
                <label className="border rounded-md py-2 px-8 cursor-pointer flex gap-2 fony-medium w-fit">
                  <FaPaperclip size={20} />
                  Select files
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    id="fileInput"
                    className="hidden"
                    onChange={(e) => handleFileInputChange(e, "Guarantor form")}
                    onClick={(e) => (e.target.value = null)}
                  />
                </label>
                <p className="text-sm">Upload Guarantor&apos;s Form</p>
              </div>
            </div>

            <div className="flex justify-around text-center">
              <div>
                <label className="border rounded-md py-2 px-8 cursor-pointer flex gap-2 fony-medium w-fit">
                  <FaPaperclip size={20} />
                  Select files
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    id="fileInput"
                    className="hidden"
                    onChange={(e) => handleFileInputChange(e, "Loan affidafit")}
                    onClick={(e) => (e.target.value = null)}
                  />
                </label>
                <p className="text-sm">Loan Affidafit</p>
              </div>
              <div>
                <label className="border rounded-md py-2 px-8 cursor-pointer flex gap-2 fony-medium w-fit">
                  <FaPaperclip size={20} />
                  Select files
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    id="fileInput"
                    className="hidden"
                    onChange={(e) => handleFileInputChange(e, "Utility bill")}
                    onClick={(e) => (e.target.value = null)}
                  />
                </label>
                <p className="text-sm">Utility Bill</p>
              </div>
            </div>

            <div className="flex justify-around text-center">
              <div>
                <label className="border rounded-md py-2 px-8 cursor-pointer flex gap-2 fony-medium w-fit">
                  <FaPaperclip size={20} />
                  Select files
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    id="fileInput"
                    className="hidden"
                    onChange={(e) =>
                      handleFileInputChange(e, "Statement of account")
                    }
                    onClick={(e) => (e.target.value = null)}
                  />
                </label>
                <p className="text-sm">
                  Statement of Account
                  <br />
                  (6 Months)
                </p>
              </div>
              <div>
                <label className="border rounded-md py-2 px-8 cursor-pointer flex gap-2 fony-medium w-fit">
                  <FaPaperclip size={20} />
                  Select files
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    id="fileInput"
                    className="hidden"
                    onChange={(e) => handleFileInputChange(e, "ID card")}
                    onClick={(e) => (e.target.value = null)}
                  />
                </label>
                <p className="text-sm">ID card</p>
              </div>
            </div>

            <div className="flex justify-around text-center">
              <div>
                <label className="border rounded-md py-2 px-8 cursor-pointer flex gap-2 fony-medium w-fit">
                  <FaPaperclip size={20} />
                  Select files
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    id="fileInput"
                    className="hidden"
                    onChange={(e) =>
                      handleFileInputChange(e, "Power of attorney")
                    }
                    onClick={(e) => (e.target.value = null)}
                  />
                </label>
                <p className="text-sm">Power of Attorney</p>
              </div>
              <div>
                <label className="border rounded-md py-2 px-8 cursor-pointer flex gap-2 fony-medium w-fit">
                  <FaPaperclip size={20} />
                  Select files
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    id="fileInput"
                    className="hidden"
                    onChange={(e) => handleFileInputChange(e, "Offer letter")}
                    onClick={(e) => (e.target.value = null)}
                  />
                </label>
                <p className="text-sm">Offer Letter</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 mt-5 border-t flex justify-end gap-5">
          <EditableButton
            whiteBtn={true}
            label={"Cancel"}
            className="px-20"
            onClick={() => setCancelModal(true)}
          />

          <EditableButton
            blueBtn={true}
            disabled={loading === "pending" ? true : false}
            startIcon={
              loading === "pending" && (
                <Rings
                  height="20"
                  width="20"
                  color="#ffffff"
                  radius="2"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="rings-loading"
                />
              )
            }
            label={"Save & Update profile"}
            endIcon={<IoMdCheckmark size={20} />}
            onClick={handleProfileUpdate}
          />
          <SuccessModal
            isOpen={successModal}
            description={"Documents are successfully uploaded"}
            title={"Successfully Uploaded"}
            noButtons={true}
            onClose={() => setSuccessModal(false)}
          />
          <CancelModal
            btnLeft={"Close"}
            btnRight={"Yes cancel"}
            description={
              <div>
                <p>
                  You&apos;re currently updating a borrowers profile, Cancelling
                  will make you loose your progress.
                </p>
                <p className="mt-2">Are you sure you want to cancel update?</p>
              </div>
            }
            title={"Cancel warning"}
            isOpen={cancelModal}
            onClose={() => setCancelModal(false)}
            btnLeftFunc={() => setCancelModal(false)}
            btnRightFunc={() => resetUploadModal()}
          />
        </div>
      </div>
    </CenterModal>
  );
};

export default UploadDocumentsModal;
