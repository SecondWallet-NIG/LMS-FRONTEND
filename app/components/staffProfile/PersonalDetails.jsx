"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaCircleUser } from "react-icons/fa6";
import {
  FiEdit,
  FiEdit2,
  FiPhone,
  FiPhoneOutgoing,
  FiUser,
} from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { useSelector } from "react-redux";
import DoughnutChart from "../chart/DoughnutChart";

const Viewer = dynamic(() => import("react-viewer"), { ssr: false });

export default function StaffPersonalDetails({ data }) {
  const pathname = usePathname();
  const [openProfilePic, setOpenProfilePic] = useState(false);
  const tasks = useSelector((state) => state.UserTasks);
  const returnCardDetails = (name, value) => {
    return (
      <div>
        <div className="font-medium text-swGrey400">{name}</div>
        <div className="text-lg font-semibold text-swBlack">{value}</div>
      </div>
    );
  };

  const doughnutData = {
    // labels: ["Total Tasks", "Pending Tasks", "Completed Tasks"],
    datasets: [
      {
        // label: "# of Tasks",
        data: [
          tasks?.data?.totalCount || 0,
          tasks?.data?.pendingCount || 0,
          tasks?.data?.doneCount || 0,
        ],
        backgroundColor: [
          "#2769b3", // Total Tasks
          "#f9c00f", // Pending Tasks
          "#17b26a", // Completed Tasks
        ],
        // borderColor: [
        //   "rgba(54, 162, 235, 1)", // Total Tasks
        //   "rgba(255, 206, 86, 1)", // Pending Tasks
        //   "rgba(75, 192, 192, 1)", // Completed Tasks
        // ],
        borderRadius: 10,
        borderWidth: 0,
      },
    ],
  };
  const doughnutOptions = {
    cutout: "81%", // Adjust this value to control the inner radius
    layout: {
      padding: 0, // Remove padding
    },
  };

  return (
    <div className="rounded-xl overflow-hidden flex flex-col">
      <div className="flex justify-between p-5 bg-swGrey25 border-b">
        <div className="flex items-start gap-3">
          {data?.user?.profilePicture &&
          data?.user?.profilePicture !== "null" &&
          data?.user?.profilePicture !== "undefined" ? (
            <div className="min-h-[3rem] min-w-[3rem] max-h-[3rem] max-w-[3rem]  rounded-full border-2 border-swGold relative overflow-hidden">
              <Image
                src={data?.user?.profilePicture}
                alt="profile"
                fill
                sizes="100%"
                className="cursor-pointer"
                onClick={() =>
                  data?.user?.profilePicture && setOpenProfilePic(true)
                }
              />
              {typeof window !== "undefined" ? (
                <>
                  <Viewer
                    visible={openProfilePic}
                    onClose={() => {
                      setOpenProfilePic(false);
                    }}
                    images={[data?.user?.profilePicture].map((item) => ({
                      src: item,
                      key: item,
                    }))}
                  />
                </>
              ) : null}
            </div>
          ) : (
            <FaCircleUser className="text-swBlue" size={40} />
          )}

          <div className="">
            <div className="flex items-center gap-5">
              <p className="font-semibold text-swBlue text-lg  whitespace-nowrap">
                {data?.user?.firstName} {data?.user?.lastName}
              </p>

              <span
                className={`text-white text-xs py-1 px-3 rounded-full ${
                  data?.user?.status === "Active" ? "bg-swGreen" : "bg-red-500"
                }`}
              >
                {data?.user?.status}
              </span>
            </div>

            <div className="flex items-center gap-5">
              <Link
                href={`mailto:${data?.user?.email}`}
                target="_blank"
                className="flex gap-1 items-center"
              >
                <CiMail className="text-gray-600" size="20" />
                <p className="text-sm">{data?.user?.email}</p>
              </Link>
              {!pathname.includes("employee-dashboard") && (
                <Link
                  href={`/team-management/staff/update/${data?.user?._id}`}
                  className="hover:text-swBlue p-1 rounded-md cursor-pointer"
                >
                  <FiEdit className="text-gray-600" size="20" />
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="w-24 h-24 relative -mt-14 hidden sm:block">
          <DoughnutChart data={doughnutData} options={doughnutOptions} />
          <p className="absolute top-[76%] left-1/2 -translate-x-1/2">
            {tasks?.data?.totalCount || 0}
          </p>
        </div>
      </div>
      {/* <Link
        href={`tel:${data?.user?.phoneNumber}`}
        className="hover:text-swBlue p-1 rounded-md cursor-pointer"
      >
        <FiPhoneOutgoing className="text-swBlue " size="20" />
      </Link> */}
      <div className="p-5 bg-swGrey25 h-full">
        <div className="rounded-xl bg-white w-full p-5 h-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {returnCardDetails(
              "Staff ID",

              <p className="font-medium ">SWL-{data?.user?.staffId}</p>
            )}
            {returnCardDetails(
              <div className="flex items-center gap-3">
                <div className="bg-swBlue h-3 w-3 rounded-full" />
                Total Tasks
              </div>,
              <p className="flex items-center">
                {tasks?.data?.totalCount || 0}
              </p>
            )}
            {returnCardDetails(
              <div className="flex items-center gap-3">
                <div className="bg-swIndicatorYellow h-3 w-3 rounded-full" />
                Pending Tasks
              </div>,
              tasks?.data?.pendingCount || 0
            )}
            {returnCardDetails(
              <div className="flex items-center gap-3">
                <div className="bg-swGreen h-3 w-3 rounded-full" />
                Completed Tasks
              </div>,
              tasks?.data?.doneCount || 0
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
