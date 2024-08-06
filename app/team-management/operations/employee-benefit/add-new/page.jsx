"use client";
import { useEffect } from "react";
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

const AddBenefitTypesPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [state, setState] = useImmer({
    category: "",
    annualLeave: "",
    sickLeave: "",
    personalLeave: "",
    maternityLeave: "",
    paternityLeave: "",
    unpaidLeave: "",
    description: "",
  });

  const reset = () => {
    setState({
      category: "",
      salary: "",
      description: "",
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
    setState((draft) => {
      draft.loading = true;
    });
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

    dispatch(addNewBenefitTypes({ payload }))
      .unwrap()
      .then((res) => {
        setState((draft) => {
          draft.successModal = true;
          draft.loading = false;
          draft.successMessage = "Benefit type has been created successfully.";
          reset();
        });
      })
      .catch((err) => {
        setState((draft) => {
          draft.failedModal = true;
          draft.failedMessage = err?.message || "Benefit type creation failed.";
          draft.loading = false;
        });
      });
  };

  return (
    <DashboardLayout
      isBackNav={true}
      paths={["Team Management", "Employee Benefit", "Add New"]}
    >
      <div className="mx-auto w-full px-5 lg:px-1 lg:w-3/5 my-20">
        <div className="flex justify-between items-center p-3">
          <div>
            <p className="text-2xl lg:text-3xl font-bold text-swBlack">
              Add Epmloyee Benefit
            </p>
            {/* <p className="text-sm mt-1">Department information</p> */}
          </div>
        </div>

        <div className="pt-8 px-5 pb-16 bg-white">
          <div className="flex justify-between mt-6 gap-5">
            <p className="w-1/4 font-semibold mr-2">Benefit Category</p>
            <div className="w-3/4">
              <SelectField
                label={"Select Benefit Category"}
                required={true}
                isSearchable={true}
                // placeholder={data?.data ? "Select..." : "Loading..."}
                onChange={(e) =>
                  setState((draft) => {
                    draft.category = e.value;
                  })
                }
                optionValue={state.users}
              />
            </div>
          </div>

          <div className="flex justify-between mt-6 gap-5">
            <p className="w-1/4 font-semibold mr-2">Benefit Type</p>
            <div className="w-3/4">
              <SelectField
                label={"Select Benefit Category"}
                required={true}
                isSearchable={true}
                // placeholder={data?.data ? "Select..." : "Loading..."}
                onChange={(e) =>
                  setState((draft) => {
                    draft.category = e.value;
                  })
                }
                optionValue={state.users}
              />
            </div>
          </div>

          <div className="flex justify-between mt-5 gap-5">
            <p className="w-1/4 font-semibold mr-2">Salary</p>
            <div className="w-3/4 flex flex-col gap-5">
              <InputField
                required={true}
                value={state.salary}
                name={"sickLeave"}
                label={"Enter Days For Sick Leave"}
                placeholder={"Sick Level"}
                onChange={handleInputChange}
                onKeyPress={preventMinus}
                onWheel={() => document.activeElement.blur()}
              />
            </div>
          </div>

          <div className="flex justify-between mt-5 gap-5">
            <p className="w-1/4 font-semibold mr-2">Description</p>
            <div className="w-3/4 flex flex-col gap-5">
              <textarea
                className="w-full h-20 px-3 py-2 rounded border border-gray-300 focus:outline-none"
                required={true}
                value={state.description}
                name={"description"}
                label={"Enter description"}
                placeholder={"Benefit description"}
                onChange={(e) =>
                  setState((draft) => {
                    draft.description = e.target.value;
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="p-3 border-t flex items-center justify-end gap-2 w-full">
          <Button
            disabled={
              Object.values(state).some((item) => item === "") || state.loading
            }
            onClick={handleSubmit}
            className={`text-white font-semibold p-2 px-16 bg-swBlue 
                        hover:bg-swBluee500 rounded-md flex items-center gap-2`}
          >
            {state.loading ? "Adding..." : "Add Employment Benefit"}
          </Button>
        </div>
      </div>
      <SuccessModal
        isOpen={state.successModal}
        description={state.successMessage}
        title={"Benefit Type Creation Successful"}
        btnLeft={"Operations"}
        btnLeftFunc={() => router.push("/team-management/operations")}
        btnRight={"Done"}
        btnRightFunc={() =>
          setState((draft) => {
            draft.successModal = false;
          })
        }
        onClose={() =>
          setState((draft) => {
            draft.successModal = false;
          })
        }
      />
      <CancelModal
        isOpen={state.failedModal}
        description={state.failedMessage}
        title={"Benefit Type Creation Creation Failed"}
        noButtons={true}
        onClose={() =>
          setState((draft) => {
            draft.failedModal = false;
          })
        }
      />
    </DashboardLayout>
  );
};

export default AddBenefitTypesPage;
