"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import SelectField from "../components/shared/input/SelectField";
import InputField from "../components/shared/input/InputField";
import { LuCalendar, LuCheck, LuPaperclip } from "react-icons/lu";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  createBulkExpenses,
  createExpense,
  getAllExpenseCategories,
} from "@/redux/slices/expenseManagementSlice";
import EditableButton from "../components/shared/editableButtonComponent/EditableButton";
import { FiTrash } from "react-icons/fi";
import SuccessModal from "../components/modals/SuccessModal";
import CancelModal from "../components/modals/CancelModal";
import { expensesAuthRoles } from "../components/helpers/pageAuthRoles";

const CreateNewExpense = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [expenseUploadType, setExpenseUploadType] = useState("Single expense");
  const [userId, setUserId] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [failedModal, setFailedModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [proofOfPayment, setProofOfPayment] = useState([]);
  const [fileError, setFileError] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [expenseTypeOptions, setExpenseTypeOptions] = useState([]);
  const [formData, setFormData] = useState({
    expenseDate: new Date(),
    category: "",
    description: "",
    amount: "",
  });
  const options = [
    { value: "Single expense", label: "Single expense" },
    { value: "Bulk expenses", label: "Bulk expenses" },
  ];

  const [successModalData, setSuccessModalData] = useState({});
  const [errorModalData, setErrorModalData] = useState({});
  const transformedOptions = expenseTypeOptions.map((option) => ({
    value: option?._id,
    label: option?.name,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "amount") {
      // Remove all non-numeric characters except for a dot
      const numericValue = value.replace(/[^0-9.]/g, "");

      // Format the value with commas
      const formattedValue = Number(numericValue).toLocaleString();

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: formattedValue,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const handleFileInputChange = (e) => {
    setFileError("");
    const files = Array.from(e.target.files);
    if (e.target.id === "profilePicture" && e.target.files.length > 0) {
      const fileExtension = files[0].name.split(".").pop().toLowerCase();

      const allowedExtensions = ["jpg", "jpeg", "png"];
      if (!allowedExtensions.includes(fileExtension)) {
        setFileError(
          "Invalid file type. Please select an image (.jpg, .jpeg, .png)."
        );
        return;
      }
      setFormData((prev) => ({ ...prev, [e.target.id]: files[0] }));
    } else {
      setSelectedFiles(files);
    }
  };
  const handleFileDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length <= 2) {
      setSelectedFiles(files);
    } else {
      alert("You can only upload a maximum of 2 files.");
    }
  };

  const uploadProofOfPayment = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length <= 2) {
      setProofOfPayment(files);
    } else {
      alert("You can only upload a maximum of 2 files.");
    }
  };

  const handleUploadProofOfPayment = (e) => {
    setFileError("");
    const files = Array.from(e.target.files);
    if (e.target.id === "profilePicture" && e.target.files.length > 0) {
      const fileExtension = files[0].name.split(".").pop().toLowerCase();

      const allowedExtensions = ["jpg", "jpeg", "png"];
      if (!allowedExtensions.includes(fileExtension)) {
        setFileError(
          "Invalid file type. Please select an image (.jpg, .jpeg, .png)."
        );
        return;
      }
      setFormData((prev) => ({ ...prev, [e.target.id]: files[0] }));
    } else {
      setProofOfPayment(files);
    }
  };

  const hundleBulkExpenseSubmit = (e) => {
    setLoading(true);
    const payload = new FormData();
    payload.append("bulkExpenseCsv", selectedFiles[0]);
    payload.append("createdBy", userId?.data?.user?._id);
    e.preventDefault();
    dispatch(createBulkExpenses(payload))
      .unwrap()
      .then((response) => {
        setSuccessModalData({
          title: "Bulk Expenses Upload Successful",
          description:
            "Upload in progress, you will be notified when this is complete",
          btnLeft: "View Expenses",
          btnRight: "Upload Bulk Expenses",
        });
        setSuccessModal(true);
        setSelectedFiles([]);
        setLoading(false);
      })
      .catch((error) => {
        setErrorModalData({
          description: "An error has occured",
        });
        setLoading(false);
      });
  };

  const handleFileDelete = (index) => {
    selectedFiles.splice(index, 1);
    setSelectedFiles([...selectedFiles]);
    setProofOfPayment([]);
  };

  const preventMinus = (e) => {
    if (/[^0-9,]/g.test(e.key)) {
      e.preventDefault();
    }
  };

  const removeCommasFromNumber = (numberString) => {
    if (typeof numberString !== "string") {
      // Convert to string or handle the case appropriately
      numberString = String(numberString);
    }
    return numberString.replace(/,/g, "");
  };

  const handleAddAsset = () => {
    setLoading(true);
    const newDate = format(formData.expenseDate, "yyyy-MM-dd");
    const _formData = new FormData();
    const newAmount = parseFloat(removeCommasFromNumber(formData.amount));

    _formData.append("expenseDate", newDate);
    _formData.append("amount", newAmount);
    _formData.append("category", formData.category);
    _formData.append("description", formData.description);
    _formData.append("status", "New");
    _formData.append("file", proofOfPayment[0]);
    dispatch(createExpense(_formData))
      .unwrap()
      .then((res) => {
        if (res?.success === true) {
          setSuccessModal(true);
          setSuccessModalData({
            title: "Expenses Uploaded Successfully",
            description: "",
            btnLeft: "View Expenses",
            btnRight: "Add Expense",
          });
          setFormData({
            expenseDate: new Date(),
            category: "",
            description: "",
            amount: "",
          });
          setLoading(false);
        } else {
          setErrorModalData({
            description: res.message,
          });
          setLoading(false);
        }
      })
      .catch((err) => {
        setErrorModalData({
          description: err.message,
        });
        setFailedModal(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    dispatch(getAllExpenseCategories())
      .unwrap()
      .then((res) => setExpenseTypeOptions(res?.data))
      .catch((err) => console.log({ err }));
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserId(user);
  }, []);

  return (
    <DashboardLayout
      isBackNav={true}
      paths={["Expenses", "Add New Expense"]}
      roles={expensesAuthRoles}
    >
      <ToastContainer />
      <main
        className="p-5 max-w-3xl mt-10 mx-auto  min-h-screen "
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex justify-between items-center">
          <p className="md:text-xl text-md font-semibold text-swBlack">
            Add New Expense
          </p>
          <div className="w-60">
            <SelectField
              value={options.find(
                (option) => option.value === expenseUploadType
              )}
              name="name"
              optionValue={options}
              isSearchable={false}
              onChange={(selectedOption) =>
                setExpenseUploadType(selectedOption.value)
              }
            />
          </div>
        </div>

        {expenseUploadType === "Single expense" && (
          <div>
            <div className="flex flex-col gap-5">
              <p className="text-lg font-semibold text-swBlack mt-10">
                Expense Details
              </p>

              <div className="relative">
                <div className="block text-gray-700 text-sm mb-2">
                  Date of Expense
                  <span className="text-red-600 ml-1">*</span>
                </div>
                <div
                  className="py-2 px-3 rounded border border-gray-300 flex gap-2"
                  onClick={() => setOpenDate(!openDate)}
                >
                  <LuCalendar size={22} className="text-swTextColor" />
                  {format(formData.expenseDate, "PPP")}
                </div>
                {openDate && (
                  <div className="absolute w-fit right-0  -mb-5 bg-white border rounded-md z-50">
                    <DayPicker
                      styles={{
                        caption: { color: "#2769b3" },
                      }}
                      modifiers={{
                        selected: formData.expenseDate,
                      }}
                      modifiersClassNames={{
                        selected: "my-selected",
                      }}
                      onDayClick={(value) => {
                        setFormData((prev) => ({
                          ...prev,
                          expenseDate: value > new Date() ? new Date() : value,
                        }));
                      }}
                      className="w-full"
                    />
                    <p
                      className="w-fit ml-auto mr-2 mb-2 -mt-2 p-2 text-[#2769b3] hover:text-white hover:bg-[#2769b3] cursor-pointer"
                      onClick={() => setOpenDate(false)}
                    >
                      OK
                    </p>
                  </div>
                )}
              </div>
              <SelectField
                label={"Expense Category"}
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
              <InputField
                label={"Expense Description"}
                required={true}
                name="description"
                value={formData.description}
                placeholder={"Cleaning tools"}
                onChange={handleChange}
              />
              <InputField
                name="amount"
                required={true}
                ariaLabel={"Number input"}
                onKeyPress={preventMinus}
                onWheel={() => document.activeElement.blur()}
                endIcon={<p className="text-swGray">NGN &#8358;</p>}
                label="Total Amount"
                value={formData?.amount?.toLocaleString()}
                placeholder="Enter amount"
                onChange={handleChange}
              />

              <div
                className="text-center w-full"
                onDrop={uploadProofOfPayment}
                onDragOver={(e) => e.preventDefault()}
              >
                <div className="w-full border-dotted border-[2px] rounded-3xl bg-pharmaGray pt-2 pb-2 text-swBlack">
                  <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    accept=".pdf, .jpg, .png, .jpeg"
                    onChange={handleUploadProofOfPayment}
                  />

                  <p className="mt-10 text-sm font-medium">
                    Upload Proof of Payment(Optional)
                  </p>

                  <p className="text-xs">Max file size: 3mb</p>

                  <label
                    htmlFor="fileInput"
                    className="cursor-pointer flex gap-2 itwms-center p-2 rounded-md bg-swBlue text-white font-medium w-fit mx-auto mt-5 mb-3 text-sm"
                  >
                    <LuPaperclip size={16} />
                    {proofOfPayment.length > 0 ? "Change file" : "Upload file"}
                  </label>
                </div>
              </div>
            </div>
            {proofOfPayment.length > 0 && (
              <div className="mt-5">
                <ul className="">
                  {proofOfPayment.map((file, index) => (
                    <li
                      key={index}
                      className="my-2 bg-white flex rounded-md border"
                    >
                      <div className="flex gap-3 items-center p-2 pl-2 text-sm">
                        {/* <FiFileText size={20} /> */}
                        {file.name}
                      </div>
                      <div
                        className="flex gap-4 items-center ml-auto p-2 border-l cursor-pointer"
                        onClick={() => {
                          handleFileDelete(index);
                        }}
                      >
                        <FiTrash
                          className=" text-swIndicatorLightRed"
                          size={15}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center justify-between gap-5 mt-20">
              <div
                onClick={() => router.back()}
                className="flex gap-1 items-center py-2 px-3 cursor-pointer border  text-swBlue hover:text-white hover:bg-swBlue border-swBlue rounded-md focus:outline-none whitespace-nowrap"
              >
                <p>Cancel</p>
              </div>
              <div
                className={`flex gap-1 items-center py-2 px-3 border text-white hover:text-swBlue bg-swBlue hover:bg-white border-swBlue rounded-md focus:outline-none whitespace-nowrap ${
                  Object.values(formData).includes("") || loading
                    ? "opacity-50 cursor-not-allowed pointer-events-none"
                    : "cursor-pointer"
                }`}
                onClick={handleAddAsset}
              >
                <LuCheck size={20} />
                <p>{loading ? "Adding expense..." : "Add expense"}</p>
              </div>
            </div>
          </div>
        )}

        {expenseUploadType === "Bulk expenses" && (
          <div className="">
            <p className="font-semibold text-lg my-5 text-swBlack">
              Upload a file
            </p>
            <div
              className="text-center w-full"
              onDrop={handleFileDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <div className="w-full border-dotted border-[5px] rounded-3xl bg-pharmaGray pt-4 pb-4 text-swBlack">
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  accept=".csv"
                  onChange={handleFileInputChange}
                />

                <p className="mt-10 text-lg font-medium">
                  Drag and drop a file to upload
                </p>
                <p className="textxs">File types: .csv</p>
                <p className="textxs">Max file size: 3mb</p>

                <label
                  htmlFor="fileInput"
                  className="cursor-pointer flex gap-2 itwms-center p-2 rounded-md bg-swBlue text-white font-medium w-fit mx-auto mt-5 mb-3"
                >
                  <LuPaperclip size={20} />{" "}
                  {selectedFiles.length > 0 ? "Change file" : "Upload file"}
                </label>
              </div>
            </div>

            {selectedFiles.length > 0 && (
              <div className="mt-5">
                <ul className="">
                  {selectedFiles.map((file, index) => (
                    <li
                      key={index}
                      className="my-2 bg-white flex rounded-md border"
                    >
                      <div className="flex gap-3 items-center p-2 pl-2 font-medium ">
                        {/* <FiFileText size={20} /> */}
                        {file.name}
                      </div>
                      <div
                        className="flex gap-4 items-center ml-auto p-2 border-l cursor-pointer"
                        onClick={() => {
                          handleFileDelete(index);
                        }}
                      >
                        <FiTrash
                          className=" text-swIndicatorLightRed"
                          size={15}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex justify-center mt-5">
              <EditableButton
                onClick={hundleBulkExpenseSubmit}
                disabled={selectedFiles.length > 0 ? false : true || loading}
                label={"Create bulk expenses"}
                blueBtn={true}
              />
            </div>
          </div>
        )}
      </main>
      <SuccessModal
        isOpen={successModal}
        title={successModalData.title}
        description={successModalData.description}
        btnLeft={successModalData.btnLeft}
        btnLeftFunc={() => router.push("/expenses")}
        btnRight={successModalData.btnRight}
        btnRightFunc={() => setSuccessModal(false)}
        onClose={() => setSuccessModal(false)}
      />
      <CancelModal
        isOpen={failedModal}
        title={"An error has occured"}
        description={errorModalData?.description}
        noButtons={true}
        onClose={() => setFailedModal(false)}
      />
    </DashboardLayout>
  );
};

export default CreateNewExpense;
