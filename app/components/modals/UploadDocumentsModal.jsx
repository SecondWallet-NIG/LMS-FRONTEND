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
  console.log(selectedFilesArr);
  console.log(selectedFilesObj);

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
        <div className="p-5 pb-0 my-2  h-[22rem] overflow-auto custom-scrollbar">
          <p className="text-lg font-semibold text-swBlack">
            Identity verification/ Document
          </p>
          <p className="text-xs">
            Document types uploaded should be JPEGS, PNG or PDF and should not
            exceed 4mb
          </p>
          <div className="flex flex-col gap-5">
            <p className="text-sm font- mt-5">Upload Application Form</p>

            {/* <div className="flex justify-around text-center"> */}
            <div className="flex flex-col gap-5">
              <div>
                <div>
                  {selectedFilesArr.length > 0 &&
                    selectedFilesArr
                      ?.filter((item) => item?.["Application form"])
                      .map((item, index) => (
                        <div
                          className="flex flex-col gap-2 text-sm"
                          key={index}
                        >
                          <div className="w-full border rounded-md flex justify-between">
                            <div className="flex gap-1">
                              <p className="p-1 pl-2">
                                {
                                  keysArray?.[
                                    keysArray.indexOf("Application form")
                                  ]
                                }
                                :
                              </p>
                              <p className="py-1">
                                {
                                  item?.[
                                    keysArray?.[
                                      keysArray.indexOf("Application form")
                                    ]
                                  ]?.name
                                }
                              </p>
                            </div>
                            <div className="flex gap-1">
                              <p className="py-1">
                                {item?.[
                                  keysArray?.[
                                    keysArray.indexOf("Application form")
                                  ]
                                ]?.size < 1024
                                  ? `${
                                      item?.[
                                        keysArray?.[
                                          keysArray.indexOf("Application form")
                                        ]
                                      ]?.size
                                    } bytes`
                                  : item?.[
                                      keysArray?.[
                                        keysArray.indexOf("Application form")
                                      ]
                                    ]?.size <
                                    1024 * 1024
                                  ? `${(
                                      item?.[
                                        keysArray?.[
                                          keysArray.indexOf("Application form")
                                        ]
                                      ]?.size / 1024
                                    ).toFixed(2)} kb`
                                  : item?.[
                                      keysArray?.[
                                        keysArray.indexOf("Application form")
                                      ]
                                    ]?.size <
                                    4 * 1024 * 1024
                                  ? `${(
                                      item?.[
                                        keysArray?.[
                                          keysArray.indexOf("Application form")
                                        ]
                                      ]?.size /
                                      (1024 * 1024)
                                    ).toFixed(2)} mb`
                                  : item?.[
                                      keysArray?.[
                                        keysArray.indexOf("Application form")
                                      ]
                                    ]?.size}
                              </p>
                              <p
                                className="p-1 text-red-500 border-l cursor-pointer flex-center items-center"
                                onClick={() =>
                                  handleFileDelete("Application form", item)
                                }
                              >
                                <FiTrash size={15} className="-mb-2" />
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                </div>

                <label
                  htmlFor="fileInput"
                  className="border rounded-md py-2 px-8 cursor-pointer flex gap-2 fony-medium w-fit mt-2"
                >
                  <FaPaperclip size={20} />
                  {keysArray.includes("Application form")
                    ? "Change file"
                    : "Select file"}
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
                <div>
                  {selectedFilesArr.length > 0 &&
                    selectedFilesArr
                      ?.filter((item) => item?.["Guarantor form"])
                      .map((item, index) => (
                        <div
                          className="flex flex-col gap-2 text-sm"
                          key={index}
                        >
                          <div className="w-full border rounded-md flex justify-between">
                            <div className="flex gap-1">
                              <p className="p-1 pl-2">
                                {
                                  keysArray?.[
                                    keysArray.indexOf("Guarantor form")
                                  ]
                                }
                                :
                              </p>
                              <p className="py-1">
                                {
                                  item?.[
                                    keysArray?.[
                                      keysArray.indexOf("Guarantor form")
                                    ]
                                  ]?.name
                                }
                              </p>
                            </div>
                            <div className="flex gap-1">
                              <p className="py-1">
                                {item?.[
                                  keysArray?.[
                                    keysArray.indexOf("Guarantor form")
                                  ]
                                ]?.size < 1024
                                  ? `${
                                      item?.[
                                        keysArray?.[
                                          keysArray.indexOf("Guarantor form")
                                        ]
                                      ]?.size
                                    } bytes`
                                  : item?.[
                                      keysArray?.[
                                        keysArray.indexOf("Guarantor form")
                                      ]
                                    ]?.size <
                                    1024 * 1024
                                  ? `${(
                                      item?.[
                                        keysArray?.[
                                          keysArray.indexOf("Guarantor form")
                                        ]
                                      ]?.size / 1024
                                    ).toFixed(2)} kb`
                                  : item?.[
                                      keysArray?.[
                                        keysArray.indexOf("Guarantor form")
                                      ]
                                    ]?.size <
                                    4 * 1024 * 1024
                                  ? `${(
                                      item?.[
                                        keysArray?.[
                                          keysArray.indexOf("Guarantor form")
                                        ]
                                      ]?.size /
                                      (1024 * 1024)
                                    ).toFixed(2)} mb`
                                  : item?.[
                                      keysArray?.[
                                        keysArray.indexOf("Guarantor form")
                                      ]
                                    ]?.size}
                              </p>
                              <p
                                className="p-1 text-red-500 border-l cursor-pointer flex-center items-center"
                                onClick={() =>
                                  handleFileDelete("Guarantor form", item)
                                }
                              >
                                <FiTrash size={15} className="-mb-2" />
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                </div>
                <label className="border rounded-md py-2 px-8 cursor-pointer flex gap-2 fony-medium w-fit mt-2">
                  <FaPaperclip size={20} />
                  {keysArray.includes("Guarantor form")
                    ? "Change file"
                    : "Select file"}
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
              {/* </div> */}

              {/* <div className="flex justify-around text-center"> */}
              <div>
                <div>
                  {selectedFilesArr.length > 0 &&
                    selectedFilesArr
                      ?.filter((item) => item?.["Loan affidafit"])
                      .map((item, index) => (
                        <div
                          className="flex flex-col gap-2 text-sm"
                          key={index}
                        >
                          <div className="w-full border rounded-md flex justify-between">
                            <div className="flex gap-1">
                              <p className="p-1 pl-2">
                                {
                                  keysArray?.[
                                    keysArray.indexOf("Loan affidafit")
                                  ]
                                }
                                :
                              </p>
                              <p className="py-1">
                                {
                                  item?.[
                                    keysArray?.[
                                      keysArray.indexOf("Loan affidafit")
                                    ]
                                  ]?.name
                                }
                              </p>
                            </div>
                            <div className="flex gap-1">
                              <p className="py-1">
                                {item?.[
                                  keysArray?.[
                                    keysArray.indexOf("Loan affidafit")
                                  ]
                                ]?.size < 1024
                                  ? `${
                                      item?.[
                                        keysArray?.[
                                          keysArray.indexOf("Loan affidafit")
                                        ]
                                      ]?.size
                                    } bytes`
                                  : item?.[
                                      keysArray?.[
                                        keysArray.indexOf("Loan affidafit")
                                      ]
                                    ]?.size <
                                    1024 * 1024
                                  ? `${(
                                      item?.[
                                        keysArray?.[
                                          keysArray.indexOf("Loan affidafit")
                                        ]
                                      ]?.size / 1024
                                    ).toFixed(2)} kb`
                                  : item?.[
                                      keysArray?.[
                                        keysArray.indexOf("Loan affidafit")
                                      ]
                                    ]?.size <
                                    4 * 1024 * 1024
                                  ? `${(
                                      item?.[
                                        keysArray?.[
                                          keysArray.indexOf("Loan affidafit")
                                        ]
                                      ]?.size /
                                      (1024 * 1024)
                                    ).toFixed(2)} mb`
                                  : item?.[
                                      keysArray?.[
                                        keysArray.indexOf("Loan affidafit")
                                      ]
                                    ]?.size}
                              </p>
                              <p
                                className="p-1 text-red-500 border-l cursor-pointer flex-center items-center"
                                onClick={() =>
                                  handleFileDelete("Loan affidafit", item)
                                }
                              >
                                <FiTrash size={15} className="-mb-2" />
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                </div>

                <label className="border rounded-md py-2 px-8 cursor-pointer flex gap-2 fony-medium w-fit mt-2">
                  <FaPaperclip size={20} />
                  {keysArray.includes("Loan affidafit")
                    ? "Change file"
                    : "Select file"}
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
                <div>
                  {selectedFilesArr.length > 0 &&
                    selectedFilesArr
                      ?.filter((item) => item?.["Utility bill"])
                      .map((item, index) => (
                        <div
                          className="flex flex-col gap-2 text-sm"
                          key={index}
                        >
                          <div className="w-full border rounded-md flex justify-between">
                            <div className="flex gap-1">
                              <p className="p-1 pl-2">
                                {keysArray?.[keysArray.indexOf("Utility bill")]}
                                :
                              </p>
                              <p className="py-1">
                                {
                                  item?.[
                                    keysArray?.[
                                      keysArray.indexOf("Utility bill")
                                    ]
                                  ]?.name
                                }
                              </p>
                            </div>
                            <div className="flex gap-1">
                              <p className="py-1">
                                {item?.[
                                  keysArray?.[keysArray.indexOf("Utility bill")]
                                ]?.size < 1024
                                  ? `${
                                      item?.[
                                        keysArray?.[
                                          keysArray.indexOf("Utility bill")
                                        ]
                                      ]?.size
                                    } bytes`
                                  : item?.[
                                      keysArray?.[
                                        keysArray.indexOf("Utility bill")
                                      ]
                                    ]?.size <
                                    1024 * 1024
                                  ? `${(
                                      item?.[
                                        keysArray?.[
                                          keysArray.indexOf("Utility bill")
                                        ]
                                      ]?.size / 1024
                                    ).toFixed(2)} kb`
                                  : item?.[
                                      keysArray?.[
                                        keysArray.indexOf("Utility bill")
                                      ]
                                    ]?.size <
                                    4 * 1024 * 1024
                                  ? `${(
                                      item?.[
                                        keysArray?.[
                                          keysArray.indexOf("Utility bill")
                                        ]
                                      ]?.size /
                                      (1024 * 1024)
                                    ).toFixed(2)} mb`
                                  : item?.[
                                      keysArray?.[
                                        keysArray.indexOf("Utility bill")
                                      ]
                                    ]?.size}
                              </p>
                              <p
                                className="p-1 text-red-500 border-l cursor-pointer flex-center items-center"
                                onClick={() =>
                                  handleFileDelete("Utility bill", item)
                                }
                              >
                                <FiTrash size={15} className="-mb-2" />
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                </div>

                <label className="border rounded-md py-2 px-8 cursor-pointer flex gap-2 fony-medium w-fit mt-2">
                  <FaPaperclip size={20} />
                  {keysArray.includes("Utility bill")
                    ? "Change file"
                    : "Select file"}
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
              {/* </div> */}

              {/* <div className="flex justify-around text-center"> */}
              <div>
                <div>
                  {selectedFilesArr.length > 0 &&
                    selectedFilesArr
                      ?.filter((item) => item?.["Statement of account"])
                      .map((item, index) => (
                        <div
                          className="flex flex-col gap-2 text-sm"
                          key={index}
                        >
                          <div className="w-full border rounded-md flex justify-between">
                            <div className="flex gap-1">
                              <p className="p-1 pl-2">
                                {
                                  keysArray?.[
                                    keysArray.indexOf("Statement of account")
                                  ]
                                }
                                :
                              </p>
                              <p className="py-1">
                                {
                                  item?.[
                                    keysArray?.[
                                      keysArray.indexOf("Statement of account")
                                    ]
                                  ]?.name
                                }
                              </p>
                            </div>
                            <div className="flex gap-1">
                              <p className="py-1">
                                {item?.[
                                  keysArray?.[
                                    keysArray.indexOf("Statement of account")
                                  ]
                                ]?.size < 1024
                                  ? `${
                                      item?.[
                                        keysArray?.[
                                          keysArray.indexOf(
                                            "Statement of account"
                                          )
                                        ]
                                      ]?.size
                                    } bytes`
                                  : item?.[
                                      keysArray?.[
                                        keysArray.indexOf(
                                          "Statement of account"
                                        )
                                      ]
                                    ]?.size <
                                    1024 * 1024
                                  ? `${(
                                      item?.[
                                        keysArray?.[
                                          keysArray.indexOf(
                                            "Statement of account"
                                          )
                                        ]
                                      ]?.size / 1024
                                    ).toFixed(2)} kb`
                                  : item?.[
                                      keysArray?.[
                                        keysArray.indexOf(
                                          "Statement of account"
                                        )
                                      ]
                                    ]?.size <
                                    4 * 1024 * 1024
                                  ? `${(
                                      item?.[
                                        keysArray?.[
                                          keysArray.indexOf(
                                            "Statement of account"
                                          )
                                        ]
                                      ]?.size /
                                      (1024 * 1024)
                                    ).toFixed(2)} mb`
                                  : item?.[
                                      keysArray?.[
                                        keysArray.indexOf(
                                          "Statement of account"
                                        )
                                      ]
                                    ]?.size}
                              </p>
                              <p
                                className="p-1 text-red-500 border-l cursor-pointer flex-center items-center"
                                onClick={() =>
                                  handleFileDelete("Statement of account", item)
                                }
                              >
                                <FiTrash size={15} className="-mb-2" />
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                </div>

                <label className="border rounded-md py-2 px-8 cursor-pointer flex gap-2 fony-medium w-fit mt-2">
                  <FaPaperclip size={20} />
                  {keysArray.includes("Statement of account")
                    ? "Change file"
                    : "Select file"}
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
                <div>
                  {selectedFilesArr.length > 0 &&
                    selectedFilesArr
                      ?.filter((item) => item?.["ID card"])
                      .map((item, index) => (
                        <div
                          className="flex flex-col gap-2 text-sm"
                          key={index}
                        >
                          <div className="w-full border rounded-md flex justify-between">
                            <div className="flex gap-1">
                              <p className="p-1 pl-2">
                                {keysArray?.[keysArray.indexOf("ID card")]}:
                              </p>
                              <p className="py-1">
                                {
                                  item?.[
                                    keysArray?.[keysArray.indexOf("ID card")]
                                  ]?.name
                                }
                              </p>
                            </div>
                            <div className="flex gap-1">
                              <p className="py-1">
                                {item?.[
                                  keysArray?.[keysArray.indexOf("ID card")]
                                ]?.size < 1024
                                  ? `${
                                      item?.[
                                        keysArray?.[
                                          keysArray.indexOf("ID card")
                                        ]
                                      ]?.size
                                    } bytes`
                                  : item?.[
                                      keysArray?.[keysArray.indexOf("ID card")]
                                    ]?.size <
                                    1024 * 1024
                                  ? `${(
                                      item?.[
                                        keysArray?.[
                                          keysArray.indexOf("ID card")
                                        ]
                                      ]?.size / 1024
                                    ).toFixed(2)} kb`
                                  : item?.[
                                      keysArray?.[keysArray.indexOf("ID card")]
                                    ]?.size <
                                    4 * 1024 * 1024
                                  ? `${(
                                      item?.[
                                        keysArray?.[
                                          keysArray.indexOf("ID card")
                                        ]
                                      ]?.size /
                                      (1024 * 1024)
                                    ).toFixed(2)} mb`
                                  : item?.[
                                      keysArray?.[keysArray.indexOf("ID card")]
                                    ]?.size}
                              </p>
                              <p
                                className="p-1 text-red-500 border-l cursor-pointer flex-center items-center"
                                onClick={() =>
                                  handleFileDelete("ID card", item)
                                }
                              >
                                <FiTrash size={15} className="-mb-2" />
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                </div>

                <label className="border rounded-md py-2 px-8 cursor-pointer flex gap-2 fony-medium w-fit mt-2">
                  <FaPaperclip size={20} />
                  {keysArray.includes("ID card")
                    ? "Change file"
                    : "Select file"}
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
              {/* </div> */}

              {/* <div className="flex justify-around text-center"> */}
              <div>
                <div>
                  {selectedFilesArr.length > 0 &&
                    selectedFilesArr
                      ?.filter((item) => item?.["Power of attorney"])
                      .map((item, index) => (
                        <div
                          className="flex flex-col gap-2 text-sm"
                          key={index}
                        >
                          <div className="w-full border rounded-md flex justify-between">
                            <div className="flex gap-1">
                              <p className="p-1 pl-2">
                                {
                                  keysArray?.[
                                    keysArray.indexOf("Power of attorney")
                                  ]
                                }
                                :
                              </p>
                              <p className="py-1">
                                {
                                  item?.[
                                    keysArray?.[
                                      keysArray.indexOf("Power of attorney")
                                    ]
                                  ]?.name
                                }
                              </p>
                            </div>
                            <div className="flex gap-1">
                              <p className="py-1">
                                {item?.[
                                  keysArray?.[
                                    keysArray.indexOf("Power of attorney")
                                  ]
                                ]?.size < 1024
                                  ? `${
                                      item?.[
                                        keysArray?.[
                                          keysArray.indexOf("Power of attorney")
                                        ]
                                      ]?.size
                                    } bytes`
                                  : item?.[
                                      keysArray?.[
                                        keysArray.indexOf("Power of attorney")
                                      ]
                                    ]?.size <
                                    1024 * 1024
                                  ? `${(
                                      item?.[
                                        keysArray?.[
                                          keysArray.indexOf("Power of attorney")
                                        ]
                                      ]?.size / 1024
                                    ).toFixed(2)} kb`
                                  : item?.[
                                      keysArray?.[
                                        keysArray.indexOf("Power of attorney")
                                      ]
                                    ]?.size <
                                    4 * 1024 * 1024
                                  ? `${(
                                      item?.[
                                        keysArray?.[
                                          keysArray.indexOf("Power of attorney")
                                        ]
                                      ]?.size /
                                      (1024 * 1024)
                                    ).toFixed(2)} mb`
                                  : item?.[
                                      keysArray?.[
                                        keysArray.indexOf("Power of attorney")
                                      ]
                                    ]?.size}
                              </p>
                              <p
                                className="p-1 text-red-500 border-l cursor-pointer flex-center items-center"
                                onClick={() =>
                                  handleFileDelete("Power of attorney", item)
                                }
                              >
                                <FiTrash size={15} className="-mb-2" />
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                </div>

                <label className="border rounded-md py-2 px-8 cursor-pointer flex gap-2 fony-medium w-fit mt-2">
                  <FaPaperclip size={20} />
                  {keysArray.includes("Power of attorney")
                    ? "Change file"
                    : "Select file"}
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
                <div>
                  {selectedFilesArr.length > 0 &&
                    selectedFilesArr
                      ?.filter((item) => item?.["Offer letter"])
                      .map((item, index) => (
                        <div
                          className="flex flex-col gap-2 text-sm"
                          key={index}
                        >
                          <div className="w-full border rounded-md flex justify-between">
                            <div className="flex gap-1">
                              <p className="p-1 pl-2">
                                {keysArray?.[keysArray.indexOf("Offer letter")]}
                                :
                              </p>
                              <p className="py-1">
                                {
                                  item?.[
                                    keysArray?.[
                                      keysArray.indexOf("Offer letter")
                                    ]
                                  ]?.name
                                }
                              </p>
                            </div>
                            <div className="flex gap-1">
                              <p className="py-1">
                                {item?.[
                                  keysArray?.[keysArray.indexOf("Offer letter")]
                                ]?.size < 1024
                                  ? `${
                                      item?.[
                                        keysArray?.[
                                          keysArray.indexOf("Offer letter")
                                        ]
                                      ]?.size
                                    } bytes`
                                  : item?.[
                                      keysArray?.[
                                        keysArray.indexOf("Offer letter")
                                      ]
                                    ]?.size <
                                    1024 * 1024
                                  ? `${(
                                      item?.[
                                        keysArray?.[
                                          keysArray.indexOf("Offer letter")
                                        ]
                                      ]?.size / 1024
                                    ).toFixed(2)} kb`
                                  : item?.[
                                      keysArray?.[
                                        keysArray.indexOf("Offer letter")
                                      ]
                                    ]?.size <
                                    4 * 1024 * 1024
                                  ? `${(
                                      item?.[
                                        keysArray?.[
                                          keysArray.indexOf("Offer letter")
                                        ]
                                      ]?.size /
                                      (1024 * 1024)
                                    ).toFixed(2)} mb`
                                  : item?.[
                                      keysArray?.[
                                        keysArray.indexOf("Offer letter")
                                      ]
                                    ]?.size}
                              </p>
                              <p
                                className="p-1 text-red-500 border-l cursor-pointer flex-center items-center"
                                onClick={() =>
                                  handleFileDelete("Offer letter", item)
                                }
                              >
                                <FiTrash size={15} className="-mb-2" />
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                </div>

                <label className="border rounded-md py-2 px-8 cursor-pointer flex gap-2 fony-medium w-fit mt-2">
                  <FaPaperclip size={20} />
                  {keysArray.includes("Offer letter")
                    ? "Change file"
                    : "Select file"}
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
              {/* </div> */}
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
