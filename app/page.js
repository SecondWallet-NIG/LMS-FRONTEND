"use client";

import { useEffect, useState } from "react";
import LoginScreen from "./components/login/LoginScreen";
import DashboardPage from "./dashboard/page";
import Expenses from "./expenses/page";

export default function Home() {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [roleTag, setRoleTag] = useState("");
  useEffect(() => {
    const _user = JSON.parse(localStorage.getItem("user"));
    if (_user) {
      setUser(_user);
      setRoleTag(_user?.data?.user?.role?.tag);
      console.log(_user?.data?.user?.role?.tag);
    }

    setLoading(false);
  }, []);

  if (!user?.data && !loading) {
    return <LoginScreen />;
  }

  if (roleTag && roleTag === "OFA" && !loading) {
    return <Expenses />;
  }
  return <>{!loading && <DashboardPage />}</>;
}
