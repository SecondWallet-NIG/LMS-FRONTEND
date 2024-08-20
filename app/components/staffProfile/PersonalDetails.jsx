"use client"
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react"
import { FaCircleUser } from "react-icons/fa6";
import { FiEdit, FiEdit2, FiPhone, FiPhoneOutgoing, FiUser } from "react-icons/fi";
import { MdEmail, MdOutlineEmail } from "react-icons/md";
import { useSelector } from "react-redux";

const Viewer = dynamic(
    () => import("react-viewer"),
    { ssr: false }
);

export default function StaffPersonalDetails({
    data
}) {
    const [openProfilePic, setOpenProfilePic] = useState(false);
    const tasks = useSelector((state) => state.UserTasks);
    const returnCardDetails = (name, value) => {
        return (
            <div>
                <p className="text-xs font-medium text-swGrey400">{name}</p>
                <p className="text-sm font-medium text-swBlack">{value}</p>
            </div>
        );
    };

    return (
        <div>
            <div className="p-2 border-2 rounded-lg h-full">
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
                                    data?.user?.profilePicture &&
                                    setOpenProfilePic(true)
                                }
                            />
                            {typeof window !== "undefined" ? (
                                <>
                                    <Viewer
                                        visible={openProfilePic}
                                        onClose={() => {
                                            setOpenProfilePic(false);
                                        }}
                                        images={[data?.user?.profilePicture].map(
                                            (item) => ({
                                                src: item,
                                                key: item,
                                            })
                                        )}
                                    />
                                </>
                            ) : null}
                        </div>
                    ) : (

                            <FaCircleUser className="text-swBlue " size={40} />
                      
                    )}

                    <div className="w-full">
                        <div className="flex justify-between">
                            <p className="font-medium text-md text-swBlue  whitespace-nowrap">
                                {data?.user?.firstName} {data?.user?.lastName} 
                            </p>
                         

                        <span
                            className={`text-white text-xs py-1 px-3 rounded-md ${data?.user?.status === "Active"
                                ? "bg-swGreen700"
                                : "bg-red-500"
                                }`}
                        >
                            {data?.user?.status}
                        </span>
                    
                            {/* <p className="font-medium text-sm text-swBlue  underline">SWL-{data?.user?.staffId}</p> */}
                        </div>
                        <div className="flex gap-4 justify-between">
                            <p className="font-medium text-sm">{data?.user?.email}</p>
                        </div>
                        <div className="flex gap-5 items-center mt-2">
                            <Link
                                href={`mailto:${data?.user?.email}`}
                                target="_blank"
                                className="hover:text-swBlue p-1 rounded-md cursor-pointer"
                            >
                                <MdEmail className="text-swBlue " size="20" />
                            </Link>
                            <Link
                                href={`tel:${data?.user?.phoneNumber}`}
                                className="hover:text-swBlue p-1 rounded-md cursor-pointer"
                            >
                                <FiPhoneOutgoing className="text-swBlue "  size="20" />
                            </Link>
                            <Link
                                href={`/team-management/staff/update/${data?.user?._id}`}
                                className="hover:text-swBlue p-1 rounded-md cursor-pointer"
                            >
                                <FiEdit className="text-swBlue "  size="20" />
                            </Link>
                        </div>

                <div className="grid grid-cols-2 gap-5 mt-2">
                    {returnCardDetails(
                        "Staff ID",

                        <p className="font-medium text-sm text-swBlue  underline">SWL-{data?.user?.staffId}</p>
                    )}
                    {returnCardDetails("Total Tasks", tasks?.data?.totalCount || 0)}
                    {returnCardDetails(
                        "Pending Tasks",
                        tasks?.data?.pendingCount || 0
                    )}
                    {returnCardDetails(
                        "Completed Tasks",
                        tasks?.data?.doneCount || 0
                    )}
                </div>
                    </div>
                </div>

            </div>
        </div>
    )
}