"use client"
import ReusableDataTable from "@/app/components/shared/tables/ReusableDataTable";
import { AiOutlinePlus } from "react-icons/ai";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import { useRouter } from "next/navigation";

const RolePage = () => {
    const router = useRouter()
    const headers = [
        { id: "name", label: "Role Name" },
        { id: "permissions", label: "Permissions" },
        { id: "createdAt", label: "Date Added" },
    ];

    const customDataTransformer = (apiData) => {
        return apiData?.map((item) => ({
            id: item._id,
            name: (
                <div>
                    <div className="text-[15px] font-light text-gray-700 capitalize">{item.name}</div>
                </div>
            ),
            permissions: (
                <div className="text-[15px] font-light text-gray-700">
                    {item.permissions.map((x) => (
                        <div className="capitalize mb-1" key={x}>
                            {x}
                        </div>
                    ))}
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
        <DashboardLayout isBackNav={true} paths={["Team Management", "Roles"]}>
            <div className=" py-2 mt-5">
                <ReusableDataTable
                    dataTransformer={customDataTransformer}
                    apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/role/all`}
                    initialData={[]}
                    headers={headers}
                    onClickRow={"/team-management/role/department/update/"}
                    filters={true}
                    pagination={true}
                    btnText={
                        <div
                            className="flex gap-1 items-center p-1"
                            onClick={() => {router.push('/team-management/role/add-new')}}
                        >
                            <AiOutlinePlus size={15} />
                            <p className="hidden lg:block">Add New Role</p>
                        </div>
                    }
                />
            </div>
        </DashboardLayout>
    );
};

export default RolePage;
