import { PiCalendarBlankLight } from "react-icons/pi";
import EditableButton from "../../shared/editableButtonComponent/EditableButton";
import { FiUser } from "react-icons/fi";
import { BsGraphDownArrow } from "react-icons/bs";
import ReusableDataTable from "../../shared/tables/ReusableDataTable";

const LoanReport = () => {
  const header = [
    { id: "s/n", label: "S/n" },
    { id: "borrower", label: "Borrower Name" },
    { id: "loan_type", label: "Loan type" },
    { id: "loan_amount", label: "Loan amount" },
  ];

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
          <p className="font-semibold">Total borrowers</p>
          <div className="flex justify-between items-end">
            <p className="text-2xl font-bold mt-3">5,340</p>
            <p className="font-semibold">976,582,287.25</p>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-3 w-full">
          <p className="font-semibold">Blacklisted borrowers</p>
          <div className="flex justify-between items-end">
            <p className="text-2xl font-bold mt-3">3,950</p>
            <p className="font-semibold">976,582,287.25</p>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-3 w-full">
          <p className="font-semibold">Eligible borrowers</p>
          <div className="flex justify-between items-end">
            <p className="text-2xl font-bold mt-3">1,390</p>
            <p className="font-semibold">976,582,287.25</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden border mt-5 bg-white">
        <ReusableDataTable headers={header} filters={true} />
      </div>
    </main>
  );
};

export default LoanReport;
