"use client";
import React from "react";
import "../../globals.css";
import { Inter } from "next/font/google";
import ProtectedRoute from "../protected-route/ProtectedRoute";
import NavBar from "../navigation/NavBar";
import Sidebar from "../navigation/SideBar";

const inter = Inter({ subsets: ["latin"] });

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen">
      <div className="flex h-full w-full">
        <Sidebar />
        <NavBar />

        <div className="h-full w-[95%] ml-auto mt-[4.5rem]">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
