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

  const documents = [
    "Application form",
    "Guarantor form",
    "Loan affidafit",
    "Utility bill",
    "Statement of account",
    "ID card",
    "Power of attorney",
    "Offer letter",
  ];

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
          const updatedArr = [...selectedFilesArr];
          const index = updatedArr.indexOf(formName);
          updatedArr.splice(index, 1);
          setSelectedFilesArr(updatedArr);
          setSelectedFilesArr((prev) => [...prev, { [formName]: files[0] }]);
          console.log(selectedFilesArr, "new arr");

          const updatedObj = { ...selectedFilesObj };
          delete updatedObj[formName];
          setSelectedFilesObj(updatedObj);
          setSelectedFilesObj((prev) => ({ ...prev, [formName]: files[0] }));
          console.log(selectedFilesObj, "new obj");
          // console.log(index);
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
    const index = updatedArr.indexOf(fileIndex);
    updatedArr.splice(index, 1);
    setSelectedFilesArr(updatedArr);

    const updatedObj = { ...selectedFilesObj };
    delete updatedObj[fileName];
    setSelectedFilesObj(updatedObj);
    console.log(index);
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
    // payload.append("kyc", selectedFilesObj["ID card"]);
    payload.append("powerOfAttorney", selectedFilesObj["Power of attorney"]);
    // payload.append("transferOfOwnership", selectedFilesObj["ID card"]);
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
    <CenterModal isOpen={isOpen} width={'50%'}>
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
        <div className="p-5 pb-0 my-2  h-[22rem] overflow-auto custom-scrollbar">
          <p className="text-lg font-semibold text-swBlack">
            Identity verification/ Document
          </p>
          <p className="text-xs">
            Document types uploaded should be JPEGS, PNG or PDF and should not
            exceed 4mb
          </p>
          <div className="">
            <p className="text-sm font- mt-5">Upload Application Form</p>

            <div className="flex flex-col">
              <div>
                {documents.map((item, docIndex) => (
                  <div key={docIndex}>
                    <div className="flex justify-start flex-col md:flex-row-reverse md:items-center gap-2  mt-5">
                      <div className="w-full md:-mt-5">
                        {selectedFilesArr.length > 0 &&
                          selectedFilesArr
                            ?.filter((item) => item?.[documents[docIndex]])
                            .map((item, index) => (
                              <div
                                className="flex flex-col gap-2 text-sm"
                                key={index}
                              >
                                <div className="w-full border rounded-md flex justify-between">
                                  <p className="py-1 px-2">
                                    {
                                      item?.[
                                        keysArray?.[
                                          keysArray.indexOf(documents[docIndex])
                                        ]
                                      ]?.name
                                    }
                                  </p>
                                  <div className="flex gap-1">
                                    <p className="py-1">
                                      {item?.[
                                        keysArray?.[
                                          keysArray.indexOf(documents[docIndex])
                                        ]
                                      ]?.size < 1024
                                        ? `${
                                            item?.[
                                              keysArray?.[
                                                keysArray.indexOf(
                                                  documents[docIndex]
                                                )
                                              ]
                                            ]?.size
                                          } bytes`
                                        : item?.[
                                            keysArray?.[
                                              keysArray.indexOf(
                                                documents[docIndex]
                                              )
                                            ]
                                          ]?.size <
                                          1024 * 1024
                                        ? `${(
                                            item?.[
                                              keysArray?.[
                                                keysArray.indexOf(
                                                  documents[docIndex]
                                                )
                                              ]
                                            ]?.size / 1024
                                          ).toFixed(2)} kb`
                                        : item?.[
                                            keysArray?.[
                                              keysArray.indexOf(
                                                documents[docIndex]
                                              )
                                            ]
                                          ]?.size <
                                          4 * 1024 * 1024
                                        ? `${(
                                            item?.[
                                              keysArray?.[
                                                keysArray.indexOf(
                                                  documents[docIndex]
                                                )
                                              ]
                                            ]?.size /
                                            (1024 * 1024)
                                          ).toFixed(2)} mb`
                                        : item?.[
                                            keysArray?.[
                                              keysArray.indexOf(
                                                documents[docIndex]
                                              )
                                            ]
                                          ]?.size}
                                    </p>
                                    <p
                                      className="p-1 text-red-500 border-l cursor-pointer flex-center items-center"
                                      onClick={() =>
                                        handleFileDelete(
                                          documents[docIndex],
                                          item
                                        )
                                      }
                                    >
                                      <FiTrash size={15} className="-mb-2" />
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                      </div>
                      <div>
                        <label
                          htmlFor={`fileInput${docIndex + 1}`}
                          className="border rounded-md py-2 px-8 cursor-pointer flex gap-2 fony-medium w-fit whitespace-nowrap"
                        >
                          <FaPaperclip size={20} />
                          {keysArray.includes(item)
                            ? "Change file"
                            : "Select file"}
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            id={`fileInput${docIndex + 1}`}
                            className="hidden"
                            onChange={(e) => handleFileInputChange(e, item)}
                            onClick={(e) => (e.target.value = null)}
                          />
                        </label>
                        <p className="text-sm">{item}</p>
                      </div>
                    </div>
                  </div>
                ))}
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
            className={"text-xs"}
            label={"Update profile"}
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
