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
      <div className="flex h-full">
        <div className="h-full w-1/4 lg:w-[22%] xl:w-1/5">
          <Sidebar />
        </div>
        <div className="flex flex-col w-3/4 lg:w-[78%] xl:w-4/5">
          <NavBar />
          <div className="h-full w-full">{children}</div>
          {/* Set content height to 100% */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
