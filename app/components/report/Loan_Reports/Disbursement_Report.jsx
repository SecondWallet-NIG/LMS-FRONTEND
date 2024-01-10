"use client";
import DisbursedLoans from "../../loans/DisbursedLoans";
import DisbursementCard from "../../cards/DisbursmentCard/DisbursementCard";
import EditableButton from "../../shared/editableButtonComponent/EditableButton";
import { handleCaptureClick } from "../../helpers/utils";
import { useState } from "react";

const DisbursementReport = () => {
  const [loading, setLoading] = useState(false);

  const handleCapture = () => {
    handleCaptureClick(setLoading, "captureDiv", `Disbursement report`);
  };
  return (
    <main className="w-full rounded-lg bg-swLightGray p-5 shadow-xl">
      <div className="flex justify-between">
        <p className="text-lg font-semibold text-black">Disbursement Report</p>
        {/* <button
          className={
            "py-2 px-4 text-white text-sm bg-swBlue font-semibold rounded-md"
          }
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
      <div className="rounded-xl overflow-hidden bg-white border">
        <div id="captureDiv" className="p-1">
          <DisbursementCard />
        </div>
        <DisbursedLoans />
      </div>
    </main>
  );
};

export default DisbursementReport;
