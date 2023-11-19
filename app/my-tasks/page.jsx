"use client";
import { useEffect } from "react";
import MyTasksCard from "../components/cards/MyTasksCard/MyTasksCard";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import ReusableDataTable from "../components/shared/tables/ReusableDataTable";
import { useDispatch, useSelector } from "react-redux";
import { getApprovalAssignee } from "@/redux/slices/loanApprovalSlice";
import EditableButton from "../components/shared/editableButtonComponent/EditableButton";
import Button from "../components/shared/buttonComponent/Button";
import { useRouter } from "next/navigation";
const MyTasks = () => {
  const dispatch = useDispatch();
  const loanToApprove = useSelector((state) => state.loanApprovals);
  const user = JSON.parse(localStorage.getItem("user"));
  const router = useRouter()
 

  useEffect(() => {
    dispatch(getApprovalAssignee(user?.data?.user?._id));
  }, []);
  return (
    <DashboardLayout>
      <main className="p-8">
        <div className="flex gap-5">
          <MyTasksCard header={"all tasks"} data={16} />
          <MyTasksCard header={"completed tasks"} data={11} />
          <MyTasksCard header={"pending tasks"} data={5} />
        </div>
        <p className="font-semibold mt-10 mb-4">Active Tasks</p>
        {loanToApprove?.data?.data?.length === 0 ? (
          "No task assigned yet"
        ) : (
          <div>
            <div className="border rounded-lg">
              <table className="table-auto w-full border-collapse border overflow-hidden">
                <thead className="bg-swLightGray mb-4">
                  <tr>
                  <th className="px-5 py-4 bg-swLightGray text-swGray text-xs border-0 text-start">
                      D & T
                    </th>
                    <th className="px-5 py-4 bg-swLightGray text-swGray text-xs border-0 text-start">
                      Loan ID
                    </th>

                    <th className="px-5 py-4 bg-swLightGray text-swGray text-xs border-0 text-start">
                      <h1>Proposed Loan Amount</h1>
                    </th>

                    <th className="px-5 py-4 bg-swLightGray text-swGray text-xs border-0 text-start">
                      <h1>Status</h1>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loanToApprove?.data?.data?.map((item) => (
                    <tr className="border pt-2 pb-2 hover:bg-swLightGray" onClick={() => {
                     router.push(`/loan-applications/view-loan/${item?.loanApplication?._id}`)
                    }}>
                       <td className="px-5 py-4 border font-400 text-xs text-swGray border-none">
                       {item?.updatedAt.slice(0, 10)}
                      </td>
                      <td className="px-5 py-4 border font-400 text-xs text-swGray border-none">
                        SWL-{item?.loanApplication?.loanId}
                      </td>
                      <td className="px-5 py-4 border font-400 text-xs text-swGray border-none">
                        {" "}
                        ₦ {item?.loanApplication?.loanAmount}
                      </td>
                      <td className="px-5 py-4 border font-400 text-xs text-swGray border-none">
                        {" "}
                        <EditableButton className="py-2 px-2 text-[#107E4B] text-xs bg-[#E8F7F0] rounded-full">
                          Pending
                        </EditableButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </DashboardLayout>
  );
};

export default MyTasks;
