"use client";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import "./globals.css";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import "react-day-picker/dist/style.css";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "Second Wallet",
  description: "Second Wallet",
  icons: {
    icon: "./favicon.ico",
    apple: "./favicon.ico",
  },
};

export default function RootLayout({ children }) {
  const route = useRouter();

  const checkForInactivity = () => {
    const expireTime = localStorage.getItem("expireTime");

    if (expireTime < Date.now()) {
      localStorage.removeItem("user");
      localStorage.removeItem("email");
      // localStorage.clear();
      route.push("/");
    }
  };

  const updateExpireTime = () => {
    const expireTime = Date.now() + 7200000;

    localStorage.setItem("expireTime", expireTime);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkForInactivity();
    }, 900000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    updateExpireTime();
    window.addEventListener("click", updateExpireTime);
    window.addEventListener("keypress", updateExpireTime);
    window.addEventListener("scroll", updateExpireTime);
    window.addEventListener("mousemove", updateExpireTime);

    return () => {
      window.removeEventListener("click", updateExpireTime);
      window.removeEventListener("keypress", updateExpireTime);
      window.removeEventListener("scroll", updateExpireTime);
      window.removeEventListener("mousemove", updateExpireTime);
    };
  }, []);

  return (
    <Provider store={store}>
      <html lang="en" className="h-full">
        <body className={inter.className}>
          <div className="">{children}</div>
        </body>
      </html>
    </Provider>
  );
}
