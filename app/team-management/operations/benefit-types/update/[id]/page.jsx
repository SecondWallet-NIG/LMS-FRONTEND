"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { useImmer } from "use-immer";
import {
  addNewBenefitTypes,
  getAllBenefitTypes,
} from "@/redux/slices/hrmsSlice";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import SuccessModal from "@/app/components/modals/SuccessModal";
import CancelModal from "@/app/components/modals/CancelModal";
import Button from "@/app/components/shared/buttonComponent/Button";
import InputField from "@/app/components/shared/input/InputField";
import { getAllUsers } from "@/redux/slices/userSlice";
import { teamManagementAuthRoles } from "@/app/components/helpers/pageAuthRoles";

const daysOfWeek = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const UpdateBenefitTypesPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState({ state: false, message: "" });
  const [clockInTime, setClockInTime] = useState("");
  const [clockOutTime, setClockOutTime] = useState("");
  const { benData: data } = useSelector((state) => state?.hrms);
  const [state, setState] = useImmer({
    level: "",
    annualleave: "",
    sickleave: "",
    casualleave: "",
    maternityleave: "",
    // paternityleave: "",
    unpaidleave: "",
    selectedDays: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    },
  });

  const reset = () => {
    setState((draft) => {
      draft.level = "";
      draft.annualleave = "";
      draft.sickleave = "";
      draft.casualleave = "";
      draft.maternityleave = "";
      // draft.paternityleave = "";
      draft.unpaidleave = "";
      draft.selectedDays = {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      };
    });
    setClockInTime("");
    setClockOutTime("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((draft) => {
      draft[name] = value;
    });
  };

  const handleDayChange = (day) => {
    setState((draft) => {
      draft.selectedDays[day] = !draft.selectedDays[day];
    });
  };

  const preventMinus = (e) => {
    if (/[^0-9,.]/g.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      level: state.level,
      leaveTypes: {
        annualLeave: Number(state.annualleave),
        sickLeave: Number(state.sickleave),
        personalLeave: Number(state.casualleave),
        maternityLeave: Number(state.maternityleave),
        // paternityLeave: Number(state.paternityleave),
        unpaidLeave: Number(state.unpaidleave),
      },
      workingDays: state.selectedDays,
      clockInTime,
      clockOutTime,
    };

    // console.log(payload);

    try {
      await dispatch(addNewBenefitTypes(payload)).unwrap();
      setSuccessModal(true);
      reset();
    } catch (err) {
      setErrorModal({
        state: true,
        message: err?.message || "Benefit type creation failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // console.log(data?.data);
    data?.data?.find((benefitType) => {
      if (benefitType._id === id) {
        console.log(benefitType)
        setState((draft) => {
          draft.level = benefitType?.level;
          draft.annualleave = benefitType?.leaveTypes?.annualLeave;
          draft.sickleave = benefitType?.leaveTypes?.sickLeave;
          draft.casualleave = benefitType?.leaveTypes?.annualLeave;
          draft.maternityleave = benefitType?.leaveTypes?.maternityLeave;
          // draft.paternityleave = benefitType?.leaveTypes?.paternityLeave;
          draft.unpaidleave = benefitType?.leaveTypes?.unpaidLeave;
          draft.selectedDays = benefitType?.workingDays;
        });
        setClockInTime(benefitType?.clockInAndOutTime?.clockIn);
        setClockOutTime(benefitType?.clockInAndOutTime?.clockOut);
      }
    });
  }, [data]);

  useEffect(() => {
    dispatch(getAllBenefitTypes());
  }, []);

  return (
    <DashboardLayout
      isBackNav={true}
      paths={["Team Management", "Benefit Types", "Update"]}
      roles={teamManagementAuthRoles}
    >
      <div className="mx-auto w-full px-5 lg:px-1 md:flex block gap-4 my-8">
        <div className="md:w-1/2 w-full">
          <div className="px-5 pb-16 bg-white">
            <div className="pt-4 text-md font-semibold text-swBlue mb-5">
              Leave Section
            </div>
            <InputField
              name={"level"}
              value={state.level}
              onChange={handleInputChange}
              label={"Staff Level"}
              onWheel={() => document.activeElement.blur()}
            />
            {[
              "Annual Leave",
              "Sick Leave",
              "Casual Leave",
              "Maternity Leave",
              // "Paternity Leave",
              "Unpaid Leave",
            ].map((label) => (
              <div className="flex justify-between mt-5 gap-5" key={label}>
                <div className="w-full flex flex-col gap-5">
                  <InputField
                    value={state[label.toLowerCase().replace(" ", "")]}
                    name={label.toLowerCase().replace(" ", "")}
                    onChange={handleInputChange}
                    onKeyPress={preventMinus}
                    label={label}
                    onWheel={() => document.activeElement.blur()}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:w-1/2 w-full">
          <div className="mx-auto bg-white p-6">
            <div className="pb-8 text-md font-semibold text-swBlue">
              Resumption Time and Days Details
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {daysOfWeek.map((day) => (
                  <label key={day} className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 bg-swBlue text-swBlue"
                      checked={state.selectedDays[day]}
                      onChange={() => handleDayChange(day)}
                    />
                    <span className="ml-2 text-sm capitalize">{day}</span>
                  </label>
                ))}
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm text-gray-700"
                  htmlFor="clockIn"
                >
                  Clock In Time
                </label>
                <input
                  type="time"
                  id="clockIn"
                  value={clockInTime}
                  onChange={(e) => setClockInTime(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm text-gray-700"
                  htmlFor="clockOut"
                >
                  Clock Out Time
                </label>
                <input
                  type="time"
                  id="clockOut"
                  value={clockOutTime}
                  onChange={(e) => setClockOutTime(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-swBlue text-white font-semibold py-2 rounded-md hover:bg-blue-700 relative overflow-hidden ${
                  loading ? "cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Updating..." : "Update"}
                {loading && (
                  <div className="absolute top-0 left-0 h-full w-full bg-white bg-opacity-50" />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={successModal}
        description={"Benefit type has been created successfully."}
        title={"Benefit Type Creation Successful"}
        btnLeft={"Operations"}
        btnLeftFunc={() => router.push("/team-management/operations")}
        btnRight={"Done"}
        btnRightFunc={() => setSuccessModal(false)}
        onClose={() => setSuccessModal(false)}
      />
      <CancelModal
        isOpen={errorModal.state}
        description={errorModal.message}
        title={"Benefit Type Creation Failed"}
        noButtons={true}
        onClose={() => setErrorModal({ state: false, message: "" })}
      />
    </DashboardLayout>
  );
};

export default UpdateBenefitTypesPage;