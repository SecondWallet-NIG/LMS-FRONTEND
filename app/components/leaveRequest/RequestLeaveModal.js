"use client";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import CancelModal from "@/app/components/modals/CancelModal";
import SuccessModal from "@/app/components/modals/SuccessModal";
import EditableButton from "@/app/components/shared/editableButtonComponent/EditableButton";
import InputField from "@/app/components/shared/input/InputField";
import SelectField from "@/app/components/shared/input/SelectField";
import { requestLeave } from "@/redux/slices/hrmsSlice";
import { getUserById } from "@/redux/slices/userSlice";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDatePicker from "../shared/date/CustomDatePicker";

const RequestLeaveModal = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState({ state: false, message: "" });
  const [formData, setFormData] = useState({
    leaveType: "",
    leaveDuration: "",
    description: "",
  });
  const { data } = useSelector((state) => state.user);
  const type = data?.data?.employeeBenefit?.benefitType?.leaveTypes;

  const reset = () => {
    setFormData({
      leaveType: "",
      leaveDuration: "",
      description: "",
    });
  };

  const preventMinus = (e) => {
    if (/[^0-9,]/g.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleInputField = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const leaveTypes = [
    { label: "Annual Leave", value: "annualLeave" },
    { label: "Sick Leave", value: "sickLeave" },
    { label: "Maternity Leave", value: "maternityLeave" },
    { label: "Paternity Leave", value: "paternityLeave" },
    { label: "Unpaid Leave", value: "unpaidLeave" },
  ];

  const handleSubmit = () => {
    setLoading(true);
    const payload = {
      leaveType: formData.leaveType,
      leaveDuration: Number(formData.leaveDuration),
      description: formData.description,
      id: id,
    };
    dispatch(requestLeave(payload))
      .unwrap()
      .then((res) => {
        setSuccessModal(true);
        reset();
        setLoading(false);
      })
      .catch((err) => {
        setErrorModal({ state: true, message: err?.message });
        setLoading(false);
      });
  };

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
                    label={'Select Leave Type'}
                    isSearchable={true}
                    value={leaveTypes.find(
                      (e) => e.value === formData.leaveType
                    )}
                    onChange={(e) =>
                      setFormData({ ...formData, leaveType: e.value })
                    }
                    optionValue={leaveTypes}
                    placeholder={"Select"}
                  />
                  {formData.leaveType && type && (
                    <p className="text-sm lower">
                      You have{" "}
                      {Object.keys(type).find((key) => {
                        if (key === formData.leaveType) {
                          return true;
                        }
                        return false;
                      }) && type[formData.leaveType]}{" "}
                      days left for your{" "}
                      <span className="lowercase">
                        {
                          leaveTypes.find(
                            (leave) => leave.value === formData.leaveType
                          ).label
                        }
                      </span>
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-between mt-5">
       
       <div className="w-full flex flex-col gap-3">
         <SelectField
           label={'Choose Reliever'}
           isSearchable={true}
           value={leaveTypes.find(
             (e) => e.value === formData.leaveType
           )}
           onChange={(e) =>
             setFormData({ ...formData, leaveType: e.value })
           }
           optionValue={leaveTypes}
           placeholder={"Select"}
         />
   
       </div>
     </div>
              <div className="flex justify-between mt-7">
           
                <div className="w-full flex flex-col gap-5">
                  <div className="flex gap-3 items-end">
                    {/* <div className="w-full ">
                    
                      <InputField
                        name="leaveDuration"
                        value={formData.leaveDuration}
                        onKeyPress={preventMinus}
                        onWheel={() => document.activeElement.blur()}
                        placeholder="Enter duration in days"
                        onChange={handleInputField}
                      />
                    </div> */}
                    <CustomDatePicker label={"Start Date"} />
                    <CustomDatePicker label={"End Date"} />
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-7">
             
                <div className="w-full flex flex-col gap-5">
                  <div className="flex gap-3 items-end">
                    <div className="w-full ">
                        <p className="text-sm text-swDarkBlue mb-4">Enter Additional Message</p>
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
            </div>

            <div className="flex items-center justify-end gap-2 bg-white">
              <EditableButton
                blueBtn={true}
                disabled={
                  Object.keys(formData).some((key) => formData[key] === "") ||
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