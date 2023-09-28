"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import "../../globals.css";
import { Inter } from "next/font/google";
import SideBar from "../sideBar/SideBar";

const inter = Inter({ subsets: ["latin"] });




const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen">
      <div className="flex h-full">
        <div className="h-full w-1/5">
          <SideBar />
        </div>
        <div className="h-full w-4/5">{children}</div> {/* Set content height to 100% */}
      </div>
    </div>
  );
}

export default DashboardLayout;
