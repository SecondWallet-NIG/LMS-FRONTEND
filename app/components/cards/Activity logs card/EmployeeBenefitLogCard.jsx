"use client";

import { getEmployeeBenefitsActivityLogs } from "@/redux/slices/employeeBenefitsLogSlice";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const EmployeeBenefitsLogCard = ({ data }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const logs = useSelector((state) => state.employeeBenefitsLogs);

  useEffect(() => {
    dispatch(getEmployeeBenefitsActivityLogs(id));
  }, []);
  return (
    <main>
      {logs?.data?.data.map((item, index) => {
        const salaryChanged =
          item.changes.oldValue.salary !== undefined &&
          item.changes.newValue.salary !== undefined &&
          item.changes.oldValue.salary !== item.changes.newValue.salary;

        const benefitChanged =
          item.changes.oldValue.benefit?.level !==
          item.changes.newValue.benefit?.level;
        return (
          <div key={item._id} className="flex gap-4 py-4">
            {/* Timeline Indicator */}
            <div className="flex flex-col items-center">
              <div className="p-1 rounded-full bg-purple-600" />
              <div className="h-8 w-[0.6rem] border-2 border-gray-300 mt-1 ml-[0.35rem] border-r-0 border-t-0 rounded-bl-md" />
            </div>

            {/* Activity Details */}
            <div className="w-full">
              <p className="text-xs sm:text-sm">
                {item.action === "UPDATE_BENEFIT"
                  ? "Benefit updated by"
                  : item.action === "CREATE_BENEFIT"
                  ? "Benefit created by"
                  : "Unknown action by"}{" "}
                {item.performedBy.firstName} {item.performedBy.lastName} (
                {item.performedBy.email}) on {formatDate(item.createdAt)} at{" "}
                {new Date(item.createdAt).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>

              {/* Display Changes */}
              {(salaryChanged || benefitChanged) && (
                <div className="p-4 bg-gray-100 mt-2 rounded-lg font-medium">
                  {salaryChanged && (
                    <p className="text-xs sm:text-sm text-blue-600">
                      Salary updated from ₦
                      {item.changes.oldValue.salary?.toLocaleString() || "0"} to
                      ₦{item.changes.newValue.salary?.toLocaleString()}
                    </p>
                  )}

                  {benefitChanged && (
                    <p className="text-xs sm:text-sm text-blue-600">
                      Benefit updated to{" "}
                      <span>{item.changes.newValue.benefit?.level}</span>
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </main>
  );
};

export default EmployeeBenefitsLogCard;
