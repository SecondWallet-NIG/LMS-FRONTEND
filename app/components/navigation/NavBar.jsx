"use client";
import { FaBell } from "react-icons/fa";
import PagePath from "./PagePath";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApprovalAssignee } from "@/redux/slices/approvalAssigneeSlice";
import { IoArrowBackSharp, IoCloseSharp } from "react-icons/io5";
import navPatternBg from "../../../public/images/navPatterns.png";
import Image from "next/image";
import { formatDate } from "@/helpers";
import { RxHamburgerMenu } from "react-icons/rx";
import dynamic from "next/dynamic";

//import Viewer from "react-viewer";
const Viewer = dynamic(
  () => import("react-viewer"),
  { ssr: false } // This line is important
);

const NavBar = ({ sideBarOpen, sideBarState, paths, isBackNav }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const x = useSelector((state) => state.approvalAssignee);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [openedMessages, setOpenedMessages] = useState("unread");
  const [openProfilePic, setOpenProfilePic] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser?.data?.user);
      dispatch(getApprovalAssignee(storedUser?.data?.user?._id));
    }
  }, []);

  const openNotifications = (state) => {
    setIsNotificationsOpen(state);
  };

  return (
    <nav className="fixed bg-white flex justify-between items-center p-[0.68rem] border-b right-0 border-b-gray-300 w-full md:w-[95%] px-5 z-[100]">
      <div className="flex gap-2 sm:gap-5 items-center">
        <div className="sm:hidden">
          <RxHamburgerMenu
            size={20}
            onClick={() => sideBarOpen(!sideBarState)}
          />
        </div>
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
        <p className="text-sm hidden sm:block">Welcome {user?.firstName} 👋 </p>
        <div
          className="relative cursor-pointer z-20"
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
                <div className="py-1 px-4 bg-swLightGray rounded-full">
                  {x?.data?.pendingCount}
                </div>
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
                Tasks
              </button>
            </div>

            <div className="mt-[8.7rem]">
              {openedMessages === "unread" &&
                x?.data?.results
                  .filter((item) => item.actionStatus == "Pending")
                  .map((item, index) => (
                    <div key={index} className=" mx-1 border-b">
                      <div
                        className="cursor-pointer hover:bg-swLightGray p-4"
                        onClick={() => {
                          router.push(
                            `/loan-applications/view-loan/${item?.loanApplication?._id}`
                          );
                        }}
                      >
                        <div className="flex justify-between gap-3">
                          <div>
                            <p className="text-sm">{item.approvalTitle}</p>
                          </div>
                          <div>
                            <p className="text-sm text-swBlue">
                              SW-{item.loanApplication.loanId}
                            </p>
                          </div>
                        </div>

                        <p className="text-sm">
                          {formatDate(item.createdAt.slice(0, 10))}
                        </p>
                      </div>
                    </div>
                  ))}
              {/* 
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
                ))} */}
            </div>
          </div>
        )}
        <div className="rounded-full border-2 border-swBlue overflow-hidden h-[3.15rem] w-[3.15rem] relative">
          <img
            src={
              user?.profilePicture
                ? user?.profilePicture
                : "https://cdn-icons-png.flaticon.com/512/4128/4128349.png"
            }
            alt="user"
            className="cursor-pointer"
            onClick={() => user?.profilePicture && setOpenProfilePic(true)}
          />
          <Viewer
            visible={openProfilePic}
            onClose={() => {
              setOpenProfilePic(false);
            }}
            images={[user?.profilePicture].map((item) => ({
              src: item,
              key: item,
            }))}
          />
        </div>
      </div>

      <Image
        src={navPatternBg}
        alt="nav pattern"
        fill
        // width={"50%"}
        // height={"100%"}
        sizes="50%"
        className="absolute w-1/2 ml-auto"
      />
    </nav>
  );
};

export default NavBar;
