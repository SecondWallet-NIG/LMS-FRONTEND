"use client";
import MyTasksCard from "../components/cards/MyTasksCard/MyTasksCard";
import ReusableDataTable from "../components/shared/tables/ReusableDataTable";
import Dashboard from "../dashboard/page";

const MyTasks = () => {
  const headers = [
    { d_and_t: "D & T" },
    { tesk_description: "Task Descprition" },
    { loan_id: "Loan ID" },
    { gross_loan_amount: "Gross loan amount" },
    { status: "Status" },
  ];
  return (
    <Dashboard>
      <main>
        <div className="p-5 flex gap-5">
          <MyTasksCard header={"all tasks"} data={16} />
          <MyTasksCard header={"completed tasks"} data={11} />
          <MyTasksCard header={"pending tasks"} data={5} />
        </div>
        <p className="font-semibold mt-10 mb-4 pl-5">Active Tasks</p>
        <ReusableDataTable
          onClickRow={""}
          headers={headers}
          initialData={[]}
          filters={false}
          pagination={true}
        />
      </main>
    </Dashboard>
  );
};

export default MyTasks;
