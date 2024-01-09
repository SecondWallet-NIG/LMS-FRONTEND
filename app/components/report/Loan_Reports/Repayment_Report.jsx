"use client";
import { useState, useEffect } from "react";
import { PiCalendarBlankLight } from "react-icons/pi";
import RepaymentTable from "../../repayment/RepaymentTable";
import { useDispatch, useSelector } from "react-redux";
import { getRepaymentReport } from "@/redux/slices/loanRepaymentSlice";
import CenterModal from "../../modals/CenterModal";
import Button from "../../shared/buttonComponent/Button";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { FaWindowClose } from "react-icons/fa";
import { exportToPDF } from "@/helpers";
import EditableButton from "../../shared/editableButtonComponent/EditableButton";
import { handleCaptureClick } from "../../helpers/utils";

const RepaymentReport = () => {
  const dispatch = useDispatch();
  const loanRepayment = useSelector((state) => state.loanRepayment);
  const [dateFilterOpen, setDateFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
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
          startDate,
          endDate,
        };
        dispatch(getRepaymentReport(data));
        setDateFilterOpen(false);
      }
    }
  };

  const clearDateFilter = () => {
    setDateRange([
      {
        startDate: null,
        endDate: null,
        key: "selection",
      },
    ]);
    dispatch(getRepaymentReport());
  };

  const handleCapture = () => {
    handleCaptureClick(setLoading, "captureDiv", `Repayment report`);
  };

  useEffect(() => {
    dispatch(getRepaymentReport());
  }, []);
  return (
    <main
      id="captureDiv"
      className="w-full rounded-lg bg-swLightGray p-5 shadow-xl"
    >
      <div className="flex justify-between">
        <p className="text-lg font-semibold text-black">Repayments Report</p>
        {/* <button
          className={
            "py-2 px-4 text-white text-sm bg-swBlue font-semibold rounded-md"
          }
          onClick={() => {
          exportToPDF("repaymentId")
          }}
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

      <div id="repaymentId">
        <div className="flex justify-between items-center mt-5">
          <p className="font-semibold text-black">Filter Report</p>
          <div className="flex gap-3">
            {dateRange && dateRange[0].startDate != null ? (
              <div className="flex gap-3 items-center">
                {" "}
                <div className="flex gap-3 items-center">
                  <p className="text-xs font-semibold flex gap-2 items-center border border-swGray bg-white py-1.5 px-3 mb-4 rounded-lg">
                    Date Range :{" "}
                    {dateRange[0]?.startDate.toISOString().slice(0, 10)} to{" "}
                    {dateRange[0]?.endDate.toISOString().slice(0, 10)}{" "}
                    <span>
                      {" "}
                      <FaWindowClose
                        color="red"
                        size={15}
                        cursor={"pointer"}
                        onClick={clearDateFilter}
                      />
                    </span>
                  </p>{" "}
                </div>
              </div>
            ) : null}
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
            <p className="font-semibold">Number of All Repayment</p>
            <div className="flex justify-between items-end">
              <p className="text-2xl font-bold mt-3">
                {loanRepayment?.data?.data?.count}
              </p>
            </div>
          </div>
          <div className="bg-white border rounded-xl p-3 w-full">
            <p className="font-semibold">Number of Fully Paid Repayment</p>
            <div className="flex justify-between items-end">
              <p className="text-2xl font-bold mt-3">
                {loanRepayment?.data?.data?.fullyPaidCount}
              </p>
            </div>
          </div>
          <div className="bg-white border rounded-xl p-3 w-full">
            <p className="font-semibold">Number of Installment Repayment</p>
            <div className="flex justify-between items-end">
              <p className="text-2xl font-bold mt-3">
                {loanRepayment?.data?.data?.installmentCount}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-5 mt-5">
          <div className="bg-white border rounded-xl p-3 w-full">
            <p className="font-semibold">Number of Overdue Repayment</p>
            <div className="flex justify-between items-end">
              <p className="text-2xl font-bold mt-3">
                {" "}
                {loanRepayment?.data?.data?.overdueCount}
              </p>
            </div>
          </div>
          <div className="bg-white border rounded-xl p-3 w-full">
            <p className="font-semibold">Number of Unpaid Repayment</p>
            <div className="flex justify-between items-end">
              <p className="text-2xl font-bold mt-3">
                {" "}
                {loanRepayment?.data?.data?.unpaidCount}
              </p>
            </div>
          </div>
          <div className="bg-white border rounded-xl p-3 w-full">
            <p className="font-semibold">Total Repayment Amount</p>
            <div className="flex justify-between items-end">
              <p className="text-2xl font-bold mt-3">
                {" "}
                ₦ {loanRepayment?.data?.data?.totalAmountDue?.toLocaleString()}{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-5 mt-5">
          <div className="bg-white border rounded-xl p-3 w-full">
            <p className="font-semibold">Total Repayment Paid</p>
            <div className="flex justify-between items-end">
              <p className="text-2xl font-bold mt-3">
                {" "}
                ₦ {loanRepayment?.data?.data?.totalAmountPaid?.toLocaleString()}{" "}
              </p>
            </div>
          </div>
          <div className="bg-white border rounded-xl p-3 w-full">
            <p className="font-semibold">Total Balance to Pay</p>
            <div className="flex justify-between items-end">
              <p className="text-2xl font-bold mt-3">
                {" "}
                ₦{" "}
                {loanRepayment?.data?.data?.totalBalanceToPay?.toLocaleString()}{" "}
              </p>
            </div>
          </div>
          <div className="bg-white border rounded-xl p-3 w-full">
            <p className="font-semibold">Unpaid Repayemnt Amount</p>
            <div className="flex justify-between items-end">
              <p className="text-2xl font-bold mt-3">
                {" "}
                ₦{" "}
                {loanRepayment?.data?.data?.unpaidRepaymentAmount?.toLocaleString()}{" "}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden border mt-5 bg-white">
        <RepaymentTable />
      </div>
      <CenterModal
        isOpen={dateFilterOpen}
        onClose={() => {
          setDateFilterOpen(!dateFilterOpen);
        }}
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
    </main>
  );
};

export default RepaymentReport;
