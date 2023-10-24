"use client";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import ReusableDataTable from "@/app/components/shared/tables/ReusableDataTable";

const AllLoans = () => {
  const headers = [
    { date_and_time: "Date and time" },
    { customer_name_and_id: "Customer name and ID" },
    { loan_id_and_package: "Loan ID & package" },
    { loan_amount: "Loan amount" },
    { loan_status: "Loan status" },
    { action_by: "Action by" },
  ];
  return (
    <DashboardLayout>
      <main>
        <ReusableDataTable
          onClickRow={""}
          headers={headers}
          initialData={[]}
          filters={true}
          pagination={true}
        />
      </main>
    </DashboardLayout>
  );
};

export default AllLoans;
