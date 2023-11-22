"use client";
import React from "react";
import { useEffect, useState } from "react";
import "../../globals.css";
import { Inter } from "next/font/google";
import ProtectedRoute from "../protected-route/ProtectedRoute";
import NavBar from "../navigation/NavBar";
import Sidebar from "../navigation/SideBar";

const DashboardLayout = ({ children }) => {
  const [minimizeSidebar, setMinimizeSidebar] = useState("false");
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("minimizeSidebar"));
    setMinimizeSidebar(data);
  });
  return (
    <div className="h-screen">
      <div className="flex h-full w-full">
        <Sidebar />
        <NavBar />
        <div className="h-full w-[95%] ml-auto mt-[4.5rem] text-swTextColor">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
