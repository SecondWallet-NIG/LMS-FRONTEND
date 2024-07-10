"use client";
import React, { useState, useEffect } from "react";
import EditableButton from "../../shared/editableButtonComponent/EditableButton";
import { handleCaptureClick } from "../../helpers/utils";
import { PiCalendarBlankLight } from "react-icons/pi";
import CenterModal from "../../modals/CenterModal";
import { DateRange } from "react-date-range";
import Button from "../../shared/buttonComponent/Button";
import { useDispatch, useSelector } from "react-redux";
import AssetReportCards from "./AssetReportsCards";
import AssetReportTable from "./AssetReportTable";
import { getAssetReportCards } from "@/redux/slices/assetManagementSlice";
import { format } from "date-fns";

export default function AssetReport() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [dateFilterOpen, setDateFilterOpen] = useState(false);
  const [assetReports, setAssetReports] = useState({});
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
  const [cards, setCards] = useState([
    { title: "Total Number of Assets", value: 0 },
    {
      title: "Total Number of Asset Categories",
      value: 0,
    },
    {
      title: "Total Asset Value",
      value: "0",
    },
  ]);
  const { data } = useSelector((state) => state.asset);

  // const cards = [
  //   { title: "Total Number of Assets", value: "10" },
  //   { title: "Total Number of Asset Categories", value: "5" },
  //   { title: "Total Number of Asset", value: "1,285,358,256.29" },
  // ];

  const handleCapture = () => {
    handleCaptureClick(setLoading, "captureDiv", `Asset report`);
  };
  // console.log("assetReportCards", data);

  const toggleDateFilter = () => {
    setDateFilterOpen(!dateFilterOpen);
  };

  const fetchSummaryByDate = () => {
    if (dateRange && dateRange.length > 0) {
      if (
        dateRange[0].startDate instanceof Date &&
        dateRange[0].endDate instanceof Date
      ) {
        const startDate = dateRange[0].startDate.toISOString();
        const endDate = dateRange[0].endDate.toISOString();
        const data = {
          startDate: format(new Date(startDate), "yyyy-MM-dd"),
          endDate: format(new Date(endDate), "yyyy-MM-dd"),
        };
        dispatch(
          getAssetReportCards({
            startDate: data.startDate,
            endDate: data.endDate,
          })
        );
        setDateFilterOpen(false);
      }
    }
  };

  useEffect(() => {
    dispatch(getAssetReportCards({ startDate: "", endDate: "" }));
  }, []);

  useEffect(() => {
    console.log("assetdata", data);
    if (data) {
      setCards([
        { title: "Total Number of Assets", value: data?.totalAssets },
        {
          title: "Total Number of Asset Categories",
          value: data?.totalAssetCategory,
        },
        {
          title: "Total Asset Value",
          value: data?.totalAssetValue.toLocaleString(),
        },
      ]);
    }
  }, [data]);

  console.log("assetReportCards", assetReports);

  return (
    <main className="w-full">
      <div className="flex justify-between p-5">
        <p className="text-xl sm:text-2xl font-semibold text-black">
          Asset Report
        </p>
        <EditableButton
          blueBtn={true}
          label={loading ? "Exporting" : "Export report"}
          disabled={loading ? true : false}
          className={"text-swGray"}
          onClick={handleCapture}
        />
      </div>
      <div
        id="captureDiv"
        className="rounded-lg bg-swLightGray p-5 shadow-xl mt-5"
      >
        {/* Filter */}
        <div className="p-2">
          <div className="flex sm:justify-end gap-5 items-center ">
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
        </div>

        {/* Cards */}
        <AssetReportCards cards={cards} />

        {/* Table */}
        <div className="rounded-xl overflow-hidden border mt-10 bg-white">
          <AssetReportTable />
        </div>
        {/* Modal */}
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
}
