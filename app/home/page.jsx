"use client";
import Dashboard from "@/app/dashboard/page.jsx";
import DisbursementCard from "@/app/components/cards/DisbursmentCard/DisbursementCard";
import CustomerSummary from "../components/customers/CustomerSummary";


const Home = () => {
  const headers = [
    { id: "firstName", label: "First Name" },
    { id: "lastName", label: "Last Name" },
    { id: "dateOfBirth", label: "Date of Birth" },
    { id: "gender", label: "Gender" },
    { id: "nin", label: "NIN" },
  ];

  return (
    <Dashboard>
      <main>
        <div className="p-5">
          {/* <DisbursementCard /> */}
          <CustomerSummary />
        </div>
    
      </main>
    </Dashboard>
  );
};

export default Home;
