import { PiCalendarBlankLight } from "react-icons/pi";
import ReusableDataTable from "../../shared/tables/ReusableDataTable";

const CollectorReport = () => {
  const header = [
    { id: "s/n", label: "S/n" },
    { id: "borrower", label: "Borrower Name" },
    { id: "loan_type", label: "Loan type" },
    { id: "due_date", label: "Due date" },
  ];

  return (
    <main className="w-full rounded-lg bg-swLightGray p-5 shadow-xl">
      <div className="flex justify-between">
        <p className="text-lg font-semibold text-black">Collector Report</p>
        <button
          className={
            "py-2 px-4 text-white text-sm bg-swBlue font-semibold rounded-md"
          }
        >
          Export report
        </button>
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

      <div className="flex gap-5 mt-5">
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
      </div>

      <div className="rounded-xl overflow-hidden border mt-5 bg-white">
        <ReusableDataTable headers={header} filters={true} />
      </div>
    </main>
  );
};

export default CollectorReport;
