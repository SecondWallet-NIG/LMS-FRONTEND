"use client";

import { useState } from "react";
import { PiCalendarBlankLight } from "react-icons/pi";
import CenterModal from "../../modals/CenterModal";
import { DateRange } from "react-date-range";
import Button from "../../shared/buttonComponent/Button";
import SummaryTable from "./SummaryTable";

const SummaryReport = () => {
  const [dateFilterOpen, setDateFilterOpen] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);


  const fetchSummaryByDate = () => {
    if (dateRange && dateRange.length > 0) {
      if (
        dateRange[0].startDate instanceof Date &&
        dateRange[0].endDate instanceof Date
      ) {
        const startDate = dateRange[0].startDate.toISOString();
        const endDate = dateRange[0].endDate.toISOString();
        const data = {
          startDate,
          endDate,
        };
        dispatch(getLoanApplicationSummary(data));
        setDateFilterOpen(false);
      }
    }
  };

  const toggleDateFilter = () => {
    setDateFilterOpen(!dateFilterOpen);
  };
  return (
    <main className="w-full p-5">
      <div className="flex justify-between">
        <p className="text-2xl font-semibold text-black">Summary Report</p>
        <button
          className={
            "py-2 px-4 text-white text-sm bg-swBlue font-semibold rounded-md"
          }
        >
          Export report
        </button>
      </div>
      <div className="rounded-lg bg-swLightGray p-5 shadow-xl mt-5">
        <div className="flex justify-end gap-5 items-center ">
          <p className="font-semibold text-black">Filter report</p>
          <div className="flex gap-3">
            <button
              onClick={toggleDateFilter}
              className={
                "py-2 px-4 font-semibold text-sm border border-gray-200 rounded-md flex gap-2 items-center"
              }
            >
              <PiCalendarBlankLight size={20} />
              Select date range
            </button>
            {/* <button
              className={
                "py-2 px-4 font-semibold text-sm border border-gray-200 rounded-md flex gap-2 items-center"
              }
            >
              <BsGraphDownArrow size={20} />
              Debt status
            </button> */}
          </div>
        </div>

        <div className="flex gap-5 mt-5">
          <div className="bg-white border rounded-xl p-3 w-full">
            <p className="font-semibold">Total Portfolio value</p>
            <div className="flex justify-between items-end">
              <p className="text-2xl font-bold mt-3">
                {/* {loanApplication?.data?.data.count} */}
                ₦1,285,356,265
              </p>
            </div>
          </div>
          <div className="bg-white border rounded-xl p-3 w-full">
            <p className="font-semibold">Total Disbursements</p>
            <div className="flex justify-between items-end">
              <p className="text-2xl font-bold mt-3">5,340</p>
              <p className="text-xl font-medium mt-3">₦967,582,287.25</p>
            </div>
          </div>
          <div className="bg-white border rounded-xl p-3 w-full">
            <p className="font-semibold">Total Repayment</p>
            <div className="flex justify-between items-end">
              <p className="text-2xl font-bold mt-3">
                {/* ₦{" "}
                {loanApplication?.data?.data.totalCommitmentTotal?.toLocaleString()}
                .00K */}
                ₦1,475,582,287.25
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-5 mt-5">
          <div className="bg-white border rounded-xl p-3 w-full">
            <p className="font-semibold">Net profit/loss</p>
            <div className="flex justify-between items-end">
              <p className="text-2xl font-bold mt-3">
                {/* {" "}
                {loanApplication?.data?.data?.ApprovedLoanCount} */}
                + ₦268,937,930.00
              </p>
              <p className="text-xs py-1 px-2 text-swBlue bg-[#E7F1FE] rounded-full font-medium">
                + 35.68%
              </p>
            </div>
          </div>
          <div className="bg-white border rounded-xl p-3 w-full">
            <p className="font-semibold">Pending Disbursements</p>
            <div className="flex justify-between items-end">
              <p className="text-2xl font-bold mt-3">
                {/* {" "}
                {loanApplication?.data?.data.pendingLoanCount}{" "} */}
                250
              </p>
              <p className="text-xl font-medium mt-3">₦967,582,287.25</p>
            </div>
          </div>
          <div className="bg-white border rounded-xl p-3 w-full">
            <p className="font-semibold">Pending Repayments</p>
            <div className="flex justify-between items-end">
              <p className="text-2xl font-bold mt-3">
                {/* {" "}
                {loanApplication?.data?.data.DeclinedLoanCount}{" "} */}
                2,630
              </p>
              <p className="text-xl font-medium mt-3">₦967,582,287.25</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden border mt-5 bg-white">
          <SummaryTable/>
        </div>
        <CenterModal
          isOpen={dateFilterOpen}
          onClose={() => {
            setDateFilterOpen(!dateFilterOpen);
          }}
          width={"fit-content"}
        >
          <div className="bg-white p-4 border shadow-lg">
            <div className="text-swBlue text-sm font-semibold pb-4">
              Filter By Date
            </div>
            <div className="flex gap-2 items-center">
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDateRange([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
              />
            </div>
            <div className="flex justify-between">
              <Button variant="danger" onClick={() => setDateFilterOpen(false)}>
                Cancel
              </Button>
              <Button onClick={fetchSummaryByDate}>Apply</Button>
            </div>
          </div>
        </CenterModal>
      </div>
    </main>
  );
};

export default SummaryReport;
