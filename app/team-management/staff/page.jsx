"use client";
import ReusableDataTable from "@/app/components/shared/tables/ReusableDataTable";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlinePlus } from "react-icons/ai";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";

const StaffDataPage = () => {
    const router = useRouter();
    const headers = [
        { id: "name", label: "Name and Staff ID" },
        { id: "email", label: "Email" },
        { id: "department", label: "Department" },
        { id: "role", label: "Staff Role" },
        { id: "status", label: "Status" },
        { id: "createdAt", label: "Date Added" },
    ];

    const customDataTransformer = (apiData) => {
        return apiData?.results.map((item) => ({
            id: item._id,
            name: (
                <div>
                    <div className="font-semibold text-gray-700 text-lg">{`${item.firstName} ${item.lastName}`}</div>
                    <div className="text-gray-500 text-sm font-light ">{`SWS-${item.staffId}`}</div>
                </div>
            ),
            email: (
                <div>
                    <div className="text-[15px] font-light text-gray-700 underline text-swBlue">{item.email}</div>
                </div>
            ),
            department: (
                <div>
                    <div className="text-[15px] font-light text-gray-700">{item?.role?.department?.departmentName}</div>
                </div>
            ),
            status: (
                <button
                    className={`${item.status === "Active"
                            ? "bg-[#E7F1FE] text-swBlue text-xs font-normal px-2 py-1 rounded-full"
                            : "bg-[#F8A9A3] "
                        } px-2 py-1 rounded`}
                >
                    {item.status}
                </button>
            ),
            role: (
                <div className="text-[15px] font-light text-gray-700">
                    {item?.role?.name}
                </div>
            ),
            createdAt: (
                <div className="text-[15px] font-light text-gray-700">
                    {item.createdAt?.slice(0, 10)}
                </div>
            ),
        }));
    };

    return (
        <DashboardLayout isBackNav={true} paths={["Team Management", "Staff"]}>
            <div className="mt-5">
                <ToastContainer />
                <div className="py-2">
                    <div className="flex justify-between items-center">
                        <ReusableDataTable
                            dataTransformer={customDataTransformer}
                            apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/user`}
                            onClickRow={"/team-management/staff/"}
                            initialData={[]}
                            headers={headers}
                            filters={true}
                            pagination={true}
                            btnText={
                                <div
                                    className="flex gap-1 items-center p-1"
                                    onClick={() => {router.push('/team-management/staff/add-new')}}
                                >
                                    <AiOutlinePlus size={15} />
                                    <p className="hidden lg:block">Add New Staff</p>
                                </div>
                            }
                        />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default StaffDataPage;