"use client";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FiEdit2, FiTrash } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getSingleDepartment } from "@/redux/slices/hrmsSlice";

import { format } from "date-fns";

const ViewDepartment = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.hrms);
  // const { data: userData } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getSingleDepartment(id));
  }, []);


  return (
    <DashboardLayout
      isBackNav={true}
      paths={["Team Management", "View Department"]}
    >
      <main className="mx-auto max-w-4xl py-10 px-5">
        <div className="ml-auto flex gap-2 justify-end font-semibold">
          {/* {showEditBtn && ( */}
          <Link
            href={`/team-management/department/update/${id}`}
            className="border py-2 px-3 flex gap-2 items-center rounded-lg"
          >
            <FiEdit2 size={20} />
            Edit
          </Link>
          {/* )} */}
        </div>

        <div className="flex justify-between p-5 border-b">
          <p className="font-semibold text-xl">Department</p>
        </div>

        <div className="p-5 flex flex-col gap-5 font-500">
          <p className="text-lg font-semibold">Department Details</p>
          <div className="flex">
            <p className="min-w-[15rem]">Department Name</p>
            <p>{data?.data?.departmentName}</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Department Code</p>
            <p>{data?.data?.departmentCode}</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Department Head</p>
            <div>
              <p>
                {data?.data?.departmentHead?.lastName}{" "}
                {data?.data?.departmentHead?.firstName}
              </p>
              <p className="text-sm text-swBlue">
                {data?.data?.departmentHead?.email}
              </p>
            </div>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Date Created</p>
            <p>
              {data?.data?.createdAt &&
                format(new Date(data?.data?.createdAt), "PPP")}
            </p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Description</p>
            <p>{data?.data?.description}</p>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default ViewDepartment;
