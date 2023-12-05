"use client";
import DisbursementCard from "@/app/components/cards/DisbursmentCard/DisbursementCard";
import ReusableDataTable from "@/app/components/shared/tables/ReusableDataTable.jsx";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";

const AllDisburments = () => {
  const headers = [
    { id: "firstName", label: "First Name" },
    { id: "lastName", label: "Last Name" },
    { id: "dateOfBirth", label: "Date of Birth" },
    { id: "gender", label: "Gender" },
    { id: "nin", label: "NIN" },
  ];

  return (
    <DashboardLayout>
      <main>
        <div className="p-5">
          <DisbursementCard />
        </div>
        <ReusableDataTable
          onClickRow={"/borrowers/profile"}
          apiEndpoint="https://secondwallet-stag.onrender.com/api/customer/profile-information"
          initialData={[]}
          headers={headers}
          filters={true}
          pagination={true}
        />
      </main>
    </DashboardLayout>
  );
};

export default AllDisburments;
