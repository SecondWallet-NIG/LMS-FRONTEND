"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FiEdit2, FiPhone, FiUser } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { useSelector } from "react-redux";

const Viewer = dynamic(() => import("react-viewer"), { ssr: false });

export default function StaffPersonalDetails({ data }) {
  const [openProfilePic, setOpenProfilePic] = useState(false);
  const tasks = useSelector((state) => state.UserTasks);

  const returnCardDetails = (name, value) => {
    return (
      <div>
        <p className="text-sm font-semibold">{name}</p>
        <p className="text-sm font-light">{value}</p>
      </div>
    );
  };

  return (
    <div>
      <div className="p-5 border-2 shadow-lg rounded-lg h-full">
        <div className="flex items-start gap-5">
          {data?.user?.profilePicture &&
          data?.user?.profilePicture !== "null" &&
          data?.user?.profilePicture !== "undefined" ? (
            <div className="h-[6rem] w-[6rem] rounded-lg text-swBlue border-swBlue relative overflow-hidden">
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
            <div className="h-[4rem] w-[4rem] rounded-md text-swBlue border-swBlue border-2 flex justify-center items-center">
              <FiUser size={40} />
            </div>
          )}

          <div>
            <div className="flex gap-3 items-end">
              <p className="font-medium text-md text-swBlue whitespace-nowrap text-xl">
                {data?.user?.firstName} {data?.user?.lastName}
              </p>
            </div>
            <div className="flex gap-4 flex-wrap">
              <p className="font-medium text-sm">{data?.user?.email}</p>
              <p className="font-medium">SWL-{data?.user?.staffId}</p>
            </div>
            <div className="flex gap-5 items-center mt-2">
              <Link
                href={`mailto:${data?.user?.email}`}
                target="_blank"
                className="hover:border-swBlue border-2 border-transparent hover:text-swBlue p-1 rounded-md cursor-pointer"
              >
                <MdOutlineEmail size="20" />
              </Link>
              <Link
                href={`tel:${data?.user?.phoneNumber}`}
                className="hover:border-swBlue border-2 border-transparent hover:text-swBlue p-1 rounded-md cursor-pointer"
              >
                <FiPhone size="20" />
              </Link>
              <Link
                href={`/team-management/staff/update/${data?.user?._id}`}
                className="hover:border-swBlue border-2 border-transparent hover:text-swBlue p-1 rounded-md cursor-pointer"
              >
                <FiEdit2 size="20" />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 mt-10">
          {returnCardDetails(
            "Status",

            <span
              className={`${
                data?.user?.status === "Active"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {data?.user?.status}
            </span>
          )}
          {returnCardDetails("Total Tasks", tasks?.data?.totalCount || 0)}
          {returnCardDetails("Pending Tasks", tasks?.data?.pendingCount || 0)}
          {returnCardDetails("Completed Tasks", tasks?.data?.doneCount || 0)}
        </div>
      </div>
    </div>
  );
}
