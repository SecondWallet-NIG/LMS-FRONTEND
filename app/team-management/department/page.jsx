"use client";
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import { useRouter } from "next/navigation";
import ReusableDataTable from "@/app/components/shared/tables/ReusableDataTable";
import { AiOutlinePlus } from "react-icons/ai";

export default function DepartmentPage() {
  const router = useRouter();
  const headers = [
    { id: "name", label: "Department Name" },
    { id: "departmentHead", label: "Department Head" },
    { id: "description", label: "Description" },
    { id: "createdAt", label: "Date Added" },
  ];

  const customDataTransformer = (apiData) => {
    return apiData?.departments?.map((item) => ({
      id: item._id,
      name: (
        <div>
          <div className="text-[15px] font-light text-gray-700 capitalize ">
            {item.departmentName}
          </div>
        </div>
      ),
      departmentHead: (
        <div>
          <div className="text-[15px] font-light text-gray-700 capitalize ">
            <p>
              {item?.departmentHead?.lastName} {item?.departmentHead?.firstName}
            </p>
            <p className="text-sm text-swBlue">{item?.departmentHead?.email}</p>
          </div>
        </div>
      ),
      description: (
        <div className="text-[15px] font-light text-gray-700 max-w-lg">
          {item.description}
        </div>
      ),
      createdAt: (
        <div className="text-[15px] font-light text-gray-700 whitespace-nowrap">
          {item.createdAt?.slice(0, 10)}
        </div>
      ),
    }));
  };

  return (
    <DashboardLayout isBackNav={true} paths={["Team Management", "Department"]}>
      <div className=" py-2 mt-5">
        <ReusableDataTable
          dataTransformer={customDataTransformer}
          apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/department`}
          onClickRow={"/team-management/department/view-department/"}
          initialData={[]}
          headers={headers}
          filters={true}
          pagination={true}
          btnText={
            <div
              className="flex gap-1 items-center p-1"
              onClick={() => {
                router.push("/team-management/department/add-new");
              }}
            >
              <AiOutlinePlus size={15} />
              <p className="hidden lg:block">Add Department</p>
            </div>
          }
        />
      </div>
    </DashboardLayout>
  );
}
