import DisbursedLoans from "../../loans/DisbursedLoans";
import DisbursementCard from "../../cards/DisbursmentCard/DisbursementCard";

const DisbursementReport = () => {
  return (
    <main className="w-full rounded-lg bg-swLightGray p-5 shadow-xl">
      <div className="rounded-xl overflow-hidden bg-white border mt-5">
      <DisbursementCard />
        <DisbursedLoans />
      </div>
    </main>
  );
};

export default DisbursementReport;
