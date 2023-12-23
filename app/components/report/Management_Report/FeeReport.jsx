"use client";
import { DateRange } from "react-date-range";
import CenterModal from "../../modals/CenterModal";
import Button from "../../shared/buttonComponent/Button";
import { PiCalendarBlankLight } from "react-icons/pi";
import { useState } from "react";
import FeeTable from "./Tables/FeeTable";

const FeeReport = () => {
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
          <p className="text-xl font-semibold text-black">Fee Report</p>
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
            <p className="font-semibold">Number of available fees</p>
            <div className="flex justify-between items-end">
              <p className="text-2xl font-bold mt-3">3</p>
            </div>
          </div>
          <div className="bg-white border rounded-xl p-3 w-full">
            <p className="font-semibold">Total Fee Revenue within period</p>
            <div className="flex justify-between items-end">
              <p className="text-2xl font-bold mt-3">25,269,258.53</p>
            </div>
          </div>
          <div className="bg-white border rounded-xl p-3 w-full">
            <p className="font-semibold">Times fees are collected</p>
            <div className="flex justify-between items-end">
              <p className="text-2xl font-bold mt-3">8,586</p>
            </div>
          </div>
        </div>

        <div className="border p-3 bg-white rounded-lg overflow-hidden mt-5">
          <div className="flex gap-3 rounded-lg">
            <div className="flex gap-2 p-5 bg-swLightBlueIndcatorBg rounded-lg items-start w-full">
              <div className="p-[0.35rem] rounded-full bg-swLightBlue" />
              <div className="-mt-1">
                <p className="font-medium">Commitment fee</p>
                <p className="mt-2 font-semibold text-lg">5,259 loans</p>
                <p className="font-semibold text-lg text-swLightBlue">
                  N 8,937,948.05
                </p>
              </div>
            </div>

            <div className="flex gap-2 p-5 bg-swLightPinkIndcatorBg rounded-lg items-start w-full">
              <div className="p-[0.35rem] rounded-full bg-swIndicatorPink" />
              <div className="-mt-1">
                <p className="font-medium">Management fee</p>
                <p className="mt-2 font-semibold text-lg">2,259 loans</p>
                <p className="font-semibold text-lg text-swIndicatorPink">
                  N 8,937,948.05
                </p>
              </div>
            </div>

            <div className="flex gap-2 p-5 bg-swLightGreenIndcatorBg rounded-lg items-start w-full">
              <div className="p-[0.35rem] rounded-full bg-swGreen" />
              <div className="-mt-1">
                <p className="font-medium">Insurance</p>
                <p className="mt-2 font-semibold text-lg">2,259 loans</p>
                <p className="font-semibold text-lg text-swGreen">
                  N 8,937,948.05
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-xl overflow-hidden border mt-5 bg-white">
          <FeeTable />
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

export default FeeReport;
