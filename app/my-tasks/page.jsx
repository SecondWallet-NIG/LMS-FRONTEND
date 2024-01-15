"use client";
import { useEffect, useState } from "react";
import MyTasksCard from "../components/cards/MyTasksCard/MyTasksCard";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { getStaffTasks } from "@/redux/slices/approvalAssigneeSlice";
import Button from "../components/shared/buttonComponent/Button";
import { useRouter } from "next/navigation";
import AllTasks from "../components/task-tables/AllTask";
import PendingTasks from "../components/task-tables/PendingTask";
import CompletedTasks from "../components/task-tables/CompletedTasks";
const MyTasks = () => {
  const dispatch = useDispatch();
  const { error, data } = useSelector((state) => state.approvalAssignee);
  const [activityButton, setActivityButton] = useState("allTasks");
  let user;
  if (typeof window !== "undefined") {
    user = JSON.parse(localStorage.getItem("user"));
  }
 

  const handleActivityToggle = (buttonId) => {
    setActivityButton(buttonId);
  };

  useEffect(() => {
    dispatch(getStaffTasks(user?.data?.user?._id));
  }, []);

  return (
    <DashboardLayout>
      <main className="p-8">
        <div className="flex gap-5">
          <MyTasksCard
            header={"all tasks"}
            data={data?.totalCount}
            onClick={() => setActivityButton("allTasks")}
          />
          <MyTasksCard
            header={"completed tasks"}
            data={data?.doneCount}
            onClick={() => setActivityButton("completedTasks")}
          />
          <MyTasksCard
            header={"pending tasks"}
            data={data?.pendingCount}
            onClick={() => setActivityButton("pendingTasks")}
          />
        </div>
        {/* <div className="flex gap-2 text-xs lg:text-sm mt-8">
          <button
            onClick={() => handleActivityToggle("allTasks")}
            className={`${
              activityButton === "allTasks" &&
              "font-semibold text-swBlue bg-blue-50"
            } p-2 rounded-md whitespace-nowrap`}
          >
            All Tasks
          </button>
          <button
            onClick={() => handleActivityToggle("pendingTasks")}
            className={`${
              activityButton === "pendingTasks" &&
              "font-semibold text-swBlue bg-blue-50"
            } p-2 rounded-md cursor-pointer`}
          >
            Pending Tasks
          </button>
          <button
            onClick={() => handleActivityToggle("completedTasks")}
            className={`${
              activityButton === "completedTasks" &&
              "font-semibold text-swBlue bg-blue-50"
            } p-2 rounded-md cursor-pointer`}
          >
            Completed Tasks
          </button>
        </div> */}
        <div className="p-2 mt-5">
          {activityButton === "allTasks" && <AllTasks />}
          {activityButton === "pendingTasks" && <PendingTasks />}
          {activityButton === "completedTasks" && <CompletedTasks />}
        </div>
      </main>
    </DashboardLayout>
  );
};

export default MyTasks;
