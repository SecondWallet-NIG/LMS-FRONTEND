"use client";
import React from "react";
import ReusableDataTable from "../../shared/tables/ReusableDataTable";
import { format } from "date-fns";

const header = [
  { id: "date", label: "Date" },
  { id: "description", label: "Description" },
  { id: "category", label: "Expense Category" },
  { id: "amount", label: "Amount" },
  { id: "status", label: "Status" },
];

const customDataTransformer = (apiData) => {
  return apiData?.expenses?.map((item, i) => ({
    id: item?._id,
    date: (
      <div className="text-[15px] font-light text-gray-700 whitespace-nowrap">
        {item?.expenseDate && format(new Date(item?.expenseDate), "PPP")}
      </div>
    ),
    description: (
      <div className="text-[15px] font-light text-gray-700">
        {item?.description}
      </div>
    ),
    category: (
      <div className="text-[15px] font-light text-gray-700">
        {item?.category?.name}
      </div>
    ),
    amount: (
      <div className="text-[15px] font-light text-gray-700 whitespace-nowrap">
        ₦ {item?.amount?.toLocaleString()}
      </div>
    ),
    status: (
      <div className="text-xs font-[500] text-gray-700">
        <div className="py-1 px-2 border rounded-md flex w-fit text-xs items-center gap-1">
          <div
            className={`h-1 w-1 rounded-full ${
              item?.status === "New" ? "bg-green-500" : "bg-red-500"
            }`}
          />
          {item?.status}
        </div>
      </div>
    ),
  }));
};

export default function ExpenseReportTable() {
  return (
    <>
      <ReusableDataTable
        dataTransformer={customDataTransformer}
        onClickRow="/expenses/view-expense"
        headers={header}
        initialData={[]}
        apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/expense`}
        // btnText={
        //   <div className="flex gap-1 items-center p-1">
        //     <AiOutlinePlus size={15} />
        //     <p className="">create borrower</p>
        //   </div>
        // }
        // btnTextClick={() => {
        //   router.push("/create-borrower");
        // }}
        filters={true}
        pagination={true}
      />
    </>
  );
}
