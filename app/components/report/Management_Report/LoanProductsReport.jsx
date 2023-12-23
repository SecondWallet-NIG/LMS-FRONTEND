"use client";
import { PiCalendarBlankLight } from "react-icons/pi";
import CenterModal from "../../modals/CenterModal";
import { DateRange } from "react-date-range";
import Button from "../../shared/buttonComponent/Button";
import { useState } from "react";
import LoanProductsTable from "./Tables/LoanProductsTable";

const LoanProductsReport = () => {
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
    <main className="w-full">
      <div className="rounded-lg bg-swLightGray p-5 shadow-xl">
        <div className="flex justify-between">
          <p className="text-xl font-semibold text-black">
            Loan Products Report
          </p>
          <button
            className={
              "py-2 px-4 text-white text-sm bg-swBlue font-semibold rounded-md"
            }
          >
            Export report
          </button>
        </div>
        <div className="flex justify-between gap-5 items-center mt-5">
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
          </div>
        </div>

        <div className="flex gap-5 mt-5">
          <div className="bg-white border rounded-xl p-3 w-full">
            <p className="font-semibold">Number of Loan Products</p>
            <div className="flex justify-between items-end">
              <p className="text-2xl font-bold mt-3">6</p>
            </div>
          </div>
          <div className="bg-white border rounded-xl p-3 w-full">
            <p className="font-semibold">Loan Originated</p>
            <div className="flex justify-between items-end">
              <p className="text-2xl font-bold mt-3">6,750</p>
            </div>
          </div>
          <div className="bg-white border rounded-xl p-3 w-full">
            <p className="font-semibold">Overall Loan approvel rate</p>
            <div className="flex justify-between items-end">
              <p className="text-2xl font-bold mt-3">70%</p>
            </div>
          </div>
        </div>

        <div className="border p-3 bg-white rounded-lg overflow-hidden mt-5">
          <div className="overflow-x-auto flex gap-3 rounded-lg">
            <div className="flex gap-2 p-5 bg-swLightBlueIndcatorBg rounded-lg items-start">
              <div className="p-[0.35rem] rounded-full bg-swLightBlue" />
              <div className="-mt-1">
                <p className="font-medium">Student loan</p>
                <p className="mt-2 font-semibold text-lg">2,259 loans</p>
                <p className="font-semibold text-lg text-swLightBlue whitespace-nowrap">
                  N 457,937,948.05
                </p>
              </div>
            </div>

            <div className="flex gap-2 p-5 bg-swLightPinkIndcatorBg rounded-lg items-start">
              <div className="p-[0.35rem] rounded-full bg-swIndicatorPink" />
              <div className="-mt-1">
                <p className="font-medium">Student loan</p>
                <p className="mt-2 font-semibold text-lg">2,259 loans</p>
                <p className="font-semibold text-lg text-swIndicatorPink whitespace-nowrap">
                  N 457,937,948.05
                </p>
              </div>
            </div>

            <div className="flex gap-2 p-5 bg-swLightGreenIndcatorBg rounded-lg items-start">
              <div className="p-[0.35rem] rounded-full bg-swGreen" />
              <div className="-mt-1">
                <p className="font-medium">Student loan</p>
                <p className="mt-2 font-semibold text-lg">2,259 loans</p>
                <p className="font-semibold text-lg text-swGreen whitespace-nowrap">
                  N 457,937,948.05
                </p>
              </div>
            </div>

            <div className="flex gap-2 p-5 bg-swLightPurpleIndcatorBg rounded-lg items-start">
              <div className="p-[0.35rem] rounded-full bg-swPurple" />
              <div className="-mt-1">
                <p className="font-medium">Asset loan</p>
                <p className="mt-2 font-semibold text-lg">2,259 loans</p>
                <p className="font-semibold text-lg text-swPurple whitespace-nowrap">
                  N 457,937,948.05
                </p>
              </div>
            </div>

            <div className="flex gap-2 p-5 bg-swLightBlueIndcatorBg rounded-lg items-start">
              <div className="p-[0.35rem] rounded-full bg-swBlue" />
              <div className="-mt-1">
                <p className="font-medium">Market loan</p>
                <p className="mt-2 font-semibold text-lg">2,259 loans</p>
                <p className="font-semibold text-lg text-swBlue whitespace-nowrap">
                  N 457,937,948.05
                </p>
              </div>
            </div>

            <div className="flex gap-2 p-5 bg-swLightBlueIndcatorBg rounded-lg items-start">
              <div className="p-[0.35rem] rounded-full bg-swBlue" />
              <div className="-mt-1">
                <p className="font-medium">Market loan</p>
                <p className="mt-2 font-semibold text-lg">2,259 loans</p>
                <p className="font-semibold text-lg text-swBlue whitespace-nowrap">
                  N 457,937,948.05
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-xl overflow-hidden border mt-5 bg-white">
          <LoanProductsTable />
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

export default LoanProductsReport;
