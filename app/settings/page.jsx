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
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "@/redux/slices/userSlice";

const Settings = () => {
  const [pageState, setPageState] = useState("Account");

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
        </div>
        {pageState === "Account" && <AccountPage />}
        {pageState === "Security" && <SecurityPage />}
      </main>
    </DashboardLayout>
  );
};

export default Settings;
