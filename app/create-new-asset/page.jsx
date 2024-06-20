"use client";
import { useState } from "react";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import SelectField from "../components/shared/input/SelectField";
import InputField from "../components/shared/input/InputField";
import { LuCalendar, LuCheck } from "react-icons/lu";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { createNewAsset } from "@/redux/slices/assetManagementSlice";
import { useRouter } from "next/navigation";

const CreateNewAsset = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [assetUploadType, setAssetUploadType] = useState("Single asset");
  const [openDate, setOpenDate] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "Fixed asset",
    description: "",
    acquisitionDate: new Date(),
    value: "",
  });
  const options = [
    { value: "Single asset", label: "Single asset" },
    { value: "Bulk asset", label: "Bulk asset" },
  ];
  const assetTypeOptions = [
    { value: "Fixed asset", label: "Fixed asset" },
    { value: "Current asset", label: "Current asset" },
    { value: "Financial asset", label: "Financial asset" },
    { value: "Intagible asset", label: "Intagible asset" },
    { value: "Digital asset", label: "Digital asset" },
  ];

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

  console.log({ formData });
  return (
    <DashboardLayout paths={["Asset management", "Add new asset"]}>
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
                      acquisitionDate: value > new Date() ? new Date() : value,
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
            optionValue={assetTypeOptions}
            name="category"
            value={assetTypeOptions.find(
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
      </main>
    </DashboardLayout>
  );
};

export default CreateNewAsset;
