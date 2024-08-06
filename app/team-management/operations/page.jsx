"use client";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import ReusableDataTable from "@/app/components/shared/tables/ReusableDataTable";
import BenefitTypesTable from "@/app/components/teamManagement/operations/BenefitTypesTable";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";

export default function OperationsPage() {
  const router = useRouter();
  const [pageState, setPageState] = useState("benefit-types");

  const headers = [
    { id: "name", label: "Department Name" },
    { id: "description", label: "Description" },
    { id: "createdAt", label: "Date Added" },
  ];

  const customDataTransformer = (apiData) => {
    console.log({ apiData });
    return apiData?.departments?.map((item) => ({
      name: (
        <div>
          <div className="text-md font-semibold text-gray-700 capitalize">
            {item.departmentName}
          </div>
        </div>
      ),
      description: (
        <div className="text-md font-semibold text-gray-700">
          {item.description}
        </div>
      ),
      createdAt: (
        <div className="text-md font-semibold text-gray-700">
          {item.createdAt?.slice(0, 10)}
        </div>
      ),
    }));
  };

  return (
    <DashboardLayout isBackNav={true} paths={["Team management", "Operations"]}>
      <div className="">
        <div className="p-5 flex items-centers">
          <p
            className={`hover:text-swBlue py-1 px-4 border-b-2 border-transparent cursor-pointer font-medium ${
              pageState === "benefit-types" &&
              "border-b-swBlue text-swBlue font-semibold"
            }`}
            onClick={() => setPageState("benefit-types")}
          >
            Benefit Types
          </p>
          <p
            className={`hover:text-swBlue py-1 px-4 border-b-2 border-transparent cursor-pointer font-medium ${
              pageState === "employee-benefits" &&
              "border-b-swBlue text-swBlue font-semibold"
            }`}
            onClick={() => setPageState("employee-benefits")}
          >
            Employee Benefits
          </p>
          <p
            className={`hover:text-swBlue py-1 px-4 border-b-2 border-transparent cursor-pointer font-medium ${
              pageState === "financial-year" &&
              "border-b-swBlue text-swBlue font-semibold"
            }`}
            onClick={() => setPageState("financial-year")}
          >
            Financial year
          </p>
        </div>

        <div className="mt-10">
          {pageState === "benefit-types" && <BenefitTypesTable />}
          {pageState === "employee-benefits" && (
            <ReusableDataTable
              dataTransformer={customDataTransformer}
              apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/benefit-type`}
              initialData={[]}
              headers={headers}
              filters={true}
              pagination={true}
              btnText={
                <div
                  className="flex gap-1 items-center p-1"
                  onClick={() => {
                    router.push(
                      "/team-management/operations/employee-benefit/add-new"
                    );
                  }}
                >
                  <AiOutlinePlus size={15} />
                  <p className="block">Add Employee Benefit</p>
                </div>
              }
            />
          )}
          {pageState === "financial-year" && (
            <ReusableDataTable
              dataTransformer={customDataTransformer}
              apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/benefit-type`}
              initialData={[]}
              headers={headers}
              filters={true}
              pagination={true}
              btnText={
                <div
                  className="flex gap-1 items-center p-1"
                  onClick={() => {
                    router.push(
                      "/team-management/operations/employee-benefit/add-new"
                    );
                  }}
                >
                  <AiOutlinePlus size={15} />
                  <p className="block">Add Benefit Type</p>
                </div>
              }
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
