"use client";
import { useEffect, useState } from "react";
import { PiCalendarBlankLight } from "react-icons/pi";
import EditableButton from "../../shared/editableButtonComponent/EditableButton";
import { FiUser } from "react-icons/fi";
import { BsGraphDownArrow } from "react-icons/bs";
import ReusableDataTable from "../../shared/tables/ReusableDataTable";
import { useDispatch, useSelector } from "react-redux";
import { getLoanApplicationSummary } from "@/redux/slices/loanApplicationSlice";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import LoanTable from "../../loans/LoanTable";
import CenterModal from "../../modals/CenterModal";
import Button from "../../shared/buttonComponent/Button";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const LoanReport = () => {
  const dispatch = useDispatch();
  const loanApplication = useSelector((state) => state.loanApplication);
  const [dateFilterOpen, setDateFilterOpen] = useState(false);

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
  const header = [
    { id: "s/n", label: "S/n" },
    { id: "borrower", label: "Borrower Name" },
    { id: "loan_type", label: "Loan type" },
    { id: "loan_amount", label: "Loan amount" },
  ];

  const fetchSummaryByDate = () => {
    // console.log(startDate, endDate);
    if (dateRange && dateRange.length > 0) {
      if (
        dateRange[0].startDate instanceof Date &&
        dateRange[0].endDate instanceof Date
      ) {
        const startDate = dateRange[0].startDate.toISOString();
        const endDate = dateRange[0].endDate.toISOString();
        const data = {
          startDate, endDate
        }
        dispatch(getLoanApplicationSummary(data));
        setDateFilterOpen(false)
      }
    }
  };

  useEffect(() => {
    dispatch(getLoanApplicationSummary());
  }, []);

  return (
    <main className="w-full rounded-lg bg-swLightGray p-5 shadow-xl">
      <div className="flex justify-between">
        <p className="text-lg font-semibold text-black">Loan Report</p>
        <EditableButton
          className={
            "py-2 px-4 text-white text-sm bg-swBlue font-semibold rounded-md"
          }
        >
          Export report
        </EditableButton>
      </div>

      <div className="flex justify-between items-center mt-5">
        <p className="font-semibold text-black">Filter report</p>
        <div className="flex gap-3">
          <EditableButton
            onClick={toggleDateFilter}
            className={
              "py-2 px-4 font-semibold text-sm border border-gray-200 rounded-md flex gap-2 items-center"
            }
          >
            <PiCalendarBlankLight size={20} />
            Select date range
          </EditableButton>
          <EditableButton
            className={
              "py-2 px-4 font-semibold text-sm border border-gray-200 rounded-md flex gap-2 items-center"
            }
          >
            <FiUser size={20} />
            Borrower status
          </EditableButton>
          <EditableButton
            className={
              "py-2 px-4 font-semibold text-sm border border-gray-200 rounded-md flex gap-2 items-center"
            }
          >
            <BsGraphDownArrow size={20} />
            Debt status
          </EditableButton>
        </div>
      </div>

      <div className="flex gap-5 mt-5">
        <div className="bg-white border rounded-xl p-3 w-full">
          <p className="font-semibold">Total Number of Loans</p>
          <div className="flex justify-between items-end">
            <p className="text-2xl font-bold mt-3">
              {loanApplication?.data?.data.count}
            </p>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-3 w-full">
          <p className="font-semibold">Total Loan Amount</p>
          <div className="flex justify-between items-end">
            <p className="text-2xl font-bold mt-3">
              {" "}
              ₦ {loanApplication?.data?.data.totalLoanAmount} .00K
            </p>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-3 w-full">
          <p className="font-semibold">Total Commitment Fee</p>
          <div className="flex justify-between items-end">
            <p className="text-2xl font-bold mt-3">
              {" "}
              ₦ {loanApplication?.data?.data.totalCommitmentTotal} .00K
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-5 mt-5">
        <div className="bg-white border rounded-xl p-3 w-full">
          <p className="font-semibold">Number of Approved Loans</p>
          <div className="flex justify-between items-end">
            <p className="text-2xl font-bold mt-3">
              {" "}
              {loanApplication?.data?.data.ApprovedLoanCount}{" "}
            </p>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-3 w-full">
          <p className="font-semibold">Number of Pending Loans</p>
          <div className="flex justify-between items-end">
            <p className="text-2xl font-bold mt-3">
              {" "}
              {loanApplication?.data?.data.pendingLoanCount}{" "}
            </p>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-3 w-full">
          <p className="font-semibold">Number of Declined Loans</p>
          <div className="flex justify-between items-end">
            <p className="text-2xl font-bold mt-3">
              {" "}
              {loanApplication?.data?.data.DeclinedLoanCount}{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-5 mt-5">
        <div className="bg-white border rounded-xl p-3 w-full">
          <p className="font-semibold">Number of Interest Servicing Loans</p>
          <div className="flex justify-between items-end">
            <p className="text-2xl font-bold mt-3">
              {" "}
              {loanApplication?.data?.data.noOfInterestServicingRepayment}{" "}
            </p>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-3 w-full">
          <p className="font-semibold">Number of Bullet Repayment Loans</p>
          <div className="flex justify-between items-end">
            <p className="text-2xl font-bold mt-3">
              {" "}
              {loanApplication?.data?.data.noOfBulletRepayment}{" "}
            </p>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-3 w-full">
          <p className="font-semibold">Number of Installment Repayment Loans</p>
          <div className="flex justify-between items-end">
            <p className="text-2xl font-bold mt-3">
              {" "}
              {loanApplication?.data?.data.noOfInstallmentRepayment}{" "}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden border mt-5 bg-white">
        <LoanTable />
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

export default LoanReport;