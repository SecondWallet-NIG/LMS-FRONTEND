"use client"

export default function StaffDeptInfo({
    data
}) {
    const returnCardDetails = (name, value) => {
        return (
            <div>
                <p className="text-xs font-medium text-swGrey400">{name}</p>
                <p className="text-sm font-medium text-swBlack">{value}</p>
            </div>
        );
    };

    return (
        <div className="p-2 border-2 rounded-lg h-full">
            {/* <p className="text-md text-swBlue font-medium">Department Information</p> */}
            <div className="grid grid-cols-2 gap-5 mt-2">
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