"use client";
import React from "react";
import "../globals.css";
import { Inter } from "next/font/google";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import ProtectedRoute from "./protected-route/ProtectedRoute";

const inter = Inter({ subsets: ["latin"] });

const DashboardLayout = ({ children }) => {
  return (
  
    <div className="h-screen">
        <div className="flex h-full">
          <div className="h-full w-1/5">
            <SideBar />
          </div>
          <div className="flex flex-col w-4/5">
            <NavBar />
            <div className="h-full w-4/5">{children}</div>
            {/* Set content height to 100% */}
          </div>
        </div>
      </div>

  
  );
};

export default DashboardLayout;
