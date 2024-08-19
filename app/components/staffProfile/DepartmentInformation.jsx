"use client"

export default function StaffDeptInfo({
    data
}) {
    const returnCardDetails = (name, value) => {
        return (
            <div>
                <p className="text-sm font-semibold">{name}</p>
                <p className="text-sm font-light">{value}</p>
            </div>
        );
    };

    return (
        <div className="p-5 border-2 shadow-lg rounded-lg h-full">
            <p className="text-swBlue font-medium text-xl">Department Information</p>
            <div className="grid grid-cols-2 gap-5 mt-10">
                {returnCardDetails(
                    "Department Name",
                    data?.user?.role?.department?.departmentName || "None"
                )}
                {returnCardDetails(
                    "Department Code",
                    data?.user?.role?.department?.departmentCode || "None"
                )}
                {returnCardDetails(
                    "Department Head",
                    data?.user?.role?.department?.departmentHead || "None"
                )}
                {returnCardDetails(
                    "Role",
                    data?.user?.role?.name || "None"
                )}
                {returnCardDetails(
                    "Salary",
                    `₦ ${data?.employeeBenefit?.salary?.toLocaleString() || 0
                    }`
                )}
            </div>
        </div>
    )
}