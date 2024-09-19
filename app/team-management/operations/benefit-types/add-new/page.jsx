"use client";
import { useEffect, useState } from "react";
import SelectField from "@/app/components/shared/input/SelectField";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import { useSelector, useDispatch } from "react-redux";
import { createDepartment } from "@/redux/slices/roleSlice";
import { useImmer } from "use-immer";
import SuccessModal from "@/app/components/modals/SuccessModal";
import CancelModal from "@/app/components/modals/CancelModal";
import { useRouter } from "next/navigation";
import Button from "@/app/components/shared/buttonComponent/Button";
import InputField from "@/app/components/shared/input/InputField";
import { getAllUsers } from "@/redux/slices/userSlice";
import { addNewBenefitTypes } from "@/redux/slices/hrmsSlice";
import { teamManagementAuthRoles } from "@/app/components/helpers/pageAuthRoles";

const AddBenefitTypesPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState({
    state: false,
    message: "",
  });
  const [state, setState] = useImmer({
    level: "",
    annualLeave: "",
    sickLeave: "",
    personalLeave: "",
    maternityLeave: "",
    paternityLeave: "",
    unpaidLeave: "",
  });

  const reset = () => {
    setState({
      level: "",
      annualLeave: "",
      sickLeave: "",
      personalLeave: "",
      maternityLeave: "",
      paternityLeave: "",
      unpaidLeave: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const preventMinus = (e) => {
    if (/[^0-9,.]/g.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    const payload = {
      level: state.level,
      leaveTypes: {
        annualLeave: Number(state.annualLeave),
        sickLeave: Number(state.sickLeave),
        personalLeave: Number(state.personalLeave),
        maternityLeave: Number(state.maternityLeave),
        paternityLeave: Number(state.paternityLeave),
        unpaidLeave: Number(state.unpaidLeave),
      },
    };

    dispatch(addNewBenefitTypes(payload))
      .unwrap()
      .then((res) => {
        setSuccessModal(true);
        reset();
        setLoading(false);
      })
      .catch((err) => {
        setErrorModal({
          state: true,
          message: err?.message || "Benefit type creation failed.",
        });
        setLoading(false);
      });
  };

  return (
    <DashboardLayout
      isBackNav={true}
      paths={["Team Management", "Benefit Types", "Add New"]}
      roles={teamManagementAuthRoles}
    >
      <div className="mx-auto w-full px-5 lg:px-1 lg:w-3/5 my-20">
        <div className="flex justify-between items-center p-3">
          <div>
            <p className="text-2xl font-bold text-swBlack">
              Add New Benefit Type
            </p>
            {/* <p className="text-sm mt-1">Department information</p> */}
          </div>
        </div>

        <div className="pt-8 px-5 pb-16 bg-white">
          <div className="flex justify-between mt-5 gap-5">
            <p className="w-1/4 font-semibold mr-2">Staff Level</p>
            <div className="w-3/4 flex flex-col gap-5">
              <InputField
                // required={true}
                value={state.level}
                name={"level"}
                // label={"Enter Staff Level"}
                placeholder={"Enter Staff Level"}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex justify-between mt-5 gap-5">
            <p className="w-1/4 font-semibold mr-2">Anual Leave</p>
            <div className="w-3/4 flex flex-col gap-5">
              <InputField
                // required={true}
                value={state.annualLeave}
                name={"annualLeave"}
                // label={"Enter Days For Annual Leave"}
                placeholder={"Enter Days For Annual Leave"}
                onChange={handleInputChange}
                onKeyPress={preventMinus}
                onWheel={() => document.activeElement.blur()}
              />
            </div>
          </div>

          <div className="flex justify-between mt-5 gap-5">
            <p className="w-1/4 font-semibold mr-2">Sick Leave</p>
            <div className="w-3/4 flex flex-col gap-5">
              <InputField
                // required={true}
                value={state.sickLeave}
                name={"sickLeave"}
                // label={"Enter Days For Sick Leave"}
                placeholder={"Enter Days For Sick Leave"}
                onChange={handleInputChange}
                onKeyPress={preventMinus}
                onWheel={() => document.activeElement.blur()}
              />
            </div>
          </div>

          <div className="flex justify-between mt-5 gap-5">
            <p className="w-1/4 font-semibold mr-2">Personal Leave</p>
            <div className="w-3/4 flex flex-col gap-5">
              <InputField
                // required={true}
                value={state.personalLeave}
                name={"personalLeave"}
                // label={"Enter Days For Personal Leave"}
                placeholder={"Enter Days For Personal Leave"}
                onChange={handleInputChange}
                onKeyPress={preventMinus}
                onWheel={() => document.activeElement.blur()}
              />
            </div>
          </div>

          <div className="flex justify-between mt-5 gap-5">
            <p className="w-1/4 font-semibold mr-2">Maternity Leave</p>
            <div className="w-3/4 flex flex-col gap-5">
              <InputField
                // required={true}
                value={state.maternityLeave}
                name={"maternityLeave"}
                // label={"Enter Days For Maternity Leave"}
                placeholder={"Enter Days For Maternity Leave"}
                onChange={handleInputChange}
                onKeyPress={preventMinus}
                onWheel={() => document.activeElement.blur()}
              />
            </div>
          </div>

          <div className="flex justify-between mt-5 gap-5">
            <p className="w-1/4 font-semibold mr-2">Paternity Leave</p>
            <div className="w-3/4 flex flex-col gap-5">
              <InputField
                // required={true}
                value={state.paternityLeave}
                name={"paternityLeave"}
                // label={"Enter Days For Paternity Leave"}
                placeholder={"Enter Days For Paternity Leave"}
                onChange={handleInputChange}
                onKeyPress={preventMinus}
                onWheel={() => document.activeElement.blur()}
              />
            </div>
          </div>

          <div className="flex justify-between mt-5 gap-5">
            <p className="w-1/4 font-semibold mr-2">Unpaid Leave</p>
            <div className="w-3/4 flex flex-col gap-5">
              <InputField
                // required={true}
                value={state.unpaidLeave}
                name={"unpaidLeave"}
                // label={"Enter Days For Unpaid Leave"}
                placeholder={"Enter Days For Unpaid Leave"}
                onChange={handleInputChange}
                onKeyPress={preventMinus}
                onWheel={() => document.activeElement.blur()}
              />
            </div>
          </div>
        </div>

        <div className="p-3 border-t flex items-center justify-end gap-2 w-full">
          <Button
            disabled={
              Object.values(state).some((item) => item === "") || loading
            }
            onClick={handleSubmit}
            className={`text-white font-semibold p-2 px-16 bg-swBlue 
                        hover:bg-swBluee500 rounded-md flex items-center gap-2`}
          >
            {loading ? "Adding..." : "Add Benefit Type"}
          </Button>
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
        onClose={() =>
          setErrorModal({
            state: false,
            message: "",
          })
        }
      />
    </DashboardLayout>
  );
};

export default AddBenefitTypesPage;
