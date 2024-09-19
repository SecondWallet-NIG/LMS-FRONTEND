"use client";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { LuCalendar } from "react-icons/lu";
import InputField from "@/app/components/shared/input/InputField";
import { format } from "date-fns";
import SuccessModal from "@/app/components/modals/SuccessModal";
import CancelModal from "@/app/components/modals/CancelModal";
import { useDispatch } from "react-redux";
import { addNewFinancialYear } from "@/redux/slices/hrmsSlice";
import Button from "@/app/components/shared/buttonComponent/Button";

const AddNewFinancialYear = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    year: "",
    startDate: new Date(),
  });

  const reset = () => {
    setFormData({
      year: "",
      startDate: new Date(),
    });
  };
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState({ state: false, message: "" });
  const [openDate, setOpenDate] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    dispatch(addNewFinancialYear(formData))
      .unwrap()
      .then((res) => {
        setSuccessModal(true);
        reset();
        setLoading(false);
      })
      .catch((error) => {
        setErrorModal({
          state: true,
          message: error?.message || "An error occurred",
        });
        setLoading(false);
      });
  };

  return (
    <DashboardLayout
      isBackNav={true}
      paths={["Team Management", "Financial Year", "Add New"]}
      roles={["CFO", "CEO", "CT0", "Dir", "HRM", "System Admin"]}
    >
      <div className="mx-auto w-full px-5 lg:px-1 lg:w-3/5 my-20 min-h-[80vh]">
        <div className="flex justify-between items-center p-3">
          <div>
            <p className="text-xl lg:text-2xl font-bold text-swBlack">
              Add New Financial Year
            </p>
          </div>
        </div>

        <div className="flex justify-between mt-5 gap-5">
          <p className="w-1/4 font-semibold mr-2">Select Year</p>
          <div className="relative w-3/4 flex flex-col gap-5 cursor-pointer">
            <div
              className="py-2 px-3 rounded border border-gray-300 flex gap-2"
              onClick={() => setOpenDate(!openDate)}
            >
              <LuCalendar size={22} className="text-swTextColor" />
              {format(formData.startDate, "PPP")}
            </div>
            {openDate && (
              <div className="absolute right-0 bg-white border rounded-md z-50">
                <DayPicker
                  styles={{
                    caption: { color: "#2769b3" },
                  }}
                  modifiers={{
                    selected: formData.startDate,
                  }}
                  modifiersClassNames={{
                    selected: "my-selected",
                  }}
                  onDayClick={(value) => {
                    setFormData((prev) => ({
                      ...prev,
                      startDate: value,
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
        </div>
        <div className="flex justify-between mt-5 gap-5">
          <p className="w-1/4 font-semibold mr-2">Year Description</p>
          <div className="w-3/4 flex flex-col gap-5">
            <InputField
              required={true}
              value={formData.year}
              name={"Year Description"}
              // label={"Enter Year Description"}
              placeholder={"Enter Year description"}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, year: e.target.value }))
              }
            />
          </div>
        </div>

        <div className="p-3 border-t flex items-center justify-end gap-2 w-full mt-10">
          <Button
            disabled={
              Object.values(formData).some((item) => item === "") || loading
            }
            onClick={handleSubmit}
            className={`text-white font-semibold p-2 px-16 bg-swBlue 
                        hover:bg-swBluee500 rounded-md flex items-center gap-2`}
          >
            {loading ? "Adding..." : "Add Financial Year"}
          </Button>
        </div>
      </div>
      <SuccessModal
        isOpen={successModal}
        description={"Financal year has been created successfully"}
        title={"Financial Year Creation Successful"}
        btnLeft={"Operations"}
        btnLeftFunc={() => router.push("/team-management/operations")}
        btnRight={"Done"}
        btnRightFunc={() => setSuccessModal(false)}
        onClose={() => setSuccessModal(false)}
      />
      <CancelModal
        isOpen={errorModal.state}
        description={errorModal.message}
        title={"Financial Year Creation Failed"}
        noButtons={true}
        onClose={() => setErrorModal({ state: false, message: "" })}
      />
    </DashboardLayout>
  );
};

export default AddNewFinancialYear;
