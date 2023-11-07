import { PiCalendarBlankLight } from "react-icons/pi";
import EditableButton from "../../shared/editableButtonComponent/EditableButton";
import { FiUser } from "react-icons/fi";
import { BsGraphDownArrow } from "react-icons/bs";
import ReusableDataTable from "../../shared/tables/ReusableDataTable";

const BorrowersReport = () => {
  const header = [
    { id: "s/n", label: "S/n" },
    { id: "borrower", label: "Borrower" },
    { id: "borrower_id", label: "Borrower ID" },
    { id: "date_added", label: "Date added" },
    { id: "phone_no", label: "Phone No" },
    { id: "email", label: "Email address" },
    { id: "debt_status", label: "Debt status" },
    { id: "borrower_status", label: "Borrower status" },
    { id: "added_by", label: "Added by" },
  ];

  return (
    <main className="w-full rounded-lg bg-swLightGray p-5 shadow-xl">
      <div className="flex justify-between">
        <p className="text-lg font-semibold text-black">Borrowers Report</p>
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
          <p className="text-2xl font-bold mt-3">520</p>
        </div>
        <div className="bg-white border rounded-xl p-3 w-full">
          <p className="font-semibold">Blacklisted borrowers</p>
          <p className="text-2xl font-bold mt-3">20</p>
        </div>
        <div className="bg-white border rounded-xl p-3 w-full">
          <p className="font-semibold">Eligible borrowers</p>
          <p className="text-2xl font-bold mt-3">500</p>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden bg-white border mt-5">
        <ReusableDataTable headers={header} filters={true} />
      </div>
    </main>
  );
};

export default BorrowersReport;
