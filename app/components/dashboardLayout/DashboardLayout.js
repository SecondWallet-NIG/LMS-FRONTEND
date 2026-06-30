"use client";
import React, { useEffect, useState } from "react";
import "../../globals.css";
import { useRouter } from "next/navigation";
import NavBar from "../navigation/NavBar";
import Sidebar from "../navigation/SideBar";
import RealTimeComponent from "../RealTimeComponent";
import Unauthorized from "@/app/unauthorized/page";

const DashboardLayout = ({ children, paths, isBackNav, roles }) => {
  const [minimizeSidebar, setMinimizeSidebar] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const router = useRouter();
  const [sideBarOpen, setSideBarOpen] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = JSON.parse(localStorage.getItem("minimizeSidebar"));
      setMinimizeSidebar(data === true);
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setIsAuthenticated(false);
        setIsAuthorized(false);
        router.push("/");
        return;
      }

      const user = JSON.parse(storedUser);
      const roleTag = user?.data?.user?.role?.tag;
      const authorized = !roles || roles.includes(roleTag);

      setIsAuthenticated(true);
      setIsAuthorized(authorized);

      if (!authorized) {
        router.push("/unauthorized");
      }
    }
  }, [router, roles]);

  return (
    <div className="h-screen">
      <div className="flex h-full w-full">
        {isAuthenticated && isAuthorized && (
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
          <div className="overflow-y-auto">
            {isAuthenticated && isAuthorized ? children : null}
          </div>
        </div>
        <RealTimeComponent />
      </div>
    </div>
  );
};

export default DashboardLayout;
