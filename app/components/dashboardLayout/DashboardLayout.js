"use client"
import React, { useEffect, useState } from "react";
import "../../globals.css";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import NavBar from "../navigation/NavBar";
import Sidebar from "../navigation/SideBar";

const DashboardLayout = ({ children, paths, isBackNav }) => {
  const [minimizeSidebar, setMinimizeSidebar] = useState("false");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("minimizeSidebar"));
    setMinimizeSidebar(data);

    // Check if the code is running in the browser environment
    if (typeof window !== 'undefined') {
      // Parse the stored user information from localStorage
      const storedUser = localStorage.getItem('user');

      // Update isAuthenticated state based on the stored user information
      setIsAuthenticated(JSON.parse(storedUser));

      // Redirect to the home page if not authenticated
      if (!JSON.parse(storedUser)) {
        router.push('/');
      }
    }
  }, []);

  return (
    <div className="h-screen">
      <div className="flex h-full w-full">
        <Sidebar />
        <NavBar paths={paths} isBackNav={isBackNav} />
        <div className="h-full w-[95%] ml-auto mt-[4.5rem] text-swGray">
          {isAuthenticated && children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

