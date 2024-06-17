"use client";
import { useEffect, useState } from "react";
import BarChart from "../components/chart/BarChart";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import ReusableDataTable from "../components/shared/tables/ReusableDataTable";
import { Line } from "react-chartjs-2";
// import revenue from "../../app/data/revenue.json";

const AssetManagement = () => {
  const [loading, setLoading] = useState(true);
  const revenue = [
    {
      label: "Jan",
      cost: 100000000,
    },
    {
      label: "Feb",
      cost: 2000000,
    },
    {
      label: "Mar",
      cost: 10000000,
    },
    {
      label: "Apr",
      cost: 150000000,
    },
  ];
  // const dataValuesRepayment = Array(12).fill(0);
  // const dataValuesPaymentRecovered = Array(12).fill(0);
  // const labels = [
  //   "Jan",
  //   "Feb",
  //   "Mar",
  //   "Apr",
  //   "May",
  //   "Jun",
  //   "Jul",
  //   "Aug",
  //   "Sept",
  //   "Oct",
  //   "Nov",
  //   "Dec",
  // ];

  // const options = {
  //   responsive: true,
  //   maintainAspectRatio: false, // Set to false to allow custom height
  //   scales: {
  //     x: {
  //       grid: {
  //         display: true,
  //       },
  //     },
  //     y: {
  //       grid: {
  //         display: true,
  //       },
  //     },
  //   },
  // };

  // const dataRepayments = {
  //   labels,
  //   datasets: [
  //     {
  //       label: "Expected Repayments",
  //       data: dataValuesRepayment,
  //       backgroundColor: "#3562a1",
  //       barThickness: 10,
  //       borderRadius: 8,
  //     },
  //     // {
  //     //   label: "Actual Repayments",
  //     //   data: dataValuesPaymentRecovered,
  //     //   backgroundColor: "#ba5b4a",
  //     //   barThickness: 10,
  //     //   borderRadius: 8,
  //     // },
  //   ],
  // };

  const header = [
    { id: "asset", label: "Asset" },
    { id: "category", label: "Category" },
    { id: "description", label: "Description" },
    { id: "aquisitionDate", label: "Aquisition Date" },
    { id: "value", label: "Value" },
  ];

  revenue.map((data) => console.log(data.label));
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <DashboardLayout paths={["Asset management"]}>
          <div className="p-5">
            <div className="p-5 w-full bg-swBlue text-white rounded-3xl">
              {/* <BarChart options={options} data={dataRepayments} /> */}
              <Line
                data={{
                  labels: revenue.map((data) => data.label),
                  datasets: [
                    {
                      label: "Cost",
                      data: revenue.map((data) => data.cost),
                      backgroundColor: "#fff",
                      borderColor: "#fff",
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false, // Set to false to allow custom height
                  elements: {
                    line: {
                      tension: 0.5,
                    },
                  },
                  color: "#fff",
                  scales: {
                    x: {
                      ticks: {
                        color: "#fff",
                      },
                      grid: {
                        display: false,
                      },
                    },
                    y: {
                      ticks: {
                        color: "#fff",
                      },
                      grid: {
                        display: false,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>

          <ReusableDataTable
            // dataTransformer={customDataTransformer}
            // onClickRow="/borrowers/profile"
            headers={header}
            initialData={[]}
            // apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/customer/profile-information/blacklist/all`}
            // btnText={
            //   <div className="flex gap-1 items-center p-1">
            //     <AiOutlinePlus size={15} />
            //     <p className="">create borrower</p>
            //   </div>
            // }
            // btnTextClick={() => {
            //   router.push("/create-borrower");
            // }}
            filters={true}
            pagination={true}
          />
        </DashboardLayout>
      )}
    </>
  );
};

export default AssetManagement;
