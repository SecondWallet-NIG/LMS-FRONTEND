import Dashboard from "@/app/dashboard/page.jsx";
import DisbursementCard from "../../components/cards/DisbursementCard.jsx";

const AllDisburments = () => {
  return (
    <Dashboard>
      <main>
        <div className="p-5">
          <DisbursementCard />
        </div>
      </main>
    </Dashboard>
  );
};

export default AllDisburments;
