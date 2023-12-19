import { AiOutlineClose } from "react-icons/ai";
import { FaPaperclip } from "react-icons/fa";
import EditableButton from "../shared/editableButtonComponent/EditableButton";
import { IoMdCheckmark } from "react-icons/io";
import { useState } from "react";
import { FiTrash } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { identityVerification } from "@/redux/slices/customerSlice";
// import SuccessModal from "./SuccessModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Rings } from "react-loader-spinner";
// import CancelModal from "./CancelModal";
import { getCustomerById } from "@/redux/slices/customerSlice";
import { useParams } from "next/navigation";

const ProfileDocuments = () => {
  const {id} = useParams()
  const dispatch = useDispatch();
  const [selectedFilesArr, setSelectedFilesArr] = useState([]);
  const [selectedFilesObj, setSelectedFilesObj] = useState({});
  const [successModal, setSuccessModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);

  const documents = [
    "Utility bill",
    "Statement of account",
    "ID card",
    "Power of attorney",
    "KYC",
    "Transfer of Ownership",
  ];

  const { loading, error, data } = useSelector((state) => state.customer);

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

          const updatedObj = { ...selectedFilesObj };
          delete updatedObj[formName];
          setSelectedFilesObj(updatedObj);
          setSelectedFilesObj((prev) => ({ ...prev, [formName]: files[0] }));
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
  };

  function resetUploadModal() {
    onClose("uploadDocuments");
    setSelectedFilesArr([]);
    setSelectedFilesObj({});
    setCancelModal(false);
  }

  const handleProfileUpdate = (e) => {
    let userId;
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      userId = storedUser?.data?.user?._id;
    }
    e.preventDefault();
    const payload = new FormData();
    payload.append("utilityBill", selectedFilesObj["Utility bill"]);
    payload.append(
      "statementOfAccount",
      selectedFilesObj["Statement of account"]
    );
    payload.append("idCard", selectedFilesObj["ID card"]);
    payload.append("kyc", selectedFilesObj["KYC"]);
    payload.append("powerOfAttorney", selectedFilesObj["Power of attorney"]);
    payload.append(
      "transferOfOwnership",
      selectedFilesObj["Transfer of Ownership"]
    );
    payload.append("customerProfileInformation", id);
    payload.append("createdBy", userId);

    dispatch(identityVerification(payload))
      .unwrap()
      .then(() => {
        toast.success("Profile successfully updated");
        resetUploadModal();
        window.location.reload();
        dispatch(getCustomerById(id));
      })
      .catch((error) => {
        toast.error(`An error occured`);
      });
  };
  return (
    <div>
      <ToastContainer />

      <div className="p-5 pb-0 my-2">
        <p className="font-semibold text-lg text-swBlack">
          Identity verification/Document
        </p>
        <p className="">
          Document types uploaded should be JPEGS, PNG or PDF and should not
          exceed 4mb
        </p>
        <div className="">
          <div className="flex flex-col">
            <div>
              {documents.map((item, docIndex) => (
                <div key={docIndex}>
                  <div className="flex justify-start flex-col md:flex-row-reverse md:items-center gap-2  mt-5">
                    <div className="w-full">
                      {selectedFilesArr.length > 0 &&
                        selectedFilesArr
                          ?.filter((item) => item?.[documents[docIndex]])
                          .map((item, index) => (
                            <div
                              className="flex flex-col gap-2 mt-5"
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
                      <p className="pb-2">{item}</p>
                      <label
                        htmlFor={`fileInput${docIndex + 1}`}
                        className="border rounded-md py-2 px-8 cursor-pointer flex gap-2 fony-medium w-fit whitespace-nowrap"
                      >
                        <FaPaperclip size={16} />
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 mt-5 flex justify-center gap-5">
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
          // className={"text-xs"}
          label={"Update profile"}
          endIcon={<IoMdCheckmark size={20} />}
          onClick={handleProfileUpdate}
        />
        {/* <SuccessModal
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
        /> */}
      </div>
    </div>
  );
};

export default ProfileDocuments;
