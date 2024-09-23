"use client";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import CancelModal from "@/app/components/modals/CancelModal";
import SuccessModal from "@/app/components/modals/SuccessModal";
import EditableButton from "@/app/components/shared/editableButtonComponent/EditableButton";
import InputField from "@/app/components/shared/input/InputField";
import SelectField from "@/app/components/shared/input/SelectField";
import { requestLeave } from "@/redux/slices/hrmsSlice";
import { getAllUsers, getUserById } from "@/redux/slices/userSlice";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDatePicker from "../shared/date/CustomDatePicker";
import {
  getPublicHolidays,
  leaveTypes,
  publicHolidays,
} from "../helpers/utils";
import { toast } from "react-toastify";

const RequestLeaveModal = ({ onClose }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState({ state: false, message: "" });
  const [allRelievers, setAllRelievers] = useState([]);
  const [allHrm, setAllHrm] = useState([]);
  const [allMd, setAllMd] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [clearDate, setClearDate] = useState(false);
  const [formData, setFormData] = useState({
    leaveType: "",
    leaveDuration: 0,
    reliever: "",
    firstApprover: "",
    secondApprover: "",
    description: "",
  });
  const { data } = useSelector((state) => state.user);
  const type = data?.data?.employeeBenefit?.benefitType?.leaveTypes;

  const reset = () => {
    setFormData({
      leaveType: "",
      leaveDuration: 0,
      reliever: "",
      description: "",
    });
    setClearDate(true);
    setStartDate(null);
    setEndDate(null);
  };

  const handleInputField = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (formData.leaveDuration < 1) {
      toast.error("Invalid leave duration: Duration should be 1 and above");
      return;
    }
    setLoading(true);
    const payload = {
      leaveType: formData.leaveType,
      leaveDuration: formData.leaveDuration,
      reliever: formData.reliever,
      startDate: startDate,
      endDate: endDate,
      description: formData.description,
      userId: id,
    };
    dispatch(requestLeave(payload))
      .unwrap()
      .then((res) => {
        setSuccessModal(true);
        setLoading(false);
        reset();
      })
      .catch((err) => {
        setErrorModal({ state: true, message: err?.message });
        setLoading(false);
      });
  };

  // Function to check if a date is a weekend or a public holiday
  const isWeekendOrHoliday = (date) => {
    const currentYear = new Date().getFullYear();
    const day = date.getDay();
    const isWeekend = day === 0 || day === 6; // Sunday or Saturday
    const isHoliday = getPublicHolidays(currentYear).some(
      (holiday) => holiday.toDateString() === date.toDateString()
    );
    return isWeekend || isHoliday;
  };

  useEffect(() => {
    if (startDate && endDate) {
      let currentDate = new Date(startDate);
      const end = new Date(endDate);
      let validDays = 0;

      while (currentDate <= end) {
        if (!isWeekendOrHoliday(currentDate)) {
          validDays++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }

      setFormData({ ...formData, leaveDuration: validDays });
      setClearDate(false);
    } else {
      setFormData({ ...formData, leaveDuration: 0 });
    }
  }, [startDate, endDate]);

  useEffect(() => {
    dispatch(getAllUsers(10000))
      .unwrap()
      .then((res) => {
        const allUsers = res?.data?.results.map((item) => ({
          label: `${item?.firstName} ${item?.lastName}, ${item?.email}`,
          value: item?._id,
        }));
        setAllRelievers(allUsers);

        const hrm = res?.data?.results
          .filter((item) => item?.role?.tag === "HRM")
          .map((item) => ({
            label: `${item?.firstName} ${item?.lastName}, ${item?.email}`,
            value: item?._id,
          }));
        setAllHrm(hrm);

        const dir = res?.data?.results
          .filter((item) => item?.role?.tag === "Dir")
          .map((item) => ({
            label: `${item?.firstName} ${item?.lastName}, ${item?.email}`,
            value: item?._id,
          }));
        setAllMd(dir);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id));
    }
  }, [id]);

  return (
    <div>
      <main className="mx-auto w-full px-5 my-2">
        <form id="add-user-form" className="">
          <div className="">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-md lg:text-xl font-medium text-swBlue">
                  Leave Request Form
                </p>
              </div>
            </div>
            <div className="pt-8">
              <div className="flex justify-between mt-5">
                <div className="w-full flex flex-col gap-3">
                  <SelectField
                    label={"Select Leave Type"}
                    isSearchable={true}
                    value={
                      leaveTypes.find((e) => e.id === formData.leaveType) || ""
                    }
                    onChange={(e) => {
                      setFormData({ ...formData, leaveType: e.id });
                    }}
                    optionValue={leaveTypes}
                    placeholder={"Select"}
                  />
                </div>
              </div>
              <div className="flex justify-between mt-5">
                <div className="w-full flex flex-col gap-3">
                  <SelectField
                    label={"Choose Reliever"}
                    isSearchable={true}
                    value={
                      allRelievers.find((e) => e.value === formData.reliever) ||
                      ""
                    }
                    onChange={(e) =>
                      setFormData({ ...formData, reliever: e.value })
                    }
                    optionValue={allRelievers}
                    placeholder={"Select"}
                  />
                </div>
              </div>
              <div className="flex justify-between mt-7">
                <div className="w-full flex flex-col gap-5">
                  <div className="flex gap-3 items-end">
                    <CustomDatePicker
                      label={"Start Date"}
                      value={setStartDate}
                      clear={clearDate}
                    />
                    <CustomDatePicker
                      label={"End Date"}
                      value={setEndDate}
                      clear={clearDate}
                    />
                  </div>
                  <p>Duration: {formData?.leaveDuration} working day(s)</p>
                </div>
              </div>
              <div className="flex justify-between mt-5">
                <div className="w-full flex flex-col gap-3">
                  <SelectField
                    label={"Select First Approver"}
                    isSearchable={true}
                    value={
                      allHrm.find((e) => e._id === formData.firstApprover) || ""
                    }
                    onChange={(e) => {
                      setFormData({ ...formData, firstApprover: e._id });
                    }}
                    optionValue={allHrm}
                    placeholder={"Select"}
                  />
                </div>
              </div>
              <div className="flex justify-between mt-5">
                <div className="w-full flex flex-col gap-3">
                  <SelectField
                    label={"Select Second Approver"}
                    isSearchable={true}
                    value={
                      allMd.find((e) => e._id === formData.secondApprover) || ""
                    }
                    onChange={(e) => {
                      setFormData({ ...formData, secondApprover: e._id });
                    }}
                    optionValue={allMd}
                    placeholder={"Select"}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-7">
              <div className="w-full flex flex-col gap-5">
                <div className="flex gap-3 items-end">
                  <div className="w-full ">
                    <p className="text-sm text-swDarkBlue mb-4">
                      Additonal Message
                    </p>
                    <textarea
                      name="description"
                      value={formData.description}
                      placeholder="Enter Comment"
                      rows="4"
                      className="p-3 focus:outline-none border w-full rounded-md border-gray-300 text-sm"
                      onChange={handleInputField}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 bg-white">
              <EditableButton
                blueBtn={true}
                disabled={
                  Object.keys(formData).some(
                    (key) => formData[key] === "" || formData[key] < 1
                  ) ||
                  !startDate ||
                  !endDate ||
                  loading
                }
                label={loading ? "Requesting..." : "Request Leave"}
                onClick={handleSubmit}
              />
            </div>
          </div>
        </form>
      </main>
      <SuccessModal
        isOpen={successModal}
        description={"Leave request created successfully"}
        title={"Leave Request Successful"}
        // noButtons={true}
        btnLeft={"Close"}
        btnLeftFunc={() => setSuccessModal(false)}
        btnRight={"Dashboard"}
        btnRightFunc={() => router.push(`/employee-dashboard/${id}`)}
        onClose={() => setSuccessModal(false)}
      />
      <CancelModal
        isOpen={errorModal.state}
        description={errorModal.message}
        title={"Leave Request Failed"}
        noButtons={true}
        onClose={() => setErrorModal({ state: false, message: "" })}
      />
    </div>
  );
};

export default RequestLeaveModal;
