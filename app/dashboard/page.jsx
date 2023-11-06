"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPost } from "@/redux/slices/postSlice";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import ReusableDataTable from "../components/shared/tables/ReusableDataTable";

const Dashboard = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  return (
    <DashboardLayout>
      <main className="w-full bg-green-500">Dashboard page</main>
    </DashboardLayout>
  );
};

export default Dashboard;
