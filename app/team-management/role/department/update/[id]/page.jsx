"use client";
import { useEffect, useState } from "react";
import SelectField from "@/app/components/shared/input/SelectField";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import { useSelector, useDispatch } from "react-redux";
import { createRole, getRoles, updateRole } from "@/redux/slices/roleSlice";
import { useImmer } from "use-immer";
import SuccessModal from "@/app/components/modals/SuccessModal";
import CancelModal from "@/app/components/modals/CancelModal";
import { useParams, useRouter } from "next/navigation";
import Button from "@/app/components/shared/buttonComponent/Button";
import InputField from "@/app/components/shared/input/InputField";
import { getAllDepartments } from "@/redux/slices/hrmsSlice";

const UpdateDepartment = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const { data } = useSelector((state) => state?.hrms);
  const { data: roles } = useSelector((state) => state?.role);
  const [role, setRole] = useState({});
  const [state, setState] = useImmer({
    role: "",
    department: "",
    tag: "",
    permissions: [],
    loading: false,
    successModal: false,
    successMessage: "",
    failedModal: false,
    failedMessage: "",
    departments: [],
  });

  console.log(roles);

  useEffect(() => {
    dispatch(getAllDepartments());
    dispatch(getRoles());
  }, []);

  useEffect(() => {
    if (roles?.data?.length > 0) {
      const role = roles?.data.find((role) => role._id === id);
      setState((draft) => {
        draft.department = role?.department?._id;
      });
      setRole({ name: role.name, tag: role.tag });
    }
  }, [roles?.data]);

  console.log({ role });

  useEffect(() => {
    if (data?.data) {
      const departments = [];
      const res = data?.data?.departments || [];

      for (let i = 0; i < res.length; i++) {
        const value = res[i]._id;
        const label = res[i].departmentName;
        departments.push({ value, label });
      }
      setState((draft) => {
        draft.departments = departments;
      });
    }
  }, [data?.data]);

  const handleSubmit = () => {
    setState((draft) => {
      draft.loading = true;
    });
    const payload = {
      department: state.department,
    };

    dispatch(updateRole({ payload, id }))
      .unwrap()
      .then((res) => {
        setState((draft) => {
          draft.successModal = true;
          draft.successMessage =
            res?.messsage || "Role has been updated successfully.";
          draft.loading = false;
          draft.role = "";
          draft.permissions = [];
          draft.department = "";
        });
      })
      .catch((err) => {
        setState((draft) => {
          draft.failedModal = true;
          draft.failedMessage = err?.message || "Role update has failed.";
          draft.loading = false;
        });
      });
  };

  return (
    <DashboardLayout isBackNav={true} paths={["Team Management", "New Role"]}>
      <div className="mx-auto w-full px-5 lg:px-1 lg:w-3/5 my-20 mb-60">
        <div className="flex justify-between items-center p-3">
          <div>
            <p className="text-xl lg:text-2xl font-bold text-swBlack">
              Update Role
            </p>
            <p className="text-sm mt-1">Role Information</p>
          </div>
        </div>

        <div className="pt-8 px-5 pb-16 bg-white">
          <div className="flex justify-between mt-5 gap-5">
            <p className="w-1/4 font-semibold mr-2">Role</p>
            <div className="w-3/4 flex flex-col gap-5">
              <InputField
                required={true}
                value={role?.name}
                disabled={true}
                name={"roleName"}
                placeholder={"Role Name"}
              />
            </div>
          </div>

          <div className="flex justify-between mt-5 gap-5">
            <p className="w-1/4 font-semibold mr-2">Tag</p>
            <div className="w-3/4 flex flex-col gap-5">
              <InputField
                value={role?.tag || "No Tag"}
                required={true}
                name={"tag"}
                disabled={true}
                placeholder={"Tag"}
              />
            </div>
          </div>

          <div className="flex justify-between mt-6 gap-5">
            <p className="w-1/4 font-semibold mr-2">Department</p>
            <div className="w-3/4">
              <SelectField
                // label={"Select department"}
                // required={true}
                isSearchable={true}
                value={state.departments.find(
                  (item) => item.value === state?.department
                )}
                placeholder={data?.data ? "Select Department..." : "Loading..."}
                onChange={(e) =>
                  setState((draft) => {
                    draft.department = e.value;
                  })
                }
                optionValue={state.departments}
              />
            </div>
          </div>
        </div>

        <div className="p-3 border-t flex items-center justify-end gap-2 w-full">
          <Button
            disabled={state.loading || !state.department}
            onClick={handleSubmit}
            className={`text-white font-semibold p-2 px-16 bg-swBlue 
                        hover:bg-swBluee500 rounded-md flex items-center gap-2`}
          >
            Update Role
          </Button>
        </div>
      </div>
      <SuccessModal
        isOpen={state.successModal}
        description={state.successMessage}
        title={"Role Updated Successfully"}
        btnLeft={"Roles"}
        btnLeftFunc={() => router.back()}
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
        title={"Role update Failed"}
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

export default UpdateDepartment;
