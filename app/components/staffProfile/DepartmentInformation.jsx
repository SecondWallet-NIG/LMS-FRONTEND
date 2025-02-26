"use client";

import { useRouter } from "next/navigation";
import Button from "../shared/buttonComponent/Button";
import { AiOutlinePlus } from "react-icons/ai";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useImmer } from "use-immer";
import RightModal from "../modals/RightModal";
import InputField from "../shared/input/InputField";
//import Button from "../shared/buttonComponent/Button";

export default function StaffDeptInfo({ data, isDashboard }) {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [viewSalary, setViewSalary] = useState(false);
  const [state, setState] = useImmer({
    loading: false,
    salary: "",
    benefityType: "",
    description: "",
    benefits: [],
    createdBy: "",
    successModal: false,
    successMessage: "",
    failedModal: false,
    failedMessage: "",
  });

  const returnCardDetails = (name, value) => {
    return (
      <div>
        <div className="font-medium text-swGrey400 text-sm">{name}</div>
        <div className="text-sm font-light text-swBlack">{value}</div>
      </div>
    );
  };

  const handleSubmit = () => {
    setState((draft) => {
      draft.loading = true;
    });
    const payload = {
      description: "benefit description",
      financialYear: finData?.data?._id,
      salary: Number(removeCommasFromNumber(state.salary)),
      benefitType: state.benefityType,
      createdBy: state.createdBy,
      userId: id,
    };

    dispatch(addEmployeeBenefit(payload))
      .unwrap()
      .then((res) => {
        setState((draft) => {
          draft.successModal = true;
          draft.loading = false;
          draft.successMessage =
            res?.message || "Employee benefit added successfully.";
        });
        reset();
      })
      .catch((err) => {
        setState((draft) => {
          draft.failedModal = true;
          draft.failedMessage =
            err?.message || "Employee benefit creation failed.";
          draft.loading = false;
        });
      });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const user = storedUser?.data?.user;
      setUser(user);
    }
  }, []);

  return (
    <div className="rounded-xl overflow-hidden h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start p-5 bg-[#f7f7f7] border-b flex-wrap gap-5">
        <div>
          <p className="text-lg font-semibold text-swBlue">
            Department Information
          </p>
          <p className="text-sm text-swGray400">
            Important details about your department
          </p>
        </div>

        <div>
          {(user?.role?.tag === "HRM" ||
            "CFO" ||
            "CTO" ||
            "Dir" ||
            isDashboard) && (
            <div className="flex items-end gap-2">
              {returnCardDetails(
                "Salary",
                viewSalary ? (
                  <div className="flex items-center font-medium">
                    <Image
                      src="/images/money.png"
                      alt="money"
                      height={30}
                      width={30}
                    />
                    {`₦${
                      data?.employeeBenefit?.salary?.toLocaleString() || 0
                    }/month`}
                  </div>
                ) : (
                  <div>************</div>
                )
              )}
              <div onClick={() => setViewSalary(!viewSalary)}>
                {viewSalary ? (
                  <IoEyeOffOutline className="-mt-6" size={20} />
                ) : (
                  <IoEyeOutline className="-mt-6" size={20} />
                )}
              </div>
              <div>
                <Button onClick={() => setOpenModal(true)}>
                  Update Salary
                </Button>
              </div>
            </div>
          )}
        </div>
        {/* )} */}
      </div>
      <div className="p-5 bg-[#f7f7f7] h-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 rounded-xl bg-white h-full p-5">
          {returnCardDetails(
            "Department Name",
            data?.user?.role?.department?.departmentName || "None"
          )}
          {returnCardDetails(
            "Department Code",
            data?.user?.role?.department?.departmentCode || "None"
          )}
          {returnCardDetails(
            "Department Head",
            <div>
              <p>
                {data?.user?.role?.department?.departmentHead?.firstName ||
                  "None"}{" "}
                {data?.user?.role?.department?.departmentHead?.lastName}
              </p>
              <p className="text-swBlue">
                {data?.user?.role?.department?.departmentHead?.email}
              </p>
            </div>
          )}
          {returnCardDetails("Role", data?.user?.role?.name || "None")}
        </div>
      </div>
      <RightModal isOpen={openModal} onClose={() => setOpenModal(false)}>
<div className="p-4">
<InputField
          required={true}
          value={state.salary}
          name={"salary"}
          label={"Enter salary"}
          placeholder={"0"}
          onChange={(e) =>
            setState((draft) => {
              draft.salary = Number(
                e.target.value.replace(/[^0-9.]/g, "")
              ).toLocaleString();
            })
          }
        />
        <div className="p-3 border-t flex items-center justify-end gap-2 w-full">
          <Button
            disabled={!state.salary || !state.benefityType || state.loading}
            onClick={handleSubmit}
            className={`text-white font-semibold p-2 px-16 bg-swBlue 
            hover:bg-swBluee500 rounded-md flex items-center gap-2`}
          >
            {state.loading ? "Adding..." : "Add Benefit"}
          </Button>
        </div>
</div>
      </RightModal>
    </div>
  );
}
