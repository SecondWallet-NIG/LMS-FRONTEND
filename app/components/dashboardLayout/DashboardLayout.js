"use client";
import React, { useEffect, useState } from "react";
import "../../globals.css";
import { useRouter } from "next/navigation";
import NavBar from "../navigation/NavBar";
import Sidebar from "../navigation/SideBar";
import RealTimeComponent from "../RealTimeComponent";

const DashboardLayout = ({ children, paths, isBackNav }) => {
  const [minimizeSidebar, setMinimizeSidebar] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const [sideBarOpen, setSideBarOpen] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = JSON.parse(localStorage.getItem("minimizeSidebar"));
      setMinimizeSidebar(data === true); // Use strict equality
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
            <Sidebar sideBarOpen={setSideBarOpen} sideBarState={sideBarOpen} />
            <NavBar
              sideBarOpen={setSideBarOpen}
              sideBarState={sideBarOpen}
              paths={paths}
              isBackNav={isBackNav}
            />
          </div>
        )}
        {/* w-[10%] lg:w-[5%] */}
        <div className="h-full w-full md:w-[95%] ml-auto mt-[4.5rem] text-swGray">
          <div className="overflow-y-auto">{isAuthenticated && children}</div>
        </div>
        <RealTimeComponent />
      </div>
    </div>
  );
};

export default DashboardLayout;
