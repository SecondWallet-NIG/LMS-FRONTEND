"use client";

import { PiCalendarBlankLight } from "react-icons/pi";
import ReusableDataTable from "../../shared/tables/ReusableDataTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatDate } from "@/helpers";
import { handleCaptureClick } from "../../helpers/utils";
import { useState } from "react";
import EditableButton from "../../shared/editableButtonComponent/EditableButton";

const Staffs = () => {
  const headers = [
    { id: "name", label: "Name and Staff ID" },
    { id: "role", label: "Staff Role" },
    { id: "status", label: "Status" },
    { id: "createdAt", label: "Date Added" },
    { id: "loanCount", label: "Loans Originated" },
    { id: "loanAmount", label: "Loan Volume" },
  ];

  const customDataTransformer = (apiData) => {
    return apiData?.results.map((item) => ({
      id: item._id,
      name: (
        <div>
          <div className="text-md font-semibold text-gray-700">{`${item.firstName} ${item.lastName}`}</div>
          <div className="text-xs text-gray-500">{`SWS-${item.staffId}`}</div>
        </div>
      ),
      status: (
        <button
          className={`${
            item.status === "Active"
              ? "bg-[#E7F1FE] text-swBlue text-xs font-normal px-2 py-1 rounded-full"
              : "bg-[#F8A9A3] "
          } px-2 py-1 rounded`}
        >
          {item.status}
        </button>
      ),
      role: (
        <div className="text-md font-semibold text-gray-700">
          {item?.role?.name}
        </div>
      ),
      createdAt: (
        <div className="text-md font-semibold text-gray-700">
          {formatDate(item.createdAt?.slice(0, 10))}
        </div>
      ),
      loanCount: (
        <div className="text-md font-semibold text-gray-700">
          {item.loanCount}
        </div>
      ),
      loanAmount: (
        <div className="text-md font-semibold text-gray-700">
          ₦ {item.loanAmount.toLocaleString()}
        </div>
      ),
    }));
  };

  return (
    <div>
      <ToastContainer />
      <div className="py-2">
        <div className="flex justify-between items-center">
          <ReusableDataTable
            role="collectorsReport"
            dataTransformer={customDataTransformer}
            apiEndpoint="https://secondwallet-stag.onrender.com/api/user"
            headers={headers}
            filters={true}
            pagination={true}
          />
        </div>
      </div>
    </div>
  );
};

const CollectorReport = () => {
  const [loading, setLoading] = useState(false);
  const header = [
    { id: "s/n", label: "S/n" },
    { id: "borrower", label: "Borrower Name" },
    { id: "loan_type", label: "Loan type" },
    { id: "due_date", label: "Due date" },
  ];

  const handleCapture = () => {
    handleCaptureClick(setLoading, "captureDiv", `Collector report`);
  };

  return (
    <main
      id="captureDiv"
      className="w-full rounded-lg bg-swLightGray p-5 shadow-xl"
    >
      <div className="flex justify-between">
        <p className="text-lg font-semibold text-black">Collector Report</p>
        {/* <button
          className={
            "py-2 px-4 text-white text-sm bg-swBlue font-semibold rounded-md"
          }
        >
          Export report
        </button> */}
        <EditableButton
          blueBtn={true}
          label={loading ? "Exporting" : "Export"}
          disabled={loading ? true : false}
          className={"text-swGray"}
          onClick={handleCapture}
        />
      </div>

      <div className="flex justify-between items-center mt-5">
        <p className="font-semibold text-black">Filter report</p>
        <div className="flex gap-3">
          <button
            className={
              "py-2 px-4 font-semibold text-sm border border-gray-200 rounded-md flex gap-2 items-center"
            }
          >
            <PiCalendarBlankLight size={20} />
            Select date range
          </button>
          <button
            className={
              "py-2 px-4 font-semibold text-sm border border-gray-200 rounded-md"
            }
          >
            Loan status
          </button>
          <button
            className={
              "py-2 px-4 font-semibold text-sm border border-gray-200 rounded-md"
            }
          >
            Outstanding Range
          </button>
        </div>
      </div>

      {/* <div className="flex gap-5 mt-5">
        <div className="bg-white border rounded-xl p-3 w-full">
          <p className="font-semibold">Number of collectors</p>
          <p className="text-2xl font-bold mt-3">25</p>
        </div>
        <div className="bg-white border rounded-xl p-3 w-full">
          <p className="font-semibold">Amount of overdue payments</p>
          <p className="text-2xl font-bold mt-3">23,028,258.36</p>
        </div>
        <div className="bg-white border rounded-xl p-3 w-full">
          <p className="font-semibold">Outstanding payments</p>
          <p className="text-2xl font-bold mt-3">1,390</p>
        </div>
      </div> */}

      <div className="rounded-xl overflow-hidden border mt-5 bg-white">
        <Staffs />
      </div>
    </main>
  );
};

export default CollectorReport;
