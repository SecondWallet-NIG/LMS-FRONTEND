"use client";

import { useEffect, useState } from "react";
import { PiCalendarBlankLight } from "react-icons/pi";
import CenterModal from "../../modals/CenterModal";
import { DateRange } from "react-date-range";
import Button from "../../shared/buttonComponent/Button";
import SummaryTable from "./SummaryTable";
import { handleCaptureClick } from "../../helpers/utils";
import EditableButton from "../../shared/editableButtonComponent/EditableButton";
import { useDispatch, useSelector } from "react-redux";
// import { getSummaryReport } from "@/redux/slices/customerSlice";
import { getSummaryReport } from "@/redux/slices/reportSlice";
import { getCustomerSummary } from "@/redux/slices/customerSlice";

const SummaryReport = () => {
  const dispatch = useDispatch();
  const summaryReport = useSelector((state) => state.report);
  const customerSummary = useSelector((state) => state.customer);
  const [dateFilterOpen, setDateFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const handleCapture = () => {
    handleCaptureClick(setLoading, "captureDiv", `Summary report`);
  };

  useEffect(() => {
    dispatch(getSummaryReport());
    dispatch(getCustomerSummary());
  }, []);

  return (
    <main className="w-full p-5">
      <div className="flex justify-between">
        <p className="text-2xl font-semibold text-black">Summary Report</p>
        <EditableButton
          blueBtn={true}
          label={loading ? "Exporting" : "Export report"}
          disabled={loading ? true : false}
          className={"text-swGray"}
          onClick={handleCapture}
        />
      </div>
      <div className="rounded-lg bg-swLightGray p-5 shadow-xl mt-5">
        <div id="captureDiv" className="p-2">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
            <div className="bg-white border rounded-xl p-3 w-full">
              <p className="font-semibold">Total Portfolio value</p>
              <div className="flex justify-between items-end">
                <p className="text-2xl font-bold mt-3">
                  {/* {loanApplication?.data?.data.count} */}₦
                  {summaryReport?.data?.data?.totalPortfolioValue?.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="bg-white border rounded-xl p-3 w-full">
              <p className="font-semibold">Total Disbursements</p>
              <div className="flex justify-between items-end">
                <p className="text-2xl font-bold mt-3">
                  {summaryReport?.data?.data?.totalDisbursementsCount?.toLocaleString()}
                </p>
                <p className="text-xl font-medium mt-3">
                  ₦
                  {summaryReport?.data?.data?.totalDisbursementsValue?.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="bg-white border rounded-xl p-3 w-full">
              <p className="font-semibold">Total Repayment</p>
              <div className="flex justify-between items-end">
                <p className="text-2xl font-bold mt-3">
                  {summaryReport?.data?.data?.totalRepaymentCount?.toLocaleString()}
                </p>
                <p className="text-xl font-medium mt-3">
                  ₦
                  {summaryReport?.data?.data?.totalRepaymentValue?.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="bg-white border rounded-xl p-3 w-full">
              <p className="font-semibold">Pending Disbursements</p>
              <div className="flex justify-between items-end">
                <p className="text-2xl font-bold mt-3">
                  {summaryReport?.data?.data?.pendingDisbursementsCount?.toLocaleString()}
                </p>
                <p className="text-xl font-medium mt-3">
                  ₦
                  {summaryReport?.data?.data?.pendingDisbursements?.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="bg-white border rounded-xl p-3 w-full">
              <p className="font-semibold">Pending Repayments</p>
              <div className="flex justify-between items-end">
                <p className="text-2xl font-bold mt-3">
                  {summaryReport?.data?.data?.pendingRepaymentCount?.toLocaleString()}
                </p>
                <p className="text-xl font-medium mt-3">
                  ₦
                  {summaryReport?.data?.data?.pendingRepaymentValue?.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="bg-white border rounded-xl p-3 w-full">
              <p className="font-semibold">Total Borrowers</p>
              <div className="flex justify-between items-end">
                <p className="text-2xl font-bold mt-3">
                  {customerSummary?.data?.data?.totalCount?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          {/* <div className="flex gap-5 mt-5">
            
          </div> */}
        </div>

        <div className="rounded-xl overflow-hidden border mt-5 bg-white">
          <SummaryTable />
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
