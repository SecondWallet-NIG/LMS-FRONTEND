"use client"
import { useEffect } from "react";
import SelectField from "@/app/components/shared/input/SelectField";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import { useSelector, useDispatch } from "react-redux";
import { createRole, getDepartments } from "@/redux/slices/roleSlice";
import { useImmer } from "use-immer";
import SuccessModal from "@/app/components/modals/SuccessModal";
import CancelModal from "@/app/components/modals/CancelModal";
import { useRouter } from "next/navigation";
import Button from "@/app/components/shared/buttonComponent/Button";


const AddRolePage = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { data } = useSelector(state => state?.role);
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
        departments: []
    })

    const staffOptions = [
        { value: "loan_officer", label: "Loan officer" },
        { value: "credit_officer", label: "Credit officer" },
        { value: "internal_control", label: "Internal control" },
        { value: "ceo", label: "CEO" },
        { value: "cfo", label: "CFO" },
        { value: "cto", label: "CTO" },
        { value: "director", label: "Director" }
    ];

    useEffect(() => {
        dispatch(getDepartments())
    }, [])

    useEffect(() => {
        if (data?.data) {
            const departments = []
            const res = data?.data?.departments || []

            for (let i = 0; i < res.length; i++) {
                const value = res[i]._id;
                const label = res[i].departmentName;
                departments.push({ value, label })
            }
            setState(draft => {
                draft.departments = departments
            })
        }
    }, [data?.data])


    const handlePermission = (permission) => {
        const selected = state.permissions.some(val => val === permission)
        if (selected) {
            setState(draft => {
                draft.permissions = state.permissions.filter(val => val !== permission)
            })
        } else {
            setState(draft => {
                draft.permissions = draft.permissions.concat([permission])
            })
        }
    }


    const handleSubmit = () => {
        setState(draft => {
            draft.loading = true
        })
        const payload = {
            name: state.role,
            permission: state.permissions,
            tag: state.tag,
            department: state.department
        }

        dispatch(createRole({ payload }))
            .unwrap()
            .then(res => {
                setState(draft => {
                    draft.successModal = true;
                    draft.successMessage = res?.messsage;
                    draft.loading = false;
                });
            })
            .catch(err => {
                setState(draft => {
                    draft.failedModal = true;
                    draft.failedMessage = err?.message;
                    draft.loading = false
                });
            });
    };

    return (
        <DashboardLayout isBackNav={true} paths={["Team Management", "New Role"]}>
            <div className="mx-auto w-full px-5 lg:px-1 lg:w-3/5 my-20">
                <div className="flex justify-between items-center p-3">
                    <div>
                        <p className="text-2xl lg:text-3xl font-bold text-swBlack">Add new role</p>
                        <p className="text-sm mt-1">Staff information</p>
                    </div>
                </div>

                <div className="pt-8 px-5 pb-16 bg-white">
                    <div className="flex justify-between mt-5">
                        <p className="w-1/4 font-semibold mr-2">Roles</p>

                        <div className="w-3/4 flex flex-col gap-5">
                            <SelectField
                                label={"Select a role"}
                                required={true}
                                isSearchable={true}
                                onChange={e => setState(draft => {
                                    draft.role = e.value
                                })}
                                optionValue={staffOptions}
                            />
                        </div>
                    </div>

                    <div className="flex justify-between mt-6">
                        <p className="w-1/4 font-semibold mr-2">Department</p>
                        <div className="w-3/4">
                            <SelectField
                                label={"Select department"}
                                required={true}
                                isSearchable={true}
                                placeholder={data?.data ? 'Select...' : 'Loading...'}
                                onChange={e => setState(draft => {
                                    draft.department = e.value
                                })}
                                optionValue={state.departments}
                            /></div>
                    </div>

                    <div className="flex justify-between mt-6">
                        <p className="w-1/4 font-semibold mr-2">Permissions and access</p>
                        <div className="w-3/4">
                            <p className="flex gap-2">
                                <input onChange={() => { handlePermission('update') }} type="checkbox" />
                                Update
                            </p>
                            <p className="flex gap-2">
                                <input onChange={() => { handlePermission('edit') }} type="checkbox" />
                                Edit
                            </p>
                            <p className="flex gap-2">
                                <input onChange={() => { handlePermission('delete') }} type="checkbox" />
                                Delete
                            </p>
                        </div>
                    </div>
                </div>


                <div className="p-3 border-t flex items-center justify-end gap-2 w-full">
                    <button className="border text-swGray font-semibold p-2 px-16 rounded-md">
                        Cancel
                    </button>
                    <Button disabled={state.loading || !state.department || !state.role || !state.permissions.length}
                        onClick={handleSubmit}
                        className={`text-white font-semibold p-2 px-16 bg-swBlue 
                        hover:bg-swBluee500 rounded-md flex items-center gap-2`}>
                        Add role
                    </Button>
                </div>
            </div>
            <SuccessModal
                isOpen={state.successModal}
                description={state.successMessage}
                title={"Role Creation Successful"}
                btnLeft={"Team management"}
                btnLeftFunc={() => router.push("/team-management")}
                btnRight={"Done"}
                btnRightFunc={() => setState(draft => {
                    draft.successModal = false
                })}
                onClose={() => setState(draft => {
                    draft.successModal = false
                })}
            />
            <CancelModal
                isOpen={state.failedModal}
                description={state.failedMessage}
                title={"Role Creation Failed"}
                noButtons={true}
                onClose={() => setState(draft => {
                    draft.failedModal = false
                })}
            />
        </DashboardLayout>
    );
};

export default AddRolePage;
