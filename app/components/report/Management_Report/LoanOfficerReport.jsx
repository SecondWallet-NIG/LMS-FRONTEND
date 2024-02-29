"use client";
import { DateRange } from "react-date-range";
import CenterModal from "../../modals/CenterModal";
import Button from "../../shared/buttonComponent/Button";
import { PiCalendarBlankLight } from "react-icons/pi";
import { useEffect, useState } from "react";
import { BsGraphDownArrow } from "react-icons/bs";
import LoanOfficerTable from "./Tables/LoanOfficerTable";
import EditableButton from "../../shared/editableButtonComponent/EditableButton";
import { handleCaptureClick } from "../../helpers/utils";
import { useDispatch, useSelector } from "react-redux";
import { getLoanOfficersCardsData } from "@/redux/slices/userSlice";

const LoanOfficerReport = () => {
  const dispatch = useDispatch();
  const [dateFilterOpen, setDateFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
  const { data } = useSelector((state) => state.user);

  console.log({ loanOfficerCard: data });

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
    handleCaptureClick(setLoading, "captureDiv", `Loan officer report`);
  };

  useEffect(() => {
    dispatch(getLoanOfficersCardsData());
  }, []);

  return (
    <main className="w-full">
      <div className="rounded-lg bg-swLightGray p-5 shadow-xl">
        <div id="captureDiv" className="p-2">
          <div className="flex justify-between">
            <p className="text-xl font-semibold text-black">
              Loan Officer Report
            </p>
            {/* <button
              className={
                "py-2 px-4 text-white text-sm bg-swBlue font-semibold rounded-md"
              }
            >
              Export report
            </button> */}
            <EditableButton
              blueBtn={true}
              label={loading ? "Exporting" : "Export report"}
              disabled={loading ? true : false}
              className={"text-swGray"}
              onClick={handleCapture}
            />
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
              <p className="font-semibold">Number of loan officers</p>
              <div className="flex justify-between items-end">
                <p className="text-2xl font-bold mt-3">
                  {data?.data?.loanOfficersCount}
                </p>
              </div>
            </div>
            <div className="bg-white border rounded-xl p-3 w-full">
              <p className="font-semibold">Loan Originated</p>
              <div className="flex justify-between items-end">
                <p className="text-2xl font-bold mt-3">
                  {data?.data?.totalLoanApplications.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="bg-white border rounded-xl p-3 w-full">
              <p className="font-semibold">Overall Loan approvel rate</p>
              <div className="flex justify-between items-end">
                <p className="text-2xl font-bold mt-3">
                  {data?.data?.loanApprovalRate}%
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-xl overflow-hidden border mt-5 bg-white">
          <LoanOfficerTable />
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

export default LoanOfficerReport;
