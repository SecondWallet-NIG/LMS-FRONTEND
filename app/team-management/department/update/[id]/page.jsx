"use client";
import { useEffect } from "react";
import SelectField from "@/app/components/shared/input/SelectField";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import { useSelector, useDispatch } from "react-redux";
import { createDepartment, updateDepartment } from "@/redux/slices/roleSlice";
import { useImmer } from "use-immer";
import SuccessModal from "@/app/components/modals/SuccessModal";
import CancelModal from "@/app/components/modals/CancelModal";
import { useParams, useRouter } from "next/navigation";
import Button from "@/app/components/shared/buttonComponent/Button";
import InputField from "@/app/components/shared/input/InputField";
import { getAllUsers } from "@/redux/slices/userSlice";
import { getSingleDepartment } from "@/redux/slices/hrmsSlice";

const UpdateDepartmentPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const { data } = useSelector((state) => state?.user);
  const { data: department } = useSelector((state) => state.hrms);
  const [state, setState] = useImmer({
    name: "",
    description: "",
    departmentHead: "",
    users: [],
    loading: false,
    successModal: false,
    successMessage: "",
    failedModal: false,
    failedMessage: "",
  });

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getSingleDepartment(id));
  }, []);

  useEffect(() => {
    if (department?.data) {
      setState((draft) => {
        draft.name = department?.data?.departmentName;
        draft.departmentHead = department?.data?.departmentHead;
        draft.description = department?.data?.description;
      });
    }
  }, [department]);

  useEffect(() => {
    if (data?.data) {
      const users = [];
      const res = data?.data?.results || [];

      for (let i = 0; i < res.length; i++) {
        const value = res[i]._id;
        const label = `${res[i].firstName} ${res[i].lastName}, ${res[i].email}`;
        users.push({ value, label });
      }
      setState((draft) => {
        draft.users = users;
      });
    }
  }, [data?.data]);

  const handleSubmit = () => {
    setState((draft) => {
      draft.loading = true;
    });
    const payload = {
      departmentName: state.name,
      description: state.description,
      departmentHead: state.departmentHead,
    };

    dispatch(updateDepartment({ payload, id }))
      .unwrap()
      .then((res) => {
        setState((draft) => {
          draft.successModal = true;
          draft.successMessage =
            res?.messsage || "Department has been updated successfully.";
          draft.loading = false;
        });
      })
      .catch((err) => {
        setState((draft) => {
          draft.failedModal = true;
          draft.failedMessage = err?.message || "Department update has failed.";
          draft.loading = false;
        });
      });
  };

  return (
    <DashboardLayout
      isBackNav={true}
      paths={["Team Management", "Update Department"]}
    >
      <div className="mx-auto w-full px-5 lg:px-1 lg:w-3/5 my-20">
        <div className="flex justify-between items-center p-3">
          <div>
            <p className="text-xl lg:text-2xl font-bold text-swBlack">
              Update Department
            </p>
            <p className="text-sm mt-1">Department Information</p>
          </div>
        </div>

        <div className="pt-8 px-5 pb-16 bg-white">
          <div className="flex justify-between mt-5 gap-5">
            <p className="w-1/4 font-semibold mr-2">Name</p>
            <div className="w-3/4 flex flex-col gap-5">
              <InputField
                required={true}
                value={state.name}
                name={"departmentName"}
                // label={"Enter department name"}
                placeholder={"Enter Department Name"}
                onChange={(e) =>
                  setState((draft) => {
                    draft.name = e.target.value;
                  })
                }
              />
            </div>
          </div>

          <div className="flex justify-between mt-6 gap-5">
            <p className="w-1/4 font-semibold mr-2">Department Head</p>
            <div className="w-3/4">
              <SelectField
                // label={"Select department head"}
                // required={true}
                isSearchable={true}
                value={state.users.find(
                  (item) => item.value === state.departmentHead
                )}
                placeholder={
                  data?.data ? "Select Staff..." : "Loading Staffs..."
                }
                onChange={(e) =>
                  setState((draft) => {
                    draft.departmentHead = e.value;
                  })
                }
                optionValue={state.users}
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
                // label={"Enter description"}
                placeholder={"Enter Description"}
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
              state.loading ||
              !state.departmentHead ||
              !state.name ||
              !state.description
            }
            onClick={handleSubmit}
            className={`text-white font-semibold p-2 px-16 bg-swBlue 
                        hover:bg-swBluee500 rounded-md flex items-center gap-2`}
          >
            Update Department
          </Button>
        </div>
      </div>
      <SuccessModal
        isOpen={state.successModal}
        description={state.successMessage}
        title={"Department Update Successful"}
        btnLeft={"Department"}
        btnLeftFunc={() => router.push("/team-management/department")}
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
        title={"Department Update Failed"}
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

export default UpdateDepartmentPage;
