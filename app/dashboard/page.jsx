"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react"; 
import { getPost } from "@/redux/slices/postSlice";
import DashboardLayout from "../components/DashboardLayout";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);


  return (
    <DashboardLayout>
      <main>Hello</main>
    </DashboardLayout>
  );
};

export default Dashboard;
