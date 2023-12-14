"use client";
import React, { useEffect, useState } from "react";
import "../../globals.css";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import NavBar from "../navigation/NavBar";
import Sidebar from "../navigation/SideBar";

const DashboardLayout = ({ children, paths, isBackNav }) => {
  const [minimizeSidebar, setMinimizeSidebar] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("minimizeSidebar"));
    setMinimizeSidebar(data === true); // Use strict equality

    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");

      setIsAuthenticated(!!storedUser); // Check if storedUser is not null or undefined

      if (!storedUser) {
        router.push("/");
      }
    }
  }, [router]);

  return (
    <div className="h-screen">
      <div className="flex h-full w-full">
        {isAuthenticated && (
          <div>
            <Sidebar />
            <NavBar paths={paths} isBackNav={isBackNav} />
          </div>
        )}
        {/* w-[10%] lg:w-[5%] */}
        <div className="h-full w-[90%] md:w-[95%] ml-auto mt-[4.5rem] text-swGray">
          {isAuthenticated && children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
