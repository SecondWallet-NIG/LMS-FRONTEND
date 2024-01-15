"use client";

import { useEffect, useState } from "react";
import LoginScreen from "./components/login/LoginScreen";
import DashboardPage from "./dashboard/page";

export default function Home() {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const _user = JSON.parse(localStorage.getItem("user"));
    if (_user) {
      setUser(_user);
    }
    setLoading(false);
    console.log(_user?.data?.success);
  }, []);

  if (!user?.data && !loading) {
    return <LoginScreen />;
  }
  return <DashboardPage />;
}
