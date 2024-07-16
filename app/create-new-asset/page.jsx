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
import {
  createBulkAssets,
  createNewAsset,
  getAllAssetCategories,
} from "@/redux/slices/assetManagementSlice";
import { useRouter } from "next/navigation";
import EditableButton from "../components/shared/editableButtonComponent/EditableButton";
import { FiTrash } from "react-icons/fi";
import SuccessModal from "../components/modals/SuccessModal";
import CancelModal from "../components/modals/CancelModal";

const CreateNewAsset = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [userId, setUserId] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [failedModal, setFailedModal] = useState(false);
  const [fileError, setFileError] = useState("");
  const [assetUploadType, setAssetUploadType] = useState("Single asset");
  const [openDate, setOpenDate] = useState(false);
  const [assetTypeOptions, setAssetTypeOptions] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    acquisitionDate: new Date(),
    value: "",
  });
  const options = [
    { value: "Single asset", label: "Single asset" },
    { value: "Bulk assets", label: "Bulk assets" },
  ];

  const transformedOptions = assetTypeOptions.map((option) => ({
    value: option?._id,
    label: option?.name,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "value") {
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

  const preventMinus = (e) => {
    if (/[^0-9,]/g.test(e.key)) {
      e.preventDefault();
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

  const hundleBulkAssetSubmit = (e) => {
    setLoading(true);
    const payload = new FormData();
    payload.append("bulkAssetCsv", selectedFiles[0]);
    payload.append("createdBy", userId?.data?.user?._id);
    e.preventDefault();
    dispatch(createBulkAssets(payload))
      .unwrap()
      .then((response) => {
        setSuccessModal(true);
        setSelectedFiles([]);
        setLoading(false);
      })
      .catch((error) => {
        setFailedModal(true);
        setLoading(false);
      });
  };

  const handleFileDelete = (index) => {
    selectedFiles.splice(index, 1);
    setSelectedFiles([...selectedFiles]);
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
    const newDate = format(formData.acquisitionDate, "yyyy-MM-dd");
    const newValue = parseInt(removeCommasFromNumber(formData.value));
    dispatch(
      createNewAsset({ ...formData, acquisitionDate: newDate, value: newValue })
    )
      .unwrap()
      .then((res) => {
        if (res?.success === true) {
          toast.success(res?.message);
          setFormData({
            name: "",
            category: "",
            description: "",
            acquisitionDate: new Date(),
            value: "",
          });
          setLoading(false);
        } else {
          toast.error(res.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };

  useEffect(() => {
    dispatch(getAllAssetCategories())
      .unwrap()
      .then((res) => setAssetTypeOptions(res?.data))
      .catch((err) => console.log({ err }));
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserId(user);
  }, []);
  return (
    <DashboardLayout
      isBackNav={true}
      paths={["Asset Management", "Add new asset"]}
    >
      <ToastContainer />
      <main
        className="p-5 max-w-3xl mt-10 mx-auto  min-h-screen "
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold text-swBlack">Add new assets</p>
          <div className="w-60">
            <SelectField
              value={options.find((option) => option.value === assetUploadType)}
              name="name"
              optionValue={options}
              isSearchable={false}
              onChange={(selectedOption) =>
                setAssetUploadType(selectedOption.value)
              }
            />
          </div>
        </div>

        {assetUploadType === "Single asset" && (
          <div>
            <div className="flex flex-col gap-5">
              <p className="text-lg font-semibold text-swBlack mt-10">
                Asset details
              </p>

              <InputField
                label={"Asset name"}
                required={true}
                name="name"
                placeholder={"Enter asset name"}
                value={formData.name}
                onChange={handleChange}
              />
              <div className="relative">
                <div className="block text-gray-700 text-sm mb-2">
                  Acquisition date
                  <span className="text-red-600 ml-1">*</span>
                </div>
                <div
                  className="py-2 px-3 rounded border border-gray-300 flex gap-2"
                  onClick={() => setOpenDate(!openDate)}
                >
                  <LuCalendar size={22} className="text-swTextColor" />
                  {format(formData.acquisitionDate, "PPP")}
                </div>
                {openDate && (
                  <div className="absolute w-fit right-0  -mb-5 bg-white border rounded-md z-50">
                    <DayPicker
                      styles={{
                        caption: { color: "#2769b3" },
                      }}
                      modifiers={{
                        selected: formData.acquisitionDate,
                      }}
                      modifiersClassNames={{
                        selected: "my-selected",
                      }}
                      onDayClick={(value) => {
                        setFormData((prev) => ({
                          ...prev,
                          acquisitionDate:
                            value > new Date() ? new Date() : value,
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
                label={"Asset type"}
                required={true}
                optionValue={transformedOptions}
                name="category"
                value={
                  formData.category === ""
                    ? null // or another appropriate default value
                    : transformedOptions.find(
                        (option) => option.value === formData.category
                      )
                }
                onChange={(selectedOption) =>
                  setFormData((prev) => ({
                    ...prev,
                    category: selectedOption.value,
                  }))
                }
              />
              <InputField
                label={"Describe asset"}
                required={true}
                name="description"
                value={formData.description}
                placeholder={"Enter asset description"}
                onChange={handleChange}
              />
              <InputField
                name="value"
                required={true}
                ariaLabel={"Number input"}
                onKeyPress={preventMinus}
                onWheel={() => document.activeElement.blur()}
                endIcon={<p className="text-swGray">NGN &#8358;</p>}
                label="Value"
                value={formData?.value?.toLocaleString()}
                placeholder="Enter loan amount"
                onChange={handleChange}
              />
            </div>

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
                <p>{loading ? "Adding asset..." : "Add asset"}</p>
              </div>
            </div>
          </div>
        )}

        {assetUploadType === "Bulk assets" && (
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
                onClick={hundleBulkAssetSubmit}
                disabled={selectedFiles.length > 0 ? false : true || loading}
                label={"Create bulk assets"}
                blueBtn={true}
              />
            </div>
          </div>
        )}
      </main>
      <SuccessModal
        isOpen={successModal}
        title={"Bulk Assets Upload Successful"}
        description={`Upload in progress, you will be notified when this is complete`}
        // noButtons={true}
        btnLeft={"View Assets"}
        btnLeftFunc={() => router.push("/asset-management")}
        btnRight={"Upload Bulk Assets"}
        btnRightFunc={() => setSuccessModal(false)}
        onClose={() => setSuccessModal(false)}
      />
      <CancelModal
        isOpen={failedModal}
        title={"Bulk Assets Upload Failed"}
        description={`An error occured`}
        // noButtons={true}
        noButtons={true}
        onClose={() => setFailedModal(false)}
      />
    </DashboardLayout>
  );
};

export default CreateNewAsset;
