"use client";

import ReusableDataTable from "../shared/tables/ReusableDataTable";

const CompletedTasks = () => {
  let user;
  if (typeof window !== "undefined") {
    user = JSON.parse(localStorage.getItem("user"));
  }
  const headers = [
    { id: "createdAt", label: "Date Created" },
    { id: "loanId", label: "Borrower's Name & ID" },
    { id: "loanAmount", label: "Loan Amount" },
    { id: "actionStatus", label: "Task Status" },
  ];

  const customDataTransformer = (apiData) => {
    return apiData?.data?.results.map((item) => ({
      id: item._id,
      createdAt: (
        <div className="text-md font-[500] text-gray-700">
          {item.createdAt?.slice(0, 10)}
        </div>
      ),
      loanId: (
        <div className="flex flex-col">
          <p className="text-base font-medium capitalize">
            {item?.loanApplication?.customerId?.firstName}{" "}
            {item?.loanApplication?.customerId?.lastName}
          </p>
          <div className="text-md font-[500] text-swBlue text-underline">
            {" "}
            SWL-{item?.loanApplication?.loanId}
          </div>
        </div>
      ),
      loanAmount: (
        <div>
          <div className="text-md font-[500] text-gray-700">
            {" "}
            ₦ {item?.loanApplication?.loanAmount?.toLocaleString()}
          </div>
        </div>
      ),
      actionStatus: (
        <div>
          <div className="text-md font-[500] text-gray-700">
            <button
              className={`py-1 px-2 text-xs font-normal rounded-full cursor-none ${
                item?.actionStatus === "Done"
                  ? "bg-[#E8F7F0] text-[#107E4B]"
                  : "bg-red-400 text-white"
              }`}
              disabled={item?.actionStatus === "done"}
            >
              {item?.actionStatus}
            </button>
          </div>
        </div>
      ),
      status: (
        <button
          className={`${
            item.status === "Pending"
              ? "bg-swIndicatorLightRed"
              : item.status === "In Progress"
              ? "bg-swIndicatorYellow"
              : item.status === "Ready for Disbursal"
              ? "bg-swIndicatorPurple"
              : item.status === "Disbursed"
              ? "bg-swBlue"
              : "bg-swIndicatorDarkRed"
          } px-2 py-1 rounded-full text-xs font-normal text-white`}
        >
          {item.status}
        </button>
      ),
    }));
  };
  return (
    <div>
      <ReusableDataTable
        dataTransformer={customDataTransformer}
        onClickRow={`/loan-applications/view-loan`}
        headers={headers}
        initialData={[]}
        apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/loan-application/task/${user?.data?.user?._id}`}
        filters={false}
        pagination={true}
        role={"completedTask"}
      />
    </div>
  );
};

export default CompletedTasks;
