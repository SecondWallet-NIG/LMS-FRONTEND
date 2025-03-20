// "use client";
// import { useEffect, useState } from "react";
// import SelectField from "@/app/components/shared/input/SelectField";
// import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
// import { useSelector, useDispatch } from "react-redux";
// import { useImmer } from "use-immer";
// import SuccessModal from "@/app/components/modals/SuccessModal";
// import CancelModal from "@/app/components/modals/CancelModal";
// import { useParams, useRouter } from "next/navigation";
// import Button from "@/app/components/shared/buttonComponent/Button";
// import InputField from "@/app/components/shared/input/InputField";
// import {
//   addEmployeeBenefit,
//   getAllBenefitTypes,
//   getFinancialYear,
// } from "@/redux/slices/hrmsSlice";
// import { teamManagementAuthRoles } from "@/app/components/helpers/pageAuthRoles";
// import { getUserById } from "@/redux/slices/userSlice";

// const AddBenefitTypesPage = () => {
//   const dispatch = useDispatch();
//   const { benData: data } = useSelector((state) => state?.hrms);
//   const [_data, setData] = useState(null);
//   const { finData } = useSelector((state) => state?.hrms);
//   const { id } = useParams();
//   const router = useRouter();
//   const [state, setState] = useImmer({
//     loading: false,
//     salary: "",
//     benefityType: "",
//     description: "",
//     benefits: [],
//     createdBy: "",
//     successModal: false,
//     successMessage: "",
//     failedModal: false,
//     failedMessage: "",
//   });

//   const reset = () => {
//     setState((draft) => {
//       draft.salary = "";
//       draft.benefityType = "";
//       draft.description = "";
//     });
//   };

//   useEffect(() => {
//     dispatch(getAllBenefitTypes());
//     dispatch(getFinancialYear());
//     if (typeof window !== "undefined") {
//       const user = JSON.parse(localStorage.getItem("user"));
//       const userId = user?.data?.user?._id || "";
//       setState((draft) => {
//         draft.createdBy = userId;
//       });
//     }
//   }, []);

//   useEffect(() => {
//     if (data?.data) {
//       const benefits = [];
//       const res = data?.data || [];

//       for (let i = 0; i < res.length; i++) {
//         const value = res[i]._id;
//         const label = res[i].level;
//         benefits.push({ value, label });
//       }
//       setState((draft) => {
//         draft.benefits = benefits;
//       });
//     }
//   }, [data?.data]);

//   const removeCommasFromNumber = (numberString) => {
//     if (typeof numberString !== "string") {
//       numberString = String(numberString);
//     }
//     return numberString.replace(/,/g, "");
//   };

//   const handleSubmit = () => {
//     setState((draft) => {
//       draft.loading = true;
//     });
//     const payload = {
//       description: "benefit description",
//       financialYear: finData?.data?._id,
//       salary: Number(removeCommasFromNumber(state.salary)),
//       benefitType: state.benefityType,
//       createdBy: state.createdBy,
//       userId: id,
//     };

//     dispatch(addEmployeeBenefit(payload))
//       .unwrap()
//       .then((res) => {
//         setState((draft) => {
//           draft.successModal = true;
//           draft.loading = false;
//           draft.successMessage =
//             res?.message || "Employee benefit added successfully.";
//         });
//         reset();
//       })
//       .catch((err) => {
//         setState((draft) => {
//           draft.failedModal = true;
//           draft.failedMessage =
//             err?.message || "Employee benefit creation failed.";
//           draft.loading = false;
//         });
//       });
//   };

//   useEffect(() => {
//     dispatch(getUserById(id))
//       .unwrap()
//       .then((res) => {
//         console.log({res});

//         setData(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   return (
//     <DashboardLayout
//       isBackNav={true}
//       paths={["Team Management", "Employee Benefit"]}
//       roles={teamManagementAuthRoles}
//     >
//       <div className="mx-auto w-full px-5 lg:px-1 lg:w-3/5 my-20 min-h-[70vh]">
//         <div className="flex justify-between items-center p-3">
//           <div>
//             <p className="text-2xl lg:text-3xl font-bold text-swBlack">
//               Assign Employee Benefit
//             </p>
//             <p className="text-sm mt-1">Benefit Information</p>
//           </div>
//         </div>

//         <div className="pt-8 px-5 pb-16 bg-white">
//           <div className="flex justify-between mt-6 gap-5">
//             <p className="w-1/4 font-semibold mr-2">Salary</p>
//             <div className="w-3/4">
//               <InputField
//                 required={true}
//                 value={state.salary}
//                 name={"salary"}
//                 label={"Enter salary"}
//                 placeholder={"0"}
//                 onChange={(e) =>
//                   setState((draft) => {
//                     draft.salary = Number(
//                       e.target.value.replace(/[^0-9.]/g, "")
//                     ).toLocaleString();
//                   })
//                 }
//               />
//             </div>
//           </div>

//           <div className="flex justify-between mt-6 gap-5">
//             <p className="w-1/4 font-semibold mr-2">Benefit Type</p>
//             <div className="w-3/4">
//               <SelectField
//                 label={"Select Benefit type"}
//                 required={true}
//                 isSearchable={true}
//                 placeholder={data?.data ? "Select..." : "Loading..."}
//                 onChange={(e) =>
//                   setState((draft) => {
//                     draft.benefityType = e.value;
//                   })
//                 }
//                 optionValue={state.benefits}
//               />
//             </div>
//           </div>

//           {/* <div className="flex justify-between mt-5 gap-5">
//             <p className="w-1/4 font-semibold mr-2">Description</p>
//             <div className="w-3/4 flex flex-col gap-5">
//               <textarea
//                 className="w-full h-20 px-3 py-2 rounded border border-gray-300 focus:outline-none"
//                 required={true}
//                 value={state.description}
//                 name={"description"}
//                 label={"Enter description"}
//                 placeholder={"Benefit description"}
//                 onChange={(e) =>
//                   setState((draft) => {
//                     draft.description = e.target.value;
//                   })
//                 }
//               />
//             </div>
//           </div> */}
//         </div>

//         <div className="p-3 border-t flex items-center justify-end gap-2 w-full">
//           <Button
//             disabled={
//               !state.salary ||
//               !state.benefityType ||
//               state.loading
//             }
//             onClick={handleSubmit}
//             className={`text-white font-semibold p-2 px-16 bg-swBlue
//             hover:bg-swBluee500 rounded-md flex items-center gap-2`}
//           >
//             {state.loading ? "Adding..." : "Add Benefit"}
//           </Button>
//         </div>
//       </div>
//       <SuccessModal
//         isOpen={state.successModal}
//         description={state.successMessage}
//         title={"Benefit Type Creation Successful"}
//         btnLeft={"Staff Profile"}
//         btnLeftFunc={() => router.push(`/team-management/staff/${id}`)}
//         btnRight={"Done"}
//         btnRightFunc={() =>
//           setState((draft) => {
//             draft.successModal = false;
//           })
//         }
//         onClose={() =>
//           setState((draft) => {
//             draft.successModal = false;
//           })
//         }
//       />
//       <CancelModal
//         isOpen={state.failedModal}
//         description={state.failedMessage}
//         title={"Employee Benefit Creation Failed"}
//         noButtons={true}
//         onClose={() =>
//           setState((draft) => {
//             draft.failedModal = false;
//           })
//         }
//       />
//     </DashboardLayout>
//   );
// };

// export default AddBenefitTypesPage;

"use client";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import { teamManagementAuthRoles } from "@/app/components/helpers/pageAuthRoles";
import CancelModal from "@/app/components/modals/CancelModal";
import SuccessModal from "@/app/components/modals/SuccessModal";
import Button from "@/app/components/shared/buttonComponent/Button";
import InputField from "@/app/components/shared/input/InputField";
import SelectField from "@/app/components/shared/input/SelectField";
import {
  addEmployeeBenefit,
  getAllBenefitTypes,
  getFinancialYear,
} from "@/redux/slices/hrmsSlice";
import { getUserById } from "@/redux/slices/userSlice";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useImmer } from "use-immer";

const AddBenefitTypesPage = () => {
  const dispatch = useDispatch();
  const { benData: data } = useSelector((state) => state?.hrms);
  const [_data, setData] = useState(null);
  const { finData } = useSelector((state) => state?.hrms);
  const { id } = useParams();
  const router = useRouter();
  const [state, setState] = useImmer({
    loading: false,
    salary: "",
    benefitType: "",
    description: "",
    benefits: [],
    createdBy: "",
    successModal: false,
    successMessage: "",
    failedModal: false,
    failedMessage: "",
  });

  const reset = () => {
    setState((draft) => {
      draft.salary = "";
      draft.benefitType = "";
      draft.description = "";
    });
  };

  useEffect(() => {
    dispatch(getAllBenefitTypes());
    dispatch(getFinancialYear());
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.data?.user?._id || "";
      setState((draft) => {
        draft.createdBy = userId;
      });
    }
  }, []);

  useEffect(() => {
    if (data?.data) {
      const benefits = [];
      const res = data?.data || [];

      for (let i = 0; i < res.length; i++) {
        const value = res[i]._id;
        const label = res[i].level;
        benefits.push({ value, label });
      }
      setState((draft) => {
        draft.benefits = benefits;
      });
    }
  }, [data?.data]);

  const removeCommasFromNumber = (numberString) => {
    if (typeof numberString !== "string") {
      numberString = String(numberString);
    }
    return numberString.replace(/,/g, "");
  };

  const handleSubmit = () => {
    setState((draft) => {
      draft.loading = true;
    });
    const payload = {
      description: "benefit description",
      financialYear: finData?.data?._id,
      salary: Number(removeCommasFromNumber(state.salary)),
      benefitType: state.benefitType,
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
    dispatch(getUserById(id))
      .unwrap()
      .then((res) => {
        console.log({ res });
        setData(res);
        // Check if employeeBenefit exists and auto-fill salary
        if (res?.data?.employeeBenefit) {
          setState((draft) => {
            draft.salary = res.data.employeeBenefit.salary.toLocaleString();
            draft.benefitType = res.data.employeeBenefit.benefitType._id;
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <DashboardLayout
      isBackNav={true}
      paths={["Team Management", "Employee Benefit"]}
      roles={teamManagementAuthRoles}
    >
      <div className="mx-auto w-full px-5 lg:px-1 lg:w-3/5 my-20 min-h-[70vh]">
        <div className="flex justify-between items-center p-3">
          <div>
            <p className="text-2xl lg:text-3xl font-bold text-swBlack">
              {_data?.data?.employeeBenefit ? "Update" : "Assign"} Employee
              Benefit
            </p>
            <p className="text-sm mt-1">Benefit Information</p>
          </div>
        </div>

        <div className="pt-8 px-5 pb-16 bg-white">
          <div className="flex justify-between mt-6 gap-5">
            <p className="w-1/4 font-semibold mr-2">Salary</p>
            <div className="w-3/4">
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
            </div>
          </div>

          <div className="flex justify-between mt-6 gap-5">
            <p className="w-1/4 font-semibold mr-2">Benefit Type</p>
            <div className="w-3/4">
              <SelectField
                label={"Select Benefit type"}
                required={true}
                isSearchable={true}
                placeholder={data?.data ? "Select..." : "Loading..."}
                value={data?.data ? state.benefitType : undefined}
                onChange={(e) =>
                  setState((draft) => {
                    draft.benefitType = e.value;
                  })
                }
                optionValue={state.benefits}
              />
            </div>
          </div>
        </div>

        <div className="p-3 border-t flex items-center justify-end gap-2 w-full">
          <Button
            disabled={!state.salary || !state.benefityType || state.loading}
            onClick={handleSubmit}
            className={`text-white font-semibold p-2 px-16 bg-swBlue 
            hover:bg-swBluee500 rounded-md flex items-center gap-2`}
          >
            {state.loading
              ? "Adding..."
              : _data?.data?.employeeBenefit
              ? "Update Benefit"
              : "Add Benefit"}
          </Button>
        </div>
      </div>
      <SuccessModal
        isOpen={state.successModal}
        description={state.successMessage}
        title={"Benefit Type Creation Successful"}
        btnLeft={"Staff Profile"}
        btnLeftFunc={() => router.push(`/team-management/staff/${id}`)}
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
        title={"Employee Benefit Creation Failed"}
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
