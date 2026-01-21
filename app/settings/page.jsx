"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import Image from "next/image";
import { FaCircleUser } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import InputField from "../components/shared/input/InputField";
import { MdOutlineEmail } from "react-icons/md";
import AccountPage from "../components/settings/AccountPage";
import SecurityPage from "../components/settings/SecurityPage";
import AccrualsPage from "../components/settings/AccrualsPage";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "@/redux/slices/userSlice";

const Settings = () => {
  const [pageState, setPageState] = useState("Account");
  const [userRole, setUserRole] = useState(null);
  const [isDevelopment, setIsDevelopment] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user"));
      const role = user?.data?.user?.role?.tag;
      setUserRole(role);
      
      // Check if in development mode
      const isDev = process.env.NODE_ENV === "development" || 
                    window.location.hostname === "localhost" ||
                    window.location.hostname === "127.0.0.1";
      setIsDevelopment(isDev);
    }
  }, []);

  // Show Accruals tab only for System Admin in development mode
  const showAccrualsTab = isDevelopment && userRole === "System Admin";

  return (
    <DashboardLayout>
      <main className="p-5 text-swTextColor">
        <div className="flex">
          <p
            className={`border-b-2 px-6 py-2 cursor-pointer ${
              pageState === "Account"
                ? "text-swBlue border-swBlue font-medium"
                : "border-transparent"
            } `}
            onClick={() => setPageState("Account")}
          >
            Account
          </p>
          <p
            className={` border-b-2  px-6 py-2 cursor-pointer ${
              pageState === "Security"
                ? "text-swBlue border-b-swBlue font-medium"
                : "border-transparent"
            }`}
            onClick={() => setPageState("Security")}
          >
            Security
          </p>
          {showAccrualsTab && (
            <p
              className={` border-b-2  px-6 py-2 cursor-pointer ${
                pageState === "Accruals"
                  ? "text-swBlue border-b-swBlue font-medium"
                  : "border-transparent"
              }`}
              onClick={() => setPageState("Accruals")}
            >
              Accruals
            </p>
          )}
        </div>
        {pageState === "Account" && <AccountPage />}
        {pageState === "Security" && <SecurityPage />}
        {pageState === "Accruals" && showAccrualsTab && <AccrualsPage />}
      </main>
    </DashboardLayout>
  );
};

export default Settings;
