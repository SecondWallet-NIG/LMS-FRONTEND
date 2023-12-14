"use client";
import { CiSearch } from "react-icons/ci";
import { FaBell } from "react-icons/fa";
import { HiMiniUserCircle } from "react-icons/hi2";
import PagePath from "./PagePath";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  IoArrowBackSharp,
  IoArrowForward,
  IoCloseSharp,
} from "react-icons/io5";

const NavBar = ({ paths, isBackNav }) => {
  const router = useRouter();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [openedMessages, setOpenedMessages] = useState("unread");

  const openNotifications = (state) => {
    setIsNotificationsOpen(state);
  };

  const data = [
    {
      message: "Approve credit on loan ID: 972023",
      time: "3 hours ago",
      status: "unread",
    },
    {
      message: "Benjamin Franklin approved a loan for disbursement",
      time: "3 hours ago",
      status: "unread",
    },
    {
      message: "Benjamin Franklin approved a loan for disbursement",
      time: "3 hours ago",
      status: "read",
    },
    {
      message: "Approve credit on loan ID: 972023",
      time: "3 hours ago",
      status: "read",
    },
    {
      message: "Benjamin Franklin approved a loan for disbursement",
      time: "3 hours ago",
      status: "unread",
    },
    {
      message: "Benjamin Franklin approved a loan for disbursement",
      time: "3 hours ago",
      status: "read",
    },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      console.log({ storedUser });

      setUser(storedUser?.data?.user?.firstName);
    }
  }, []);

  return (
    <nav className="fixed bg-white flex justify-between items-center p-[0.68rem] border-b right-0 border-b-gray-300 w-[90%] md:w-[95%] px-5 z-[100]">
      <div className="flex gap-5 items-center">
        {isBackNav && (
          <div
            className="border-2 p-2 rounded-md border-transparent hover:border-swLightGray cursor-pointer"
            onClick={() => router.back()}
          >
            <IoArrowBackSharp size={20} />
          </div>
        )}
        <PagePath paths={paths} />
      </div>
      <div className=" flex gap-5 items-center relative">
        <p className="text-sm">Welcome {user} 👋 </p>
        <div
          className="relative cursor-pointer"
          onClick={() => openNotifications(!isNotificationsOpen)}
        >
          <FaBell size={20} />
          <div className="bg-swGreen h-2 w-2 rounded-full top-0 right-0 absolute" />
        </div>
        {isNotificationsOpen && (
          <div className="absolute top-full w-[25rem] min-w-[18rem] bg-white rounded-lg mt-5 shadow-md right-0 -mr-3 h-[30rem] overflow-x-hidden overflow-y-scroll scrollbar-hide text-swGray">
            <div className="flex items-center justify-between p-5 fixed w-[25rem] min-w-[18rem]rounded-t-md bg-white">
              <div className="flex gap-2 items-center">
                <p className="text-lg font-semibold">Notifications</p>
                <div className="py-1 px-4 bg-swLightGray rounded-full">5</div>
              </div>
              <IoCloseSharp
                size={20}
                className="cursor-pointer"
                onClick={() => openNotifications(false)}
              />
            </div>

            <div className="flex gap-5 py-3 px-5 border-y fixed top-[9.5rem] w-[25rem] min-w-[18rem] bg-white">
              <button
                className={`py-2 px-4 rounded-md ${
                  openedMessages === "unread" && "bg-swLightGray"
                }`}
                onClick={() => {
                  setOpenedMessages("unread");
                }}
              >
                Unread
              </button>
              <button
                className={`py-2 px-4 rounded-md ${
                  openedMessages === "all" && "bg-swLightGray"
                }`}
                onClick={() => {
                  setOpenedMessages("all");
                }}
              >
                All
              </button>
            </div>

            <div className="mt-[8.7rem]">
              {openedMessages === "unread" &&
                data
                  .filter((item) => item.status === "unread")
                  .map((item, index) => (
                    <div key={index} className="py-3 mx-1 flex gap-5 border-b">
                      <div
                        className={`w-1 rounded-full bg-swIndicatorYellow`}
                      />
                      <div>
                        <p>{item.message}</p>
                        <p className="text-sm">{item.time}</p>
                      </div>
                    </div>
                  ))}

              {openedMessages === "all" &&
                data.map((item, index) => (
                  <div key={index} className="py-3 mx-1 flex gap-5 border-b">
                    <div
                      className={`w-1 rounded-full ${
                        item.status === "unread"
                          ? "bg-swIndicatorYellow"
                          : "bg-swGray"
                      }`}
                    />
                    <div>
                      <p>{item.message}</p>
                      <p className="text-sm">{item.time}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
        <div className="relative">
          <HiMiniUserCircle size={50} />
          <div className="bg-swIndicatorYellow h-3 w-3 rounded-full bottom-1 right-1 absolute" />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
