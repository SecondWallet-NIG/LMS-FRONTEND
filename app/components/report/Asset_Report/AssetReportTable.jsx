"use client";
import React from "react";
import ReusableDataTable from "../../shared/tables/ReusableDataTable";
import { format } from "date-fns";

const header = [
  { id: "asset", label: "Asset" },
  { id: "category", label: "Category" },
  // { id: "description", label: "Description" },
  { id: "acquisitionDate", label: "Acquisition Date" },
  { id: "value", label: "Value" },
  // { id: "action", label: "Action" },
];

const customDataTransformer = (apiData) => {
  return apiData?.assets?.map((item, i) => ({
    id: item?._id,
    asset: (
      <div className="text-[15px] font-light text-gray-700">{item?.name}</div>
    ),
    category: (
      <div className="text-[15px] font-light text-gray-700">
        {item?.category?.name}
      </div>
    ),
    // description: (
    //   <div className="text-[15px] font-light text-gray-700">
    //     {item?.description}
    //   </div>
    // ),
    acquisitionDate: (
      <div>
        <div className="text-[15px] font-light text-gray-700">
          {item?.acquisitionDate &&
            format(new Date(item?.acquisitionDate), "PPP")}
        </div>
      </div>
    ),
    value: (
      <div className="text-[15px] font-light text-gray-700">
        ₦ {item?.value?.toLocaleString()}
      </div>
    ),
  }));
};

export default function AssetReportTable() {
  return (
    <>
      <ReusableDataTable
        dataTransformer={customDataTransformer}
        onClickRow={`/asset-management/view-asset`}
        headers={header}
        initialData={[]}
        apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/asset/all`}
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
