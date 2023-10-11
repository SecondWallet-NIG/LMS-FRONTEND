"use client";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import ReusableDataTable from "../shared/tables/ReusableDataTable";
const Customers = () => {
  const headers = [
    { id: "firstName", label: "First Name" },
    { id: "lastName", label: "Last Name" },
    { id: "dateOfBirth", label: "Date of Birth" },
    { id: "gender", label: "Gender" },
    { id: "nin", label: "NIN" },
  ];
  return (
    <DashboardLayout>
      <ReusableDataTable
        apiEndpoint="http://localhost:8000/api/customer/profile-information"
        initialData={[]}
        headers={headers}
        bt
      />
    </DashboardLayout>
  );
};

export default Customers;
