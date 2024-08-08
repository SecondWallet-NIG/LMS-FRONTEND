"use client";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import ReusableDataTable from "@/app/components/shared/tables/ReusableDataTable";
import BenefitTypesTable from "@/app/components/teamManagement/operations/BenefitTypesTable";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { getFinancialYear } from "@/redux/slices/hrmsSlice";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import Link from "next/link";
import Button from "@/app/components/shared/buttonComponent/Button";

export default function OperationsPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [pageState, setPageState] = useState("benefit-types");
  const { data } = useSelector(state => state?.hrms);
  const finData = data?.data
  const startDate = finData?.startDate || "2024-01-02T00:00:00.000Z"
  const endDate = finData?.endDate || "2024-01-02T00:00:00.000Z"

  const headers = [
    { id: "name", label: "Department Name" },
    { id: "description", label: "Description" },
    { id: "createdAt", label: "Date Added" },
  ];

  useEffect(() => {
    dispatch(getFinancialYear())
  }, [])

  const customDataTransformer = (apiData) => {
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
          <button
            className={`hover:text-swBlue py-1 px-4 border-b-2 border-transparent cursor-pointer font-medium ${pageState === "benefit-types" &&
              "border-b-swBlue text-swBlue font-semibold"
              }`}
            onClick={() => setPageState("benefit-types")}
          >
            Benefit Types
          </button>
          {/* <button
            className={`hover:text-swBlue py-1 px-4 border-b-2 border-transparent cursor-pointer font-medium ${
              pageState === "employee-benefits" &&
              "border-b-swBlue text-swBlue font-semibold"
            }`}
            onClick={() => setPageState("employee-benefits")}
          >
            Employee Benefits
          </button> */}
          <button
            className={`hover:text-swBlue py-1 px-4 border-b-2 border-transparent cursor-pointer font-medium ${pageState === "financial-year" &&
              "border-b-swBlue text-swBlue font-semibold"
              }`}
            onClick={() => setPageState("financial-year")}
          >
            Financial year
          </button>
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
            <div className="mx-auto w-full px-5 lg:px-1 lg:w-3/5">
              <div className="flex justify-end">
                <div className={`py-1 px-2 border rounded-md flex w-fit text-xs items-center gap-1 
                  ${finData?.isActive ? "bg-green-50 text-swGreen" : "text-red-400 bg-red-100"}`}>
                  <div className={`h-1 w-1 rounded-full ${finData?.isActive ? "bg-green-500" : "bg-red-500"}`}>
                  </div>
                  {finData?.isActive ? "Active": "Inactive"}
                </div>
                <Button className="bg-swBlue text-white md:p-[0.37rem] rounded-md ml-2 whitespace-nowrap">
                  <Link href={'/team-management/operations/financial-year/add-new'}
                    className="flex gap-1 items-center p-1"
                  >
                    <AiOutlinePlus size={15} />
                    <p className="block">Add Financial Year</p>
                  </Link>
                </Button>
              </div>
              <div className="px-5 pb-16 bg-white">
                <div className="flex justify-between mt-5 gap-5">
                  <p className="w-1/4 font-semibold mr-2">Year</p>
                  <div className="w-3/4 flex flex-col gap-5">
                    {finData?.year}
                  </div>
                </div>
                <div className="flex justify-between mt-5 gap-5">
                  <p className="w-1/4 font-semibold mr-2">Start Date</p>
                  <div className="w-3/4 flex flex-col gap-5">
                    {format(new Date(startDate), "dd/MM/yyyy")}
                  </div>
                </div>
                <div className="flex justify-between mt-5 gap-5">
                  <p className="w-1/4 font-semibold mr-2">End Date</p>
                  <div className="w-3/4 flex flex-col gap-5">
                    {format(new Date(endDate), "dd/MM/yyyy")}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
